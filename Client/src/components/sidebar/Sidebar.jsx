import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white py-8 px-4 fixed top-16 bottom-0 border-r border-gray-200">
      <ul className="space-y-4">
        <Link to="/project">
          <li
            className={`cursor-pointer flex items-center space-x-2 ${
              location.pathname === "/project" ? "bg-blue-50" : ""
            } px-4 py-2 rounded-md`}
          >
            <span>
              <Link to="/project"> 📁 </Link>
            </span>
            <span className="text-sm font-medium text-gray-700">Project</span>
          </li>
        </Link>
        <Link to="/createtask">
          <li
            className={`cursor-pointer flex items-center space-x-2 ${
              location.pathname === "/createtask"
                ? "bg-blue-50"
                : "hover:bg-blue-50"
            } px-4 py-2 rounded-md`}
          >
            <span>📝</span>
            <span className="text-sm font-medium text-gray-700">Tasks</span>
          </li>
        </Link>
        <li
          className={`cursor-pointer flex items-center space-x-2 hover:bg-blue-50 px-4 py-2 rounded-md`}
        >
          <span>📊</span>
          <span className="text-sm font-medium text-gray-700">Work Logs</span>
        </li>
        <li
          className={`cursor-pointer flex items-center space-x-2 hover:bg-blue-50 px-4 py-2 rounded-md`}
        >
          <span>⚙️</span>
          <span className="text-sm font-medium text-gray-700">Performance</span>
        </li>
        <li
          className={`cursor-pointer flex items-center space-x-2 hover:bg-blue-50 px-4 py-2 rounded-md`}
        >
          <span>🔧</span>
          <span className="text-sm font-medium text-gray-700">Settings</span>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
