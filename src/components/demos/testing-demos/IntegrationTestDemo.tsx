import FixTheTestDemo from "./FixTheTestDemo";

const contextCode = `// cart.js
export function addItem(cart, item) {
  return [...cart, item]; // returns a NEW array - doesn't mutate cart
}

export function getTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}`;

const initialTest = `test("adding two items totals their price", () => {
  let cart = [];
  cart = addItem(cart, { name: "Pen", price: 2 });
  addItem(cart, { name: "Notebook", price: 5 });
  expect(getTotal(cart)).toBe(7);
});`;

function IntegrationTestDemo() {
  return (
    <FixTheTestDemo
      description={
        <>
          An integration test exercises several units together - here,{" "}
          <code>addItem</code> and <code>getTotal</code> from{" "}
          <code>cart.js</code> - to check they cooperate correctly, not just
          that each works alone. This test is failing because the second{" "}
          <code>addItem</code> call's result is never captured, so that item
          never actually lands in <code>cart</code>.
        </>
      }
      contextLabel="cart.js"
      contextCode={contextCode}
      initialTest={initialTest}
      buildScope={() => ({
        addItem: (cart, item) => [...cart, item],
        getTotal: (cart) => cart.reduce((sum, item) => sum + item.price, 0),
      })}
      hint="addItem returns a new array instead of mutating cart in place - is that return value being used both times?"
    />
  );
}

export default IntegrationTestDemo;
