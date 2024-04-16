import React from 'react';
import { useTable, useRowSelect } from 'react-table';

const EditableTable = ({ columns, data, onUpdate }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data, // Convert data object to array of rows
      autoResetSelectedRows: false,
      initialState: { selectedRowIds: {} },
      updateMyData: onUpdate,
    },
    useRowSelect
  );
  console.log(data, 'arey');

  const handleInputChange = (e, rowId, columnName) => {
    console.log(rowId, 'fuckedup');
    onUpdate(rowId, columnName, e.target.value);
  };
  const handleOptionChange = (e, rowId, columnName) => {
    console.log(e.target);
    let hasGroupByChecked = rows.some((row) => row.values['grouping']);
    if (!hasGroupByChecked) {
      return;
    }
    onUpdate(rowId, columnName, e.target.value);
    if (columnName === 'aggregate') {
      // If "Aggregate" is selected, ensure "Group By" is deselected
      onUpdate(rowId, 'grouping', false);
    }
  };
  const handleCustomInputChange = (value, rowId, columnName) => {
    onUpdate(rowId, columnName, value);
  };

  const handleCheckboxChange = (e, rowId, columnName) => {
    console.log(e.target);
    let hasselectedChecked = rows.some(
      (row) => row.original.id == rowId && row.values['selected']
    );
    if (!hasselectedChecked) {
      return;
    }
    let hasGroupByChecked = rows.some((row) => row.values['grouping']);
    let hasGroupByCheckedOthers = rows.some(
      (row) => row.original.id != rowId && row.values['grouping']
    );
    if (!hasGroupByChecked) {
      rows.map((row) => {
        if (row.values['selected']) onUpdate(row.original.id, 'grouping', true);
      });
    }
    if (
      !hasGroupByCheckedOthers &&
      rows.some((row) => row.original.id == rowId && row.values['grouping'])
    ) {
      rows.map((row) => {
        onUpdate(row.original.id, 'aggregate', '');
      });
    }

    onUpdate(rowId, columnName, e.target.checked);
    onUpdate(rowId, 'aggregate', '');
  };
  const handleSelectChange = (e, rowId, columnName) => {
    const newValue = e.target.checked;

    if (columnName == 'selected') {
      if (newValue) {
        // If the "selected" checkbox is unchecked

        let hasGroupByChecked = rows.some((row) => row.values['grouping']);
        console.log('saleem', hasGroupByChecked);
        if (!hasGroupByChecked) {
          // If any  row has "Group By" checked, can select
          onUpdate(rowId, columnName, newValue);
        }
      }
      
      else if(rows.some(
        (row) => row.original.id != rowId && row.values['selected']
      )){
        onUpdate(rowId, columnName, newValue);
      }
    }

    // Update the data with the new checkbox value
  };
  const renderInput = (column, value, onChange) => {
    switch (column.type) {
      case 'text':
        return <input type="text" value={value} onChange={onChange} />;
      case 'checkbox':
        return <input type="checkbox" checked={value} onChange={onChange} />;
      // Add more cases for additional input types here
      case 'dropdown':
        return (
          <select value={value} onChange={onChange}>
            {column.options.map((option) => (
              <option key={option} defaultValue={''} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'customdropdown':
        // Extract the dropdown value and editable text
        const regex = /(AND|OR) (.*)/g;
        const match = regex.exec(value);
        let dropdownValue = '';
        let editableText = '';
        if (match) {
          dropdownValue = match[1];
          editableText = match[2];
        }
        return (
          <>
          <div style={{display:"flex"}}> 
            <select
              value={dropdownValue}
              onChange={(e) => onChange(`${e.target.value} ${editableText}`)}
              style={{flex:1}}
            >
              {column.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={editableText.trim()} // Trim any leading/trailing whitespace
              onChange={(e) => onChange(`${dropdownValue} ${e.target.value}`)}
              style={{flex:3}}
            />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.id}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.original.id} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td key={cell.column.id}>
                  {cell.column.id == 'selected'
                    ? renderInput(cell.column, cell.value, (e) =>
                        handleSelectChange(e, row.original.id, cell.column.id)
                      )
                    : cell.column.id == 'grouping'
                    ? renderInput(cell.column, cell.value, (e) =>
                        handleCheckboxChange(e, row.original.id, cell.column.id)
                      )
                    : cell.column.id == 'filter'
                    ? renderInput(cell.column, cell.value, (value) =>
                        handleCustomInputChange(
                          value,
                          row.original.id,
                          cell.column.id
                        )
                      )
                    : cell.column.id == 'aggregate'
                    ? renderInput(cell.column, cell.value, (value) =>
                        handleOptionChange(
                          value,
                          row.original.id,
                          cell.column.id
                        )
                      )
                    : renderInput(cell.column, cell.value, (e) =>
                        handleInputChange(e, row.original.id, cell.column.id)
                      )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EditableTable;
