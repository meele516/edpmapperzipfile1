export const synchronizeTrees = (tree1, tree2) => {
	const updatedTree1 = JSON.parse(JSON.stringify(tree1));
	const selectedOutputParamsMap = new Map();

	const outputparamsMap =new Map()
    const outputParamsTagMap=new Map()
	const whereMap =new Map()
	const groupByMap =new Map()


  
	// Traverse tree2 to store selected output params and selected in a map
	const storeSelectedData = (node) => {
	  selectedOutputParamsMap.set(node.id, node.selectedOutputParams || []);

	  outputParamsTagMap.set(node.id, node.outputParamsTag);
	  outputparamsMap.set(node.id,node.outputParams);
	    whereMap.set(node.id,node.where);
        groupByMap.set(node.id,node.groupBy)
	
	  if (node.children) {
		node.children.forEach(child => storeSelectedData(child));
	  }
	};
  
	tree2?.forEach(node => storeSelectedData(node));
  
	// Traverse tree1 to update selected output params and selected using the map from tree2
	const updateTree1 = (node) => {
	  const selectedOutputParams = selectedOutputParamsMap.get(node.id);

	  const outputParamsTag = outputParamsTagMap.get(node.id);
	  const outputParams = outputparamsMap.get(node.id)
	  const where =whereMap.get(node.id)
	  const groupBy =groupByMap.get(node.id)

	  if (selectedOutputParams !== undefined) {
		node.selectedOutputParams = selectedOutputParams;
	  }
	  if (where !== undefined) {
		node.where= where;
	  }
	  if (outputParams !== undefined) {
		node.outputParams = outputParams;
	  }
	  if (groupBy !== undefined) {
		node.groupBy = groupBy;
	  }
	
	  if (outputParamsTag !== undefined) {
		node.outputParamsTag = outputParamsTag;
	  }
	
  
	  if (node.children) {
		node.children.forEach(child => updateTree1(child));
	  }
	};
  
	updatedTree1.forEach(node => updateTree1(node));
  
	return updatedTree1;
  };
