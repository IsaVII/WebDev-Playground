import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// userApi.js
export function fetchUserName(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(id === 1 ? "Ada" : "Unknown"), 50);
  });
}`;

const initialTest = `test("resolves the user's name", () => {
  const name = fetchUserName(1);
  expect(name).toBe("Ada");
});`;

function AsyncTestDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          <code>fetchUserName</code> returns a <em>Promise</em>, not a
          string - so <code>name</code> here is actually that pending
          Promise object, not <code>"Ada"</code>. This is one of the most
          common async-testing mistakes: forgetting to <code>await</code>{" "}
          the result. Make the test function <code>async</code> and{" "}
          <code>await</code> the call.
        </>
      }
      contextLabel="userApi.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({
        fetchUserName: (id) =>
          new Promise((resolve) => {
            setTimeout(() => resolve(id === 1 ? "Ada" : "Unknown"), 50);
          }),
      })}
      hint='Change () => { ... } to async () => { ... }, then write const name = await fetchUserName(1);'
    />
  );
}

export default AsyncTestDemo;
