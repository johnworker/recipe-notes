import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/logo.svg";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

export default function Navbar() {
  // ✅ 一定要在元件函式裡呼叫 hook 才能取得 user / logout
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/60 border-b border-gray-200/60 dark:border-gray-800">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 group" aria-label="回到首頁">
          {/* 黑色 Logo 在暗色模式反白 */}
          <img src={logo} alt="" className="h-8 w-8 invert-0 dark:invert" />
          {/* 想保留文字可打開
          <span className="font-extrabold text-xl hidden sm:inline">料理筆記</span>
          */}
        </Link>

        <div className="flex items-center gap-4">
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
              className={({ isActive }) =>
                `hover:text-brand ${isActive ? "text-brand font-semibold" : ""}`
              }
            >
              {i.label}
            </NavLink>
          ))}

          {/* 只有登入者看得到的管理入口 */}
          {user && (
            <Link className="btn-ghost" to="/admin/recipes/new">
              新增食譜
            </Link>
          )}

          <ThemeToggle />

          {user ? (
            <button
              className="btn-ghost"
              onClick={() => {
                logout();
                toast("已登出");
              }}
            >
              登出
            </button>
          ) : (
            <Link className="btn-ghost" to="/login">
              登入
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
