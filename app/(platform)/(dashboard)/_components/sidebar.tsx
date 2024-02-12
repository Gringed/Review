"use client";

import Link from "next/link";
import {
  CameraIcon,
  Crown,
  InfinityIcon,
  PanelLeftOpen,
  PanelRightOpen,
  Plus,
} from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { Avatar, CircularProgress } from "@nextui-org/react";
import { NavItem } from "./nav-item";
import { useState } from "react";

import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { useProModal } from "@/hooks/use-pro-modal";

interface SidebarProps {
  storageKey?: string;
  quotas: number;
  isPro: boolean;
  organization: any;
  organizations: any;
  orgId: string;
  user?: any;
}

export const Sidebar = ({
  storageKey = "t-sidebar-state",
  quotas,
  isPro,
  organization,
  organizations,
  orgId,
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const proModal = useProModal();
  const [collapse, setCollapse] = useState<Boolean>(false);
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({ orgId });
    } else {
      proModal.onOpen(orgId);
    }
  };

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
        <div className="pe-2  overflow-y-scroll" style={{ height: "57vh" }}>
          <Accordion
            type="multiple"
            defaultValue={defaultAccordionValue}
            className="space-y-2"
          >
            {organizations.map((org: any) => (
              <NavItem
                isPro={isPro}
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
            {isPro ? (
              <>
                <div className="flex flex-col justify-center gap-1 max-w-fit items-center">
                  <Avatar
                    icon={<InfinityIcon />}
                    classNames={{
                      base: "bg-gradient-to-br w-16 h-16  border-4 border-secondary",

                      icon: "text-secondary",
                    }}
                  />
                  <p className="text-small">Boards</p>
                </div>
                <div className="flex flex-col justify-center gap-1 max-w-fit items-center">
                  <Avatar
                    icon={<InfinityIcon />}
                    classNames={{
                      base: "bg-gradient-to-br w-16 h-16  border-4 border-secondary",

                      icon: "text-secondary",
                    }}
                  />
                  <p className="text-small">Team</p>
                </div>
              </>
            ) : (
              <>
                <CircularProgress
                  classNames={{
                    svg: "w-16 h-16 ",
                    indicator: "stroke-secondary",
                    track: "stroke-secondary/10",
                    value: "text-sm font-semibold text-secondary",
                  }}
                  value={quotas}
                  maxValue={5}
                  strokeWidth={2}
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
                  value={1}
                  maxValue={1}
                  strokeWidth={2}
                  showValueLabel={true}
                  label={"Team"}
                />
              </>
            )}
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
              onClick={onClick}
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
