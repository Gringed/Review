import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { orgId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const organization = await db.organization.findUnique({
      where: {
        id: params.orgId,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
