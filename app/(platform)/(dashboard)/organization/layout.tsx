
import React from "react";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import VerifyUser from "./[organizationId]/_components/verify-user";


const OrganizationLayout = async ({ children }: { children: React.ReactNode }) => {
  const {userId} = auth()
  if(!userId){
    return null
  }
  const user = await db.user.findUnique({
    where: {
      userId
    }
  })

  return (
    <main className="pt-20 md:pt-24 px-4 max-w-full mx-auto  h-screen">
      <div className="flex h-full">
        <VerifyUser user={user} />
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
