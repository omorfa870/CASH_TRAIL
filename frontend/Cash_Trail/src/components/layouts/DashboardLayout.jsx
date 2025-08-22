import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar on top */}
      <Navbar activeMenu={activeMenu} />

      {/* Sidebar + main content */}
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <SideMenu activeMenu={activeMenu} />

        {/* Page content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
