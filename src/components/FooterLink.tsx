import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FooterLinkProps {
  href: string;
  children: ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      to={href}
      className="text-accent no-underline hover:text-menu-text transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

export default FooterLink;
