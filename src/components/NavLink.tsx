import type { MouseEventHandler, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

function NavLink({ to, children, onClick, className = "" }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`hover-underline relative no-underline transition-colors duration-200 ${
        isActive ? "text-accent" : "text-menu-text/90 hover:text-accent"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
