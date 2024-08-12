import heapq
from typing import List

class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        """
        Initialize the object with the integer k and the list of integers nums.
        """
        self.k = k
        self.min_heap = []
        
        # Add the initial numbers to the heap
        for num in nums:
            self.add(num)
    
    def add(self, val: int) -> int:
        """
        Add a new integer val to the data structure and return the k-th largest element.
        """
        if len(self.min_heap) < self.k:
            heapq.heappush(self.min_heap, val)
        else:
            # Only add the new value if it's larger than the smallest in the heap
            if val > self.min_heap[0]:
                heapq.heapreplace(self.min_heap, val)
        
        # The k-th largest element is the smallest element in the heap
        return self.min_heap[0]

# Example usage:
# obj = KthLargest(k, nums)
# param_1 = obj.add(val)
