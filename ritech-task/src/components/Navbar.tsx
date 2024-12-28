import { FaRightFromBracket } from "react-icons/fa6";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/useLogout";

function Navbar() {
  const { logoutUser } = useLogout();

  const handleClick = () => {
    logoutUser();
  };
  {
    return (
      <nav className="row-span-2 row-start-1 flex h-full w-full flex-col gap-12 bg-background px-12 py-10">
        <Logo />
        <NavLinks />
        <Button
          variant="default"
          className="mt-auto flex gap-4 py-6 text-center font-primary font-bold transition-all focus-visible:ring-2 focus-visible:ring-primary active:scale-90"
          onClick={handleClick}
        >
          <FaRightFromBracket className="rotate-180" />
          <span>Log Out</span>
        </Button>
      </nav>
    );
  }
}

export default Navbar;
