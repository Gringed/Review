import React from "react";
import { Sidebar } from "../_components/sidebar";
import { getAvailableCount } from "@/lib/org-limit";

const OrganizationLayout = async ({ children }: { children: React.ReactNode }) => {
  const availableCount = await getAvailableCount();
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-full mx-auto  h-screen">
      <div className="flex h-full">
        <div className="relative">
          <Sidebar quotas={availableCount} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
