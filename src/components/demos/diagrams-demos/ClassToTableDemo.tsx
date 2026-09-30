import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Three small domains, each with a class-model sketch and the SQL it maps
// to. The point is the mechanical rules: class -> table, field -> column,
// one-to-many -> FK on the many side, many-to-many -> join table.
const DOMAINS = {
  Blog: {
    model: `class Author  { Long id; String name }
class Post    { Long id; String title; String body }
class Tag     { Long id; String label }

Author 1 --- 0..* Post      (one author, many posts)
Post   *  --- *   Tag       (many-to-many)`,
    sql: `CREATE TABLE author (
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
);`,
  },
  Shop: {
    model: `class Customer { Long id; String email }
class Order    { Long id; Instant placedAt }
class LineItem { Long id; int qty; long unitPrice }

Customer 1 --- 0..* Order          (one customer, many orders)
Order    1 <>-- 1..* LineItem      (composition: line dies with order)`,
    sql: `CREATE TABLE customer (
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
);`,
  },
  School: {
    model: `class Student { Long id; String name }
class Course  { Long id; String code }
class Enrollment { LocalDate enrolledOn; String grade }

Student * --- * Course   via Enrollment
                         (M:N with attributes -> its own table)`,
    sql: `CREATE TABLE student (
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
);`,
  },
};

function ClassToTableDemo() {
  const [domain, setDomain] = useState("Blog");
  const active = DOMAINS[domain];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Pick a domain and compare its class model with the schema it becomes.
        The rules never change: a class is a table, a one-to-many puts a
        foreign key on the <em>many</em> side, and a many-to-many needs its
        own join table.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(DOMAINS).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setDomain(name)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              domain === name
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-heading"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-subtle mb-1">
            Class model
          </p>
          <CodeBlock>{active.model}</CodeBlock>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-subtle mb-1">
            Generated schema
          </p>
          <CodeBlock>{active.sql}</CodeBlock>
        </div>
      </div>
    </div>
  );
}

export default ClassToTableDemo;
