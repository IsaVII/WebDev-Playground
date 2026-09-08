import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{a as t,c as n,i as r}from"./TextReveal-BmuH47v_.js";import{o as i,w as a}from"./index-BZVcii-7.js";import{i as o}from"./codeExamples-CZXLLn1j.js";import{t as s}from"./LearningTopicLayout-BekbIxpA.js";var c=e(n(),1),l=r(),u={Blog:{model:`class Author  { Long id; String name }
class Post    { Long id; String title; String body }
class Tag     { Long id; String label }

Author 1 --- 0..* Post      (one author, many posts)
Post   *  --- *   Tag       (many-to-many)`,sql:`CREATE TABLE author (
  id   BIGINT PRIMARY KEY,
  name VARCHAR(120) NOT NULL
);

CREATE TABLE post (
  id        BIGINT PRIMARY KEY,
  title     VARCHAR(200) NOT NULL,
  body      TEXT,
  author_id BIGINT NOT NULL REFERENCES author(id)   -- FK on the "many" side
);

CREATE TABLE tag (
  id    BIGINT PRIMARY KEY,
  label VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE post_tag (                              -- join table for M:N
  post_id BIGINT NOT NULL REFERENCES post(id),
  tag_id  BIGINT NOT NULL REFERENCES tag(id),
  PRIMARY KEY (post_id, tag_id)
);`},Shop:{model:`class Customer { Long id; String email }
class Order    { Long id; Instant placedAt }
class LineItem { Long id; int qty; long unitPrice }

Customer 1 --- 0..* Order          (one customer, many orders)
Order    1 <>-- 1..* LineItem      (composition: line dies with order)`,sql:`CREATE TABLE customer (
  id    BIGINT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE "order" (
  id          BIGINT PRIMARY KEY,
  placed_at   TIMESTAMPTZ NOT NULL,
  customer_id BIGINT NOT NULL REFERENCES customer(id)
);

CREATE TABLE line_item (
  id         BIGINT PRIMARY KEY,
  qty        INT NOT NULL,
  unit_price BIGINT NOT NULL,
  order_id   BIGINT NOT NULL
             REFERENCES "order"(id) ON DELETE CASCADE  -- composition
);`},School:{model:`class Student { Long id; String name }
class Course  { Long id; String code }
class Enrollment { LocalDate enrolledOn; String grade }

Student * --- * Course   via Enrollment
                         (M:N with attributes -> its own table)`,sql:`CREATE TABLE student (
  id   BIGINT PRIMARY KEY,
  name VARCHAR(120) NOT NULL
);

CREATE TABLE course (
  id   BIGINT PRIMARY KEY,
  code VARCHAR(12) NOT NULL UNIQUE
);

CREATE TABLE enrollment (                 -- association WITH attributes
  student_id  BIGINT NOT NULL REFERENCES student(id),
  course_id   BIGINT NOT NULL REFERENCES course(id),
  enrolled_on DATE NOT NULL,
  grade       VARCHAR(2),
  PRIMARY KEY (student_id, course_id)
);`}};function d(){let[e,t]=(0,c.useState)(`Blog`),n=u[e];return(0,l.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,l.jsxs)(`p`,{className:`text-muted mb-4`,children:[`Pick a domain and compare its class model with the schema it becomes. The rules never change: a class is a table, a one-to-many puts a foreign key on the `,(0,l.jsx)(`em`,{children:`many`}),` side, and a many-to-many needs its own join table.`]}),(0,l.jsx)(`div`,{className:`flex flex-wrap gap-2 mb-4`,children:Object.keys(u).map(n=>(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(n),className:`px-3 py-1 rounded text-sm transition-colors ${e===n?`bg-accent text-white`:`bg-surface text-muted hover:text-heading`}`,children:n},n))}),(0,l.jsxs)(`div`,{className:`grid gap-4 md:grid-cols-2`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{className:`text-xs uppercase tracking-wide text-subtle mb-1`,children:`Class model`}),(0,l.jsx)(o,{children:n.model})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{className:`text-xs uppercase tracking-wide text-subtle mb-1`,children:`Generated schema`}),(0,l.jsx)(o,{children:n.sql})]})]})]})}var f={Association:{notation:`A ────── B`,meaning:`"knows about" - A holds a reference to B as a field`,partOutlivesWhole:`n/a - peers, not whole/part`,example:`class Order {
  private Customer customer; // Order references a Customer
}`},Aggregation:{notation:`A ◇────── B   (hollow diamond on A)`,meaning:`whole/part where the part CAN exist on its own`,partOutlivesWhole:`Yes - delete the Team, the Players still exist`,example:`class Team {
  private List<Player> players; // players can move to another team
}`},Composition:{notation:`A ◆────── B   (filled diamond on A)`,meaning:`whole/part where the part CANNOT exist without the whole`,partOutlivesWhole:`No - delete the Invoice, its LineItems go too`,example:`class Invoice {
  private final List<LineItem> lines = new ArrayList<>();
  // lines are created here and never shared out
}`},Inheritance:{notation:`A ──────▷ B   (hollow triangle pointing at B)`,meaning:`"is a" - A extends B and can be used wherever B is expected`,partOutlivesWhole:`n/a - not a whole/part relationship`,example:`class Manager extends Employee {
  private BigDecimal bonus;
}`},Dependency:{notation:`A ┄┄┄┄┄▸ B   (dashed arrow)`,meaning:`"uses" - B appears as a parameter or local, never stored`,partOutlivesWhole:`n/a - transient use only`,example:`class Checkout {
  BigDecimal total(PricingService pricing) { // used, not kept
    return pricing.quote(cart);
  }
}`}};function p(){let[e,t]=(0,c.useState)(`Composition`),n=f[e];return(0,l.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,l.jsxs)(`p`,{className:`text-muted mb-4`,children:[`The one question that separates the three "has a" links:`,(0,l.jsx)(`strong`,{children:` if the whole is deleted, does the part go with it?`})]}),(0,l.jsx)(`div`,{className:`flex flex-wrap gap-2 mb-4`,children:Object.keys(f).map(n=>(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(n),className:`px-3 py-1 rounded text-sm transition-colors ${e===n?`bg-accent text-white`:`bg-surface text-muted hover:text-heading`}`,children:n},n))}),(0,l.jsxs)(`div`,{className:`bg-surface rounded p-4 mb-4 border border-line space-y-2 text-sm`,children:[(0,l.jsx)(`p`,{className:`font-mono text-heading-alt`,children:n.notation}),(0,l.jsxs)(`p`,{className:`text-muted`,children:[(0,l.jsx)(`strong`,{children:`Means:`}),` `,n.meaning]}),(0,l.jsxs)(`p`,{className:`text-muted`,children:[(0,l.jsx)(`strong`,{children:`Part outlives the whole?`}),` `,n.partOutlivesWhole]})]}),(0,l.jsx)(o,{children:n.example})]})}var m=[`1`,`0..1`,`1..*`,`*`],h=e=>e===`1..*`||e===`*`;function g(e,t){let n=h(e),r=h(t);return!n&&!r?{type:`One-to-one`,mapping:`Foreign key on either table, with a UNIQUE constraint on it so the 1:1 is enforced. Often the two are just merged into one table.`,sql:`ALTER TABLE profile
  ADD COLUMN user_id BIGINT NOT NULL UNIQUE REFERENCES "user"(id);`}:n===r?{type:`Many-to-many`,mapping:`Neither side can hold a single foreign key. Create a join table with one FK to each side; its primary key is the pair.`,sql:`CREATE TABLE student_course (
  student_id BIGINT NOT NULL REFERENCES student(id),
  course_id  BIGINT NOT NULL REFERENCES course(id),
  PRIMARY KEY (student_id, course_id)
);`}:{type:`One-to-many`,mapping:`Foreign key goes on the MANY side, pointing back at the ONE side. No extra table.`,sql:`ALTER TABLE line_item
  ADD COLUMN order_id BIGINT NOT NULL REFERENCES "order"(id);`}}function _(e){switch(e){case`1`:return`──||──`;case`0..1`:return`──o|──`;case`1..*`:return`──|<──`;case`*`:return`──o<──`;default:return`──────`}}function v(){let[e,t]=(0,c.useState)(`1`),[n,r]=(0,c.useState)(`1..*`),i=g(e,n);return(0,l.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,l.jsx)(`p`,{className:`text-muted mb-4`,children:`Set the multiplicity on each end and watch it decide whether the relationship becomes a foreign key or a whole join table.`}),(0,l.jsxs)(`div`,{className:`flex items-center gap-3 mb-4 text-sm`,children:[(0,l.jsx)(`span`,{className:`font-mono text-heading-alt`,children:`A`}),(0,l.jsx)(`select`,{value:e,onChange:e=>t(e.target.value),className:`bg-surface border border-line rounded px-2 py-1`,children:m.map(e=>(0,l.jsx)(`option`,{children:e},e))}),(0,l.jsxs)(`span`,{className:`font-mono text-accent`,children:[_(e),_(n).split(``).reverse().join(``)]}),(0,l.jsx)(`select`,{value:n,onChange:e=>r(e.target.value),className:`bg-surface border border-line rounded px-2 py-1`,children:m.map(e=>(0,l.jsx)(`option`,{children:e},e))}),(0,l.jsx)(`span`,{className:`font-mono text-heading-alt`,children:`B`})]}),(0,l.jsxs)(`div`,{className:`bg-surface rounded p-4 mb-4 border border-line text-sm`,children:[(0,l.jsx)(`p`,{className:`text-accent font-semibold mb-1`,children:i.type}),(0,l.jsx)(`p`,{className:`text-muted`,children:i.mapping})]}),(0,l.jsx)(o,{children:i.sql})]})}var y=[{name:`Unnormalized`,note:`One row per order, with a repeating group of items stuffed into a single column. You can't query or constrain individual items.`,tables:[`order(order_id, customer, items)
------------------------------------------------
1001 | Ada Lovelace | "2x Keyboard @40, 1x Mouse @25"
1002 | Alan Turing  | "3x Cable @5"`]},{name:`1NF`,note:`Repeating group removed: one row per order line, every cell atomic. But now customer is duplicated on every line of the same order.`,tables:[`order_line(order_id, product, qty, unit_price, customer)
--------------------------------------------------------------
1001 | Keyboard | 2 | 40 | Ada Lovelace
1001 | Mouse    | 1 | 25 | Ada Lovelace
1002 | Cable    | 3 |  5 | Alan Turing`]},{name:`2NF`,note:`Key is (order_id, product). customer depends on order_id alone - a partial dependency - so it moves to its own order table.`,tables:[`order(order_id, customer)
---------------------------
1001 | Ada Lovelace
1002 | Alan Turing`,`order_line(order_id, product, qty, unit_price)
------------------------------------------------
1001 | Keyboard | 2 | 40
1001 | Mouse    | 1 | 25
1002 | Cable    | 3 |  5`]},{name:`3NF`,note:`unit_price is really a fact about the product, not this line (a transitive dependency via product). Move it to a product table; the line keeps only what's specific to it.`,tables:[`order(order_id, customer)`,`product(product, unit_price)
------------------------------
Keyboard | 40
Mouse    | 25
Cable    |  5`,`order_line(order_id, product, qty)
-----------------------------------
1001 | Keyboard | 2
1001 | Mouse    | 1
1002 | Cable    | 3`]}];function b(){let[e,t]=(0,c.useState)(0),n=y[e];return(0,l.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,l.jsx)(`p`,{className:`text-muted mb-4`,children:`Step one messy orders table through the normal forms. Each step fixes exactly one kind of duplication.`}),(0,l.jsx)(`div`,{className:`flex items-center gap-2 mb-4`,children:y.map((n,r)=>(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(r),className:`px-3 py-1 rounded text-sm transition-colors ${e===r?`bg-accent text-white`:`bg-surface text-muted hover:text-heading`}`,children:n.name},n.name))}),(0,l.jsxs)(`div`,{className:`flex items-center gap-2 mb-4`,children:[(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(e=>Math.max(0,e-1)),disabled:e===0,className:`bg-surface text-muted px-3 py-1 rounded text-sm hover:text-heading disabled:opacity-40`,children:`◂ Back`}),(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(e=>Math.min(y.length-1,e+1)),disabled:e===y.length-1,className:`bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40`,children:`Next ▸`})]}),(0,l.jsxs)(`p`,{className:`text-sm text-muted mb-3`,children:[(0,l.jsxs)(`strong`,{className:`text-heading-alt`,children:[n.name,`:`]}),` `,n.note]}),(0,l.jsx)(`div`,{className:`space-y-3`,children:n.tables.map((e,t)=>(0,l.jsx)(o,{children:e},t))})]})}var x={en:a,sv:i};function S(){let{i18n:e}=t(),n=x[e.language]||x.en,r={[n.practiceTopics[0].title]:p,[n.practiceTopics[1].title]:v,[n.practiceTopics[2].title]:b};return(0,l.jsx)(s,{title:n.title,introduction:n.introduction,coreConcepts:n.coreConcepts,sections:[{heading:n.mapping.heading,description:n.mapping.description,content:(0,l.jsx)(d,{})}],fullExample:n.fullExample,gettingStarted:n.gettingStarted,practiceTopics:n.practiceTopics,practiceDemos:r,quiz:n.quiz,topicKey:`diagrams`})}export{S as default};