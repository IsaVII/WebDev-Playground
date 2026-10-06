import ScenarioQuiz, { type Scenario } from "../ScenarioQuiz";

const SCENARIOS: Scenario[] = [
  {
    id: "cache",
    context: "One session, one transaction; the product with id 1 exists",
    code: `Product a = session.find(Product.class, 1L);
Product b = session.find(Product.class, 1L);
System.out.println(a == b);`,
    options: [
      "2 SELECTs, prints false",
      "1 SELECT, prints true",
      "2 SELECTs, prints true",
    ],
    answer: "1 SELECT, prints true",
    explanation:
      "The session keeps every entity it has loaded in its first-level cache, keyed by id. The second find is answered from memory with the very same object, so no SQL is sent.",
  },
  {
    id: "samevalue",
    context: "The product with id 1 exists, price 899.00",
    code: `sessionFactory.inTransaction(session -> {
    Product p = session.find(Product.class, 1L);
    p.setPrice(p.getPrice());
});`,
    options: ["1 SELECT and 1 UPDATE", "1 SELECT and no UPDATE", "No SQL at all"],
    answer: "1 SELECT and no UPDATE",
    explanation:
      "find has to SELECT the row. At commit, dirty checking compares the product with the values it loaded; nothing differs, so there is nothing to write. An UPDATE is only sent when a value really changed.",
  },
  {
    id: "identity",
    context: "Product uses GenerationType.IDENTITY and a transaction is open",
    code: `session.persist(product);
System.out.println(product.getId());   // when was the INSERT sent?`,
    options: [
      "At commit - getId() prints null",
      "Right away - the id comes from the database, so getId() is set",
      "Only when flush() is called",
    ],
    answer: "Right away - the id comes from the database, so getId() is set",
    explanation:
      "An identity column hands out the id only when the row is inserted, so Hibernate cannot postpone the INSERT. With a SEQUENCE it could fetch the id first and delay the INSERT until flush, which also allows batching.",
  },
  {
    id: "remove",
    context: "The product with id 1 exists and has no collections or cascades",
    code: `sessionFactory.inTransaction(session -> {
    Product p = session.find(Product.class, 1L);
    session.remove(p);
});`,
    options: [
      "1 statement: only the DELETE",
      "2 statements: a SELECT, then a DELETE at commit",
      "2 statements: a DELETE at remove, then a SELECT at commit",
    ],
    answer: "2 statements: a SELECT, then a DELETE at commit",
    explanation:
      "find loads the entity with a SELECT. remove only marks it as removed; the DELETE is queued and sent when the transaction commits.",
  },
  {
    id: "reference",
    context: "The product with id 1 exists",
    code: `Product ref = session.getReference(Product.class, 1L);   // (1)
String name = ref.getName();                              // (2)`,
    options: [
      "At (1), when the proxy is created",
      "At (2), when a field is first read",
      "Never - a proxy has no data of its own",
    ],
    answer: "At (2), when a field is first read",
    explanation:
      "getReference returns a lazy proxy that knows only the id, which is handy for setting a foreign key without loading the row. The SELECT runs on the first access to real data, and fails with LazyInitializationException if the session is closed by then.",
  },
  {
    id: "nplus1",
    context: "3 categories, each with products; the products collection is LAZY",
    code: `List<Category> all = session
    .createSelectionQuery("from Category", Category.class)
    .getResultList();
for (Category c : all) {
    System.out.println(c.getProducts().size());
}`,
    options: [
      "1 SELECT",
      "4 SELECTs: one for the categories, one per category",
      "3 SELECTs, one per category",
    ],
    answer: "4 SELECTs: one for the categories, one per category",
    explanation:
      "The query loads the categories; every getProducts() then touches a lazy collection and runs its own SELECT: 1 + N. With join fetch it is a single statement.",
  },
];

function PredictSqlDemo() {
  return (
    <ScenarioQuiz
      intro="Predict how many statements Hibernate sends, and when, given the situation above each snippet."
      scenarios={SCENARIOS}
    />
  );
}

export default PredictSqlDemo;
