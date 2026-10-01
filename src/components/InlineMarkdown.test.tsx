import { render, screen } from "@testing-library/react";
import InlineMarkdown from "./InlineMarkdown";

describe("InlineMarkdown", () => {
  it("renders code, bold and italic as elements", () => {
    const { container } = render(
      <p>
        <InlineMarkdown>{"Call `start()`, **not** *run()*"}</InlineMarkdown>
      </p>,
    );
    expect(container.querySelector("code")?.textContent).toBe("start()");
    expect(container.querySelector("strong")?.textContent).toBe("not");
    expect(container.querySelector("em")?.textContent).toBe("run()");
    expect(container).toHaveTextContent("Call start(), not run()");
  });

  it("renders links, opening external ones in a new tab", () => {
    render(
      <p>
        <InlineMarkdown>{"See [the docs](https://example.com)."}</InlineMarkdown>
      </p>,
    );
    const link = screen.getByRole("link", { name: "the docs" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("shows just the link text when links are not allowed", () => {
    render(
      <p>
        <InlineMarkdown allowLinks={false}>
          {"See [the docs](https://example.com)."}
        </InlineMarkdown>
      </p>,
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("See the docs.")).toBeInTheDocument();
  });

  it("renders text with no markup unchanged", () => {
    render(
      <p>
        <InlineMarkdown>{"Nothing special here"}</InlineMarkdown>
      </p>,
    );
    expect(screen.getByText("Nothing special here")).toBeInTheDocument();
  });
});
