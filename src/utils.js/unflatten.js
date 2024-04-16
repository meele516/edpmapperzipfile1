export function unflattenArray(flatArr) {
    const map = new Map(); // Using a Map for efficient lookup
    
    // First pass: create a map of parent-child relationships
    flatArr.forEach(item => {
        if (!map.has(item.parent)) {
            map.set(item.parent, { children: [] });
        }
        map.get(item.parent).children.push(item);
    });
    
    // Second pass: construct the hierarchical structure
    const unflatten = (parent) => {
        const node = map.get(parent);
        if (!node) return null;
        return {
            ...parent,
            children: node.children.map(child => unflatten(child))
        };
    };
    
    // Finding the root node(s)
    const roots = flatArr.filter(item => !map.has(item.parent));
    
    // If there are multiple roots, wrap them in a dummy root
    if (roots.length > 1) {
        const dummyRoot = { id: null, children: [] };
        roots.forEach(root => dummyRoot.children.push(unflatten(root)));
        return dummyRoot;
    } else {
        return unflatten(roots[0]);
    }
}
