import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const alternate = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["100", "200", "700", "800", "600"],
  });
export const Logo = ({params}: any) => {
  return (
    <Link href={params ? `/organization/${params}` : "/"}>
      <div className={cn("hover:zoom-in-50 transition items-center flex gap-2", alternate.className)}>
        <Image alt="" width={35} height={35} src={"/logo.svg"} />
        <h1 className="text-2xl hidden md:block font-extrabold tracking-tighter ms-2">Review</h1>
      </div>
    </Link>
  );
};


