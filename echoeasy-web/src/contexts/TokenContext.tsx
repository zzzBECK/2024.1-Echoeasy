"use client";

import { useToken } from "@/hooks/useToken";
import { User } from "@/types/user";
import React, { createContext, useContext } from "react";

interface TokenContextProps {
  token: string | null;
  logout: () => void;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, logout, user, setUser } = useToken();

  return (
    <TokenContext.Provider value={{ token, logout, user, setUser }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = (): TokenContextProps => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
};
