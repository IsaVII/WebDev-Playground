import type { ReactNode } from "react";
import Reveal from "../motion/Reveal";

/**
 * One tinted, left-bordered block of a lesson - the MDX equivalent of the
 * boxes LearningTopicLayout draws for the introduction, core concepts, etc.
 * The background alternates automatically (MdxLesson styles odd/even
 * sections), so authors never pick a color.
 *
 * `lead` gives the section's `##` heading the larger size the introduction
 * uses.
 */
interface SectionProps {
  children?: ReactNode;
  lead?: boolean;
}

export function Section({ children, lead = false }: SectionProps) {
  return (
    <Reveal
      as="section"
      variant="fade"
      className={`w-full border-l-4 p-3 pl-5 mb-3 ${
        lead
          ? "[&_h2]:text-3xl [&_h2]:text-heading [&_h2]:mt-8 [&_h2]:mb-4"
          : ""
      }`}
    >
      {children}
    </Reveal>
  );
}
