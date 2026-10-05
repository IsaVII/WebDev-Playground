import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamApiDemo {

    public static void main(String[] args) {
        List<Order> orders = List.of(
                new Order(1, "Maja", "SHIPPED",
                        List.of(new Item("keyboard", 900), new Item("mouse", 300))),
                new Order(2, "Omar", "NEW",
                        List.of(new Item("monitor", 2500))),
                new Order(3, "Maja", "SHIPPED",
                        List.of(new Item("cable", 100), new Item("dock", 1200),
                                new Item("mouse", 300))),
                new Order(4, "Lena", "CANCELLED",
                        List.of(new Item("laptop", 9000))));

        List<String> products = orders.stream()
                .flatMap(o -> o.items().stream())
                .map(Item::name)
                .distinct()
                .sorted()
                .toList();
        System.out.println(products); // [cable, dock, keyboard, laptop, monitor, mouse]

        int shippedRevenue = orders.stream()
                .filter(o -> o.status().equals("SHIPPED"))
                .mapToInt(Order::total)
                .sum();
        System.out.println(shippedRevenue); // 2800

        IntSummaryStatistics stats = orders.stream()
                .mapToInt(Order::total)
                .summaryStatistics();
        System.out.println(stats.getMin() + " to " + stats.getMax()
                + ", average " + stats.getAverage()); // 1200 to 9000, average 3575.0

        Map<String, Integer> spendPerCustomer = orders.stream()
                .collect(Collectors.groupingBy(Order::customer, TreeMap::new,
                        Collectors.summingInt(Order::total)));
        System.out.println(spendPerCustomer); // {Lena=9000, Maja=2800, Omar=2500}

        Map<String, Integer> ordersPerCustomer = orders.stream()
                .collect(Collectors.toMap(Order::customer, o -> 1, Integer::sum,
                        TreeMap::new));
        System.out.println(ordersPerCustomer); // {Lena=1, Maja=2, Omar=1}

        String shippedIds = orders.stream()
                .filter(o -> o.status().equals("SHIPPED"))
                .map(o -> String.valueOf(o.id()))
                .collect(Collectors.joining(", ", "[", "]"));
        System.out.println(shippedIds); // [1, 3]

        int grandTotal = orders.stream()
                .map(Order::total)
                .reduce(0, Integer::sum);
        System.out.println(grandTotal); // 14300

        List<Integer> powersOfTwo = Stream.iterate(1, n -> n * 2)
                .limit(5)
                .toList();
        System.out.println(powersOfTwo); // [1, 2, 4, 8, 16]
    }
}

record Item(String name, int price) {}

record Order(int id, String customer, String status, List<Item> items) {

    int total() {
        return items.stream().mapToInt(Item::price).sum();
    }
}
