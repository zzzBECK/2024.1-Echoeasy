"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTokenContext } from "@/contexts/TokenContext";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export default function UsersTable() {
  const { token } = useTokenContext();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usuarios`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: User[] = await response.json();
          setUsers(data);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <Table>
      <TableCaption>Lista de usuários cadastrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Cellphone</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">
              {user.name} {user.lastname}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.cellphone}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
