# @param {Integer[]} nums
# @return {Integer}
def find_duplicate(nums)
    # Step 1: Find the intersection point in the cycle
    tortoise = nums[0]
    hare = nums[0]
    
    while true
        tortoise = nums[tortoise]
        hare = nums[nums[hare]]
        break if tortoise == hare
    end

    # Step 2: Find the entrance to the cycle
    tortoise = nums[0]
    
    while tortoise != hare
        tortoise = nums[tortoise]
        hare = nums[hare]
    end
    
    return hare
end
