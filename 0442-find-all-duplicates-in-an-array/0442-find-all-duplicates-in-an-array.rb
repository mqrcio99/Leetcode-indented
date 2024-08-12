# @param {Integer[]} nums
# @return {Integer[]}
def find_duplicates(nums)
    # Initialize an empty set to keep track of seen numbers
    seen = Set.new
    # Initialize an empty array to store duplicates
    duplicates = []

    # Iterate through the array
    nums.each do |num|
        # If the number is already in the set, it's a duplicate
        if seen.include?(num)
            duplicates << num
        else
            # Otherwise, add the number to the set
            seen.add(num)
        end
    end

    duplicates
end
