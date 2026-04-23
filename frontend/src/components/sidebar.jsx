import { Link, useLocation } from "react-router-dom";
import { FaHome, FaWater, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/home", icon: FaHome, label: "Home" },
  { to: "/check", icon: FaWater, label: "River Water Quality" },
  { to: "/manual", icon: FaWater, label: "Your Water Quality" },
  { to: "/history", icon: FaHistory, label: "History" },
  { to: "/ngos", icon: RiUserCommunityFill, label: "NGOs" },
  { to: "/profile", icon: CgProfile, label: "Profile" },
];

function Sidebar({ isOpen }) {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div
      className={`bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shrink-0 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      <nav className="flex-1 py-4 space-y-1 px-2">
        {links.map(({ to, icon: Icon, label }) => {
          const active = location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors no-underline ${
                active
                  ? "bg-primary-50 text-primary-800 border-l-3 border-primary-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`text-lg shrink-0 ${active ? "text-primary-600" : "text-gray-400"}`} />
              {isOpen && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-4">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer"
        >
          <FaSignOutAlt className="text-lg shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;