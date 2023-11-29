"use client";

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
      <Toaster />
      <ClerkLoading>
        <div className="h-screen flex justify-center items-center gap-2">
          <RotateCw className=" animate-spin" size={50} /> Loading...
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <div>{children}</div>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default PlatformLayout;
