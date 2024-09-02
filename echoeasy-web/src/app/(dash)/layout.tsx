"use client";

import AuthChecker from "@/components/login-checker";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { TokenProvider } from "@/contexts/TokenContext";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <TokenProvider>
      <AuthChecker>
        <Sidebar />
        <div
          className={cn(
            "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          {children}
        </div>
        <Toaster />
      </AuthChecker>
    </TokenProvider>
  );
}
