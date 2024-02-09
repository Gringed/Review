import { FormInput } from "@/components/form/form-input";
import { Info } from "./_components/info";
import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";
import { NextPageContext } from "next";
import { Sidebar } from "../../_components/sidebar";
import { getAvailableCount } from "@/lib/org-limit";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import Navbar from "../../_components/navbar";

const OrganizationPage = async ({
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
        <BoardList url={params.organizationId} />
      </div>
    </>
  );
};

export default OrganizationPage;
