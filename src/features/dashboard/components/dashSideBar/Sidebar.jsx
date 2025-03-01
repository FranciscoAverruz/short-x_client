/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { LuChevronLast, LuChevronFirst } from 'react-icons/lu';
import SidebarMenu from '@dashSideBar/SidebarMenu';
import Button from "@atoms/Button.jsx";

export function Sidebar({ expanded, setExpanded }) {

  const closeSidebar = () => {
    setExpanded(false);
  };

  return (
    <section className="absolute lg:relative z-[40]">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setExpanded(curr => !curr)}
          className="hidden lg:block fixed top-3 right-3 lg:absolute z-[2] justify-center items-center w-10 h-10 text-xs p-2"
          icon={expanded ? LuChevronFirst : LuChevronLast}
          variant="secondary"
        />
      </div>
     
      <nav className={`relative flex sectionBg flex-col justify-between h-[calc(100vh-4rem)] pt-3 border-r dark:border-none transition-all duration-100 ${expanded ? "lg:bg-auto w-full left-0" : "opacity-0 lg:opacity-100 -left-40 lg:left-0 w-0 lg:w-auto"}`}>
        <section className="">
          <section className="border-b dark:border-dark-btnMenuHoverBg flex px-3 py-1">
            <article className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0 left-52"}`}>
              <div className="flex flex-col h-fit pb-2">
                <div className="font-semibold text-light-Title dark:text-dark-Title text-xl/4 mb-0 py-0">John Doe</div>
                <div className="text-xs paragraphText my-0">johndoe@gmail.com</div>
              </div>
            </article>
          </section>

          <ul className="flex-1 px-3 pt-1 transition-all duration-300">
            <SidebarMenu expanded={expanded} closeSidebar={() => setExpanded(false)} />
          </ul>
        </section>
      </nav>
    </section>
  );
}