import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcDemo {

    public static void main(String[] args) throws SQLException {
        ProductDao dao = new ProductDao(
                "jdbc:postgresql://localhost:5432/shop",
                System.getenv("DB_USER"),
                System.getenv("DB_PASSWORD"));

        dao.createTable();

        long keyboard = dao.insert("Keyboard", new BigDecimal("899.00"), 25);
        long mouse = dao.insert("Mouse", new BigDecimal("299.00"), 40);

        System.out.println(dao.findById(keyboard).orElseThrow());
        // Product[id=1, name=Keyboard, price=899.00, stock=25]

        System.out.println(dao.updatePrice(keyboard, new BigDecimal("799.00")) + " row updated");
        // 1 row updated

        dao.findCheaperThan(new BigDecimal("500.00")).forEach(System.out::println);
        // Product[id=2, name=Mouse, price=299.00, stock=40]

        dao.moveStock(mouse, keyboard, 10);

        System.out.println(dao.delete(mouse) + " row deleted");
        // 1 row deleted
    }
}

record Product(long id, String name, BigDecimal price, int stock) {}

class ProductDao {

    private final String url;
    private final String user;
    private final String password;

    ProductDao(String url, String user, String password) {
        this.url = url;
        this.user = user;
        this.password = password;
    }

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    void createTable() throws SQLException {
        String sql = """
                CREATE TABLE IF NOT EXISTS product (
                    id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                    name  TEXT NOT NULL,
                    price NUMERIC(10, 2) NOT NULL,
                    stock INTEGER NOT NULL DEFAULT 0
                )""";
        try (Connection conn = connect(); Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        }
    }

    long insert(String name, BigDecimal price, int stock) throws SQLException {
        String sql = "INSERT INTO product (name, price, stock) VALUES (?, ?, ?)";
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, name);
            ps.setBigDecimal(2, price);
            ps.setInt(3, stock);
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                keys.next();
                return keys.getLong("id");
            }
        }
    }

    Optional<Product> findById(long id) throws SQLException {
        String sql = "SELECT id, name, price, stock FROM product WHERE id = ?";
        try (Connection conn = connect(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? Optional.of(toProduct(rs)) : Optional.empty();
            }
        }
    }

    List<Product> findCheaperThan(BigDecimal limit) throws SQLException {
        String sql = "SELECT id, name, price, stock FROM product WHERE price < ? ORDER BY price";
        List<Product> products = new ArrayList<>();
        try (Connection conn = connect(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setBigDecimal(1, limit);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    products.add(toProduct(rs));
                }
            }
        }
        return products;
    }

    int updatePrice(long id, BigDecimal price) throws SQLException {
        String sql = "UPDATE product SET price = ? WHERE id = ?";
        try (Connection conn = connect(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setBigDecimal(1, price);
            ps.setLong(2, id);
            return ps.executeUpdate();
        }
    }

    int delete(long id) throws SQLException {
        String sql = "DELETE FROM product WHERE id = ?";
        try (Connection conn = connect(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate();
        }
    }

    void moveStock(long fromId, long toId, int amount) throws SQLException {
        String sql = "UPDATE product SET stock = stock + ? WHERE id = ?";
        try (Connection conn = connect()) {
            conn.setAutoCommit(false);
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, -amount);
                ps.setLong(2, fromId);
                ps.executeUpdate();
                ps.setInt(1, amount);
                ps.setLong(2, toId);
                ps.executeUpdate();
                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            }
        }
    }

    private static Product toProduct(ResultSet rs) throws SQLException {
        return new Product(
                rs.getLong("id"),
                rs.getString("name"),
                rs.getBigDecimal("price"),
                rs.getInt("stock"));
    }
}
