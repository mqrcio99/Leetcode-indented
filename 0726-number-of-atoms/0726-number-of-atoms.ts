function countOfAtoms(formula) {
    const stack = [];
    const n = formula.length;
    let i = 0;
    
    while (i < n) {
        if (formula[i] === '(') {
            // Push a marker to indicate the start of a new group
            stack.push('(');
            i++;
        } else if (formula[i] === ')') {
            // Pop elements until we find the matching '('
            const tempMap = new Map();
            while (stack[stack.length - 1] !== '(') {
                const [atom, count] = stack.pop();
                tempMap.set(atom, (tempMap.get(atom) || 0) + count);
            }
            stack.pop(); // Remove the '('
            
            // Process multiplier after ')'
            let multiplier = 0;
            i++;
            while (i < n && !isNaN(formula[i])) {
                multiplier = multiplier * 10 + Number(formula[i]);
                i++;
            }
            multiplier = multiplier || 1; // Default multiplier is 1 if not specified
            
            for (const [atom, count] of tempMap) {
                stack.push([atom, count * multiplier]);
            }
        } else {
            // Read the element name
            let j = i + 1;
            while (j < n && formula[j] >= 'a' && formula[j] <= 'z') {
                j++;
            }
            const atom = formula.slice(i, j);
            i = j;
            
            // Read the count if present
            let count = 0;
            while (i < n && !isNaN(formula[i])) {
                count = count * 10 + Number(formula[i]);
                i++;
            }
            count = count || 1; // Default count is 1 if not specified
            
            stack.push([atom, count]);
        }
    }
    
    // Combine the counts from the stack
    const resultMap = new Map();
    while (stack.length) {
        const [atom, count] = stack.pop();
        resultMap.set(atom, (resultMap.get(atom) || 0) + count);
    }
    
    // Format the result
    const result = Array.from(resultMap.keys())
        .sort()
        .map(atom => resultMap.get(atom) === 1 ? atom : atom + resultMap.get(atom))
        .join('');
    
    return result;
}

// Example usage:
console.log(countOfAtoms("H2O")); // Output: "H2O"
console.log(countOfAtoms("Mg(OH)2")); // Output: "H2MgO2"
console.log(countOfAtoms("K4(ON(SO3)2)2")); // Output: "K4N2O14S4"
