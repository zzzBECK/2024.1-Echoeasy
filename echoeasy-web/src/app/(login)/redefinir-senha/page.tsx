import { RedefinirSenhaForm } from "@/components/redefinir-senha-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4">
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle>Refinir Senha</CardTitle>
          <CardDescription>
            Digite seu email para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RedefinirSenhaForm />
        </CardContent>
      </Card>
      <Link className="flex" href="/login">
        <ArrowLeft /> Voltar para o login
      </Link>
    </div>
  );
}
