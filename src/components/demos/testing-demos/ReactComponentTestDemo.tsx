import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// Counter.js (simplified component under test)
export function createCounter() {
  let count = 0;
  return {
    getText: () => \`Count: \${count}\`,
    click: () => {
      count += 1;
    },
  };
}`;

const initialTest = `test("clicking increments the displayed count", () => {
  const counter = createCounter();
  counter.click();
  counter.click();
  expect(counter.getText()).toBe("Count: 1");
});`;

function ReactComponentTestDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          Testing a real React component usually means{" "}
          <code>render(&lt;Counter /&gt;)</code>, then{" "}
          <code>fireEvent.click(screen.getByRole("button"))</code>, then
          asserting on the updated text. <code>createCounter()</code> here
          is a framework-free stand-in: <code>.click()</code> simulates a
          user click and <code>.getText()</code> simulates reading the
          rendered output. The button was clicked twice, but the assertion
          still expects the count after only one click - fix it.
        </>
      }
      contextLabel="Counter.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({
        createCounter: () => {
          let count = 0;
          return {
            getText: () => `Count: ${count}`,
            click: () => {
              count += 1;
            },
          };
        },
      })}
      hint="counter.click() was called twice before the assertion."
    />
  );
}

export default ReactComponentTestDemo;
