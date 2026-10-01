import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

public class ThreadsDemo {

    public static void main(String[] args) throws Exception {
        UnsafeCounter unsafe = new UnsafeCounter();
        SafeCounter safe = new SafeCounter();

        Runnable work = () -> {
            for (int i = 0; i < 1000; i++) {
                unsafe.increment();
                safe.increment();
            }
        };

        Thread t1 = new Thread(work);
        Thread t2 = new Thread(work);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("unsafe = " + unsafe.get()); // usually less than 2000
        System.out.println("safe   = " + safe.get());   // always 2000

        ExecutorService pool = Executors.newFixedThreadPool(3);
        List<Future<Integer>> results = new ArrayList<>();
        for (int id = 1; id <= 5; id++) {
            int orderId = id;
            results.add(pool.submit(() -> process(orderId)));
        }
        for (Future<Integer> f : results) {
            System.out.println("processed " + f.get());
        }
        pool.shutdown();
    }

    static int process(int orderId) throws InterruptedException {
        Thread.sleep(100);
        return orderId;
    }
}

class UnsafeCounter {
    private int count = 0;

    void increment() {
        count++;
    }

    int get() {
        return count;
    }
}

class SafeCounter {
    private final AtomicInteger count = new AtomicInteger();

    void increment() {
        count.incrementAndGet();
    }

    int get() {
        return count.get();
    }
}
