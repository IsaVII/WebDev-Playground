public class RunnablesDemo {

    public static void main(String[] args) throws InterruptedException {
        Account account = new Account();

        Thread t1 = new Thread(new DepositTask(account, 1000), "teller-1");
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                account.deposit(1);
            }
        }, "teller-2");
        Thread t3 = new Greeter();

        t1.start();
        t2.start();
        t3.start();
        t1.join();
        t2.join();
        t3.join();

        System.out.println("balance = " + account.getBalance()); // always 2000
        System.out.println("withdrew 500? " + account.withdraw(500));
    }
}

class DepositTask implements Runnable {
    private final Account account;
    private final int times;

    DepositTask(Account account, int times) {
        this.account = account;
        this.times = times;
    }

    @Override
    public void run() {
        for (int i = 0; i < times; i++) {
            account.deposit(1);
        }
    }
}

class Greeter extends Thread {
    @Override
    public void run() {
        System.out.println("Hello from " + getName());
    }
}

class Account {
    private static int created = 0;
    private int balance = 0;

    Account() {
        register();
    }

    synchronized void deposit(int amount) {
        balance += amount;
    }

    boolean withdraw(int amount) {
        synchronized (this) {
            if (balance < amount) {
                return false;
            }
            balance -= amount;
            return true;
        }
    }

    synchronized int getBalance() {
        return balance;
    }

    static synchronized void register() {
        created++;
    }
}
