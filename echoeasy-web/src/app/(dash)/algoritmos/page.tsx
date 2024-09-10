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
import { useGetAllAlgoritmos } from "@/hooks/useGetAllAlgoritmos";
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
import * as React from "react";

export default function Algoritmos() {
  const { data: algoritmos, isLoading, mutate } = useGetAllAlgoritmos();
  const [newAlgoritmoTitle, setNewAlgoritmoTitle] = React.useState<string>("");
  const [newAlgoritmoBotLink, setNewAlgoritmoBotLink] =
    React.useState<string>("");
  const [editingAlgoritmo, setEditingAlgoritmo] = React.useState<any | null>(
    null
  ); // Estado para armazenar o algoritmo em edição
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false); // Estado de abertura do Dialog
  const [isAdding, setIsAdding] = React.useState<boolean>(true); // Estado para diferenciar entre adicionar e editar

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = async (algoritmoId: string) => {
    try {
      await api.delete(`/algoritmos/${algoritmoId}`);
      toast({
        title: "Algoritmo deletado",
        description: "Algoritmo deletado com sucesso.",
      });

      mutate();
    } catch (error) {
      console.error("Erro ao deletar algoritmo:", error);
      toast({
        title: "Erro ao deletar algoritmo",
        description: "Ocorreu um erro ao tentar deletar o algoritmo.",
        variant: "destructive",
      });
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!newAlgoritmoTitle || !newAlgoritmoBotLink) return;

    try {
      if (!isAdding && editingAlgoritmo) {
        // Se estamos editando um algoritmo, fazemos uma requisição PATCH
        await api.patch(`/algoritmos/${editingAlgoritmo._id}`, {
          title: newAlgoritmoTitle,
          botLink: newAlgoritmoBotLink,
        });

        toast({
          title: "Algoritmo atualizado",
          description: "Algoritmo atualizado com sucesso.",
        });
      } else {
        // Se estamos adicionando, criamos um novo algoritmo
        await api.post("/algoritmos", {
          title: newAlgoritmoTitle,
          botLink: newAlgoritmoBotLink,
        });

        toast({
          title: "Algoritmo criado",
          description: "Algoritmo criado com sucesso.",
        });
      }

      mutate();
    } catch (error: any) {
      console.error("Erro ao criar/atualizar algoritmo:", error);
      toast({
        title: "Erro ao criar/atualizar algoritmo",
        description: error.response?.data.message,
        variant: "destructive",
      });
    } finally {
      resetForm(); // Resetar o formulário
      setIsDialogOpen(false); // Fechar o dialog
    }
  };

  const handleEdit = (algoritmo: any) => {
    setNewAlgoritmoTitle(algoritmo.title);
    setNewAlgoritmoBotLink(algoritmo.botLink);
    setEditingAlgoritmo(algoritmo);
    setIsAdding(false); // Não estamos adicionando, estamos editando
    setIsDialogOpen(true); // Abrir o dialog para edição
  };

  const resetForm = () => {
    setNewAlgoritmoTitle("");
    setNewAlgoritmoBotLink("");
    setEditingAlgoritmo(null); // Resetar o algoritmo em edição
    setIsAdding(true); // Resetar para o estado de adição
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
      accessorKey: "botLink",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Link do Bot
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("botLink")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleEdit(row.original)} // Abrir o Dialog com os dados para edição
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            onClick={async () => await handleDelete(row.original._id)}
          >
            Deletar
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: algoritmos || [],
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
        title="Algoritmos"
      >
        <Loader2 className="h-10 w-10 animate-spin" />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Algoritmos">
      <Card>
        <CardHeader>
          <CardTitle>Algoritmos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="flex flex-col lg:flex-row lg:items-center py-4 gap-4">
            <Dialog
              onOpenChange={(open) => {
                if (open) {
                  resetForm(); // Limpar o formulário ao abrir para adição
                }
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2" />
                  Adicionar Novo Algoritmo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Algoritmo</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <Input
                    placeholder="Título do Algoritmo"
                    value={newAlgoritmoTitle}
                    onChange={(e) => setNewAlgoritmoTitle(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    placeholder="Link do Bot"
                    value={newAlgoritmoBotLink}
                    onChange={(e) => setNewAlgoritmoBotLink(e.target.value)}
                    className="w-full mt-4"
                  />
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      onClick={resetForm} // Resetar o formulário ao cancelar
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleCreateOrUpdate}>Criar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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

      {/* Dialog para edição */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Algoritmo</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Input
                placeholder="Título do Algoritmo"
                value={newAlgoritmoTitle}
                onChange={(e) => setNewAlgoritmoTitle(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Link do Bot"
                value={newAlgoritmoBotLink}
                onChange={(e) => setNewAlgoritmoBotLink(e.target.value)}
                className="w-full mt-4"
              />
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => {
                  resetForm(); // Resetar ao cancelar
                  setIsDialogOpen(false); // Fechar o dialog
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreateOrUpdate}>Atualizar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ContentLayout>
  );
}
