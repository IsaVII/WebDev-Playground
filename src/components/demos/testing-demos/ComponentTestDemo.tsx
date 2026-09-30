import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// Button.js (simplified component under test)
export function renderButton({ label, disabled = false }) {
  return {
    tag: "button",
    text: label,
    disabled,
  };
}`;

const initialTest = `test("renders a disabled button with its label", () => {
  const button = renderButton({ label: "Submit", disabled: true });
  expect(button.text).toBe("Submit");
  expect(button.disabled).toBe(false);
});`;

function ComponentTestDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          A component test renders a UI component and asserts on what it
          produces - its text, attributes, and behavior - without spinning
          up a whole app. In a real project you'd reach for React Testing
          Library's <code>render()</code> and <code>screen.getByRole()</code>
          ; <code>renderButton()</code> here is a dependency-free stand-in
          that returns a plain object describing what got rendered. The
          test passed <code>disabled: true</code> in, but asserts the wrong
          value back out - fix it.
        </>
      }
      contextLabel="Button.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({
        renderButton: ({ label, disabled = false }) => ({ tag: "button", text: label, disabled }),
      })}
      hint="The button was rendered with disabled: true - what should button.disabled equal?"
    />
  );
}

export default ComponentTestDemo;
