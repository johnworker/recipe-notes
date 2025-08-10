import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  const a = "no-underline hover:no-underline";

  return (
    <footer className="mt-16 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200 border-t border-gray-200 dark:border-gray-800">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold mb-2">料理筆記</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            用最直覺的方式管理食譜、收藏靈感、記錄下廚心得。
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">探索</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className={a} to="/recipes">食譜</Link></li>
            <li><Link className={a} to="/favorites">收藏</Link></li>
            <li><Link className={a} to="/notes">筆記</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">關於</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className={a} to="/about">我們的理念</Link></li>
            <li><a className={a} href="mailto:hello@example.com">聯絡我們</a></li>
            <li><a className={a} href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 text-center py-4 text-sm">
        © {year} 料理筆記 · All rights reserved.
      </div>
    </footer>
  );
}
