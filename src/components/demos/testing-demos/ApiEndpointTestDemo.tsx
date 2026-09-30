import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// api.js - a tiny in-memory request handler, standing in for an Express route
const users = { 1: { id: 1, name: "Ada" } };

export function handleRequest(method, path) {
  const match = path.match(/^\\/users\\/(\\d+)$/);
  if (method === "GET" && match) {
    const user = users[match[1]];
    return user
      ? { status: 200, body: user }
      : { status: 404, body: { error: "Not found" } };
  }
  return { status: 404, body: { error: "Not found" } };
}`;

const initialTest = `test("GET /users/1 returns the user", () => {
  const response = handleRequest("GET", "/users/1");
  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Ada Lovelace");
});`;

function ApiEndpointTestDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          Testing an API endpoint means calling it the way a client would -
          here, <code>handleRequest(method, path)</code> stands in for a
          library like supertest hitting a real Express route - and
          asserting on both the status code and the response body shape.
          The status check is right, but the expected name in the body
          doesn't match what's actually stored for user 1 - fix it.
        </>
      }
      contextLabel="api.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => {
        const users = { 1: { id: 1, name: "Ada" } };
        return {
          handleRequest: (method, path) => {
            const match = path.match(/^\/users\/(\d+)$/);
            if (method === "GET" && match) {
              const user = users[match[1]];
              return user ? { status: 200, body: user } : { status: 404, body: { error: "Not found" } };
            }
            return { status: 404, body: { error: "Not found" } };
          },
        };
      }}
      hint='Look at the users object in api.js - what is stored for id 1?'
    />
  );
}

export default ApiEndpointTestDemo;
