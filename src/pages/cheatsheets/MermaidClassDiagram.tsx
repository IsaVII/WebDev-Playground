import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import mermaidClassDiagramDataEn from "../../data/en/cheatsheets/mermaidClassDiagram.json";
import mermaidClassDiagramDataSv from "../../data/sv/cheatsheets/mermaidClassDiagram.json";

const CONTENT_MAP: Record<string, typeof mermaidClassDiagramDataEn> = {
  en: mermaidClassDiagramDataEn,
  sv: mermaidClassDiagramDataSv,
};

function MermaidClassDiagram() {
  const { i18n } = useTranslation();
  const mermaidClassDiagramContent =
    CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  return (
    <CheatSheetLayout
      key="mermaidclass"
      title={mermaidClassDiagramContent.title}
      introduction={mermaidClassDiagramContent.introduction}
      prerequisites={mermaidClassDiagramContent.prerequisites}
      steps={mermaidClassDiagramContent.steps}
      gettingStarted={mermaidClassDiagramContent.gettingStarted}
    />
  );
}

export default MermaidClassDiagram;
