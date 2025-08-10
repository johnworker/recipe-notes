import React from "react";
import Reveal from "../components/Reveal";

export default function About() {
  const features = [
    "食譜清單：搜尋 / 標籤 / 排序 / 分頁",
    "收藏：一鍵加入或移除，專屬收藏頁",
    "筆記：新增 / 編輯 / 刪除，支援匯出",
    "圖片燈箱 / 評分 / 分享 / 列印",
    "深色主題、Lazy-load、骨架載入",
    "零套件互動動畫（Carousel / Reveal / CuteBand）",
  ];
  const timeline = [
    {
      date: "2025-07",
      title: "版型初版",
      desc: "建立路由、Navbar/Footer、首頁雛形。",
    },
    {
      date: "2025-07",
      title: "資料層與筆記",
      desc: "RecipeProvider + 筆記 CRUD + LocalStorage。",
    },
    {
      date: "2025-08",
      title: "互動與動畫",
      desc: "輪播、Reveal、收藏/筆記/關於動畫化。",
    },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Hero */}
      <Reveal>
        <section className="relative rounded-2xl p-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
          <div className="absolute -top-6 -left-6 w-40 h-40 blur-3xl rounded-full bg-indigo-200/60 dark:bg-indigo-500/20" />
          <div className="absolute -bottom-8 -right-8 text-6xl select-none">
            🍳
          </div>
          <h1 className="text-3xl font-extrabold mb-2">關於「料理筆記」</h1>
          <p className="text-gray-600 dark:text-gray-300">
            我們希望用最直覺的方式，幫你快速管理食譜、收藏靈感，並記錄每次下廚的小成功。
          </p>
        </section>
      </Reveal>

      {/* 功能卡片 */}
      <Reveal>
        <section>
          <h2 className="text-2xl font-bold mb-3">目前功能</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((t, i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="border rounded-xl p-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover-lift">
                  {t}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 技術與理念 */}
      <Reveal>
        <section className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">技術棧</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Vite + React 18 + React Router 6</li>
              <li>Tailwind CSS（class-based 暗黑模式）</li>
              <li>LocalStorage 狀態持久化（可替換成 API / Firebase）</li>
            </ul>
          </div>
          <div className="border rounded-xl p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">我們的理念</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>輕、快、好用：開箱即可記錄與搜尋。</li>
              <li>資料在你手上：先本機，隨時可接後端。</li>
              <li>注重日常：保留必要功能與漂亮版面。</li>
            </ul>
          </div>
        </section>
      </Reveal>

      {/* 時間線 */}
      <Reveal>
        <section>
          <h2 className="text-2xl font-bold mb-3">里程碑</h2>
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
            {timeline.map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <div className="relative mb-6">
                  <div className="absolute -left-3.5 top-1 w-3 h-3 rounded-full bg-blue-500" />
                  <div className="text-sm text-gray-500">{m.date}</div>
                  <div className="text-lg font-semibold">{m.title}</div>
                  <p className="text-gray-700 dark:text-gray-300">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
