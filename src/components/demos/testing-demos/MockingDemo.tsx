import FixTheTestDemo from "./FixTheTestDemo";
import { createMock } from "./testEngine";

const contextCode = `// notifier.js
export function notifyUser(logger, message) {
  logger(\`Notifying: \${message}\`);
  return true;
}`;

const initialTest = `test("calls the logger with the formatted message", () => {
  const logger = createMock();
  notifyUser(logger, "Order shipped");
  expect(logger).toHaveBeenCalledWith("Notifying: Order shipped!");
});`;

function MockingDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          Mocking replaces a real dependency - here, a logging function you
          don't actually want to run during a test - with a fake that just
          records how it was called. <code>createMock()</code> gives you a
          function with a <code>.mock.calls</code> log, so{" "}
          <code>toHaveBeenCalledWith(...)</code> can check the exact
          arguments it received. This test's expected string doesn't quite
          match what <code>notifyUser</code> actually passes - find the typo.
        </>
      }
      contextLabel="notifier.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({
        notifyUser: (logger, message) => {
          logger(`Notifying: ${message}`);
          return true;
        },
        createMock,
      })}
      hint="Compare the string in the test to the template string inside notifyUser, character by character."
    />
  );
}

export default MockingDemo;
