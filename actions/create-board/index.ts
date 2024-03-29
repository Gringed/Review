"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { 
  incrementAvailableCount, 
  hasAvailableCount
} from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, image, orgId } = data;

  const canCreate = await hasAvailableCount(orgId);
  const isPro = await checkSubscription(orgId);

  if (!canCreate && !isPro) {
    return {
      error: "You have reached your limit of free boards. Please upgrade to create more."
    }
  }


  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  ] = image.split("|");

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: "Missing fields. Failed to create board."
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        userId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      }
    });

    if (!isPro) {
     await incrementAvailableCount(orgId);
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
      orgId: orgId
    })
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);