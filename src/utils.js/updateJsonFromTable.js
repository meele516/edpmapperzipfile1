export const updateJsonFromTable = (modifiedRows, originalJson) => {
    function flattenArray(arr, parent = null) {
        return arr.reduce((flat, toFlatten) => {
          const flattenedItem = {
            ...toFlatten,
            parent: parent,
          };
          
          if (Array.isArray(toFlatten.children)) {
            return flat.concat(flattenedItem, flattenArray(toFlatten.children, toFlatten));
          } else {
            return flat.concat(flattenedItem);
          }
        }, []);
      }
    const updatedJson = JSON.parse(JSON.stringify(flattenArray(originalJson))); // Create a deep copy to avoid mutation
    
    // Iterate over modified rows
    modifiedRows.forEach((modifiedRow) => {
      // Split the row ID to get the table ID and parameter name
      const [tableId, selectedOutputParam] = modifiedRow.id.split('.');
      
      // Find the corresponding table object in the JSON
      const table = updatedJson.find((item) => item.id === tableId);
      if (table) {
        // Update the selectedOutputParams, outputParamsTag, where, and groupBy properties of the table
        if (!table.selectedOutputParams.includes(selectedOutputParam)&&modifiedRow.selected) {
          // Add the selectedOutputParam to selectedOutputParams if it's not already present
          table.selectedOutputParams.push(selectedOutputParam);
        }
        else if(!modifiedRow.selected){
            table.selectedOutputParams=table.selectedOutputParams.filter(data=>data!=selectedOutputParam) 
        }
        // Update or add the outputParamsTag, where, and groupBy properties for the selectedOutputParam
        if (!table.outputParamsTag) {
          table.outputParamsTag = {};
        }
        table.outputParamsTag[selectedOutputParam] = modifiedRow.alias;
  
        if (!table.where) {
          table.where = {};
        }
        table.where[selectedOutputParam] = modifiedRow.filter;
  
        if (!table.groupBy) {
          table.groupBy = {};
        }
        if(table.groupBy){
        table.groupBy[selectedOutputParam] = modifiedRow.grouping ? 'groupBy' : modifiedRow.aggregate;
        }
      }
    });
    
    return updatedJson;
  };