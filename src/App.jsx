import { useState } from 'react';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import PropertiesPanel from './components/PropertiesPanel';
import Breadcrumb from './components/Breadcrumb';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="border-b border-border">
        <Breadcrumb />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto bg-background" />
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
