"use client";

import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
    variant={"ghost"}
      className="p-4 ms-2"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Moon
        size={25}
        className=" absolute text-2xl  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <SunMedium
        fontSize={25}
        className="rotate-0 text-2xl  scale-100 transition-all dark:rotate-90 dark:scale-0"
      />
    </Button>
  );
};
