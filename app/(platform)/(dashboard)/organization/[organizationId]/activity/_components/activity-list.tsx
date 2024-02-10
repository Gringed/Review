import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { LoaderIcon } from "lucide-react";

export const ActivityList = async () => {
  const headersList = headers();
  const referer = headersList.get("referer");

  if (!referer) {
    return redirect("/");
  }
  const request = new NextRequest(referer);

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId: request.nextUrl.pathname.split("/")[2],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 700));
  return (
    <ol className="space-y-4 mt-4">
      {auditLogs && (
        <>
          <p className="hidden last:block text-xs text-center text-muted-foreground">
            No activity found inside this organization
          </p>
          {auditLogs.map((log) => (
            <ActivityItem key={log.id} data={log} />
          ))}
        </>
      )}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <div className="flex gap-4">
        <Skeleton className="w-[4%] h-8" />
        <Skeleton className="w-[50%] h-8" />
      </div>
      <Skeleton className="w-[40%] h-8" />
    </ol>
  );
};
