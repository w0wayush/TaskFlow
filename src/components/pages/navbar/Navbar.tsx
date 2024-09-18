"use client";

import Image from "next/image";
import React, { useState } from "react";
import Flow from "@/assets/flow2.png";
import { Button } from "@/components/ui/button";
import { Theme } from "@/components/theme";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

type Props = {};

const Navbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="border-b-2 rounded-b-md p-4 border-slate-800">
      {/* FlowZone Logo */}
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-1 cursor-pointer">
          <Image src={Flow} alt="Flow Zone Logo" className="h-16 w-16"></Image>
          {/* <h1>FlowZone</h1> */}
          <h1>TaskFlow</h1>
        </div>

        {/* Sign-in / Sign-out and User Icon along with dark mode / light mode*/}
        <div className="flex">
          <div className="">
            <Theme />
          </div>
          <div>
            <div className="flex">
              {true ? (
                //   {isLoggedIn ? (
                <div className="flex items-center justify-center relative">
                  {/* Show users icon  */}
                  <div
                    className="flex items-center justify-center border ml-4 h-10 w-10 rounded-full hover:bg-gray-100 cursor-pointer"
                    onClick={handleToggle}
                  >
                    <FaUser className="text-lg text-gray-500" />
                  </div>
                  {/* Dropdown menu that will be shown on click */}
                  {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-slate-900 hover:bg-slate-700 text-white font-medium rounded-md border-gray border-2">
                      <ul>
                        <li
                          className="py-2 px-4 hover:bg-slate-700 cursor-pointer"
                          onClick={handleItemClick}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <FiLogOut />
                            <button>Logout</button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {/* Create Account Button for small screens */}
                  <Button
                    variant="default"
                    className="lg:hidden block px-4 py-2 text-sm font-medium  ml-4 flex"
                  >
                    <FaUser className="mr-2 " />
                    Create Account
                  </Button>

                  {/* Login / Register Button for Large screens */}
                  <Button
                    variant="default"
                    className="lg:block hidden lg:flex lg:px-4 lg:py-2 lg:text-sm lg:font-medium  lg:ml-4"
                  >
                    <FaUser className="mr-2 " />
                    Login / Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
