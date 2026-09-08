import java.util.*;
import java.util.stream.*;
import static java.util.stream.Collectors.*;

/** A few questions about a list of orders, answered with stream pipelines. */
public class OrderAnalysis {

    enum Status { NEW, PAID, SHIPPED, CANCELLED }

    record Order(long id, String customer, long total, Status status) {}

    private final List<Order> orders;

    OrderAnalysis(List<Order> orders) {
        this.orders = orders;
    }

    /** Total revenue from orders that actually shipped. */
    long shippedRevenue() {
        return orders.stream()
                .filter(o -> o.status() == Status.SHIPPED)
                .mapToLong(Order::total)
                .sum();
    }

    /** The single biggest order for each customer. */
    Map<String, Optional<Order>> biggestOrderPerCustomer() {
        return orders.stream()
                .collect(groupingBy(
                        Order::customer,
                        maxBy(Comparator.comparingLong(Order::total))
                ));
    }

    /** How many orders sit in each status. */
    Map<Status, Long> countByStatus() {
        return orders.stream()
                .collect(groupingBy(Order::status, counting()));
    }

    /** The first order still waiting to ship, if there is one. */
    Optional<Order> firstUnshipped() {
        return orders.stream()
                .filter(o -> o.status() == Status.NEW || o.status() == Status.PAID)
                .findFirst();
    }
}
