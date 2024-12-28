import { Goal, User } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import { setBadge } from "@/utils/helperFunctions";

type SingleTitleProps = {
  single: User | Goal;
};

function SingleTitle({ single }: SingleTitleProps) {
  const isUser = (single: User | Goal): single is User => {
    return "role" in single;
  };

  return (
    <h1 className="flex text-foreground items-center gap-6 font-primary text-3xl font-semibold">
      {isUser(single) ? `User #${single.id}` : `Goal #${single.id}`}

      <Badge
        variant={
          isUser(single) ? setBadge(single.role) : setBadge(single.status)
        }
        className="rounded-full px-6 py-2 capitalize"
      >
        {isUser(single) ? single.role : single.status}
      </Badge>
    </h1>
  );
}

export default SingleTitle;
