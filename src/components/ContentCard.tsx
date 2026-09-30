import type { ReactNode } from "react";

function ContentCard({ children }: { children: ReactNode }) {
  return (
    <section className=" bg-surface rounded-lg p-8 shadow-sm">
      {children}
    </section>
  );
}

export default ContentCard;
