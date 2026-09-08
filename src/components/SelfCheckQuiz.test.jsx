import { fireEvent, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../test/test-utils";
import SelfCheckQuiz from "./SelfCheckQuiz";

const QUESTIONS = [
  {
    question: "What runs a lazy stream pipeline?",
    options: ["A filter", "A terminal operation", "The garbage collector"],
    answerIndex: 1,
    explanation: "Terminal operations trigger execution.",
  },
  {
    question: "Which interface does x -> x.isBlank() match?",
    options: ["Function", "Predicate", "Supplier"],
    answerIndex: 1,
    explanation: "One argument in, boolean out.",
  },
];

function pick(questionText, optionText) {
  const item = screen.getByText(questionText, { exact: false }).closest("li");
  fireEvent.click(within(item).getByLabelText(optionText, { exact: false }));
}

describe("SelfCheckQuiz", () => {
  it("stays disabled until every question is answered", () => {
    renderWithProviders(
      <SelfCheckQuiz questions={QUESTIONS} topicKey="streams" />,
    );
    const check = screen.getByRole("button", { name: /check answers/i });
    expect(check).toBeDisabled();

    pick(QUESTIONS[0].question, "A terminal operation");
    expect(check).toBeDisabled();
    pick(QUESTIONS[1].question, "Predicate");
    expect(check).toBeEnabled();
  });

  it("reveals per-question feedback and a score after checking", () => {
    renderWithProviders(
      <SelfCheckQuiz questions={QUESTIONS} topicKey="streams" />,
    );

    pick(QUESTIONS[0].question, "A filter"); // wrong
    pick(QUESTIONS[1].question, "Predicate"); // right
    fireEvent.click(screen.getByRole("button", { name: /check answers/i }));

    expect(screen.getByText("1 / 2 correct")).toBeInTheDocument();
    expect(
      screen.getByText(/Terminal operations trigger execution/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/One argument in, boolean out/),
    ).toBeInTheDocument();
  });

  it("shows completion and a reset when everything is correct", () => {
    renderWithProviders(
      <SelfCheckQuiz questions={QUESTIONS} topicKey="streams" />,
    );

    pick(QUESTIONS[0].question, "A terminal operation");
    pick(QUESTIONS[1].question, "Predicate");
    fireEvent.click(screen.getByRole("button", { name: /check answers/i }));

    expect(screen.getByText("2 / 2 correct")).toBeInTheDocument();
    expect(screen.getByText(/Self-Check complete/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(
      screen.getByRole("button", { name: /check answers/i }),
    ).toBeDisabled();
  });
});
