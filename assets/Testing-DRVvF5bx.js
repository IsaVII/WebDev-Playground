import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{a as t,c as n,i as r}from"./TextReveal-BmuH47v_.js";import{T as i,u as a}from"./index-Bd2BiPaS.js";import{i as o}from"./codeExamples-CXNQ3VSk.js";import{t as s}from"./LearningTopicLayout-jENjC6Rj.js";var c=e(n(),1);function l(e){if(typeof e==`function`)return e.name?`[Function: ${e.name}]`:`[Function]`;try{return JSON.stringify(e)}catch{return String(e)}}function u(e,t){if(Object.is(e,t))return!0;if(typeof e!=typeof t)return!1;if(e===null||t===null)return e===t;if(typeof e!=`object`)return!1;let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(n=>u(e[n],t[n]))}function d(){return function(e){return{toBe(t){if(!Object.is(e,t))throw Error(`expected ${l(e)} to be ${l(t)}`)},toEqual(t){if(!u(e,t))throw Error(`expected ${l(e)} to equal ${l(t)}`)},toBeTruthy(){if(!e)throw Error(`expected ${l(e)} to be truthy`)},toBeFalsy(){if(e)throw Error(`expected ${l(e)} to be falsy`)},toContain(t){if(!e||!e.includes(t))throw Error(`expected ${l(e)} to contain ${l(t)}`)},toHaveLength(t){if(!e||e.length!==t)throw Error(`expected ${l(e)} to have length ${t}`)},toBeGreaterThan(t){if(!(e>t))throw Error(`expected ${l(e)} to be greater than ${t}`)},toThrow(){if(typeof e!=`function`)throw Error(`toThrow() needs a function to call, e.g. expect(() => fn()).toThrow()`);let t=!1;try{e()}catch{t=!0}if(!t)throw Error(`expected function to throw, but it did not`)},toHaveBeenCalled(){if(!e?.mock||e.mock.calls.length===0)throw Error(`expected mock function to have been called`)},toHaveBeenCalledTimes(t){let n=e?.mock?.calls.length??0;if(n!==t)throw Error(`expected mock to have been called ${t} time(s), but it was called ${n} time(s)`)},toHaveBeenCalledWith(...t){if(!(e?.mock?.calls??[]).some(e=>u(e,t)))throw Error(`expected mock to have been called with ${l(t)}`)}}}}function f(e){let t=e,n={calls:[]},r=(...e)=>(n.calls.push(e),t?t(...e):void 0);return r.mock=n,r.mockReturnValue=e=>(t=()=>e,r),r}function p(e,t){let n=f(e[t].bind(e));return e[t]=n,n}async function m(e,t={}){let n=[],r=(e,t)=>n.push({name:e,fn:t});r.skip=()=>{};let i=Object.keys(t),a=Object.values(t),o;try{o=Function(`test`,`it`,`expect`,...i,`"use strict";\n${e}`)}catch(e){return{syntaxError:e.message,results:[]}}try{o(r,r,d(),...a)}catch(e){return{syntaxError:e.message,results:[]}}if(n.length===0)return{syntaxError:`No test(...) calls found - write at least one test.`,results:[]};let s=[];for(let{name:e,fn:t}of n)try{await t(),s.push({name:e,passed:!0})}catch(t){s.push({name:e,passed:!1,error:t.message})}return{syntaxError:null,results:s}}var h=r();function g({description:e,contextLabel:t=`Code under test`,contextCode:n,initialTest:r,buildScope:i,hint:a}){let[s,l]=(0,c.useState)(r),[u,d]=(0,c.useState)(null),[f,p]=(0,c.useState)(!1),[g,_]=(0,c.useState)(!1),v=async()=>{p(!0);let e=await m(s,i());d(e),p(!1)},y=()=>{l(r),d(null)},b=e=>{if(e.key===`Tab`){e.preventDefault();let{selectionStart:t,selectionEnd:n,value:r}=e.target;l(`${r.slice(0,t)}  ${r.slice(n)}`),requestAnimationFrame(()=>{e.target.selectionStart=e.target.selectionEnd=t+2})}},x=u?.results.filter(e=>e.passed).length??0,S=u?.results.length??0,C=S>0&&x===S;return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsx)(`p`,{className:`text-muted leading-relaxed mb-4`,children:e}),n&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`h5`,{className:`text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide`,children:t}),(0,h.jsx)(o,{children:n})]}),(0,h.jsx)(`h5`,{className:`text-heading-alt font-semibold mt-4 mb-2 text-sm uppercase tracking-wide`,children:`test.js - edit me`}),(0,h.jsx)(`textarea`,{value:s,onChange:e=>l(e.target.value),onKeyDown:b,spellCheck:!1,rows:s.split(`
`).length,className:`w-full bg-surface border border-line rounded p-4 text-sm font-mono text-heading-alt leading-relaxed resize-y focus:outline-none focus:border-accent`}),(0,h.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 mt-4`,children:[(0,h.jsx)(`button`,{type:`button`,onClick:v,disabled:f,className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50`,children:f?`Running...`:`Run tests`}),(0,h.jsx)(`button`,{type:`button`,onClick:y,className:`bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors`,children:`Reset`}),a&&(0,h.jsx)(`button`,{type:`button`,onClick:()=>_(e=>!e),className:`text-sm font-medium text-accent hover:opacity-80 transition-opacity ml-auto`,children:g?`Hide hint`:`Show hint`})]}),g&&a&&(0,h.jsx)(`p`,{className:`text-sm text-muted mt-3 pl-3 border-l-2 border-accent`,children:a}),u&&(0,h.jsx)(`div`,{className:`bg-surface rounded p-4 border border-line mt-4`,children:u.syntaxError?(0,h.jsxs)(`p`,{className:`text-sm font-mono text-red-600 dark:text-red-400`,children:[`✗ `,u.syntaxError]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(`p`,{className:`text-sm font-semibold mb-2 ${C?`text-green-600 dark:text-green-400`:`text-red-600 dark:text-red-400`}`,children:[x,`/`,S,` passing`,C?` - nice work!`:``]}),(0,h.jsx)(`ul`,{className:`text-sm font-mono space-y-1`,children:u.results.map((e,t)=>(0,h.jsxs)(`li`,{className:e.passed?`text-green-600 dark:text-green-400`:`text-red-600 dark:text-red-400`,children:[e.passed?`✓`:`✗`,` `,e.name,!e.passed&&e.error&&(0,h.jsx)(`div`,{className:`text-subtle pl-4`,children:e.error})]},t))})]})})]})}var _=`// api.js - a tiny in-memory request handler, standing in for an Express route
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
}`,v=`test("GET /users/1 returns the user", () => {
  const response = handleRequest("GET", "/users/1");
  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Ada Lovelace");
});`;function y(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`Testing an API endpoint means calling it the way a client would - here, `,(0,h.jsx)(`code`,{children:`handleRequest(method, path)`}),` stands in for a library like supertest hitting a real Express route - and asserting on both the status code and the response body shape. The status check is right, but the expected name in the body doesn't match what's actually stored for user 1 - fix it.`]}),contextLabel:`api.js`,contextCode:_,initialTest:v,buildScope:()=>{let e={1:{id:1,name:`Ada`}};return{handleRequest:(t,n)=>{let r=n.match(/^\/users\/(\d+)$/);if(t===`GET`&&r){let t=e[r[1]];return t?{status:200,body:t}:{status:404,body:{error:`Not found`}}}return{status:404,body:{error:`Not found`}}}}},hint:`Look at the users object in api.js - what is stored for id 1?`})}var b=`// userApi.js
export function fetchUserName(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(id === 1 ? "Ada" : "Unknown"), 50);
  });
}`,x=`test("resolves the user's name", () => {
  const name = fetchUserName(1);
  expect(name).toBe("Ada");
});`;function S(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`code`,{children:`fetchUserName`}),` returns a `,(0,h.jsx)(`em`,{children:`Promise`}),`, not a string - so `,(0,h.jsx)(`code`,{children:`name`}),` here is actually that pending Promise object, not `,(0,h.jsx)(`code`,{children:`"Ada"`}),`. This is one of the most common async-testing mistakes: forgetting to `,(0,h.jsx)(`code`,{children:`await`}),` `,`the result. Make the test function `,(0,h.jsx)(`code`,{children:`async`}),` and`,` `,(0,h.jsx)(`code`,{children:`await`}),` the call.`]}),contextLabel:`userApi.js`,contextCode:b,initialTest:x,buildScope:()=>({fetchUserName:e=>new Promise(t=>{setTimeout(()=>t(e===1?`Ada`:`Unknown`),50)})}),hint:`Change () => { ... } to async () => { ... }, then write const name = await fetchUserName(1);`})}var C=`// Button.js (simplified component under test)
export function renderButton({ label, disabled = false }) {
  return {
    tag: "button",
    text: label,
    disabled,
  };
}`,w=`test("renders a disabled button with its label", () => {
  const button = renderButton({ label: "Submit", disabled: true });
  expect(button.text).toBe("Submit");
  expect(button.disabled).toBe(false);
});`;function T(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`A component test renders a UI component and asserts on what it produces - its text, attributes, and behavior - without spinning up a whole app. In a real project you'd reach for React Testing Library's `,(0,h.jsx)(`code`,{children:`render()`}),` and `,(0,h.jsx)(`code`,{children:`screen.getByRole()`}),`; `,(0,h.jsx)(`code`,{children:`renderButton()`}),` here is a dependency-free stand-in that returns a plain object describing what got rendered. The test passed `,(0,h.jsx)(`code`,{children:`disabled: true`}),` in, but asserts the wrong value back out - fix it.`]}),contextLabel:`Button.js`,contextCode:C,initialTest:w,buildScope:()=>({renderButton:({label:e,disabled:t=!1})=>({tag:`button`,text:e,disabled:t})}),hint:`The button was rendered with disabled: true - what should button.disabled equal?`})}var E=`// userFixture.js - a known-good sample record, shared across tests
export const userFixture = {
  id: 1,
  name: "Ada Lovelace",
  roles: ["admin"],
};

// permissions.js
export function isAdmin(user) {
  return user.roles.includes("admin");
}`,D=`test("fixture user is an admin", () => {
  const user = { id: 1, name: "Ada Lovelace", roles: [] };
  expect(isAdmin(user)).toBe(true);
});`;function O(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`A fixture is reusable, known-good sample data you set up once and share across tests, instead of re-typing (and risking) slightly different setup data every time. This test ignored the ready-made`,` `,(0,h.jsx)(`code`,{children:`userFixture`}),` and hand-rolled its own version - minus the `,(0,h.jsx)(`code`,{children:`"admin"`}),` role. Use the fixture instead of the hand-rolled object.`]}),contextLabel:`userFixture.js`,contextCode:E,initialTest:D,buildScope:()=>({userFixture:{id:1,name:`Ada Lovelace`,roles:[`admin`]},isAdmin:e=>e.roles.includes(`admin`)}),hint:`Replace the object literal with userFixture itself.`})}var k=`// cart.js
export function addItem(cart, item) {
  return [...cart, item]; // returns a NEW array - doesn't mutate cart
}

export function getTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}`,A=`test("adding two items totals their price", () => {
  let cart = [];
  cart = addItem(cart, { name: "Pen", price: 2 });
  addItem(cart, { name: "Notebook", price: 5 });
  expect(getTotal(cart)).toBe(7);
});`;function j(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`An integration test exercises several units together - here,`,` `,(0,h.jsx)(`code`,{children:`addItem`}),` and `,(0,h.jsx)(`code`,{children:`getTotal`}),` from`,` `,(0,h.jsx)(`code`,{children:`cart.js`}),` - to check they cooperate correctly, not just that each works alone. This test is failing because the second`,` `,(0,h.jsx)(`code`,{children:`addItem`}),` call's result is never captured, so that item never actually lands in `,(0,h.jsx)(`code`,{children:`cart`}),`.`]}),contextLabel:`cart.js`,contextCode:k,initialTest:A,buildScope:()=>({addItem:(e,t)=>[...e,t],getTotal:e=>e.reduce((e,t)=>e+t.price,0)}),hint:`addItem returns a new array instead of mutating cart in place - is that return value being used both times?`})}var M=`// notifier.js
export function notifyUser(logger, message) {
  logger(\`Notifying: \${message}\`);
  return true;
}`,N=`test("calls the logger with the formatted message", () => {
  const logger = createMock();
  notifyUser(logger, "Order shipped");
  expect(logger).toHaveBeenCalledWith("Notifying: Order shipped!");
});`;function P(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`Mocking replaces a real dependency - here, a logging function you don't actually want to run during a test - with a fake that just records how it was called. `,(0,h.jsx)(`code`,{children:`createMock()`}),` gives you a function with a `,(0,h.jsx)(`code`,{children:`.mock.calls`}),` log, so`,` `,(0,h.jsx)(`code`,{children:`toHaveBeenCalledWith(...)`}),` can check the exact arguments it received. This test's expected string doesn't quite match what `,(0,h.jsx)(`code`,{children:`notifyUser`}),` actually passes - find the typo.`]}),contextLabel:`notifier.js`,contextCode:M,initialTest:N,buildScope:()=>({notifyUser:(e,t)=>(e(`Notifying: ${t}`),!0),createMock:f}),hint:`Compare the string in the test to the template string inside notifyUser, character by character.`})}var F=`// Counter.js (simplified component under test)
export function createCounter() {
  let count = 0;
  return {
    getText: () => \`Count: \${count}\`,
    click: () => {
      count += 1;
    },
  };
}`,I=`test("clicking increments the displayed count", () => {
  const counter = createCounter();
  counter.click();
  counter.click();
  expect(counter.getText()).toBe("Count: 1");
});`;function L(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`Testing a real React component usually means`,` `,(0,h.jsx)(`code`,{children:`render(<Counter />)`}),`, then`,` `,(0,h.jsx)(`code`,{children:`fireEvent.click(screen.getByRole("button"))`}),`, then asserting on the updated text. `,(0,h.jsx)(`code`,{children:`createCounter()`}),` here is a framework-free stand-in: `,(0,h.jsx)(`code`,{children:`.click()`}),` simulates a user click and `,(0,h.jsx)(`code`,{children:`.getText()`}),` simulates reading the rendered output. The button was clicked twice, but the assertion still expects the count after only one click - fix it.`]}),contextLabel:`Counter.js`,contextCode:F,initialTest:I,buildScope:()=>({createCounter:()=>{let e=0;return{getText:()=>`Count: ${e}`,click:()=>{e+=1}}}}),hint:`counter.click() was called twice before the assertion.`})}var R=`// mathLib.js
export const mathLib = {
  square(n) {
    return n * n;
  },
};

export function reportSquare(n) {
  return \`Result: \${mathLib.square(n)}\`;
}`,z=`test("spies on square without changing its behavior", () => {
  const spy = createSpy(mathLib, "square");
  const output = reportSquare(4);
  expect(spy).toHaveBeenCalledWith(4);
  expect(output).toBe("Result: 15");
});`;function B(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`A spy wraps a real function instead of replacing it - it still calls through to the original implementation, but also records how it was called. That's different from a mock, which usually stands in for the real thing entirely.`,` `,(0,h.jsx)(`code`,{children:`createSpy(mathLib, "square")`}),` lets this test confirm`,` `,(0,h.jsx)(`code`,{children:`square`}),` was called with `,(0,h.jsx)(`code`,{children:`4`}),`, but the expected output below doesn't match what a genuine call to`,` `,(0,h.jsx)(`code`,{children:`square(4)`}),` produces - fix it.`]}),contextLabel:`mathLib.js`,contextCode:R,initialTest:z,buildScope:()=>{let e={square:e=>e*e};return{mathLib:e,reportSquare:t=>`Result: ${e.square(t)}`,createSpy:p}},hint:`A spy still calls the real square() - what is 4 * 4?`})}var V=`// numberUtils.js - written to satisfy the tests below (test-first)
export function isPositive(n) {
  return n > 0;
}`,H=`test("negative numbers are not positive", () => {
  expect(isPositive(-3)).toBe(false);
});

test("zero is not positive", () => {
  expect(isPositive(0)).toBe(true);
});`;function U(){return(0,h.jsx)(g,{description:(0,h.jsx)(h.Fragment,{children:`In test-driven development you write a failing test first (red), write just enough code to pass it (green), then refactor. The second test here describes a boundary case - is zero positive? - but its expected value contradicts the very implementation these tests were written to drive. Decide what the correct behavior should be and fix the assertion so both tests turn green.`}),contextLabel:`numberUtils.js`,contextCode:V,initialTest:H,buildScope:()=>({isPositive:e=>e>0}),hint:`isPositive(n) returns n > 0 - is 0 > 0 true or false?`})}var W=[{name:`End-to-End`,width:`w-1/3`,speed:`Slowest`,volume:`Fewest`,description:`Drives the whole app through a real browser, the way a user would - clicking through actual screens. Very realistic, but slow and the first to break when unrelated UI changes.`},{name:`Integration`,width:`w-1/2`,speed:`Slow`,volume:`Few`,description:`Checks that several real units - a couple of functions, a module and its dependency - work correctly together, without going through the whole app.`},{name:`Component`,width:`w-3/4`,speed:`Fast`,volume:`Some`,description:`Renders one UI component in isolation and asserts on what it shows or does, without a full page around it.`},{name:`Unit`,width:`w-full`,speed:`Fastest`,volume:`Most`,description:`Tests one function or method in complete isolation from everything else. Cheap to write, quick to run, and the first line of defense - so most of your tests should live here.`}];function G(){let[e,t]=(0,c.useState)(W.length-1),n=W[e];return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsx)(`p`,{className:`text-muted mb-4`,children:`The testing pyramid is a rule of thumb for how many tests of each kind to write: lots of fast, cheap unit tests at the base, fewer slower tests as you climb toward the whole app. Click a layer.`}),(0,h.jsx)(`div`,{className:`flex flex-col items-center gap-1 mb-6`,children:W.map((n,r)=>(0,h.jsx)(`button`,{type:`button`,onClick:()=>t(r),"aria-pressed":e===r,className:`${n.width} text-sm font-semibold py-3 rounded border transition-colors ${e===r?`bg-accent border-accent text-white`:`bg-surface border-line text-heading hover:border-accent`}`,children:n.name},n.name))}),(0,h.jsxs)(`div`,{className:`bg-surface rounded p-4 border border-line`,children:[(0,h.jsxs)(`div`,{className:`flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2`,children:[(0,h.jsxs)(`h5`,{className:`text-heading-alt font-semibold`,children:[n.name,` tests`]}),(0,h.jsxs)(`span`,{className:`text-xs text-subtle`,children:[`Speed: `,n.speed]}),(0,h.jsxs)(`span`,{className:`text-xs text-subtle`,children:[`How many: `,n.volume]})]}),(0,h.jsx)(`p`,{className:`text-muted leading-relaxed`,children:n.description})]})]})}var K=`// math.js
export function average(numbers) {
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return total / numbers.length;
}`,q=`test("average of [2, 4, 6] is correct", () => {
  expect(average([2, 4, 6])).toBe(3);
});`;function J(){return(0,h.jsx)(g,{description:(0,h.jsxs)(h.Fragment,{children:[`A unit test checks one small piece of code - usually a single function - in complete isolation, with no dependencies to worry about. This test is failing because its expected value is wrong, not because `,(0,h.jsx)(`code`,{children:`average()`}),` is broken. Fix the assertion so it matches what the function actually - and correctly - returns.`]}),contextLabel:`math.js`,contextCode:K,initialTest:q,buildScope:()=>({average:e=>e.reduce((e,t)=>e+t,0)/e.length}),hint:`(2 + 4 + 6) / 3 - what does that actually equal?`})}var Y={en:i,sv:a};function X(){let{i18n:e}=t(),n=Y[e.language]||Y.en,r={[n.practiceTopics[0].title]:J,[n.practiceTopics[1].title]:j,[n.practiceTopics[2].title]:T,[n.practiceTopics[3].title]:P,[n.practiceTopics[4].title]:B,[n.practiceTopics[5].title]:O,[n.practiceTopics[6].title]:U,[n.practiceTopics[7].title]:S,[n.practiceTopics[8].title]:L,[n.practiceTopics[9].title]:y};return(0,h.jsx)(s,{title:n.title,introduction:n.introduction,coreConcepts:n.coreConcepts,sections:[{heading:n.pyramid.heading,description:n.pyramid.description,content:(0,h.jsx)(G,{})}],fullExample:n.fullExample,gettingStarted:n.gettingStarted,practiceTopics:n.practiceTopics,practiceDemos:r,practiceTopicsIntro:`Click a topic to open a small failing test - fix it and hit "Run tests".`,topicKey:`testing`})}export{X as default};