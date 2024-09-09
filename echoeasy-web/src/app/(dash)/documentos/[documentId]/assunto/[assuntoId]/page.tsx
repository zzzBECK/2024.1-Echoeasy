"use client";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useGetAllAlgoritmos } from "@/hooks/useGetAllAlgoritmos";
import { useGetAssuntoById } from "@/hooks/useGetAssuntoById";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  algorithm_link: z.string().optional(),
});

export default function EditarAssunto({
  params,
}: {
  params: { documentId: string; assuntoId: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: assunto, isLoading: isLoadingAssunto } = useGetAssuntoById(
    params.assuntoId
  );
  const { data: algoritmos } = useGetAllAlgoritmos();

  const [selectedAlgoritmo, setSelectedAlgoritmo] = useState<string | null>(
    null
  );
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: assunto?.title,
      description: assunto?.description,
      algorithm_link: assunto?.algorithm_link,
    },
  });

  useEffect(() => {
    if (assunto) {
      setSelectedAlgoritmo(assunto.algorithm_link || null);
      form.setValue("title", assunto.title);
      form.setValue("description", assunto.description);
      form.setValue("algorithm_link", assunto.algorithm_link);
    }
  }, [assunto, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("algorithm_link", selectedAlgoritmo || "");
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

              {/* Combobox para Algoritmo */}
              <FormField
                control={form.control}
                name="algorithm_link"
                render={() => (
                  <FormItem className="lg:w-fit lg:min-w-80">
                    <FormLabel>Selecione o Algoritmo</FormLabel>
                    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full">
                          {selectedAlgoritmo
                            ? algoritmos?.find(
                                (alg: any) => alg._id === selectedAlgoritmo
                              )?.title
                            : "Nenhum"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Busque um algoritmo..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum algoritmo encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              <CommandItem
                                onSelect={() => {
                                  setSelectedAlgoritmo(null); // Definimos como "Nenhum"
                                  setComboboxOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    selectedAlgoritmo === null
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                Nenhum
                              </CommandItem>
                              {algoritmos?.map((algoritmo: any) => (
                                <CommandItem
                                  key={algoritmo._id}
                                  onSelect={() => {
                                    setSelectedAlgoritmo(algoritmo._id); // Define o ID do algoritmo selecionado
                                    setComboboxOpen(false);
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      selectedAlgoritmo === algoritmo._id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {algoritmo.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
