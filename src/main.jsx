import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SideDrawer from './SideDrawer.jsx'
import { SqlEditor } from './SqlEditor.jsx'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Tabs from './Tabs.jsx'
import { createContext } from 'react'
import { MapperProvider } from './MapperContext.jsx'
import MapTable from './MapTable.jsx'

const tabs = [
  { label: 'sql', content: <SqlEditor/> },
  { label: 'data', content: <div>This is the content of Tab 2</div> }
];


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <DndProvider backend={HTML5Backend}>
<MapperProvider>
   
    <SideDrawer/>
    <div style={{width:"100%",height:"60vh"}}>
    <App />
    </div>
  
   
    <div style={{width:"100%",height:"37vh",display:"flex"}}>
 <Tabs tabs={tabs}/>

    <MapTable/>

    </div>
  
    </MapperProvider>
    </DndProvider>
  </React.StrictMode>,
)
