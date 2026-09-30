import { useTranslation } from "react-i18next";
import FooterLink from "./FooterLink";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-navbar text-text py-8 mt-16 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} Learning Tool. All rights reserved.
        </p>
      </div>

      <FooterLink href="/cookie-policy" className="hover:underline">
        {t("footer.privacy")}
      </FooterLink>
    </footer>
  );
}

export default Footer;
