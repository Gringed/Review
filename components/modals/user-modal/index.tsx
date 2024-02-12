"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";

import { toast } from "sonner";

import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useUserModal } from "@/hooks/use-user-modal";
import { Logo } from "@/components/logo";

import { FormSubmit } from "@/components/form/form-submit";

import { ElementRef, useRef } from "react";
import { createUser } from "@/actions/create-user";
import { FormInput } from "@/components/form/form-input";
import { useUser } from "@clerk/nextjs";

export const UserModal = () => {
  const id = useUserModal((state) => state.id);
  const isOpen = useUserModal((state) => state.isOpen);
  const onClose = useUserModal((state) => state.onClose);
  const params = useParams();

  const clerkUser = useUser();

  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(createUser, {
    onSuccess: (data) => {
      toast.success(`User "${data.username}" created`);
      formRef.current?.reset();
      onClose()
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  console.log(clerkUser);

  const onSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const organizationId = params.organizationId as string;

    execute({ username, email, orgId: organizationId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0  overflow-hidden">
        <div className=" flex items-center justify-center my-2 ">
          <Logo params={params.organizationId} />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Welcome to Review!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Create your user profile to explore Review
          </p>
          <div className="">
            <form ref={formRef} action={onSubmit} className=" py-0.5 space-y-4">
              <FormInput
                id="email"
                placeholder="Please fill valid email"
                errors={fieldErrors}
                label="Email"
                defaultValue={clerkUser.user?.emailAddresses[0]?.emailAddress}
                className="py-5"
                type="email"
              />
              <Separator />
              <FormInput
                id="username"
                placeholder="Please fill valid username"
                errors={fieldErrors}
                type="text"
                defaultValue={clerkUser.user?.firstName!}
                label="Username"
                className="py-5"
              />
              <Separator />
              <div className="flex items-center justify-center gap-x-1">
                <FormSubmit className="rounded-full" variant="default">Create user</FormSubmit>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
function disableEditing(event: MouseEvent): void {
  throw new Error("Function not implemented.");
}
