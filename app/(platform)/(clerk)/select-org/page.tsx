import { FormOrganization } from "@/components/form/form-organization";
import { Button } from "@/components/ui/button";
import { MAX_FREE_ORG } from "@/constants/boards";

import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { normalizeText } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export default async function SelectOrg() {
  const { userId } = auth();
  const isPro = await checkSubscription();
  if (!userId) {
    return null;
  }
  const organizations = await db.organization.findMany({
    include: {
      users: true,
    },
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
  });
  return (
    <div className="flex mt-5 flex-col gap-y-5 w-full">
      <FormOrganization sideOffset={10} side="right">
        <Button>Create new organization</Button>
      </FormOrganization>

      {organizations?.map((x) => (
        <div className="flex w-full" key={x.id}>
          <a
            className="flex w-full pe-5  justify-between items-center gap-4 border-2 border-secondary hover:border-secondary font-semibold bg-primary-foreground text-primary  hover:bg-secondary hover:text-muted transition-all rounded-full"
            href={`/organization/${x.id}`}
          >
            <div className="w-[40px] h-[40px] relative ">
              <div className="rounded-full bg-secondary-foreground border-2 border-secondary w-full h-full" />
              <div className="flex items-center justify-center absolute top-0 bottom-0 dark:text-black text-white font-semibold left-0 right-0">
                {normalizeText(x.name.substring(0, 1), 1, "uppercase")}
              </div>
            </div>
            <span className="px-5">{x.name}</span>
            {userId === x.admin ? (
              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/10">
                Owner
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Guest
              </span>
            )}
          </a>
        </div>
      ))}
    </div>
  );
}
