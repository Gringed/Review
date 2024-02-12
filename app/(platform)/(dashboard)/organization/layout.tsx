
import React from "react";
import VerifyUser from "./[organizationId]/_components/verify-user";
import { auth } from "@clerk/nextjs";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {

  const {user} = auth()

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
