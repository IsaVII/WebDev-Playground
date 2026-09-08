import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    // Single constructor - Spring injects the generated repository, no @Autowired.
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> findAll() {
        return repository.findAll();
    }

    @Transactional
    public Customer create(String name, String email) {
        repository.findByEmail(email).ifPresent(c -> {
            throw new IllegalStateException("email already registered");
        });
        return repository.save(new Customer(name, email));
    }
}
