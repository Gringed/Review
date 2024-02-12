"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateUser } from "./schema";

import {
  incrementAvailableCount,
  hasAvailableCount,
  hasAvailableOrgCount,
} from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { email, username, orgId } = data;

  let user;

  try {
    user = await db.user.create({
      data: {
        email,
        username,
        userId,
        orgId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: user };
};

export const createUser = createSafeAction(CreateUser, handler);
