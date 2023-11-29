import { FormInput } from "@/components/form/form-input";
import { Info } from "./_components/info";
import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";

const OrganizationPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-6" />
      <BoardList />
    </div>
  );
};

export default OrganizationPage;
