import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { MAX_FREE_BOARDS, MAX_FREE_ORG } from "@/constants/boards";

export const incrementAvailableCount = async (orgId: string) => {
  const { userId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId }
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 }
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 }
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId }
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 }
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 }
    });
  }
};

export const hasAvailableCount = async (orgId: string) => {
  const { userId } = auth();

  if (!orgId) {
    throw new Error ("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId }
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const hasAvailableOrgCount = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error ("Unauthorized");
  }

  const orgLimit = await db.organization.findMany({
    where: { admin: userId }
  });

  if (!orgLimit || orgLimit.length < MAX_FREE_ORG) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async (orgId: string) => {
  const { userId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId }
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};