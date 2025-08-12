import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import logo from "../assets/images/logo.svg"; // 確保有這個檔；或改成你的 LOGO 路徑

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const firstLinkRef = useRef(null);

  // 路由切換時自動關閉抽屜
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // 抽屜開啟時：鎖捲動 + Esc 關閉 + 導覽第一個連結聚焦
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
      const onKey = (e) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      setTimeout(() => firstLinkRef.current?.focus(), 50);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, [open]);

  const LINKS = [
    { to: "/recipes", label: "食譜" },
    { to: "/favorites", label: "收藏" },
    { to: "/notes", label: "筆記" },
    { to: "/about", label: "關於" },
    { to: "/settings", label: "設定" },
  ];

  const DesktopMenu = () => (
    <div className="hidden md:flex items-center gap-5">
      {LINKS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `transition-colors hover:text-blue-600 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-gray-200"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}

      {user && (
        <Link
          to="/admin/recipes/new"
          className="rounded-lg px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700"
        >
          新增食譜
        </Link>
      )}

      {user ? (
        <button
          onClick={() => {
            logout();
            toast("已登出");
          }}
          className="rounded-lg px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          登出
        </button>
      ) : (
        <Link
          to="/login"
          className="rounded-lg px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          登入
        </Link>
      )}

      <ThemeToggle />
    </div>
  );

  const MobileBurger = () => (
    <button
      aria-label="開關選單"
      onClick={() => setOpen(true)}
      className="md:hidden rounded-md p-2 border border-gray-300/60 dark:border-gray-700
                 bg-white/80 dark:bg-gray-900/80 backdrop-blur
                 shadow-sm hover:shadow transition-all"
    >
      {/* 簡單的三條線漢堡圖示 */}
      <span className="block w-6 h-0.5 bg-current mb-1"></span>
      <span className="block w-6 h-0.5 bg-current mb-1"></span>
      <span className="block w-6 h-0.5 bg-current"></span>
    </button>
  );

  return (
    <>
      {/* 置頂導覽列 */}
      <nav className="sticky top-0 z-40 backdrop-blur bg-white/75 dark:bg-gray-900/60 border-b border-gray-200/60 dark:border-gray-800">
        <div className="container h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2" aria-label="回到首頁">
            <img className="h-9 w-9 dark:invert" src={logo} alt="" />
            <span className="sr-only">料理筆記</span>
          </Link>

          <DesktopMenu />
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileBurger />
          </div>
        </div>
      </nav>

      {/* 手機：遮罩 + 右側抽屜（與背景清楚區隔） */}
      {/* 遮罩（點擊關閉） */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                    bg-black/45 backdrop-blur-sm`}
        aria-hidden={!open}
      />

      {/* 抽屜本體 */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm md:hidden
                    bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800
                    shadow-2xl transform transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* 抽屜頭：LOGO + 關閉 */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="inline-flex items-center gap-2">
            <img className="h-8 w-8 dark:invert" src={logo} alt="" />
            <span className="font-semibold">料理筆記</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="關閉選單"
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        {/* 抽屜內容 */}
        <div className="px-4 py-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          {LINKS.map((item, idx) => (
            <NavLink
              key={item.to}
              to={item.to}
              ref={idx === 0 ? firstLinkRef : undefined}
              className={({ isActive }) =>
                `block w-full px-3 py-3 rounded-lg text-base transition-colors
                 ${isActive
                   ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-blue-100 dark:ring-blue-800"
                   : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="my-3 border-t border-gray-200 dark:border-gray-800"></div>

          {user && (
            <Link
              to="/admin/recipes/new"
              className="block w-full px-3 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-center"
            >
              新增食譜
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                logout();
                toast("已登出");
                setOpen(false);
              }}
              className="w-full mt-2 px-3 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              登出
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full mt-2 px-3 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-center"
            >
              登入
            </Link>
          )}

          <div className="my-3 border-t border-gray-200 dark:border-gray-800"></div>

          {/* 在抽屜內也可切換主題 */}
          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-gray-600 dark:text-gray-300">深色模式</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
