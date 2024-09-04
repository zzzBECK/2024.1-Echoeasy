"use client";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiCombobox } from "@/components/ui/combobox"; // Import the Combobox component
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useGetAllDocuments } from "@/hooks/useGetAllDocuments";
import { api } from "@/services/api";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const handleEdit = (documentId: any) => {
  toast({
    title: "Edição não disponível",
    description: "Documento Id: " + documentId,
    variant: "destructive",
  });
};

const handleDelete = (documentId: any) => {
  toast({
    title: "Deleção não disponível",
    description: "Documento Id: " + documentId,
    variant: "destructive",
  });
};

export default function Documentos() {
  const router = useRouter();
  const { data: documents, isLoading, mutate } = useGetAllDocuments();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categorias");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryToggle = async (
    documentId: string,
    categoryId: string,
    isSelected: boolean
  ) => {
    try {
      if (isSelected) {
        await api.put(
          `/documentos/${documentId}/remove-categoria?categoriaId=${categoryId}`
        );
        toast({
          title: "Categoria removida!",
          description: "A categoria foi removida do documento com sucesso.",
        });
      } else {
        await api.put(
          `/documentos/${documentId}/add-categoria?categoriaId=${categoryId}`
        );
        toast({
          title: "Categoria adicionada!",
          description: "A categoria foi adicionada ao documento com sucesso.",
        });
      }
      mutate();
    } catch (error: any) {
      console.error("Erro ao atualizar categoria", error);
      toast({
        title: "Erro ao atualizar categoria",
        description: error.response?.data.message || "Erro inesperado.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <ContentLayout
        className="flex justify-center items-center"
        title="Documentos"
      >
        <Loader2 className="h-10 w-10 animate-spin" />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Documentos">
      <Card>
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <Button
            className="w-fit"
            onClick={() => router.push("/documentos/criar")}
          >
            <PlusCircle className="mr-2" />
            Adicionar Novo Documento
          </Button>
          <Table>
            <TableCaption>Lista de documentos cadastrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents?.map((document: any) => (
                <TableRow key={document._id}>
                  <TableCell className="font-medium">
                    {document.title}
                  </TableCell>
                  <TableCell>{document.description}</TableCell>
                  <TableCell>
                    <MultiCombobox
                      options={categories}
                      selectedOptions={document.categorias} // Pass the selected categories for each document
                      onToggle={(categoryId: string, isSelected: boolean) =>
                        handleCategoryToggle(
                          document._id,
                          categoryId,
                          isSelected
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() =>
                          router.push(`/documentos/${document._id}`)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(document._id)}
                      >
                        Deletar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
