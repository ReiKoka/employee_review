import { FaRegUser } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import ToggleTheme from "./ToggleTheme";
import { useAuth } from "@/context/AuthContext";
import { setAvatarImage, setBadge } from "@/utils/helperFunctions";
import { RoleType } from "@/utils/types";

function Header() {
  const { user } = useAuth();

  return (
    <header className="w-100 col-start-2 col-end-3 flex h-full items-center justify-end gap-4 bg-background px-8 py-4 leading-[5rem]">
      <Avatar>
        <AvatarImage
          src={setAvatarImage(user?.role as RoleType)}
        />
        <AvatarFallback>
          <FaRegUser />
        </AvatarFallback>
      </Avatar>
      <p className="font-primary text-base font-bold capitalize text-foreground">
        {user?.name}
      </p>
      <Badge
        variant={setBadge(user?.role as RoleType)}
        className="font-secondary capitalize"
      >
        {user?.role}
      </Badge>
      <ToggleTheme />
    </header>
  );
}

export default Header;
