"use client";
import { useTokenContext } from "@/contexts/TokenContext";
import { api } from "@/services/api";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";

export default function AccountDetails() {
  const { user, setUser } = useTokenContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
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

      setIsEditing(false);
      setPreviewImage(null);
      setUser(userResponse.data);
      toast({
        title: "Foto atualizada com sucesso!",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar a foto:", error);
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
    if (isEditing) {
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
              onClick={handleSave}
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
        <CardDescription>Informações sobre a sua conta.</CardDescription>
        <div className="flex flex-col gap-4">
          {renderImageOrAvatar()}
          {renderActionButton()}
        </div>
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
    </Card>
  );
}
