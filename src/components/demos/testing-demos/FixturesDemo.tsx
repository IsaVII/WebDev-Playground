import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// userFixture.js - a known-good sample record, shared across tests
export const userFixture = {
  id: 1,
  name: "Ada Lovelace",
  roles: ["admin"],
};

// permissions.js
export function isAdmin(user) {
  return user.roles.includes("admin");
}`;

const initialTest = `test("fixture user is an admin", () => {
  const user = { id: 1, name: "Ada Lovelace", roles: [] };
  expect(isAdmin(user)).toBe(true);
});`;

function FixturesDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          A fixture is reusable, known-good sample data you set up once and
          share across tests, instead of re-typing (and risking) slightly
          different setup data every time. This test ignored the ready-made{" "}
          <code>userFixture</code> and hand-rolled its own version - minus
          the <code>"admin"</code> role. Use the fixture instead of the
          hand-rolled object.
        </>
      }
      contextLabel="userFixture.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({
        userFixture: { id: 1, name: "Ada Lovelace", roles: ["admin"] },
        isAdmin: (user) => user.roles.includes("admin"),
      })}
      hint="Replace the object literal with userFixture itself."
    />
  );
}

export default FixturesDemo;
