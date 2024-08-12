public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0; // Edge case: If k <= 1, no product can be less than k

        int count = 0;
        int start = 0;
        int product = 1;

        for (int end = 0; end < nums.Length; end++) {
            product *= nums[end];

            // Shrink the window until the product is less than k
            while (product >= k) {
                product /= nums[start];
                start++;
            }

            // All subarrays ending at `end` and starting from `start` to `end` are valid
            count += end - start + 1;
        }

        return count;
    }
}
