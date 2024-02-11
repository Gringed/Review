import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "../_components/info";

import { ActivityList } from "./_components/activity-list";
import { checkSubscription } from "@/lib/subscription";
import Navbar from "../../../_components/navbar";
import { Sidebar } from "../../../_components/sidebar";
import { getAvailableCount } from "@/lib/org-limit";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ActivityPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const isPro = await checkSubscription();
  const availableCount = await getAvailableCount(params.organizationId);
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const organizations = await db.organization.findMany({
    where: {
      admin: userId,
    },
  });

  console.log(params.organizationId);
  const organization = await db.organization.findUnique({
    where: {
      id: params.organizationId,
    },
  });
  return (
    <>
      <Navbar url={params.organizationId} />
      <div className="relative">
        <Sidebar
        isPro={isPro}
          quotas={availableCount}
          organizations={organizations}
          organization={organization}
          orgId={params.organizationId}
        />
      </div>
      <div className="w-full mb-20">
        <Info isPro={isPro} url={params.organizationId} />
        <Separator className="my-7" />
        <Suspense fallback={<ActivityList.Skeleton />}>
          <ActivityList />
        </Suspense>
      </div>
    </>
  );
};

export default ActivityPage;
