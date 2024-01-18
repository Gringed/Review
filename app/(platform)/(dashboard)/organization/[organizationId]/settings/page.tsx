import { db } from "@/lib/db";
import { OrganizationProfile, clerkClient } from "@clerk/nextjs";
import { NextPageContext } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import Navbar from "../../../_components/navbar";

const SettingsPage = async () => {
  const headersList = headers();
  const referer = headersList.get("referer");

  if (!referer) {
    return redirect("/");
  }
  const users = await clerkClient.users.getUserList();
  const request = new NextRequest(referer);
  const organization = await db.organization.findUnique({
    where: {
      id: request.nextUrl.pathname.split("/")[2],
    },
  });
  if (!organization) {
    return null;
  }
  console.log(users);
  return (
    <>
      <Navbar url={organization.id} />
      <div className="w-full">{organization?.id}</div>
    </>
  );
};

export default SettingsPage;
