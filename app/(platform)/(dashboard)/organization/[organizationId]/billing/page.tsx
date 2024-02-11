import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";

import { SubscriptionButton } from "./_components/subscription-button";

import { Info } from "../_components/info";
import { Sidebar } from "../../../_components/sidebar";
import Navbar from "../../../_components/navbar";
import { getAvailableCount } from "@/lib/org-limit";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const BillingPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const isPro = await checkSubscription(params.organizationId);
  const availableCount = await getAvailableCount(params.organizationId);
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
        />
      </div>
      <div className="w-full">
        <Info isPro={isPro} url={params.organizationId} />
        <Separator className="my-2" />
        <SubscriptionButton orgId={params.organizationId} isPro={isPro} />
      </div>
    </>
  );
};

export default BillingPage;
