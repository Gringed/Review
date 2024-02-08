"use client";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { RotateCw } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        layout: {
          termsPageUrl: "https://clerk.com/terms",
        },
      }}
    >
      <ClerkLoading>
        <div className="h-screen flex justify-center items-center gap-2">
          <RotateCw className=" animate-spin" size={50} /> Loading...
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          <div>{children}</div>
        </QueryProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default PlatformLayout;
