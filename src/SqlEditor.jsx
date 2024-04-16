import React, { useContext, useEffect } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { MapperContext } from './MapperContext';


export const SqlEditor = ({value}) => {
    const {mapperData} =useContext(MapperContext)
    const [sqlQuery, setSqlQuery] = React.useState(mapperData.initialQuery(mapperData.data));
   
    useEffect(()=>{
setSqlQuery(mapperData.initialQuery(mapperData.data))
    },[mapperData.data])
    console.log(mapperData,"bhai")

    

    const onChange = (newSqlQuery) => {
      setSqlQuery(newSqlQuery);
      console.log(newSqlQuery,"sqlquery")
    };
  
  
    return (
      
      <AceEditor
      id="editor"
        aria-label="editor"
        mode="mysql"
        theme="solarized_dark"
        name="editor"
        width="100%"
        height="100%"
        fontSize={18}
        minLines={15}
        maxLines={10}
        wrapEnabled={true}
        showPrintMargin={false}
        showGutter
        placeholder="Write your query here..."
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={sqlQuery}
        onChange={onChange}
        showLineNumbers
      />
  
    );
  };
