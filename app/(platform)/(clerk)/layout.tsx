import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-wallpaper flex-col mx-auto">
      <div className="">
        <Link href={"/"}>
          <div className="flex gap-2 font-bold py-4 items-center justify-between w-full px-8">
            <ArrowLeft /> Back
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default ClerkLayout;
