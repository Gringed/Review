"use client";
import { useEffect } from "react";
import { useUserModal } from "@/hooks/use-user-modal";
import { useParams } from "next/navigation";

const VerifyUser = ({ user }: any) => {
  const params = useParams() as any;
  const userModal = useUserModal();

  useEffect(() => {
    if (!user) {
      userModal.onOpen(params.organizationId);
    }
  }, [params]);
};

export default VerifyUser;
