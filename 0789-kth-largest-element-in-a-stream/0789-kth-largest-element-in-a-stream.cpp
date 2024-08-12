#include <vector>
#include <queue>
using namespace std;

class KthLargest {
public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        // Use a min-heap to store the k largest elements
        for (int num : nums) {
            add(num);
        }
    }
    
    int add(int val) {
        // If the heap has fewer than k elements, push the new value
        if (minHeap.size() < k) {
            minHeap.push(val);
        } else if (val > minHeap.top()) {
            // If the heap has k elements and the new value is larger than the smallest in the heap
            minHeap.pop();
            minHeap.push(val);
        }
        // The top of the min-heap is the k-th largest element
        return minHeap.top();
    }

private:
    int k;
    priority_queue<int, vector<int>, greater<int>> minHeap; // Min-heap to store k largest elements
};
