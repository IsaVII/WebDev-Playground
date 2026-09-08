import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// No implementation class - Spring Data generates one at startup.
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Parsed into: select c from Customer c where c.email = ?1
    Optional<Customer> findByEmail(String email);
}
