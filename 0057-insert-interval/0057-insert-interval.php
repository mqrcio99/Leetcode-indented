class Solution {

    /**
     * @param Integer[][] $intervals
     * @param Integer[] $newInterval
     * @return Integer[][]
     */
    function insert($intervals, $newInterval) {
        $result = [];
        $n = count($intervals);
        $i = 0;
        
        // Add all intervals that come before the newInterval
        while ($i < $n && $intervals[$i][1] < $newInterval[0]) {
            $result[] = $intervals[$i];
            $i++;
        }
        
        // Merge all intervals that overlap with newInterval
        while ($i < $n && $intervals[$i][0] <= $newInterval[1]) {
            $newInterval[0] = min($newInterval[0], $intervals[$i][0]);
            $newInterval[1] = max($newInterval[1], $intervals[$i][1]);
            $i++;
        }
        $result[] = $newInterval;
        
        // Add all remaining intervals after newInterval
        while ($i < $n) {
            $result[] = $intervals[$i];
            $i++;
        }
        
        return $result;
    }
}
