"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Flow from "@/assets/flow2.png";
import { Button } from "@/components/ui/button";
import { Theme } from "@/components/theme";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { clearUser } from "@/app/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Navbar = () => {
  // const session = useSession();
  const userState = useSelector((state: RootState) => state.user);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const { user } = userState;
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);

      console.log(isScrolling);
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      setIsScrolling(true);

      // Set new timeout
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // console.log(session);
  //   const route = useRouter();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate.push("/login");
  };

  return (
    <div
      className={`fixed rounded-b-md p-4 border-slate-800 px-10 top-0 border-b-2 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/50 backdrop-blur-md border-slate-700 border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-1 cursor-pointer"
          // onClick={() => navigate.push("/")}
        >
          <Image src={Flow} alt="Flow Zone Logo" className="h-16 w-16" />
          <h1 className="text-lg font-bold">TaskFlow</h1>
        </Link>

        <div className="flex">
          {user && (
            <div className="flex items-center mr-4">
              <p className="sm:flex">
                <span className="sm:block hidden">Welcome, </span>
                {user.username}!
              </p>
            </div>
          )}
          <div className="sm:block hidden">
            <Theme />
          </div>
          <div>
            <div className="flex">
              {user ? (
                <div className="flex items-center justify-center relative">
                  <div
                    className="flex items-center justify-center border-2 ml-4 h-10 w-10 rounded-full hover:bg-gray-100 cursor-pointer"
                    onClick={handleToggle}
                  >
                    <FaUser className="text-lg text-gray-500" />
                  </div>
                  {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-slate-900 text-white font-medium rounded-md border-gray border-2 z-10">
                      <ul>
                        <li
                          className="py-2 px-4 hover:bg-slate-700 cursor-pointer"
                          onClick={() => {
                            handleItemClick();
                            navigate.push("/profile");
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <CgProfile size={20} />
                            <button>Profile</button>
                          </div>
                        </li>
                        <li
                          className="py-2 px-4 hover:bg-slate-700 cursor-pointer"
                          onClick={() => {
                            handleItemClick();
                            navigate.push("/kanban");
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <MdOutlineSpaceDashboard size={20} />
                            <button>Dashboard</button>
                          </div>
                        </li>
                        <li className="block sm:hidden relative">
                          <div className="flex items-center gap-4">
                            <Theme />
                            <div className="absolute left-12">Theme</div>
                          </div>
                        </li>
                        <li
                          className="py-2 px-4 hover:bg-slate-700 cursor-pointer"
                          onClick={() => {
                            handleItemClick();
                            handleLogout();
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <FiLogOut size={20} />
                            <button>Logout</button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Link href={"/login"}>
                    <Button
                      variant="default"
                      className="lg:hidden block px-4 py-2 text-sm font-medium ml-4 flex"
                    >
                      <FaUser className="mr-2" />
                      Create Account
                    </Button>
                  </Link>
                  <Link href={"/login"}>
                    <Button
                      variant="default"
                      className="lg:block hidden lg:flex lg:px-4 lg:py-2 lg:text-sm lg:font-medium lg:ml-4"
                    >
                      <FaUser className="mr-2" />
                      Login / Register
                    </Button>
                  </Link>
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
