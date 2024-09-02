"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTokenContext } from "@/contexts/TokenContext";
import Image from "next/image";
import { useMemo } from "react";

export function UserNav() {
  const { user, logout } = useTokenContext();

  const userAvatarLetters = useMemo(() => {
    if (user?.name && user.lastname) {
      return `${user.name[0]}${user.lastname[0]}`.toUpperCase();
    }
    return user?.name?.[0]?.toUpperCase() ?? "-";
  }, [user]);

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    <>
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt="Avatar"
                          className="rounded-full"
                          width={32}
                          height={32}
                        />
                      ) : (
                        userAvatarLetters
                      )}
                    </>
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">Meu Perfil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name ?? "Não informado"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? "Não informado"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/minha-conta" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Conta
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={logout}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
