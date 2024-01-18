"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  Menu,
  PanelLeftOpen,
  PanelRight,
  PanelRightOpen,
  Plus,
} from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { auth, useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { CircularProgress } from "@nextui-org/react";
import { NavItem, Organization } from "./nav-item";
import { MobileSidebar } from "./mobile-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

interface SidebarProps {
  storageKey?: string;
  quotas: number;
  isPro?: boolean;
  organization: any;
  organizations: any;
}

export const Sidebar = ({
  storageKey = "t-sidebar-state",
  quotas,
  isPro,
  organization,
  organizations,
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const [collapse, setCollapse] = useState<Boolean>(false);

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

   if (!organizations) {
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
            storageKey === "t-sidebar-state"
              ? "flex me-3"
              : " hidden md:flex me-3"
          } `}
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </Button>
      </div>
      <div
        style={{ height: "80vh" }}
        className={`relative ${
          storageKey === "t-sidebar-state"
            ? collapse
              ? " w-0"
              : "block w-64 me-3"
            : "w-auto"
        }  transition-all  duration-300 overflow-hidden shrink-0`}
      >
        <div className="font-bold text-sm flex items-center px-1 mt-1">
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
            {organizations.map((org: any) => (
              <NavItem
                key={org.id}
                isActive={organization?.id === org.id}
                isExpanded={expanded[org.id]}
                organization={org}
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
              : "flex justify-center rounded-e-md w-full -ml-4"
            : " w-full -ml-2"
        }  transition-all  duration-300 overflow-hidden bg-primary-foreground shadow `}
      >
        <div className="flex text-primary flex-col justify-center items-center ">
          <div className="py-2 font-bold">My Organization quotas</div>
          <div className="py-2 flex gap-5">
            <CircularProgress
              classNames={{
                svg: "w-16 h-16 ",
                indicator: "stroke-secondary",
                track: "stroke-secondary/10",
                value: "text-sm font-semibold text-secondary",
              }}
              value={quotas}
              maxValue={isPro ? 50 : 5}
              strokeWidth={4}
              showValueLabel={true}
              label={"Boards"}
            />
            <CircularProgress
              classNames={{
                svg: "w-16 h-16 ",
                indicator: "stroke-secondary",
                track: "stroke-secondary/10",
                value: "text-sm font-semibold text-secondary",
              }}
              value={6}
              maxValue={isPro ? 500 : 20}
              strokeWidth={4}
              showValueLabel={true}
              label={"Jobs"}
            />
          </div>
          {isPro ? (
            <Button
              disabled
              variant={"outline"}
              className="text-primary my-2 font-bold"
            >
              <Crown size={20} className="me-1" /> You are a Pro Reviewer
            </Button>
          ) : (
            <Button
              onClick={() => console.log("On paie")}
              variant={"outline"}
              className="text-primary my-2 font-bold hover:bg-secondary hover:shadow hover:from-transparent hover:text-primary-foreground"
            >
              <Crown size={20} className="me-1" /> Become a pro Reviewer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
