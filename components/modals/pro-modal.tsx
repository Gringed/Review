"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Organization } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { AlertCircle, FileWarning } from "lucide-react";

export const ProModal = () => {
  const id = useProModal((state) => state.id);
  const isOpen = useProModal((state) => state.isOpen);
  const onClose = useProModal((state) => state.onClose);
  const params = useParams();
  const { data: org } = useQuery<Organization[]>({
    queryKey: ["organization", id],
    queryFn: () => fetcher(`/api/organization/${id}`),
  });
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onClick = () => {
    execute({ orgId: params.organizationId as string });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className=" aspect-video relative ">
          <Image src="/hero.svg" alt="Hero" className="object-contain" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl text-center">
            Upgrade to Review Pro Today!
          </h2>
          <div
            className="mb-4 p-5 flex items-center gap-2 rounded-lg bg-orange-100  text-xs font-semibold text-orange-400"
            role="alert"
          >
           <AlertCircle /> For now, this plan support me, any updates comes
          </div>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Create a team environment</li>
              <li>Unlimited Team members</li>
              <li>All calendar features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Separator />
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant="default"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
