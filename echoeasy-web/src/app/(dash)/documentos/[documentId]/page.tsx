"use client";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useGetAllAssuntosByDocumentId } from "@/hooks/useGetAllAssuntosByDocumentId";
import { useGetDocumentById } from "@/hooks/useGetDocumentById";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
});

export default function EditarDocumento({
  params,
}: {
  params: { documentId: string };
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const {
    data: documentData,
    isLoading: isLoadingDocument,
    mutate: refetchDocument,
  } = useGetDocumentById(params.documentId);

  const { data: assuntosList, mutate: refetchAssuntos } =
    useGetAllAssuntosByDocumentId(params.documentId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: documentData?.title,
      description: documentData?.description,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      await api.put(`/documentos/update?_id=${params.documentId}`, formData);

      toast({
        title: "Documento alterado!",
        description: "Seu documento foi modificado com sucesso.",
      });

      refetchDocument();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro ao criar documento",
        description: error.response?.data.message || "Erro inesperado.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (!documentData) return;

    form.setValue("title", documentData.title);
    form.setValue("description", documentData.description);
  }, [documentData, form]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEditingImage(true);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await api.post(
        `/documentos/update_photo?_id=${documentData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsEditingImage(false);
      setPreviewImage(null);
      toast({
        title: "Foto atualizada com sucesso!",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
      refetchDocument();
    } catch (error) {
      console.error("Erro ao atualizar a foto:", error);
      toast({
        title: "Erro ao atualizar foto",
        description: "Ocorreu um erro ao tentar atualizar sua foto.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAssunto = async (assuntoId: string) => {
    try {
      await api.delete(`/assuntos/delete?_id=${assuntoId}`);
      toast({
        title: "Assunto deletado!",
        description: "O assunto foi deletado com sucesso.",
      });
      refetchAssuntos();
    } catch (error: any) {
      console.error("Erro ao deletar assunto:", error);
      toast({
        title: "Erro ao deletar assunto",
        description: error.response?.data.message || "Erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const renderActionButton = () => {
    if (isEditingImage) {
      return (
        <>
          {isUploading ? (
            <Button disabled className="w-fit self-center text-xs p-2 h-fit">
              <Loader2 className="w-4 h-fit animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              className="w-fit self-center text-xs p-2 h-fit"
              onClick={handleSaveImage}
              type="button" // Mudança aqui para evitar envio de formulário
            >
              Salvar
            </Button>
          )}
        </>
      );
    } else {
      return (
        <>
          <Button className="w-full" type="button">
            <label htmlFor="upload-photo" className="cursor-pointer">
              Alterar Imagem
            </label>
          </Button>
          <input
            type="file"
            id="upload-photo"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </>
      );
    }
  };

  if (isLoadingDocument) {
    return (
      <ContentLayout
        className="flex justify-center items-center"
        title="Editar Documento"
      >
        <Loader2 className="h-10 w-10 animate-spin" />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout className="flex flex-col gap-10" title="Editar Documento">
      <div
        onClick={() => router.push("/documentos")}
        className="flex gap-2 cursor-pointer"
      >
        <ArrowLeft />
        Voltar
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editar Documento</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite o título"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Digite a descrição" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col w-fit items-center gap-4">
                {documentData?.image ? (
                  <Image
                    src={previewImage ? previewImage : documentData.image}
                    alt="Imagem do documento"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="flex justify-center items-center bg-secondary w-40 h-40 text-center rounded-md">
                    Sem imagem disponível
                  </div>
                )}
                {renderActionButton()}
              </div>

              {isLoadingDocument ? (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Salvar
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assuntos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Lista de documentos cadastrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Link Algoritmo</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assuntosList?.map((assunto: any) => (
                <TableRow key={assunto._id}>
                  <TableCell className="font-medium">{assunto.title}</TableCell>
                  <TableCell>{assunto.description}</TableCell>
                  <TableCell>{assunto.algorithm_link}</TableCell>
                  <TableCell>{assunto.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/documentos/${params.documentId}/assunto/${assunto._id}`
                          )
                        }
                      >
                        Editar
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive">Deletar</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar Exclusão</DialogTitle>
                            <DialogDescription>
                              Tem certeza de que deseja deletar este assunto?
                              Esta ação não pode ser desfeita.
                              <div>
                                <p>
                                  Título:{" "}
                                  <b className="text-primary">
                                    {assunto.title}
                                  </b>
                                </p>
                                <p>
                                  Descrição:{" "}
                                  <b className="text-primary">
                                    {assunto.description}
                                  </b>
                                </p>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose>
                              <Button variant="secondary">Cancelar</Button>
                            </DialogClose>
                            <DialogClose>
                              <Button
                                variant="destructive"
                                onClick={async () => {
                                  await handleDeleteAssunto(assunto._id);
                                }}
                              >
                                Confirmar
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              router.push(`/documentos/${params.documentId}/assunto/criar`)
            }
            className="w-full"
            type="button"
          >
            <PlusCircle className="mr-2" />
            Adicionar Assunto
          </Button>
        </CardFooter>
      </Card>
    </ContentLayout>
  );
}
