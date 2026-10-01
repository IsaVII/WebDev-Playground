import { parseInline, stripMarkdown } from "./markdown";

const text = (value: string) => ({ type: "text", value });
const code = (value: string) => ({ type: "code", value });

describe("parseInline", () => {
  it("leaves plain text alone", () => {
    expect(parseInline("just words - and a dash")).toEqual([
      text("just words - and a dash"),
    ]);
  });

  it("parses code, bold and italic", () => {
    expect(parseInline("use `new` and **press Q** or *else*")).toEqual([
      text("use "),
      code("new"),
      text(" and "),
      { type: "strong", children: [text("press Q")] },
      text(" or "),
      { type: "em", children: [text("else")] },
    ]);
  });

  it("does not interpret markup inside a code span", () => {
    expect(parseInline("`**bold** and *it*`")).toEqual([
      code("**bold** and *it*"),
    ]);
  });

  it("supports a longer backtick run to show backticks inside code", () => {
    expect(parseInline("wrap it: `` `backtick` ``.")).toEqual([
      text("wrap it: "),
      code("`backtick`"),
      text("."),
    ]);
    expect(parseInline("````" + " ```lang ... ``` " + "````")).toEqual([
      code("```lang ... ```"),
    ]);
  });

  it("nests code in bold and bold in italic", () => {
    expect(parseInline("**call `start()`**")).toEqual([
      { type: "strong", children: [text("call "), code("start()")] },
    ]);
    expect(parseInline("*very **loud** indeed*")).toEqual([
      {
        type: "em",
        children: [
          text("very "),
          { type: "strong", children: [text("loud")] },
          text(" indeed"),
        ],
      },
    ]);
  });

  it("keeps an unmatched backtick or asterisk as literal text", () => {
    expect(parseInline("it's a `tick")).toEqual([text("it's a `tick")]);
    expect(parseInline("COUNT(*) in WHERE")).toEqual([
      text("COUNT(*) in WHERE"),
    ]);
    expect(parseInline("1..*, * - many")).toEqual([text("1..*, * - many")]);
    expect(parseInline("2 * 3 * 4")).toEqual([text("2 * 3 * 4")]);
  });

  it("does not treat underscores as emphasis", () => {
    expect(parseInline("my_file_name and __init__")).toEqual([
      text("my_file_name and __init__"),
    ]);
  });

  it("honours backslash escapes", () => {
    expect(parseInline("\\*not italic\\* and \\`not code\\`")).toEqual([
      text("*not italic* and `not code`"),
    ]);
    expect(parseInline("C:\\temp")).toEqual([text("C:\\temp")]);
  });

  it("renders http(s), relative and anchor links", () => {
    expect(parseInline("see [the docs](https://example.com/a)")).toEqual([
      text("see "),
      {
        type: "link",
        href: "https://example.com/a",
        children: [text("the docs")],
      },
    ]);
    expect(parseInline("[home](/streams)")).toEqual([
      { type: "link", href: "/streams", children: [text("home")] },
    ]);
  });

  it("refuses unsafe or malformed link targets", () => {
    expect(parseInline("[x](javascript:alert(1))")).toEqual([
      text("[x](javascript:alert(1))"),
    ]);
    expect(parseInline("arr[i](x) and [text](url)")).toEqual([
      text("arr[i](x) and [text](url)"),
    ]);
  });
});

describe("stripMarkdown", () => {
  it("returns what a reader would see", () => {
    expect(
      stripMarkdown("Call `start()` - **not** *run()*, see [docs](https://a.b)"),
    ).toBe("Call start() - not run(), see docs");
  });

  it("is the identity for plain text", () => {
    expect(stripMarkdown("Plain & simple")).toBe("Plain & simple");
  });
});
