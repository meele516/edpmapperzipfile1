export const transformJsonToTable = (jsonArray) => {
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
 const flatData = [];
 flattenArray(jsonArray).forEach((obj) => {
   obj.outputParams.forEach((param) => {
     const rowData = {
         selected:obj.selectedOutputParams.includes(param),
       id: `${obj.id}.${param}`, // Assuming 'id' is the unique identifier for each object
       columnName: `${obj.id}.${param}`,
       alias: obj.outputParamsTag[param] || '', // Use alias if exists, otherwise empty string
       filter: obj.where[param] || '', // Use filter condition if exists, otherwise empty string
       grouping: obj.groupBy[param] === 'groupBy', // Check if 'GroupBy' for this param
       aggregate: obj.groupBy[param] !== 'groupBy' ? obj.groupBy[param] : 'None', // Set aggregate if not 'GroupBy', otherwise 'None'
     };
     flatData.push(rowData);
   });
 });
 return flatData;
};