import { ReactNode } from "react";
import { Button } from "./ui/button";
import { MdAddCircleOutline } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";

interface PageHeaderProps {
  title: string;
  handleAdd?: () => void;
  buttonText?: string;
}

interface PageHeaderPropsForUsers extends PageHeaderProps {
  handleAddAdmin: () => void;
  icon: ReactNode;
  secondaryButtonText: string;
}

function PageHeader(props: PageHeaderProps | PageHeaderPropsForUsers) {
  const { title, handleAdd, buttonText } = props;
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-primary text-3xl font-semibold text-foreground">
        {title}
      </h1>
      <div className="flex gap-4">
        {"handleAddAdmin" in props && (
          <Button
            variant="outline"
            className="mt-auto flex gap-4 py-4 text-center font-primary font-bold text-foreground shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-destructive active:scale-90 dark:hover:bg-card/50"
            onClick={props.handleAddAdmin}
          >
            {props.icon}

            <span>{props.secondaryButtonText}</span>
          </Button>
        )}
        {user?.role === "admin" && (
          <Button
            variant="default"
            className="mt-auto flex gap-4 text-center font-primary font-bold transition-all focus-visible:ring-2 focus-visible:ring-destructive active:scale-90 dark:hover:bg-primary/80"
            onClick={handleAdd}
          >
            <MdAddCircleOutline />

            <span>{buttonText}</span>
          </Button>
        )}
        {user?.role === "manager" && title !== "Departments" && (
          <Button
            variant="default"
            className="mt-auto flex gap-4 text-center font-primary font-bold transition-all focus-visible:ring-2 focus-visible:ring-destructive active:scale-90 dark:hover:bg-primary/80"
            onClick={handleAdd}
          >
            <MdAddCircleOutline />

            <span>{buttonText}</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
