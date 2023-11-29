"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  PanelLeftOpen,
  PanelRight,
  PanelRightOpen,
  Plus,
} from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";
import { MobileSidebar } from "./mobile-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const [collapse, setCollapse] = useState<Boolean>(false);

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <div className="h-full">
      <div className="w-full flex justify-end ">
        <Button
          onClick={() => setCollapse(!collapse)}
          className={`relative ${
            storageKey === "t-sidebar-state" && "hidden md:flex me-3"
          } hidden `}
          variant="outline"
          size="sm"
        >
          {collapse ? (
            <PanelLeftOpen
              strokeWidth={2.7}
              className="h-5 w-5 text-primary font-bold"
            />
          ) : (
            <PanelRightOpen
              strokeWidth={2.7}
              className="h-5 w-5 text-primary font-bold"
            />
          )}
          <span className="absolute flex top-0 right-0 h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </Button>
      </div>
      <div
      style={{height: "80vh"}}
        className={`relative ${
          storageKey === "t-sidebar-state"
            ? collapse
              ? " w-0"
              : "hidden md:block w-64 me-3"
            : "w-auto"
        }  transition-all  duration-300 overflow-hidden shrink-0`}
      >
        <div className="font-bold text-sm flex items-center">
          <span className="">Workspaces</span>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto"
          >
            <Link href="/select-org">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="h-85 pe-2 overflow-y-scroll">
          <Accordion
            type="multiple"
            defaultValue={defaultAccordionValue}
            className="space-y-2"
          >
            {userMemberships.data.map(({ organization }) => (
              <NavItem
                key={organization.id}
                isActive={activeOrganization?.id === organization.id}
                isExpanded={expanded[organization.id]}
                organization={organization as Organization}
                onExpand={onExpand}
              />
            ))}
          </Accordion>
        </div>
      </div>
      <div
        className={`absolute bottom-0 ${
          storageKey === "t-sidebar-state"
            ? collapse
              ? " w-0"
              : "hidden md:flex w-full -ml-4"
            : "w-auto"
        }  transition-all  duration-300 overflow-hidden bg-primary `}
      >
        <div>Coucou</div>
      </div>
    </div>
  );
};
