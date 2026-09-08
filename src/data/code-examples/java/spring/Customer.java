import jakarta.persistence.*;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

    protected Customer() {}          // JPA needs a no-arg constructor
    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }
    // id/name/email getters omitted for brevity
}
