import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import WaterQuality from "./pages/waterQuality";
import river from "./assets/river.png";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{
        backgroundImage: `url(${river})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      
      <div className="h-14 flex items-center px-4 bg-white/20 backdrop-blur-md text-white shadow">
        <FaBars
          className="text-xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <h1 className="ml-4 font-bold text-4xl absolute left-1/2 -translate-x-1/2">
          JalRakshak 💧
        </h1>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        
        <Sidebar isOpen={isOpen} />

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check" element={<WaterQuality />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;