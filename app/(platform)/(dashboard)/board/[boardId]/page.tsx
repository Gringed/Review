import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { ListContainer } from "./_components/list-container";

interface BoardIdProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdProps) => {
  const org = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });
  if (!org) {
    redirect("/select-org")
  }
  const orgId = org?.orgId;
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer
        boardId={params.boardId}
        data={lists}
      />
    </div>
  );
};

export default BoardIdPage;
