"use client";
import { useToken } from "@/hooks/useToken";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function AccountDetails() {
  const { token, logout } = useToken();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sua Conta </CardTitle>
        <CardDescription>Informações sobre a sua conta.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={user?.email}
          className="input"
          disabled
        />
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={user?.name}
          className="input"
          disabled
        />
        <Label htmlFor="lastname">Sobrenome</Label>
        <Input
          type="text"
          id="lastname"
          name="lastname"
          value={user?.lastname}
          className="input"
          disabled
        />

        <Label htmlFor="cellphone">Celular</Label>
        <Input
          type="text"
          id="cellphone"
          name="cellphone"
          value={user?.cellphone}
          className="input"
          disabled
        />
        <Label htmlFor="role">Função</Label>
        <Input
          type="text"
          id="role"
          name="role"
          value={user?.role}
          className="input"
          disabled
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={logout}>
          Sair
        </Button>
      </CardFooter>
    </Card>
  );
}
