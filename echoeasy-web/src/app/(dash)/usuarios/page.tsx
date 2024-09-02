"use client";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { formatStringToDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Usuarios() {
  const { data: users, isLoading } = useGetAllUsers();

  const handleEdit = (userId: any) => {
    toast({
      title: "Edição não disponível",
      description: "Usuário Id: " + userId,
      variant: "destructive",
    });
  };

  const handleDelete = (userId: any) => {
    toast({
      title: "Deleção não disponível",
      description: "Usuário Id: " + userId,
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <ContentLayout
        className="flex justify-center items-center"
        title="Usuários"
      >
        <Loader2 className="h-10 w-10 animate-spin" />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Usuarios">
      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <Table>
            <TableCaption>Lista de documentos cadastrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.cellphone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{formatStringToDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(user._id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(user._id)}
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
