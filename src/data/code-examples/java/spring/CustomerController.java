import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService service;   // the service, never the repository

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Customer> list() {
        return service.findAll();
    }

    @PostMapping
    public Customer create(@RequestBody NewCustomer body) {
        return service.create(body.name(), body.email());
    }

    record NewCustomer(String name, String email) {}
}
