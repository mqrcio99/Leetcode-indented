from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search_prefix(self, prefix: str) -> TrieNode:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        def dfs(board, node, i, j, path):
            if node.is_end_of_word:
                result.add(path)
                node.is_end_of_word = False  # Avoid duplicate words

            # Mark the cell as visited
            temp, board[i][j] = board[i][j], '#'
            for x, y in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
                if 0 <= x < len(board) and 0 <= y < len(board[0]) and board[x][y] != '#':
                    next_char = board[x][y]
                    if next_char in node.children:
                        dfs(board, node.children[next_char], x, y, path + next_char)
            
            # Unmark the cell
            board[i][j] = temp

        # Build Trie from the words
        trie = Trie()
        for word in words:
            trie.insert(word)

        result = set()
        for i in range(len(board)):
            for j in range(len(board[0])):
                char = board[i][j]
                if char in trie.root.children:
                    dfs(board, trie.root.children[char], i, j, char)

        return list(result)

# Example Usage
if __name__ == "__main__":
    board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    words = ["oath","pea","eat","rain"]
    solution = Solution()
    print(solution.findWords(board, words))  # Output: ['eat', 'oath']

    board = [["a","b"],["c","d"]]
    words = ["abcb"]
    solution = Solution()
    print(solution.findWords(board, words))  # Output: []
