/**
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun reorderList(head: ListNode?) {
        if (head == null || head.next == null || head.next?.next == null) return

        // Step 1: Find the middle of the list
        var slow: ListNode? = head
        var fast: ListNode? = head
        while (fast?.next != null && fast.next?.next != null) {
            slow = slow?.next
            fast = fast.next?.next
        }

        // `slow` is now at the middle of the list
        val secondHalf = slow?.next
        slow?.next = null // Split the list into two halves

        // Step 2: Reverse the second half
        var prev: ListNode? = null
        var curr = secondHalf
        while (curr != null) {
            val next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }

        // `prev` is now the head of the reversed second half
        var firstHalf = head
        var secondHalfReversed = prev

        // Step 3: Merge two halves
        while (secondHalfReversed != null) {
            val temp1 = firstHalf?.next
            val temp2 = secondHalfReversed.next

            firstHalf?.next = secondHalfReversed
            secondHalfReversed.next = temp1

            firstHalf = temp1
            secondHalfReversed = temp2
        }
    }
}
