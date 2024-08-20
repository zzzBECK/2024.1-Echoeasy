"use client";
import { User } from "@/types/user";
import { SetStateAction, useEffect, useState } from "react";

interface UseToken {
  token: string | null;
  logout: () => void;
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
}

export const useToken = (): UseToken => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const logout = () => {
    sessionStorage.removeItem("authToken");
    setToken(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  return { token, logout, user, setUser };
};
