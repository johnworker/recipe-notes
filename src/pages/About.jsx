import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="space-y-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900">
        <div className="page py-16 text-center space-y-4">
          <h1 className="text-4xl font-extrabold">關於料理筆記</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            我們相信「會做飯的人更自由」。料理筆記，把靈感、食材、步驟與回想，全部收進一個地方。
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/recipes" className="btn-primary">開始探索</Link>
            <a href="https://github.com" target="_blank" className="btn-secondary" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </section>

      {/* 特色 */}
      <section className="page">
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon="🧠" title="靈感不流失" text="收藏、標籤、筆記連動，回顧更快。" />
          <Feature icon="🧂" title="食材有條理" text="食材／調味分欄，一鍵複製與分享。" />
          <Feature icon="📱" title="跨裝置" text="PWA 友善：在家裡與超市都能打開。" />
        </div>
      </section>

      {/* 里程碑（點不會擋字，時間線靠左） */}
      <section className="page">
        <h2 className="text-2xl font-bold mb-6">里程碑</h2>
        <ol className="relative border-l border-blue-200 dark:border-blue-900/50 pl-6 space-y-8">
          <Milestone when="2025/06" title="起心動念" text="把散落在手機的食譜整合成網站 Side Project。" />
          <Milestone when="2025/07" title="料理卡片完成" text="統一 1:1 圖片比例、支援收藏與分享。" />
          <Milestone when="2025/08" title="筆記 & 富文字編輯" text="記錄每次改良，輸出 JSON 與 QRCode 分享。" />
        </ol>
      </section>

      {/* 結語 */}
      <section className="page pb-16">
        <div className="card p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            你也想一起讓料理更好玩嗎？歡迎到
            <a className="text-blue-600 hover:underline" href="https://github.com" target="_blank" rel="noreferrer"> GitHub </a>
            提 issue / PR！
          </p>
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="card p-6 hover-lift">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

function Milestone({ when, title, text }) {
  return (
    <li className="relative">
      <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/40" />
      <div className="card p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">{when}</div>
        <div className="font-semibold">{title}</div>
        <div className="text-gray-600 dark:text-gray-300">{text}</div>
      </div>
    </li>
  );
}

