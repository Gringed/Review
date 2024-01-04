import { Board } from "@prisma/client";

import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  data: Board;
};

export const BoardNavbar = async ({
  data
}: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-primary/50 fixed top-14 flex items-center px-4 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto px-3">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};