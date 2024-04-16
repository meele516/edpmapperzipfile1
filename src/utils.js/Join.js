function crossJoinMultipleQueries(queries) {
  const derivedTables = queries.filter(entiry=>entiry!=undefined).map((query, index) => `(${query}) AS q${index + 1}`).join(',\n');
  
  const combinedQuery = `SELECT * FROM ${derivedTables};`;

  return combinedQuery;
}

// Function to flatten the array
function Generateselect(array){
  console.log(array)
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

  const flattenedTables = flattenArray(array);
// Function to generate SQL query
function generateJoinQuery(tables) {


  let joinQuery = "";
  let joinedTables = new Set();

  flattenedTables.forEach((table, index) => {
    const tableName = table.id;
    const alias = table.outputParamsTag;
    
  
    // Generate JOIN part if the table has a parent and is not already joined
    if (table.indexes && index > 0 && !joinedTables.has(tableName)) {
      // const joinCondition = Object.keys(table.joincondition)[0];
      const joinCondition = Object.keys(table?.indexes).find(key => table?.indexes[key] === 'secondary');
      const parentTableName = table.parent.id;

      
        joinQuery += ` INNER JOIN ${tableName} AS ${tableName} ON ${parentTableName}.${joinCondition} = ${tableName}.${table.joincondition[joinCondition]}`;
   

      joinedTables.add(tableName);
    }
    else if(index>0){
      joinQuery += ` CROSS JOIN ${tableName} AS ${tableName}`;
    }
  });

  return `${joinQuery}`;
}
function generateSelectQuery(flattenedTables) {
  let selectQuery = "SELECT ";
  let groupByColumns = {};

  // Iterate through each table
  for (let i = 0; i < flattenedTables.length; i++) {
      const table = flattenedTables[i];

      // Get all selected output params (including children's output params)
      let allSelectedColumns = [];

      let getSelectedColumns = (currentTable) => {
          allSelectedColumns.push(
              ...currentTable.selectedOutputParams.map(param => {
                  return `${currentTable.id}.${param} AS ${currentTable.outputParamsTag?.[param]}`;
              })
          );

          
      };

      getSelectedColumns(table);

      // Add selected columns based on groupBy criteria
      if (table.groupBy) {
          const groupByKeys = Object.keys(table.groupBy);
          groupByKeys.forEach(param => {
              if (table.groupBy[param] === "groupBy") {
                  // allSelectedColumns = allSelectedColumns.filter(column => !column.includes(`${table.id}.${param}`));
              } else if(table.groupBy[param]){
                  allSelectedColumns = allSelectedColumns.filter(column => !column.includes(`${table.id}.${param}`));
                  allSelectedColumns.push(`${table.groupBy[param]?.toUpperCase()}(${table.id}.${param}) AS ${table.outputParamsTag?.[param]}`);
              }
          });
          // Collect groupBy columns
          groupByColumns[table.id] = groupByKeys.filter(key => table.groupBy[key] === "groupBy");
      }

      // Add to select query
      selectQuery += allSelectedColumns.join(", ");

      // Add comma if not the last table
      if (i < flattenedTables.length - 1) {
          selectQuery += ", ";
      }
  }

  // Add GROUP BY clause
  const groupByClause = Object.entries(groupByColumns).map(([tableId, columns]) => {
      return columns.map(column => `${tableId}.${column}`).join(", ");
  }).join(", ");



  return selectQuery;
}

function generateWhereClause(flattenedTables) {
  let whereClause = "";
  let isFirstCondition = true;

  const buildWhereClause = (currentTable) => {
    if (currentTable.where) {
      const conditions = Object.entries(currentTable.where).map(([param, condition]) => {
        const matches = condition.match(/^((AND|OR)\s+)?([<>!=]+)\s*(.*)$/i);
        if (matches) {
          const logicalOperator = isFirstCondition ? "" : (matches[2] || "AND");
          const operator = matches[3];
          const value = matches[4];
          isFirstCondition = false;
          return ` ${logicalOperator.toUpperCase()} ${currentTable.id}.${param} ${operator} '${value}'`;
        } else {
          return null;
        }
      }).filter(condition => condition !== null);

      if (conditions.length > 0) {
        whereClause += conditions.join(" ");
      }
    }

 
  };

  flattenedTables.forEach(table => {
    buildWhereClause(table);
  });

  return whereClause !== "" ? ` WHERE ${whereClause}` : "";
}
function generateGroupByClause(flattenedTables) {
  console.log(flattenedTables,"hisaleem")
  let groupByClause = "";

  const buildGroupByClause = (currentTable) => {
      if (currentTable.groupBy) {
          const groupByKeys = Object.keys(currentTable.groupBy);
          const groupByColumns = groupByKeys.filter(key => currentTable.groupBy[key] === "groupBy");
          if (groupByColumns.length > 0) {
              groupByClause += groupByColumns.map(column => `${currentTable.id}.${column}`).join(", ");
              groupByClause += ", "; // Add comma after each column
          }
      }

   
  };

  flattenedTables.forEach(table => {
      buildGroupByClause(table);
  });

  // Remove the trailing comma and space if present
  groupByClause = groupByClause.trim().replace(/,\s*$/, "");

  return groupByClause !== "" ? ` GROUP BY ${groupByClause}` : "";
}




// Generate the SQL JOIN query
const sqlQuery = generateSelectQuery(flattenedTables)+` FROM ${flattenedTables[0].id} AS ${flattenedTables[0].id}`+generateJoinQuery(flattenedTables)+generateWhereClause(flattenedTables)+generateGroupByClause(flattenedTables);
return sqlQuery
}
export function generateMapping(array){
    let queries = array.map(dta=>Generateselect([dta]))
    console.log(queries)
    return crossJoinMultipleQueries(queries)
}
