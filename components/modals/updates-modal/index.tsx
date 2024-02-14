"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import { Logo } from "@/components/logo";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";

const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "700", "800", "600"],
});
export const UpdatesModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={() => setOpen(true)}
        className="rounded-full hidden md:block h-auto p-2 relative"
      >
        <Bell size={15} />
        <span className="absolute flex top-0 right-0 h-2 w-2">
          <span className=" animate-bounce absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
          <span className="relative  animate-bounce inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0  overflow-hidden">
          <div className=" flex items-center justify-center my-2 ">
          <div className={cn("hover:zoom-in-50 transition items-center flex gap-2", alternate.className)}>
        <Image alt="" width={35} height={35} src={"/logo.svg"} />
        <h1 className="text-2xl hidden md:block font-extrabold tracking-tighter ms-2">Review</h1>
      </div>
          </div>
          <div className="text-neutral-700 mx-auto p-6">
            <h2 className="font-semibold text-xl mb-10">
              Latest news and updates
            </h2>
            <p className="text-md pb-3 font-semibold text-secondary">
              Upcoming features
            </p>
            <div className="pl-3">
              <ul className="text-sm list-disc">
                <li>Collaborative boards</li>
                <li>Team managment (Jobs / Tasks)</li>
              </ul>
            </div>
            <Separator className="my-5" />
            <p className="text-md pb-3 font-semibold text-primary">
              News and fix
            </p>
            <div className="pl-3">
              <ul className="text-sm list-disc">
                <li>Quotas for free and pro</li>
                <li>Reviewer Pro</li>
              </ul>
            </div>
            <div className=""></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
function disableEditing(event: MouseEvent): void {
  throw new Error("Function not implemented.");
}
