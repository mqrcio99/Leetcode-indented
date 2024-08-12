/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;  // Initialize previous node to null
    let curr = head;  // Start with the head of the list
    
    while (curr !== null) {
        let next = curr.next; // Store next node
        curr.next = prev;     // Reverse current node's pointer
        prev = curr;          // Move prev to current node
        curr = next;          // Move to next node
    }
    
    return prev; // prev is the new head of the reversed list
};
