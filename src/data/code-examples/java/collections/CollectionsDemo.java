import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.TreeMap;

public class CollectionsDemo {

    public static void main(String[] args) {
        List<Employee> staff = new ArrayList<>(List.of(
                new Employee("Maja", "Sales", 31000),
                new Employee("Omar", "IT", 45000),
                new Employee("Lena", "IT", 52000),
                new Employee("Adam", "Sales", 31000)));

        Collections.sort(staff); // natural order: compareTo, by name
        System.out.println(staff.get(0).name()); // Adam

        staff.sort(Comparator.comparing(Employee::department)
                .thenComparing(Employee::salary, Comparator.reverseOrder())
                .thenComparing(Employee::name));
        staff.forEach(e -> System.out.println(
                e.department() + " " + e.salary() + " " + e.name()));

        Map<String, List<Employee>> byDepartment = new TreeMap<>();
        for (Employee e : staff) {
            byDepartment.computeIfAbsent(e.department(), d -> new ArrayList<>()).add(e);
        }
        System.out.println(byDepartment.keySet()); // [IT, Sales]

        Set<Product> catalog = new HashSet<>();
        catalog.add(new Product("P-1", "Keyboard"));
        catalog.add(new Product("P-1", "Keyboard (duplicate)"));
        System.out.println(catalog.size()); // 1

        PriorityQueue<Employee> payroll = new PriorityQueue<>(
                Comparator.comparingInt(Employee::salary).reversed());
        payroll.addAll(staff);
        System.out.println(payroll.poll().name()); // Lena

        staff.removeIf(e -> e.salary() < 40000);
        System.out.println(staff.size()); // 2
    }
}

record Employee(String name, String department, int salary)
        implements Comparable<Employee> {

    @Override
    public int compareTo(Employee other) {
        return name.compareTo(other.name);
    }
}

class Product {
    private final String sku;
    private final String label;

    Product(String sku, String label) {
        this.sku = sku;
        this.label = label;
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Product p && sku.equals(p.sku);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sku);
    }
}
