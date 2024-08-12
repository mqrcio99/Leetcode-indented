class Solution {
    fun findMinArrowShots(points: Array<IntArray>): Int {
        // Edge case: If no balloons are present
        if (points.isEmpty()) return 0
        
        // Sort intervals by their end points
        points.sortBy { it[1] }
        
        // Initialize the number of arrows needed and the end of the last balloon burst
        var arrows = 1
        var lastEnd = points[0][1]
        
        // Iterate over the sorted intervals
        for (i in 1 until points.size) {
            // If the current balloon starts after the last balloon's end
            if (points[i][0] > lastEnd) {
                arrows++
                lastEnd = points[i][1]
            }
        }
        
        return arrows
    }
}
