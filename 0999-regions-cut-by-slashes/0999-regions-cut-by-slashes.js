class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

function regionsBySlashes(grid) {
    const n = grid.length;
    const uf = new UnionFind(4 * n * n);

    function getIndex(r, c, i) {
        return (r * n + c) * 4 + i;
    }

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '/') {
                uf.union(getIndex(r, c, 0), getIndex(r, c, 3));
                uf.union(getIndex(r, c, 1), getIndex(r, c, 2));
            } else if (grid[r][c] === '\\') {
                uf.union(getIndex(r, c, 0), getIndex(r, c, 1));
                uf.union(getIndex(r, c, 2), getIndex(r, c, 3));
            } else {
                uf.union(getIndex(r, c, 0), getIndex(r, c, 1));
                uf.union(getIndex(r, c, 1), getIndex(r, c, 2));
                uf.union(getIndex(r, c, 2), getIndex(r, c, 3));
            }

            if (r < n - 1) {
                uf.union(getIndex(r, c, 2), getIndex(r + 1, c, 0));
            }
            if (c < n - 1) {
                uf.union(getIndex(r, c, 1), getIndex(r, c + 1, 3));
            }
        }
    }

    const uniqueRegions = new Set();
    for (let i = 0; i < 4 * n * n; i++) {
        uniqueRegions.add(uf.find(i));
    }

    return uniqueRegions.size;
}

// Example Usage
console.log(regionsBySlashes([" /", "/ "])) // Output: 2
console.log(regionsBySlashes([" /", "  "])) // Output: 1
console.log(regionsBySlashes(["/\\", "\\/"])) // Output: 5
