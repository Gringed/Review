
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

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
      createdAt: "desc"
    }
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};