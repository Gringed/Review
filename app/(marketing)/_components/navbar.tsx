import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AlignEndHorizontal, LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="fixed top-0 flex items-center w-full h-16 px-4 shadow-sm bg-transparent">
      <div className="md:max-w-screen-2xl mx-auto justify-between w-full flex items-center">
        <Logo />
        <div className="space-x-4 md:w-auto flex items-center justify-between">
          <Button variant={"ghost"} asChild>
            <Link href={"/sign-in"}>
              <LogIn size={20} className="mr-2 sm:hidden block" />
              <span className="sm:block hidden">Login</span>
            </Link>
          </Button>
          <Button
            asChild
            size={"lg"}
            variant={"secondary"}
            className="font-extrabold text-primary-foreground border-4 border-primary"
          >
            <Link className="flex items-center gap-2" href={"/sign-up"}>
              <AlignEndHorizontal size={20} />
              <span className="sm:block hidden">Get review for Free</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
