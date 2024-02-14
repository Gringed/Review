import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignEndHorizontal, LogIn } from "lucide-react";
import { Montserrat_Alternates } from "next/font/google";
import Link from "next/link";
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "700",
});
const MarketingPage = () => {
  return (
    <div className="flex items-center text-primary gap-6 justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <h1
          className={cn(
            "text-3xl md:text-6xl  flex flex-col gap-4 tracking-tighter font-bold text-center",
            alternate.className
          )}
        >
          <span>All Tasks, Planning, Job</span>
          <span>& Tools. In One.</span>
          <span>
            Welcome to{" "}
            <span className=" bg-secondary ps-2 pe-6 py-0 text-primary-foreground">
              Review.
            </span>
          </span>
        </h1>
      </div>
      <div className="flex flex-col text-center font-semibold max-w-xs md:max-w-2xl  text-sm mx-auto  md:text-xl">
        <span>Keep everything in the same place-even if your</span>
        <span>{"team isn't"}</span>
      </div>
      <div>
        <Button
          asChild
          size={"lg"}
          variant={"secondary"}
          className="font-extrabold text-primary-foreground border-4 border-primary"
        >
          <Link href={"/sign-up"}>
          <AlignEndHorizontal size={20} className="mr-2" /> Get review for Free
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
