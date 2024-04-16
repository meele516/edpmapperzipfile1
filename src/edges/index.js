import { useMemo } from "react";

let array=[
  {
      "id": "GetTablesList",
      "name": "GetTablesList",
      "children": [
          {
              "id": "GetDataSetDetails",
              "name": "GetDataSetDetails",
              "children": [],
              "selectedOutputParams": [
                  "id",
                  "creationTime","etag"
              ],
              "selectedWorkflows": [
                  "purge workflow"
              ],
              "description": "API description not found",
              "selected": true,
              "inputParams": {},
              "outputParams": [
                  "kind",
                  "etag",
                  "id",
                  "selfLink",
                  "datasetReference",
                  "defaultTableExpirationMs",
                  "access",
                  "creationTime",
                  "lastModifiedTime",
                  "location",
                  "defaultPartitionExpirationMs",
                  "type",
                  "isCaseInsensitive",
                  "maxTimeTravelHours",
                  "storageBillingModel"
              ],
              "PathParams": {
                  "projectId": "my-new-project-4-412310",
                  "datasetId": "dataset4"
              },
              "body": {},
              "Integration_Name": "BigQueryData",
              "schemaID": "6603e7471574a22f5d1a11ee",
              "selectedInputParams": {},
              "selectedPathParams": {
                  "projectId": "magnetic-nimbus-414111",
                  "datasetId": "dataset1"
              },
              "selectedBody": {},
              "outPutResponse": "65cc59061b707d34e9375158",
              "outputParamsTag": {
                  "id": "Mobius_PI_id",
                  "creationTime": "Mobius_PI_total_cost"
              },
              "indexes": {
                  "id": "primary",
                  "creationTime": "primary",
                  "etag":"secondary"
              }
          }
      ],
      "selectedOutputParams": [
          "kind",
          "totalItems","etag"
      ],
      "selectedWorkflows": [
          "purge workflow"
      ],
      "description": "Retrieve details about a specific table in Google BigQuery, including its schema, size, and other relevant information.",
      "selected": true,
      "inputParams": {},
      "outputParams": [
          "kind",
          "etag",
          "tables",
          "totalItems"
      ],
      "PathParams": {
          "projectId": "my-new-project-4-412310",
          "datasetId": "bquxjob_9d50c95_18d5eeb9a75"
      },
      "body": {},
      "Integration_Name": "BigQueryData",
      "schemaID": "65d7101c1b707d34e937573c",
      "selectedInputParams": {},
      "selectedPathParams": {
          "projectId": "magnetic-nimbus-414111",
          "datasetId": "dataset1"
      },
      "selectedBody": {},
      "outPutResponse": "65cb674c1b707d34e9375023",
      "outputParamsTag": {},
      "indexes": {
          "kind": "primary",
          "totalItems": "primary"
      }
  }
]

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



function getEdge(obj) {
if (obj.parent === null) return;

let target = obj.id;
let source = obj.parent.id;

return obj.selectedOutputParams.reduce((edges, param) => {
  if (obj.indexes[param] === "secondary") {
    edges.push({
      source: source,
      target: target,
      sourceHandle: `${source}${param}source`,
      targetHandle: `${target}${param}target`,
      id: `${source}${param}source${target}${param}target`,
      animated:true
    });
  }
  return edges;
}, []);
}


  function getNode(obj,position){
    return {
        id:obj.id,
        type: "position-logger",
        position: { x: -100, y: 100 },
        data:{
            name:obj.id,
            label:obj.id,
            selectedOutputParams:obj.selectedOutputParams
        }
    }
}
console.log(flattenArray(array).map(getNode))
export const initialEdges = flattenArray(array)
.filter(obj => obj !== null) // exclude null objects, if any
.flatMap(getEdge)
.filter(edge => edge !== undefined)
export const edgeTypes = {
  // Add your custom edge types here!
}


