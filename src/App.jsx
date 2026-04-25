import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import PropertiesPanel from "./components/PropertiesPanel";
import Breadcrumb from "./components/Breadcrumb";
import "./App.css";

function App() {
  return (
    <div className="app">
      
      <TopBar />

      
      <div className="breadcrumb-container">
        <Breadcrumb />
      </div>

      
      <div className="main">
        <SideBar />

        <div className="center">
          
        </div>

        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;