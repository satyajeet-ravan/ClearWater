import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTint } from "react-icons/fa";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import WaterQuality from "./pages/waterQuality";
import Login from "./pages/login";
import Ngos from "./pages/ngos";
import Profile from "./pages/profile";
import Register from "./pages/register";
import History from "./pages/history";
import LandingPage from "./pages/Landingpage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isPublicPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Top bar for authenticated pages */}
      {!isPublicPage && (
        <div className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            >
              <FaBars />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                <FaTint className="text-white text-xs" />
              </div>
              <span className="text-lg font-bold text-gray-900">JalRakshak.</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {!isPublicPage && <Sidebar isOpen={isOpen} />}

        <div className={`flex-1 overflow-y-auto ${isPublicPage ? "" : "p-6"}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/check" element={<WaterQuality />} />
              <Route path="/ngos" element={<Ngos />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
