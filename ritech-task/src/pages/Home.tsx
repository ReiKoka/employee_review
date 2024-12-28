import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { FaRightFromBracket } from "react-icons/fa6";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex h-dvh w-full flex-col gap-14 bg-muted px-32 pt-6 font-primary text-foreground">
      <header className="w-full">
        <img src="/mobile-logo.svg" alt="logo" className="h-20 w-40" />
      </header>
      <div className="grid grid-cols-[2fr_1fr] gap-10">
        <div className="flex flex-grow flex-col justify-center gap-4 px-32">
          <h1 className="text-center text-[5rem] font-bold leading-relaxed text-foreground">
            We are <span className="text-primary">ascendify</span>
          </h1>
          <h3 className="text-center font-primary text-[2rem] font-medium text-foreground">
            Better reviews for better outcomes!
          </h3>
          <p className="font-primary text-base">
            Ascendify is a straightforward employee management tool designed to
            make day-to-day HR tasks feel more manageable. From setting clear
            goals and tracking each employee’s progress, to providing timely
            feedback that helps teams grow, Ascendify puts all the essentials at
            your fingertips. With its simple, organized interface, it’s never
            been easier to keep everyone moving in the right direction and
            nurture long-term success.
          </p>
          <div className="mt-4 flex justify-end gap-6">
            <Button
              className="flex items-center gap-4 p-6 font-primary shadow-sm active:scale-90"
              variant="default"
              onClick={() => navigate("/login")}
            >
              <FaRightFromBracket />
              <span>Sign In</span>
            </Button>
          </div>
        </div>

        <div className="flex h-full items-center justify-center">
          <img src="/landingImg.svg" alt="landing image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
