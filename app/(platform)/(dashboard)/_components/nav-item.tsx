"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  Activity,
  Building,
  CreditCard,
  Layout,
  Lock,
  Settings,
} from "lucide-react";

import { cn, normalizeText } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Hint } from "@/components/hint";
import { useAuth } from "@clerk/nextjs";

export type Organization = {
  id: string;
  name: string;
  admin: any;
};

interface NavItemProps {
  isPro: boolean;
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isPro,
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const {userId} = useAuth()
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
      disabled: false,
    },
    {
      label: "Team",
      icon: <Building className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/jobs`,
      disabled: isPro ? false : true,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
      disabled: false,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
      disabled: false,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
      disabled: false,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-primary rounded-md  hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive &&
            !isExpanded &&
            "bg-secondary/10 text-secondary font-semibold"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 relative">
            <div className="rounded-full bg-secondary-foreground border-2 border-secondary w-full h-full" />
            <div className="flex items-center justify-center absolute top-0 bottom-0 text-sm dark:text-black text-white font-medium left-0 right-0">
              {normalizeText(organization.name.substring(0, 1), 1, "uppercase")}
            </div>
          </div>
          <span className=" text-sm">
            {normalizeText(organization.name, 20, "none")}
          </span>
          {userId === organization.admin ? (
              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-normal text-red-700 ring-1 ring-inset ring-red-600/10">
                Owner
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-normal text-green-700 ring-1 ring-inset ring-green-600/20">
                Guest
              </span>
            )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-primary">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => (!route.disabled ? onClick(route.href) : "")}
            className={cn(
              "w-full font-normal flex justify-between pl-10 mb-1",
              pathname === route.href &&
                "bg-secondary/10 text-secondary font-semibold"
            )}
            variant="ghost"
          >
            <div className="flex items-center">
              {route.icon}
              {route.label}
            </div>
            {route.disabled && (
              <Hint
                sideOffset={10}
                description={`
                Become pro reviewer
              `}
              >
                <Lock className="h-4 w-4 mr-2" />
              </Hint>
            )}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
