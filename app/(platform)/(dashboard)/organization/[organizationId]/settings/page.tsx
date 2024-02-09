import { db } from "@/lib/db";
import { OrganizationProfile, auth, clerkClient } from "@clerk/nextjs";
import { NextPageContext } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import Navbar from "../../../_components/navbar";
import { Sidebar } from "../../../_components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import { getAvailableCount } from "@/lib/org-limit";
import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";

const SettingsPage = async ({
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
        />
      </div>
      <div className="w-full mb-20">
        <Info isPro={isPro} url={params.organizationId} />
        <Separator className="my-7" />
      </div>
    </>
  );
};

export default SettingsPage;
