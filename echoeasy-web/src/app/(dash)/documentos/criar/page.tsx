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
import { toast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  category: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export default function CriarDocumento() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.category) formData.append("category", data.category);

      if (data.image) formData.append("image", data.image);

      await api.post("/documentos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Documento criado!",
        description: "Seu documento foi criado com sucesso.",
      });

      router.push("/documentos");
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Erro ao criar documento",
        description: error.response?.data.message || "Erro inesperado.",
        variant: "destructive",
      });
    }
  }

  return (
    <ContentLayout className="flex flex-col gap-10" title="Criar Documento">
      <div
        onClick={() => router.push("/documentos")}
        className="flex gap-2 cursor-pointer"
      >
        <ArrowLeft />
        Voltar
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Criar Documento</CardTitle>
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
                      <Input
                        type="text"
                        placeholder="Digite a descrição"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] ?? undefined)
                        }
                      />
                    </FormControl>
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
