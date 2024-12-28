import { Goal, Review } from "@/utils/types";
import { ReactNode } from "react";

type UserCardProps = {
  icon: ReactNode;
  title: string;
  data: Goal[] | Review[] | undefined;
  children: ReactNode;
};

function UserCard({ icon, title, data, children }: UserCardProps) {
  return (
    <div className="rounded-lg w-full bg-card p-4 shadow-custom">
      <div className="mb-3 flex items-center gap-6">
        {icon}
        <h3 className="font-primary text-xl font-bold capitalize tracking-wide text-card-foreground">
          {title}
        </h3>
      </div>
      <h5 className="font-primary text-base font-bold capitalize tracking-wide text-card-foreground">
        total {title}: {data?.length}
      </h5>
      <div className="font-primary text-muted-foreground">
        {data?.length ? (
          <>
            <span className="capitalize">{title} completed &nbsp;</span>
            {children}
          </>
        ) : (
          `No ${title} created for this user yet`
        )}
      </div>
    </div>
  );
}

export default UserCard;
