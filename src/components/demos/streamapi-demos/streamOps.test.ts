import { finalResult, pipelineCode, stages } from "./streamOps";

describe("stages", () => {
  it("starts with the source and has one more stage per operation", () => {
    expect(stages([])).toEqual([["to be or not", "to be", "that is the question"]]);
    expect(stages(["flatMap", "distinct"])).toHaveLength(3);
  });

  it("flatMap turns each sentence into several words", () => {
    expect(stages(["flatMap"])[1]).toEqual([
      "to", "be", "or", "not", "to", "be", "that", "is", "the", "question",
    ]);
  });

  it("distinct keeps the first occurrence, in order", () => {
    expect(stages(["flatMap", "distinct"])[2]).toEqual([
      "to", "be", "or", "not", "that", "is", "the", "question",
    ]);
  });

  it("sorted is alphabetical and sortedByLength breaks length ties alphabetically", () => {
    expect(stages(["flatMap", "distinct", "sorted"])[3]).toEqual([
      "be", "is", "not", "or", "question", "that", "the", "to",
    ]);
    expect(stages(["flatMap", "distinct", "sortedByLength"])[3]).toEqual([
      "be", "is", "or", "to", "not", "the", "that", "question",
    ]);
  });

  it("order matters: limit before and after sorted give different answers", () => {
    const limitFirst = stages(["flatMap", "limit", "sorted"]).at(-1);
    const sortFirst = stages(["flatMap", "sorted", "limit"]).at(-1);
    expect(limitFirst).toEqual(["be", "not", "or", "to"]);
    expect(sortFirst).toEqual(["be", "be", "is", "not"]);
  });

  it("filter, map and skip behave like their Java counterparts", () => {
    expect(stages(["flatMap", "filter"]).at(-1)).toEqual([
      "not", "that", "the", "question",
    ]);
    expect(stages(["map"])[1]).toEqual(["TO BE OR NOT", "TO BE", "THAT IS THE QUESTION"]);
    expect(stages(["skip"])[1]).toEqual(["that is the question"]);
  });
});

describe("finalResult", () => {
  const ops = ["flatMap", "distinct", "sorted"] as const;

  it("collects to a list, counts, joins and groups", () => {
    expect(finalResult([...ops], "toList")).toBe(
      "[be, is, not, or, question, that, the, to]",
    );
    expect(finalResult([...ops], "count")).toBe("8");
    expect(finalResult([...ops], "joining")).toBe("be, is, not, or, question, that, the, to");
    expect(finalResult([...ops], "groupingBy")).toBe("{2=4, 3=2, 4=1, 8=1}");
  });
});

describe("pipelineCode", () => {
  it("writes one operation per line, ending in the terminal operation", () => {
    expect(pipelineCode(["filter", "distinct"], "count")).toBe(
      ["sentences.stream()", "    .filter(s -> s.length() > 2)", "    .distinct()", "    .count();"].join("\n"),
    );
  });
});
