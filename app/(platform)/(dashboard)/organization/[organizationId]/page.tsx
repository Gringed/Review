import { FormInput } from "@/components/form/form-input";
import { Info } from "./_components/info";
import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";
import { NextPageContext } from "next";

const OrganizationPage = async (context: NextPageContext) => {
  const isPro = await checkSubscription();
  console.log(context)
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} url={context} />
      <Separator className="my-6" />
      <BoardList url={context} />
    </div>
  );
};

export default OrganizationPage;
