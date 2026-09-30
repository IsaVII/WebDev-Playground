import FixTheTestDemo from "./FixTheTestDemo";
import { createSpy } from "./testEngine";

const contextCode = `// mathLib.js
export const mathLib = {
  square(n) {
    return n * n;
  },
};

export function reportSquare(n) {
  return \`Result: \${mathLib.square(n)}\`;
}`;

const initialTest = `test("spies on square without changing its behavior", () => {
  const spy = createSpy(mathLib, "square");
  const output = reportSquare(4);
  expect(spy).toHaveBeenCalledWith(4);
  expect(output).toBe("Result: 15");
});`;

function SpiesDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          A spy wraps a real function instead of replacing it - it still
          calls through to the original implementation, but also records
          how it was called. That's different from a mock, which usually
          stands in for the real thing entirely.{" "}
          <code>createSpy(mathLib, "square")</code> lets this test confirm{" "}
          <code>square</code> was called with <code>4</code>, but the
          expected output below doesn't match what a genuine call to{" "}
          <code>square(4)</code> produces - fix it.
        </>
      }
      contextLabel="mathLib.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => {
        const mathLib = { square: (n) => n * n };
        return {
          mathLib,
          reportSquare: (n) => `Result: ${mathLib.square(n)}`,
          createSpy,
        };
      }}
      hint="A spy still calls the real square() - what is 4 * 4?"
    />
  );
}

export default SpiesDemo;
