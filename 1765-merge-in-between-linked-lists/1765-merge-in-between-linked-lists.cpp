class Solution {
public:
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        ListNode* prevA = nullptr; // Node before index `a`
        ListNode* nodeA = list1;   // Node at index `a`
        ListNode* nodeB = list1;   // Node at index `b`
        ListNode* afterB = nullptr; // Node after index `b`
        
        // Traverse to find the nodes before and after the range [a, b]
        int index = 0;
        while (nodeB && index <= b) {
            if (index == a - 1) {
                prevA = nodeB; // Node before index `a`
            }
            if (index == a) {
                nodeA = nodeB; // Node at index `a`
            }
            if (index == b) {
                nodeB = nodeB->next; // Node after index `b`
                afterB = nodeB;
                break;
            }
            nodeB = nodeB->next;
            index++;
        }
        
        // Find the last node of list2
        ListNode* lastNodeList2 = list2;
        while (lastNodeList2 && lastNodeList2->next) {
            lastNodeList2 = lastNodeList2->next;
        }
        
        // Connect list2 to the node after index `b`
        if (lastNodeList2) {
            lastNodeList2->next = afterB;
        }
        
        // Connect the node before index `a` to the head of list2
        if (prevA) {
            prevA->next = list2;
        } else {
            // If `a` is 0, it means we need to update the head of list1
            list1 = list2;
        }
        
        return list1;
    }
};
