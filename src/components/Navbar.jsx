import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/logo.svg";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const Menu = () => (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      {[
        { to: "/recipes", label: "食譜" },
        { to: "/favorites", label: "收藏" },
        { to: "/notes", label: "筆記" },
        { to: "/about", label: "關於" },
        { to: "/settings", label: "設定" },
      ].map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
          }
        >
          {i.label}
        </NavLink>
      ))}

      {user && (
        <Link className="btn-ghost md:ml-2" to="/admin/recipes/new" onClick={() => setOpen(false)}>
          新增食譜
        </Link>
      )}

      {user ? (
        <button
          className="btn-ghost"
          onClick={() => {
            logout();
            toast("已登出");
            setOpen(false);
          }}
        >
          登出
        </button>
      ) : (
        <Link className="btn-ghost" to="/login" onClick={() => setOpen(false)}>
          登入
        </Link>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/60 border-b border-gray-200/60 dark:border-gray-800">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2" aria-label="回到首頁">
          <img src={logo} alt="" className="h-8 w-8 invert-0 dark:invert" />
        </Link>

        {/* 桌機 */}
        <div className="hidden md:flex items-center gap-4">
          <Menu />
          <ThemeToggle />
        </div>

        {/* 手機：漢堡 */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="開關選單"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 手機抽屜 */}
      {open && (
        <div
          className="md:hidden border-t dark:border-gray-800 bg-white/95 dark:bg-gray-900/95"
        >
          <div className="container py-4">
            <Menu />
          </div>
        </div>
      )}
    </nav>
  );
}
