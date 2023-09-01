// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

import { styles } from "../../styles";
import { menu, close } from "../../assets";

const PineappleNavbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { logoutSuccess, getUserFromToken } = useContext(AuthContext);
  const user = getUserFromToken();

  const navLinks = [
    {
      id: "upload",
      title: "Upload",
    },
    {
      id: "saved",
      title: "Saved",
    },
    // {
    //   id: "support",
    //   title: "Support",
    // },
  ];

  // console.info(">>>> active: ", active);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 left-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7x1 mx-auto">
        <Link
          to={`/`}
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            // window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            {user.name}
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => {
                console.info(">>> link title: ", link.title);
                setActive(link.title);
              }}
            >
              <a href={`${link.id}`}>{link.title}</a>
            </li>
          ))}
          <span
            className="cursor-pointer text-secondary"
            onClick={logoutSuccess}
          >
            Logout
          </span>
        </ul>

        {/* MOBILE NAVIGATION BAR */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          {/* mobile toggle menu items */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } fonts-poppins text-[16px] font-medium cursor-pointer`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`${link.id}`}>{link.title}</a>
                </li>
              ))}
              <span
                className="cursor-pointer text-secondary"
                onClick={logoutSuccess}
              >
                Logout
              </span>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PineappleNavbar;
