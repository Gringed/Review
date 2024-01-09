import Image from "next/image";
import { CreditCard } from "lucide-react";
import { auth } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { db } from "@/lib/db";
import { normalizeText } from "@/lib/utils";

interface InfoProps {
  isPro: boolean;
  url: any
};

export const Info = async ({
  isPro, url
}: InfoProps) => {
  const { userId } = auth()

  if (!userId) {
    return null
  }
  const organization = await db.organization.findUnique({
    where: {
      id: url.params.organizationId,
    },

  });

  if (!organization) {
    return (
      <Info.Skeleton />
    );
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] flex items-center justify-center relative">
        <div
          className="rounded-full bg-secondary-foreground border-4 border-secondary  object-cover h-full w-full"
        />
        <div className="flex items-center justify-center absolute top-0 bottom-0 dark:text-black text-white font-bold left-0 right-0">
          {normalizeText(organization.name.substring(0, 1), 1, 'uppercase')}
        </div>

      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">
          {organization.name}
        </p>
        <div className="flex items-center text-xs text-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};