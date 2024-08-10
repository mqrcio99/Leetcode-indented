import threading

class Foo:
    def __init__(self):
        # Create Event objects for synchronization
        self.first_done = threading.Event()
        self.second_done = threading.Event()

    def first(self, printFirst):
        printFirst()  # Execute the print function for "first"
        self.first_done.set()  # Signal that first has been executed

    def second(self, printSecond):
        self.first_done.wait()  # Wait for the first method to complete
        printSecond()  # Execute the print function for "second"
        self.second_done.set()  # Signal that second has been executed

    def third(self, printThird):
        self.second_done.wait()  # Wait for the second method to complete
        printThird()  # Execute the print function for "third"

# Define the print functions
def printFirst():
    print("first", end="")

def printSecond():
    print("second", end="")

def printThird():
    print("third", end="")

# Create Foo instance
foo = Foo()

# Create and start threads
threadA = threading.Thread(target=foo.first, args=(printFirst,))
threadB = threading.Thread(target=foo.second, args=(printSecond,))
threadC = threading.Thread(target=foo.third, args=(printThird,))

threadA.start()
threadB.start()
threadC.start()

# Wait for all threads to complete
threadA.join()
threadB.join()
threadC.join()
