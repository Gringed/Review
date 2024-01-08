import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Linkback from "./linkback";



const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-wallpaper flex-col mx-auto">
      <div className="flex flex-col">
        <Linkback />
        {children}
      </div>
    </div>
  );
};

export default ClerkLayout;
