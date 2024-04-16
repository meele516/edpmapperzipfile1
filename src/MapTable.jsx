import React, { useState,useContext, useEffect } from 'react';
import EditableTable from './EditableTable';
import './MapTable.css';
import { MapperContext } from './MapperContext';
import { transformJsonToTable } from './utils.js/transformJsonToTable';
import { updateJsonFromTable } from './utils.js/updateJsonFromTable';
import { unflattenArray } from './utils.js/unflatten';
import { synchronizeTrees } from './utils.js/synchronizeTrees';

const MapTable = () => {
    const {mapperData,setMapperData} =useContext(MapperContext)
console.log(mapperData,"tada")
  const columns = [
    { Header: 'Selected', accessor: 'selected', type: 'checkbox' },
    { Header: 'Column Name', accessor: 'columnName', type: 'text' },
    { Header: 'Alias', accessor: 'alias', type: 'text' },
    {
      Header: 'Filter',
      accessor: 'filter',
      type: 'customdropdown',
      options: ['OR', 'AND'],
    },
    {
      Header: 'Aggregate',
      accessor: 'aggregate',
      type: 'dropdown',
      options: ['SUM', 'COUNT', 'MAX', 'MIN', 'AVG', ""],
    },
    { Header: 'Grouping', accessor: 'grouping', type: 'checkbox' },
  ];

  const [data, setData] = useState(transformJsonToTable(mapperData.data));

  const handleUpdate = (rowId, columnName, value) => {
    setData((prevData) => {
      // Find the index of the row with the matching id
      const rowIndex = prevData.findIndex((row) => row.id === rowId);
      if (rowIndex === -1) {
        // Row with the given id not found, return previous state
        return prevData;
      }

      // Create a new array with the previous data
      const newData = [...prevData];
      // Update the specific row with the new value
      newData[rowIndex] = {
        ...newData[rowIndex],
        [columnName]: value,
      };
      return newData;
    });
  };
useEffect(()=>{
    setMapperData(prev=>({...prev,data:synchronizeTrees(mapperData.data1,
        updateJsonFromTable(data,mapperData.data))}))
console.log(synchronizeTrees(mapperData.data1,
updateJsonFromTable(data,mapperData.data)),"reinject")
},[data])
  return (
<div style={{height:"100%",overflowY:"scroll"}}>
      <EditableTable columns={columns} data={data} onUpdate={handleUpdate} />
      </div>
  );
};

export default MapTable;
