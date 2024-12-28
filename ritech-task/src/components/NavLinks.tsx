import { NavLink, useLocation } from "react-router";
import {
  adminLinks,
  managerLinks,
  employeeLinks,
  LinkType,
} from "./../utils/links";
import { useAuth } from "@/context/AuthContext";



function NavLinks() {
  const {user} = useAuth();
  const userRole = user?.role;
  const location = useLocation();

  function getLinksByRole(role: string | undefined): LinkType[] {
    switch (role) {
      case "admin":
        return adminLinks;
      case "manager":
        return managerLinks;
      case "employee":
        return employeeLinks;
      default:
        return [];
    }
  }

  const links = getLinksByRole(userRole);

  const isActiveLink = (path: string) => {
    if (path === "/home") {
      return location.pathname === "/home";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <ul className="flex flex-col gap-y-4">
      {links.map((link) => {
        const { text, path, icon } = link;

        const isActive = isActiveLink(path);

        return (
          <li key={text}>
            {
              <NavLink
                to={path}
                className={() =>
                  `flex items-center gap-4 rounded-lg p-4 font-primary text-lg tracking-wider text-foreground outline-none ring-ring transition-all focus-visible:ring-2 active:scale-90 hover:dark:bg-muted hover:dark:text-secondary-foreground ${
                    isActive
                      ? "bg-primary text-muted focus-visible:ring-offset-2 dark:bg-primary dark:text-foreground"
                      : "hover:bg-secondary hover:text-primary"
                  }`
                }
              >
                <span>{icon}</span>
                <span>{text}</span>
              </NavLink>
            }
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;
