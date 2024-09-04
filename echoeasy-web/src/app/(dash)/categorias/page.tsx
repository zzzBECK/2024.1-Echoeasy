"use client";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { formatStringToDate } from "@/lib/utils";
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
import { ArrowUpDown, ChevronDown, Loader2, PlusCircle } from "lucide-react";
import * as React from "react";

export default function Categorias() {
  const { data: categories, isLoading, mutate } = useGetAllCategories();
  const [newCategoryTitle, setNewCategoryTitle] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = async (categoryId: string) => {
    try {
      await api.delete(`/categorias/${categoryId}`);
      toast({
        title: "Categoria deletada",
        description: "Categoria deletada com sucesso.",
      });

      mutate();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      toast({
        title: "Erro ao deletar categoria",
        description: "Ocorreu um erro ao tentar deletar a categoria.",
        variant: "destructive",
      });
    }
  };

  const handleCreate = async () => {
    if (!newCategoryTitle) return;

    try {
      await api.post("/categorias", { title: newCategoryTitle });

      toast({
        title: "Categoria criada",
        description: "Categoria criada com sucesso.",
      });

      mutate();
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
      toast({
        title: "Erro ao criar categoria",
        description: error.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setNewCategoryTitle("");
    }
  };

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
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Criado em
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>{formatStringToDate(row.getValue("createdAt"))}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Deletar</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                Tem certeza de que deseja deletar a categoria? Esta ação não
                pode ser desfeita.
                <div>
                  <p>
                    Título: <b className="text-primary">{row.original.title}</b>
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
      ),
    },
  ];

  const table = useReactTable({
    data: categories || [],
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
        title="Categorias"
      >
        <Loader2 className="h-10 w-10 animate-spin" />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Categorias">
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="flex flex-col lg:flex-row lg:items-center py-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2" />
                  Adicionar Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <Input
                    placeholder="Título da Categoria"
                    value={newCategoryTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                    className="w-full"
                  />
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      onClick={() => setNewCategoryTitle("")}
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleCreate}>Criar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Input
              placeholder="Filtrar títulos..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colunas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
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
      <div className="flex items-center justify-end py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
}
