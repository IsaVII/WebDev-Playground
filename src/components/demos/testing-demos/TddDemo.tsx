import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// numberUtils.js - written to satisfy the tests below (test-first)
export function isPositive(n) {
  return n > 0;
}`;

const initialTest = `test("negative numbers are not positive", () => {
  expect(isPositive(-3)).toBe(false);
});

test("zero is not positive", () => {
  expect(isPositive(0)).toBe(true);
});`;

function TddDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          In test-driven development you write a failing test first (red),
          write just enough code to pass it (green), then refactor. The
          second test here describes a boundary case - is zero positive? -
          but its expected value contradicts the very implementation these
          tests were written to drive. Decide what the correct behavior
          should be and fix the assertion so both tests turn green.
        </>
      }
      contextLabel="numberUtils.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({ isPositive: (n) => n > 0 })}
      hint="isPositive(n) returns n > 0 - is 0 > 0 true or false?"
    />
  );
}

export default TddDemo;
