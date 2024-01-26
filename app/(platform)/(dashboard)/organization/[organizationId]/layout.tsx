import React from "react";
import { OrgControl } from "./_components/org-control";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { db } from "@/lib/db";

export const generateMetadata = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const { orgId } = auth();

  if (!params) {
    return {
      title: "Organization",
    };
  }

  const org = await db.organization.findUnique({
    where: {
      id: params.organizationId
    }
  })

  return {
    title: startCase(org?.name || "organization"),
  };
};

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
