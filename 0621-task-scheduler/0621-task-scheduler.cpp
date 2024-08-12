#include <vector>
#include <algorithm>
#include <unordered_map>

class Solution {
public:
    int leastInterval(std::vector<char>& tasks, int n) {
        std::unordered_map<char, int> taskCount;
        int maxFreq = 0;
        
        // Count the frequency of each task
        for (char task : tasks) {
            taskCount[task]++;
            maxFreq = std::max(maxFreq, taskCount[task]);
        }
        
        // Calculate the number of tasks with the maximum frequency
        int maxCount = 0;
        for (const auto& entry : taskCount) {
            if (entry.second == maxFreq) {
                maxCount++;
            }
        }
        
        // Calculate the minimum intervals required
        int partCount = maxFreq - 1;
        int partLength = n - (maxCount - 1);
        int emptySlots = partCount * partLength;
        int availableTasks = tasks.size() - maxFreq * maxCount;
        int idles = std::max(0, emptySlots - availableTasks);
        
        return tasks.size() + idles;
    }
};
