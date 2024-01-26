import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { BoardNavbar } from "./_components/board-navbar";
import Navbar from "../../_components/navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!params) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <>
      <Navbar url={board.orgId} />
      <div
        className="relative h-screen bg-no-repeat bg-cover bg-center"
        style={
          board.imageId !== "color"
            ? { backgroundImage: `url(${board.imageFullUrl})` }
            : { background: board.imageFullUrl }
        }
      >
        <BoardNavbar data={board} />
        <div className="absolute inset-0 bg-black/10" />
        <main className="relative pt-28 h-full">{children}</main>
      </div>
    </>
  );
};

export default BoardIdLayout;
