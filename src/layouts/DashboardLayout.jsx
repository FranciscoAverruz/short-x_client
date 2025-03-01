/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@dashSideBar/Sidebar.jsx";
import DashNav from "@dashNavBar/DashNav.jsx";

const DashboardLayout = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg overflow-hidden w-full transition-colors duration-100">
      
      <nav className="w-screen h-full shadow-md z-[50]">
        <DashNav setExpanded={setExpanded} expanded={expanded}/>
      </nav>

      <main className="fixed top-16 flex flex-1 w-screen h-[calc(100vh-4rem)]">
        <section className="">
          <Sidebar expanded={expanded} setExpanded={setExpanded}/>
        </section>

        <section className="flex-1 md:p-6 overflow-y-auto h-full">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;