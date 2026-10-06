import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.LazyInitializationException;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateDemo {

    public static void main(String[] args) {
        SessionFactory sessionFactory = new Configuration()
                .setProperty("jakarta.persistence.jdbc.url", "jdbc:postgresql://localhost:5432/shop")
                .setProperty("jakarta.persistence.jdbc.user", System.getenv("DB_USER"))
                .setProperty("jakarta.persistence.jdbc.password", System.getenv("DB_PASSWORD"))
                .setProperty("hibernate.hbm2ddl.auto", "update")
                .setProperty("hibernate.show_sql", "true")
                .addAnnotatedClass(Category.class)
                .addAnnotatedClass(Product.class)
                .buildSessionFactory();

        // persist: the category and, through the cascade, its products are inserted
        List<Product> saved = sessionFactory.fromTransaction(session -> {
            Category peripherals = new Category("Peripherals");
            peripherals.addProduct(new Product("Keyboard", new BigDecimal("899.00")));
            peripherals.addProduct(new Product("Mouse", new BigDecimal("299.00")));
            Category displays = new Category("Displays");
            displays.addProduct(new Product("Monitor", new BigDecimal("2499.00")));
            session.persist(peripherals);
            session.persist(displays);
            return peripherals.getProducts();
        });
        long keyboardId = saved.get(0).getId();
        long mouseId = saved.get(1).getId();

        // find + dirty checking: no save() call, Hibernate sends the UPDATE at commit
        sessionFactory.inTransaction(session -> {
            Product keyboard = session.find(Product.class, keyboardId);
            keyboard.setPrice(new BigDecimal("799.00"));
        });

        // HQL: entity and field names, a named parameter instead of ?
        sessionFactory.inSession(session -> {
            session.createSelectionQuery(
                            "from Product p where p.price < :max order by p.price", Product.class)
                    .setParameter("max", new BigDecimal("500.00"))
                    .getResultList()
                    .forEach(System.out::println);
            // Product[id=2, name=Mouse, price=299.00]
        });

        // lazy loading: the category is only fetched when it is used - inside a session
        Product detached = sessionFactory.fromSession(session -> session.find(Product.class, keyboardId));
        try {
            detached.getCategory().getName();
        } catch (LazyInitializationException e) {
            System.out.println("LazyInitializationException: the session is closed");
        }

        // the N+1 problem: one SELECT for the categories, then one more per category (3 in all)
        sessionFactory.inSession(session -> {
            for (Category category : session.createSelectionQuery("from Category", Category.class).getResultList()) {
                System.out.println(category.getName() + ": " + category.getProducts().size());
            }
        });

        // the fix: join fetch loads categories and products in a single SELECT
        sessionFactory.inSession(session -> {
            session.createSelectionQuery("from Category c join fetch c.products", Category.class)
                    .getResultList()
                    .forEach(c -> System.out.println(c.getName() + ": " + c.getProducts().size()));
            // Peripherals: 2
            // Displays: 1
        });

        // remove: the DELETE is sent at commit
        sessionFactory.inTransaction(session -> session.remove(session.find(Product.class, mouseId)));

        sessionFactory.close();
    }
}

@Entity
@Table(name = "category")
class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.PERSIST)
    private List<Product> products = new ArrayList<>();

    protected Category() {}

    Category(String name) {
        this.name = name;
    }

    // keeps both sides of the relationship in sync
    void addProduct(Product product) {
        products.add(product);
        product.setCategory(this);
    }

    String getName() {
        return name;
    }

    List<Product> getProducts() {
        return products;
    }
}

@Entity
@Table(name = "product")
class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    protected Product() {}

    Product(String name, BigDecimal price) {
        this.name = name;
        this.price = price;
    }

    Long getId() {
        return id;
    }

    Category getCategory() {
        return category;
    }

    void setCategory(Category category) {
        this.category = category;
    }

    void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product[id=" + id + ", name=" + name + ", price=" + price + "]";
    }
}
