import heapq

class Solution:
    def nthUglyNumber(self, n: int) -> int:
        # Min-heap para armazenar os números feios
        min_heap = [1]
        # Conjunto para verificar duplicatas
        seen = {1}
        
        # Variáveis para os múltiplos de 2, 3 e 5
        factors = [2, 3, 5]
        
        ugly_number = 1
        
        for _ in range(n):
            # Obtém o menor número feio da heap
            ugly_number = heapq.heappop(min_heap)
            
            # Gera novos números feios multiplicando o menor número feio por 2, 3 e 5
            for factor in factors:
                new_ugly = ugly_number * factor
                if new_ugly not in seen:
                    seen.add(new_ugly)
                    heapq.heappush(min_heap, new_ugly)
        
        return ugly_number
