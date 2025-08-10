import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/logo.svg";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-gray-900/70 border-b border-gray-100 dark:border-gray-800">
      <div className="container h-16 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 group"
          aria-label="回到首頁"
        >
          {/* 若是黑色底的 SVG/PNG，這樣在暗色會自動反白 */}
          <img src={logo} alt="" className="h-8 w-8 invert-0 dark:invert" />
          {/* 想保留文字可打開下面一行 */}
          {/* <span className="font-extrabold text-xl hidden sm:inline">料理筆記</span> */}
        </Link>{" "}
        <div className="flex items-center gap-6">
          {[
            { to: "/recipes", label: "食譜" },
            { to: "/favorites", label: "收藏" },
            { to: "/notes", label: "筆記" },
            { to: "/about", label: "關於" },
          ].map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                `hover:text-brand ${isActive ? "text-brand font-semibold" : ""}`
              }
            >
              {i.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `hover:text-brand ${isActive ? "text-brand font-semibold" : ""}`
            }
          >
            設定
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
