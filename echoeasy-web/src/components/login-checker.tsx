"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useToken } from "@/hooks/useToken";
import { ReactNode } from "react";
import { toast } from "./ui/use-toast";

export default function AuthChecker({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const { token, setUser } = useToken();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const userData = await response.json();
        setUser(userData);

        if (window.location.pathname === "/login") {
          router.push("/");
        }
      } catch {
        if (window.location.pathname !== "/login") {
          router.push("/login");
          toast({
            title: "Sessão expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, setUser, token]);

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  // if (user?.role.toLocaleLowerCase() !== "admin") {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Acesso negado</CardTitle>
  //         <CardDescription>
  //           Você não tem permissão para acessar esta página.
  //         </CardDescription>
  //       </CardHeader>
  //     </Card>
  //   );
  // }

  return children;
}
