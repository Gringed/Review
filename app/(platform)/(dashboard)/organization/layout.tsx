import React from "react";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <main className="pt-20 md:pt-24 px-4 max-w-full mx-auto  h-screen">
      <div className="flex h-full">
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
