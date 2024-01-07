"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateOrganization } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { 
  incrementAvailableCount, 
  hasAvailableCount,
  hasAvailableOrgCount
} from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreate = await hasAvailableOrgCount();
  const isPro = await checkSubscription();

  if (!canCreate && !isPro) {
    return {
      error: "You have reached your limit of free boards. Please upgrade to create more."
    }
  }

  const { name } = data;

  let organization;

  try {
    organization = await db.organization.create({
      data: {
        name,
        admin: userId,
      }
    });


    /* await createAuditLog({
      entityTitle: organization.name,
      entityId: organization.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    }) */
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/organization/${organization.id}`);
  return { data: organization };
};

export const createOrganization = createSafeAction(CreateOrganization, handler);