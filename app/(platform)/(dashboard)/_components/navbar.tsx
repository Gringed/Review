import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserButton, OrganizationSwitcher, auth } from "@clerk/nextjs";

import { FormPopover } from "@/components/form/form-popover";

import { redirect, useParams } from "next/navigation";

import { Activity, Building, CreditCard, Layout, Plus, Settings } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavItem } from "./nav-item";
import { cn, normalizeText } from "@/lib/utils";
import { db } from "@/lib/db";

import React, { useEffect, useState } from "react";
import { Router } from "next/router";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async ({ url }: { url: any }) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const organization = await db.organization.findUnique({
    where: {
      id: url,
    },
  });
  const organizations = await db.organization.findMany({
    where: {
      admin: userId,
    },
  });
  if (!userId || !organizations.filter((x) => x.id === url).length) {
    return redirect("/select-org");
  }
  console.log("ici" + url)
  const isPro = await checkSubscription(organization?.id)
 const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization?.id}`,
      disabled: false,
    },
    {
      label: "Team",
      icon: <Building className="h-4 w-4 mr-2" />,
      href: `/organization/${organization?.id}/jobs`,
      disabled: isPro ? false : true,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization?.id}/activity`,
      disabled: false,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization?.id}/settings`,
      disabled: false,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization?.id}/billing`,
      disabled: false,
    },
  ];

  return (
    <nav className="fixed z-50 top-0 px-4 w-full text-primary bg-background h-14 border-b shadow-sm  flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo params={organization?.id} />
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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{organization?.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-full gap-3 p-4  ">
                  {routes.map((component) => (
                    <div className="flex">
                      <Link className={`flex items-center gap-2 active:bg-slate-100 ${component.disabled && "pointer-events-none opacity-40"}`}
                      tabIndex={component.disabled ? -1 : undefined}
                      aria-disabled={component.disabled}
                        key={component.label}
                        title={component.label}
                        href={component.href}
                      >
                        {component.icon}
                        {component.label}
                      </Link>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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

export default Navbar;
