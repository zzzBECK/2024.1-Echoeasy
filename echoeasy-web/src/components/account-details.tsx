"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTokenContext } from "@/contexts/TokenContext";
import { getRole } from "@/lib/roles";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  lastname: z.string().min(1, { message: "Sobrenome é obrigatório" }),
  cellphone: z.string().min(10, { message: "Celular inválido" }).optional(),
});

export default function AccountDetails() {
  const { user, setUser } = useTokenContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name || "",
      lastname: user?.lastname || "",
      cellphone: user?.cellphone || "",
    },
  });

  const getUserAvatarLetters = () => {
    if (user?.name && user?.lastname) {
      return `${user.name[0]}${user.lastname[0]}`.toUpperCase();
    }

    return "N/A";
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEditingImage(true);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const userResponse = await api.post(
        `/usuarios/update_photo?_id=${user?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsEditingImage(false);
      setPreviewImage(null);
      setUser(userResponse.data);
      toast({
        title: "Foto atualizada com sucesso!",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar a foto:", error);
      toast({
        title: "Erro ao atualizar foto",
        description: "Ocorreu um erro ao tentar atualizar sua foto.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDetails = async (data: z.infer<typeof FormSchema>) => {
    setIsUploading(true);

    try {
      const userResponse = await api.put(`/usuarios`, data);

      setUser(userResponse.data);
      toast({
        title: "Dados atualizados com sucesso!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast({
        title: "Erro ao atualizar dados",
        description: "Ocorreu um erro ao tentar atualizar seus dados.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const renderImageOrAvatar = () => {
    if (previewImage || user?.image) {
      return (
        <Image
          src={(previewImage || user?.image) ?? ""}
          alt="Avatar"
          className="rounded-sm self-center"
          width={200}
          height={200}
        />
      );
    } else {
      return (
        <Avatar className="h-[200px] w-[200px] self-center">
          <AvatarImage src="#" alt="Avatar" />
          <AvatarFallback className="text-4xl">
            {getUserAvatarLetters()}
          </AvatarFallback>
        </Avatar>
      );
    }
  };

  const renderActionButton = () => {
    if (isEditingImage) {
      return (
        <>
          {isUploading ? (
            <Button disabled className="w-fit self-center text-xs p-2 h-fit">
              <Loader2 className="w-4 h-fit animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              className="w-fit self-center text-xs p-2 h-fit"
              onClick={handleSaveImage}
            >
              Salvar
            </Button>
          )}
        </>
      );
    } else {
      return (
        <>
          <Button className="w-fit self-center text-xs p-2 h-fit">
            <label htmlFor="upload-photo" className="cursor-pointer">
              Alterar foto
            </label>
          </Button>
          <input
            type="file"
            id="upload-photo"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </>
      );
    }
  };

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Sua Conta</CardTitle>
        <div className="flex flex-col gap-4">
          {renderImageOrAvatar()}
          {renderActionButton()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSaveDetails)}
            className="space-y-6"
          >
            <FormItem>
              <Label htmlFor="role">Email</Label>
              <Input
                type="text"
                value={user?.email}
                className="input"
                disabled
              />
            </FormItem>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu sobrenome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cellphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu celular"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <Label htmlFor="role">Função</Label>
              <Input
                type="text"
                value={getRole(user?.role ?? "")}
                className="input"
                disabled
              />
            </FormItem>

            {isUploading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Salvar
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
