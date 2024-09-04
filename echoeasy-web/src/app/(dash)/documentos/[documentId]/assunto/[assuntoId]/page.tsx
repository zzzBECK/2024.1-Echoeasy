"use client";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useGetAssuntoById } from "@/hooks/useGetAssuntoById";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  algorithm_link: z
    .string()
    .min(1, { message: "Link do Algoritmo é obrigatório" }),
});

export default function EditarAssunto({
  params,
}: {
  params: { documentId: string; assuntoId: string };
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: assunto,
    isLoading: isLoadingAssunto,
    mutate,
  } = useGetAssuntoById(params.assuntoId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: assunto?.title,
      description: assunto?.description,
      algorithm_link: assunto?.algorithm_link,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("algorithm_link", data.algorithm_link);
      formData.append("order", assunto.order.toString());
      formData.append("document_id", assunto.document_id);

      await api.put(`/assuntos/update?_id=${params.assuntoId}`, formData);

      toast({
        title: "Assunto editado!",
        description: `Assunto "${data.title}" editado com sucesso.`,
      });

      router.push(`/documentos/${params.documentId}`);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Erro ao criar assunto",
        description: error.response?.data.message || "Erro inesperado.",
        variant: "destructive",
      });
    }
  }

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
      await api.post(`/assuntos/update_photo?_id=${assunto?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsEditingImage(false);
      setPreviewImage(null);
      toast({
        title: "Imagem atualizada com sucesso!",
        description: "Imagem do assunto atualizada com sucesso.",
      });

      mutate();
    } catch (error: any) {
      console.error("Erro ao atualizar a foto:", error);
      toast({
        title: "Erro ao atualizar foto",
        description: error.response?.data.message || "Erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
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
              type="button"
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

  useEffect(() => {
    if (!assunto) return;

    form.setValue("title", assunto.title);
    form.setValue("description", assunto.description);
    form.setValue("algorithm_link", assunto.algorithm_link);
  }, [assunto, form]);

  if (isLoadingAssunto) {
    return (
      <ContentLayout
        className="flex justify-center items-center"
        title="Editar Assunto"
      >
        <Loader2 className="h-10 w-10 animate-spin" />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout className="flex flex-col gap-10" title="Editar Assunto">
      <div onClick={() => router.back()} className="flex gap-2 cursor-pointer">
        <ArrowLeft />
        Voltar
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editar Assunto</CardTitle>
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

              <FormField
                control={form.control}
                name="algorithm_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link do Algoritmo</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite o link do algoritmo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col w-fit items-center gap-4">
                {assunto?.image ? (
                  <Image
                    src={previewImage ? previewImage : assunto.image}
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

              {isLoading ? (
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
    </ContentLayout>
  );
}
