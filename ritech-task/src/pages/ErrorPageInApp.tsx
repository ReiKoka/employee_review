import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full justify-between gap-16">
      <div className="flex w-full items-center justify-end">
        <img
          src="/undraw_bug-fixing_sgk7.svg"
          className="w-full max-w-[30rem]"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="font-secondary text-[15rem] font-extrabold leading-tight tracking-widest text-primary">
          404
        </h1>
        <h3 className="font-primary text-2xl font-semibold tracking-wider text-foreground">
          Not found
        </h3>
        <Button
          variant="default"
          className="mt-10"
          onClick={() => navigate("/dashboard")}
        >
          Back to login
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
