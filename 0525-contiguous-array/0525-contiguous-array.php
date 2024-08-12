class Solution {

    /**
     * @param Integer[] $nums
     * @return Integer
     */
    function findMaxLength($nums) {
        $map = array();
        $map[0] = -1;  // Initialize with balance 0 at index -1
        $maxLength = 0;
        $balance = 0;
        
        foreach ($nums as $i => $num) {
            $balance += ($num === 1) ? 1 : -1;  // Update balance

            if (isset($map[$balance])) {
                $maxLength = max($maxLength, $i - $map[$balance]);
            } else {
                $map[$balance] = $i;  // Store the first occurrence of this balance
            }
        }
        
        return $maxLength;
    }
}
