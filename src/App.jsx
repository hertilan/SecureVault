import { useState, useCallback } from 'react';
import fileData from './data/data.json';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Breadcrumb from './components/Breadcrumb';
import CenterPanel from './components/CenterPanel';
import PropertiesPanel from './components/PropertiesPanel';
import './App.css';

function buildBreadcrumbItems(path) {
  return path.map((label, index) => ({
    label,
    path: path.slice(0, index + 1).join('/'),
  }));
}

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentItems, setRecentItems] = useState([]);

  const handleSelect = useCallback((item) => {
    setSelectedItem(item);

    // Folders set the breadcrumb to their exact tree path
    if (item.type === 'folder' && item.treePath) {
      setCurrentPath(['Home', ...item.treePath]);
    }

    // Track recently opened (deduplicate by id, newest first, max 10)
    setRecentItems((prev) => {
      const filtered = prev.filter((r) => r.id !== item.id);
      return [{ ...item, openedAt: Date.now() }, ...filtered].slice(0, 5);
    });
  }, []);

  const handleNavigate = useCallback((path) => {
    const parts = path.split('/').filter(Boolean);
    setCurrentPath(parts.length ? parts : ['Home']);
  }, []);

  const breadcrumbItems = buildBreadcrumbItems(currentPath);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Breadcrumb items={breadcrumbItems} onNavigate={handleNavigate} />

      <div className="flex flex-1 overflow-hidden">
        <SideBar
          items={fileData}
          selectedId={selectedItem?.id}
          onSelect={handleSelect}
          searchQuery={searchQuery}
        />

        <CenterPanel
          recentItems={recentItems}
          onSelect={handleSelect}
          selectedId={selectedItem?.id}
        />

        <PropertiesPanel selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default App;
