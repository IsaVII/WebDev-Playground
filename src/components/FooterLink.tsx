import { Link } from "react-router-dom";

function FooterLink({ href, children }) {
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
