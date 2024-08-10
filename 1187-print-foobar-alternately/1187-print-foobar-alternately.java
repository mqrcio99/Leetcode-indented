import java.util.concurrent.atomic.AtomicInteger;

class FooBar {
    private int n;
    private AtomicInteger turn;

    public FooBar(int n) {
        this.n = n;
        this.turn = new AtomicInteger(0); // 0 for foo, 1 for bar
    }

    public void foo(Runnable printFoo) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            while (turn.get() != 0) {
                // Wait until it's this thread's turn
                Thread.yield(); // Yield the CPU to other threads
            }
            printFoo.run(); // Print "foo"
            turn.set(1); // Set turn to bar
        }
    }

    public void bar(Runnable printBar) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            while (turn.get() != 1) {
                // Wait until it's this thread's turn
                Thread.yield(); // Yield the CPU to other threads
            }
            printBar.run(); // Print "bar"
            turn.set(0); // Set turn to foo
        }
    }

    public static void main(String[] args) {
        FooBar fooBar = new FooBar(2);

        // Define the print functions
        Runnable printFoo = () -> System.out.print("foo");
        Runnable printBar = () -> System.out.print("bar");

        // Create threads for foo and bar
        Thread threadFoo = new Thread(() -> {
            try {
                fooBar.foo(printFoo);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread threadBar = new Thread(() -> {
            try {
                fooBar.bar(printBar);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // Start the threads
        threadFoo.start();
        threadBar.start();

        // Wait for threads to complete
        try {
            threadFoo.join();
            threadBar.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
