import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 flex items-center w-full p-4">
      <div className="md:max-w-screen-2xl mx-auto justify-end w-full flex items-center">
        <div className="space-x-10  font-bold md-block md:w-auto flex items-center justify-between w-full">
          <Link
            href={"/policy"}
            className="transition-all hover:drop-shadow-xl"
          >
            Privacy Policy
          </Link>

          <Link
            className="flex items-center gap-2 transition-all hover:drop-shadow-xl"
            href={"/terms"}
          >
            Terms and conditions
          </Link>
        </div>
      </div>
    </div>
  );
};
