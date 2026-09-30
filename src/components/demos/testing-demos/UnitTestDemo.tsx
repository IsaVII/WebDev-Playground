import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// math.js
export function average(numbers) {
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return total / numbers.length;
}`;

const initialTest = `test("average of [2, 4, 6] is correct", () => {
  expect(average([2, 4, 6])).toBe(3);
});`;

function UnitTestDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          A unit test checks one small piece of code - usually a single
          function - in complete isolation, with no dependencies to worry
          about. This test is failing because its expected value is wrong,
          not because <code>average()</code> is broken. Fix the assertion so
          it matches what the function actually - and correctly - returns.
        </>
      }
      contextLabel="math.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({ average: (numbers) => numbers.reduce((s, n) => s + n, 0) / numbers.length })}
      hint="(2 + 4 + 6) / 3 - what does that actually equal?"
    />
  );
}

export default UnitTestDemo;
