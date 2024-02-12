"use client";
import { useUserModal } from "@/hooks/use-user-modal";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const VerifyUser = ({user}: any) => {
  const params = useParams() as any;
  const userModal = useUserModal();
  if (!params) {
    return null;
  }
  console.log(user);
  useEffect(() => {
    if (!user) {
      userModal.onOpen(params.organizationId);
    }
  }, [params]);
  return;
};

export default VerifyUser;
