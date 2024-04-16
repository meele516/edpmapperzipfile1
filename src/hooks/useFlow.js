import { useContext, useMemo } from "react";
import { MapperContext } from "../MapperContext";
const analyticQueriesData = [
    "Mobius_PI_cost_fluctuation",
    "Mobius_PI_rolling_avg_usage",
    "Mobius_PI_id",
    "Mobius_PI_lowest_cost_fluctuation",
    "Mobius_PI_usage_changes",
    "Mobius_PI_lowest_storage_growth",
    "Mobius_PI_api_call_volume",
    "Mobius_PI_total_cost",
    "Mobius_PI_highest_storage_growth",
    "Mobius_PI_cumulative_usage",
    "Mobius_PI_cost_changes",
    "Mobius_PI_storage_growth",
    "Mobius_PI_user_type",
    "Mobius_PI_time",
    "Mobius_PI_product_type",
    "Mobius_PI_avg_cost_per_usage",
    "Mobius_PI_growth_rate",
    "Mobius_PI_avg_usage_growth_rate",
    "Mobius_PI_cumulative_cost",
    "Mobius_PI_total_usage",
    "Mobius_PI_usage_efficiency_trend",
    "Mobius_PI_avg_cost",
    "Mobius_PI_lowest_usage",
    "Mobius_PI_avg_storage_growth_rate",
    "Mobius_PI_avg_cost_per_storage_growth",
    "Mobius_PI_highest_usage",
    "Mobius_PI_cost_to_usage_ratio",
    "Mobius_PI_peak_hour",
    "Mobius_PI_cost_distribution",
    "Mobius_PI_avg_usage"
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
     
        let target = obj.id;
    let source = obj?.parent?.id;
        let genericEdge=obj.selectedOutputParams.reduce((edges, param) => {
            if(obj.outputParamsTag && obj.outputParamsTag[param]) {
              edges.push(
              {
                "source": target,
                "sourceHandle": target+param+"source",
                "target": "genericSchema",
                "targetHandle": "genericschema"+obj.outputParamsTag[param]+"target",
                "id": "reactflow__edge-"+target+target+param+"source-"+"genericSchemagenericschema"+obj.outputParamsTag[param]+"target",
                "animated":"true"
            });
            }
            console.log(obj,"hisravan")
           
            return edges;
          }, [])
          console.log(genericEdge,"generic")
        if (obj.parent === null) return genericEdge;
       let apiedges=obj.selectedOutputParams.reduce((edges, param) => {
        if (obj.indexes[param] === "secondary") {
          edges.push({
            source: source,
            target: target,
            sourceHandle: `${source}${param}source`,
            targetHandle: `${target}${param}target`,
            id: `${source}${param}source${target}${param}target`,
            style:
              {
                  strokeWidth: 1,
                  stroke: '#0159A1',
                },
          
          });
        }
        console.log(obj,"hisravan")
       
        return edges;
      }, [])
   
      
    
    
    return [...apiedges,...genericEdge];
    }
    
    
      function getNode(obj,idx){
        const position = {
            x: (idx+1)*200+ 200,
            y:  (idx+1)*20+ window.innerHeight,
          };
        return {
            id:obj.id,
            type: "position-logger",
            position,
            data:{
                name:obj.id,
                label:obj.id,
                selectedOutputParams:obj.outputParams,
                indexes:obj.indexes
            }
        }
    }
export function useFlow(){
    const {mapperData:{data1:array}}=useContext(MapperContext)
    let  initialNodes = useMemo(()=>{
        return [...flattenArray(array).map((obj,idx)=>getNode(obj,idx)),{
            id:"genericSchema",
            type: "position-logger",
            position:{x:(5)*200+ 200,y:400},
            data:{
                name:"genericschema",
                label:"genericschema",
                selectedOutputParams:analyticQueriesData
            }
        }]
    },[])
    let initialEdges = useMemo(()=>{
        return flattenArray(array)
.filter(obj => obj !== null) // exclude null objects, if any
.flatMap(getEdge)
.filter(edge => edge !== undefined)})
  return [initialNodes,initialEdges]
}