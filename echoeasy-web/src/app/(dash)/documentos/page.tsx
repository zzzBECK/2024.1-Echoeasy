"use client";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiCombobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";
import { useGetAllDocuments } from "@/hooks/useGetAllDocuments";
import { api } from "@/services/api";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";

export default function Documentos() {
  const router = useRouter();
  const { data: documents, isLoading, mutate } = useGetAllDocuments();
  const [categories, setCategories] = useState([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

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

  const handleDelete = async (documentId: string) => {
    try {
      await api.delete(`/documentos/delete?_id=${documentId}`);
      toast({
        title: "Documento deletado!",
        description: "O documento foi deletado com sucesso.",
      });
      mutate();
    } catch (error: any) {
      console.error("Erro ao deletar documento", error);
      toast({
        title: "Erro ao deletar documento",
        description: error.response?.data.message || "Erro inesperado.",
        variant: "destructive",
      });
    }
  };

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

  const filteredData = React.useMemo(() => {
    if (!globalFilter) return documents || [];

    const lowercasedFilter = globalFilter.toLowerCase();

    return (documents || []).filter((document: Document) => {
      return Object.values(document).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowercasedFilter)
      );
    });
  }, [globalFilter, documents]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      accessorKey: "categorias",
      header: "Categoria",
      cell: ({ row }) => (
        <MultiCombobox
          options={categories}
          selectedOptions={row.original.categorias}
          onToggle={(categoryId: string, isSelected: boolean) =>
            handleCategoryToggle(row.original._id, categoryId, isSelected)
          }
        />
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/documentos/${row.original._id}`)}
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
                <DialogDescription className="flex flex-col gap-2">
                  Tem certeza de que deseja deletar o documento? Esta ação não
                  pode ser desfeita.
                  <div>
                    <p>
                      Título:{" "}
                      <b className="text-primary">{row.original.title}</b>
                    </p>
                    <p>
                      Descrição:{" "}
                      <b className="text-primary">{row.original.description}</b>
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary">Cancelar</Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await handleDelete(row.original._id);
                  }}
                >
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
          <div className="flex gap-4">
            <Button
              className="w-fit"
              onClick={() => router.push("/documentos/criar")}
            >
              <PlusCircle className="mr-2" />
              Adicionar Novo Documento
            </Button>
            <Input
              placeholder="Filtrar..."
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption>Lista de documentos cadastrados</TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
