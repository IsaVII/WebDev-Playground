import ScenarioQuiz, { type Scenario } from "../ScenarioQuiz";

const SCENARIOS: Scenario[] = [
  {
    id: "lazy",
    code: `Product p = sessionFactory.fromSession(
    session -> session.find(Product.class, 1L));
System.out.println(p.getCategory().getName());`,
    options: [
      "The session is already closed, so the lazy category cannot be loaded",
      "find cannot return a Product",
      "getName needs a @Transactional annotation",
    ],
    answer: "The session is already closed, so the lazy category cannot be loaded",
    explanation:
      "category is a lazy proxy that only knows its id. Reading getName() needs a SELECT, but the session that could run it is gone: LazyInitializationException. Read it inside the session, fetch it with join fetch, or copy what you need into a record first.",
  },
  {
    id: "constructor",
    code: `@Entity
class Product {
    @Id @GeneratedValue
    private Long id;
    private String name;

    Product(String name) { this.name = name; }
}`,
    options: [
      "No constructor without arguments - Hibernate cannot create objects when it reads rows",
      "@Id must be placed on a String field",
      "name needs a @Column annotation",
    ],
    answer: "No constructor without arguments - Hibernate cannot create objects when it reads rows",
    explanation:
      "To turn a row into an object Hibernate creates an empty instance and fills in the fields. Saving works, but the first load fails with \"No default constructor for entity\". Add a no-argument constructor - protected is enough, so your own code still has to use the real one.",
  },
  {
    id: "transaction",
    code: `try (Session session = sessionFactory.openSession()) {
    session.persist(new Product("Mouse", price));
}`,
    options: [
      "There is no transaction, so the write is never committed",
      "persist only works on a Session that was opened with try-with-resources",
      "The price must be a double",
    ],
    answer: "There is no transaction, so the write is never committed",
    explanation:
      "Writes belong inside a transaction: sessionFactory.inTransaction(...), or beginTransaction() followed by commit(). Without one the plain Session API does not even complain - the row is simply never saved (in a Spring or JPA container you may get a TransactionRequiredException instead).",
  },
  {
    id: "detached",
    code: `Product p = sessionFactory.fromSession(
    session -> session.find(Product.class, 1L));
p.setPrice(new BigDecimal("1.00"));
// ...and that is all`,
    options: [
      "p is detached, so Hibernate never notices the change",
      "setPrice must be called inside a try/catch",
      "find returns a copy that cannot be changed",
    ],
    answer: "p is detached, so Hibernate never notices the change",
    explanation:
      "Dirty checking only watches managed entities. The session that loaded p has closed, so nothing compares p with the row. Do the change inside the transaction, or merge p into a new session and commit.",
  },
  {
    id: "owning",
    code: `Category displays = new Category("Displays");
Product monitor = new Product("Monitor", price);
displays.getProducts().add(monitor);
session.persist(displays);
session.persist(monitor);`,
    options: [
      "Only the mirror side was set, so category_id is saved as NULL",
      "A product cannot be persisted after its category",
      "getProducts() returns an immutable list",
    ],
    answer: "Only the mirror side was set, so category_id is saved as NULL",
    explanation:
      "Product.category owns the foreign key; the list on Category (mappedBy) is ignored when writing. Set both sides together, for example in an addProduct helper that also calls product.setCategory(this).",
  },
  {
    id: "enum",
    code: `enum Status { NEW, PAID, SHIPPED }

@Entity
class Orders {
    @Id @GeneratedValue private Long id;
    private Status status;
}`,
    options: [
      "The enum is stored by position, so reordering the constants corrupts old rows",
      "Enums cannot be entity fields",
      "status must be a String",
    ],
    answer: "The enum is stored by position, so reordering the constants corrupts old rows",
    explanation:
      "Without @Enumerated the default is ORDINAL: NEW is 0, PAID is 1. Insert a constant before PAID and every stored 1 now means something else. Use @Enumerated(EnumType.STRING).",
  },
];

function SpotBugDemo() {
  return (
    <ScenarioQuiz
      intro="Each snippet has one classic Hibernate mistake. Pick what is wrong with it."
      scenarios={SCENARIOS}
    />
  );
}

export default SpotBugDemo;
