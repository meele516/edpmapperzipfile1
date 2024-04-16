import { createContext, useEffect, useMemo, useState } from 'react'
export const MapperContext =createContext()
import { generateMapping } from './utils.js/Join'
import { transformJsonToTable } from './utils.js/transformJsonToTable';

export const MapperProvider=({children})=>{
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


const [mapperData,setMapperData] = useState({
    data:[
      {
         "id": "TablesStorage",
         "name": "TablesStorage",
          "schemaID": "660bdb1768ba6066b351fa8f",
            "where":{
                   "table_name":"OR = saleem"
                 },
                 "groupBy":{
                    
                 },
         "children": [
             {
                 "id": "TableStorageUsageTimeLine",
                 "name": "TableStorageUsageTimeLine",
                 "children": [],
                 "selectedOutputParams": [
                     "project_id",
                     "table_name"
                 ],
                 "outputParams": [
                     "project_id",
                     "table_name"
                 ],
              
                 
            
                 "schemaID": "660cf58ef106f9382168ffb2",
                
                 "outPutResponse": "65fd15e11574a22f5d1a0d36",
                 "outputParamsTag": {
                     "project_id": "Mobius_PI_id",
                     "table_name": "Mobius_PI_user_id"
                 },
                 "indexes": {
                     "project_id": "secondary",
                     "table_name": "primary"
                 },
                 "joincondition":{
                     "project_id":"project_id"
                 },
                 "where":{
                   "project_id":"OR = 10"
                 },
                  "groupBy":{
                 
                    
                 }
             }
         ],
         "selectedOutputParams": [
             "table_name",
             "project_id"
         ],
         "outputParams": [
             "table_name",
             "project_id",
             "apple_ball"
         ],
     
         "outputParamsTag": {
              "project_id": "Mobius_project",
                     "table_name": "Mobius_table"
         },
         "indexes": {
             "table_name": "primary",
             "project_id": "primary"
         }
         ,
         joincondition:{
           
         }
     }
         ],
    data1:[
      {
         "id": "TablesStorage",
         "name": "TablesStorage",
          "schemaID": "660bdb1768ba6066b351fa8f",
            "where":{
                   "table_name":"OR = saleem"
                 },
                 "groupBy":{
                    
                 },
         "children": [
             {
                 "id": "TableStorageUsageTimeLine",
                 "name": "TableStorageUsageTimeLine",
                 "children": [],
                 "selectedOutputParams": [
                     "project_id",
                     "table_name"
                 ],
                 "outputParams": [
                     "project_id",
                     "table_name"
                 ],
              
                 
            
                 "schemaID": "660cf58ef106f9382168ffb2",
                
                 "outPutResponse": "65fd15e11574a22f5d1a0d36",
                 "outputParamsTag": {
                     "project_id": "Mobius_PI_id",
                     "table_name": "Mobius_PI_user_id"
                 },
                 "indexes": {
                     "project_id": "secondary",
                     "table_name": "primary"
                 },
                 "joincondition":{
                     "project_id":"project_id"
                 },
                 "where":{
                   "project_id":"OR = 10"
                 },
                  "groupBy":{
                
                    
                 }
             }
         ],
         "selectedOutputParams": [
             "table_name",
             "project_id"
         ],
         "outputParams": [
             "table_name",
             "project_id",
             "apple_ball"
         ],
     
         "outputParamsTag": {
              "project_id": "Mobius_project",
                     "table_name": "Mobius_table"
         },
         "indexes": {
             "table_name": "primary",
             "project_id": "primary"
         }
         ,
         joincondition:{
           
         }
     }
         ],     
    initialQuery:generateMapping,
  
    })
    console.log(mapperData.data,"bull")
const data1=useMemo(()=>{
transformJsonToTable(mapperData.data)
},[]) 
return <MapperContext.Provider value={{mapperData:mapperData,setMapperData:setMapperData}}>
    {children}
</MapperContext.Provider>
}
