import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme'; // 'dark' | 'light'

// 套用到 <html> 的 class（Tailwind 需要）
function applyTheme(isDark) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
}

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(false);

  // 初始化：localStorage > 系統偏好
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefers = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored === 'dark' : prefers;
    setIsDark(initial);
    applyTheme(initial);
  }, []);

  // 切換：這裡才有 nextIsDark（先宣告再使用）
  const toggle = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    applyTheme(nextIsDark);
    localStorage.setItem(STORAGE_KEY, nextIsDark ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      title={isDark ? '切換為亮色' : '切換為暗色'}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border 
                  bg-white/80 dark:bg-gray-900/70 dark:border-gray-700
                  hover:bg-white transition ${className}`}
    >
      <span role="img" aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
      <span className="text-sm">{isDark ? '暗色' : '亮色'}</span>
    </button>
  );
}
