import React from "react";
import { Sidebar } from "../_components/sidebar";
import { getAvailableCount } from "@/lib/org-limit";
import { NextPageContext } from "next";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { headers } from "next/headers"
import { redirect } from "next/navigation";
const OrganizationLayout = async ({ children }: { children: React.ReactNode }) => {
  const headersList = headers()
  const referer = headersList.get("referer")

  if(!referer){
    return redirect("/")
  }

  const request = new NextRequest(referer)
  

  const availableCount = await getAvailableCount();
  const { userId } = auth()
  if (!userId) {
    return null
  }
  const organizations = await db.organization.findMany({
    where: {
      admin: userId
    }
  })

  const organization = await db.organization.findUnique({
    where: {
      id: request.nextUrl.pathname.split("/")[2]
    }
  })
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-full mx-auto  h-screen">
      <div className="flex h-full">
        <div className="relative">
          <Sidebar quotas={availableCount} organizations={organizations} organization={organization} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
