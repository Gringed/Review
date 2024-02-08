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

export const ProModal = () => {
  const proModal = useProModal();
  const params = useParams()
  const { data: org } = useQuery<Organization[]>({
    queryKey: ["organization", proModal.id],
    queryFn: () => fetcher(`/api/organization/${proModal.id}`),
  });
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    }
  });
  console.log(params.organizationId)
  const onClick = () => {
    execute({orgId: params.organizationId as string});
  };
  
  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/hero.svg"
            alt="Hero"
            className="object-contain"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Review Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Review
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced activity</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
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