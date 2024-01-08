"use client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

console.log(localStorage.getItem("theme"));
export const Navbar = () => {
  const params = useParams()

  return (
    <nav className="fixed z-50 top-0 px-4 w-full text-primary bg-background h-14 border-b shadow-sm  flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo params={params.organizationId} />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            variant="default"
            size="sm"
            className="rounded-sm hidden md:block h-auto  py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            variant="default"
            size="xs"
            className="rounded-sm block md:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: "flex",
              organizationPreviewTextContainer: "hidden md:block",
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
        <ThemeToggle />
      </div>
    </nav>
  );
};
