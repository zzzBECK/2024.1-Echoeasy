"use client";
import { useTokenContext } from "@/contexts/TokenContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

export default function AuthChecker({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { token, setUser } = useTokenContext();

  useEffect(() => {
    const tokenFromSession = sessionStorage.getItem("authToken");

    if (!tokenFromSession) {
      router.push("/login");
      toast({
        title: "Sessão expirada",
        description: "Por favor, faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${tokenFromSession}`,
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
  }, [router, setUser]);

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return children;
}
