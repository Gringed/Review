import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HelpCircle, User2 } from "lucide-react";

import { db } from "@/lib/db";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { FormPopover } from "@/components/form/form-popover";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

export const BoardList = async ({ url }: { url: any }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const organizations = await db.organization.findMany({
    where: {
      admin: userId,
    },
  });
  const user = await db.user.findUnique({
    where: {
      userId
    }
  })

  if (!userId || !organizations.filter((x) => x.id === url).length) {
    return redirect("/select-org");
  }
  const isPro = await checkSubscription(url);

  const boards = await db.board.findMany({
    where: {
      orgId: url,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: isPro ? 10000000000000 : 5,
  });

  const availableCount = await getAvailableCount(url);

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            aria-disabled={!user}
            href={`/board/${board.id}`}
            className={`${!user && "pointer-events-none filter grayscale"} group relative aspect-video bg-no-repeat bg-center bg-cover rounded-sm h-full w-full overflow-hidden`}
            style={
              board.imageId !== "color"
                ? { backgroundImage: `url(${board.imageThumbUrl})` }
                : { background: board.imageThumbUrl }
            }
          >
            <div className="absolute inset-0 group-hover:bg-black/40 group-hover:backdrop-blur  transition-colors" />
            <p className="relative p-3 bg-muted/40 shadow font-semibold text-primary">
              {board.title}
            </p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">
              {isPro
                ? "Unlimited"
                : `${MAX_FREE_BOARDS - availableCount} remaining`}
            </span>
            <Hint
              sideOffset={40}
              description={`
                Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
              `}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
