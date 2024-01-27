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
    where: {
      admin: userId,
    },
  });
  console.log(organizations?.length);
  return (
    <div className="flex mt-5 flex-col gap-y-5 w-full">
      {!isPro ? (
        organizations?.length < 10 && (
          <FormOrganization sideOffset={10} side="right">
            <Button>Create new organization</Button>
          </FormOrganization>
        )
      ) : (
        <div></div>
      )}
      {organizations.map((x) => (
        <div className="flex w-full">
          <a
            className="flex w-full pe-5 items-center gap-4 border-2 border-secondary hover:border-secondary font-semibold bg-primary-foreground text-primary  hover:bg-secondary hover:text-muted transition-all rounded-full"
            href={`/organization/${x.id}`}
          >
            <div className="w-[50px] h-[50px] relative">
              <div className="rounded-full bg-secondary-foreground border-2 border-secondary w-full h-full" />
              <div className="flex items-center justify-center absolute top-0 bottom-0 dark:text-black text-white font-semibold left-0 right-0">
                {normalizeText(
                  x.name.substring(0, 1),
                  1,
                  "uppercase"
                )}
              </div>
            </div>
            <span className="">{x.name}</span>
          </a>
        </div>
      ))}
    </div>
  );
}
