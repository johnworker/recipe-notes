import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvider";
import RecipeCard from "../components/RecipeCard";
import SectionHeader from "../components/SectionHeader";
import AniCounter from "../components/AniCounter";

// 新增的元件
import Carousel from "../components/Carousel";
import Reveal from "../components/Reveal";
import CuteBand from "../components/CuteBand";
import CategoryCard from "../components/CategoryCard";

// 輪播用的三張圖（用你現有資產）
import ramen from "../assets/images/ramen.jpg";
import pancake from "../assets/images/pancake.jpg";
import salad from "../assets/images/salad.jpg";

export default function Home() {
  const { recipes, notes, favorites } = useContext(RecipeContext);

  const featured = recipes.slice(0, 4);
  const weeklyPicks = recipes.slice(1, 5);
  const tags = useMemo(
    () =>
      Array.from(new Set(recipes.flatMap((r) => r.tags || []))).slice(0, 10),
    [recipes]
  );
  const latestNotes = useMemo(
    () =>
      [...notes]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3),
    [notes]
  );

  const slides = [
    {
      image: ramen,
      title: "濃郁湯頭的日式拉麵",
      desc: "三步驟完成居家拉麵湯底",
      cta: { to: "/recipes", label: "找到拉麵食譜" },
    },
    {
      image: pancake,
      title: "假日必備的美式鬆餅",
      desc: "蓬鬆口感的小秘訣",
      cta: { to: "/recipes", label: "來做甜點" },
    },
    {
      image: salad,
      title: "清爽一夏的凱撒沙拉",
      desc: "五分鐘快速上桌",
      cta: { to: "/recipes", label: "更多沙拉" },
    },
  ];

  return (
    <div className="page space-y-16">
      <section className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 items-center bg-gradient-to-b from-blue-50/40 to-transparent dark:from-gray-900/40 rounded-3xl p-6">
        {/* 左：1:1 正方形輪播（最大 500px） */}
        <div className="w-full max-w-[500px] justify-self-center lg:justify-self-start">
          <Carousel slides={slides} ratio="1/1" className="w-full" />
        </div>

        {/* 右：標題 / 說明 / CTA / 小統計 */}
        <div>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            做菜靈感從這裡開始。
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            搜尋、收藏、寫下你的料理筆記。用標籤與排序更快找到靈感。
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/recipes" className="btn-primary">
              瀏覽食譜
            </Link>
            <Link to="/notes" className="btn-secondary">
              我的筆記
            </Link>
          </div>

          {/* 迷你統計（可愛、即時） */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "食譜數", value: recipes.length },
              { label: "收藏", value: favorites.length },
              { label: "筆記", value: notes.length },
            ].map((s) => (
              <div
                key={s.label}
                className="border rounded-xl p-4 text-center bg-white dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-0.5 transition"
              >
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 精選 */}
      <Reveal>
        <section>
          <SectionHeader
            title="精選食譜"
            desc="每天 4 道靈感，快速上手好吃不複雜。"
            right={
              <Link
                to="/recipes"
                className="btn-ghost no-underline hover:no-underline"
              >
                看全部 →
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((r, idx) => (
              <Reveal key={r.id} delay={idx * 60}>
                <RecipeCard recipe={r} aspect="1/1" />
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 本週主打 */}
      <Reveal>
        <section>
          <SectionHeader title="本週主打" desc="熱門主題／聚會必備／家常快手" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyPicks.map((r, idx) => (
              <Reveal key={r.id} delay={idx * 60}>
                <RecipeCard recipe={r} aspect="1/1" />
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <SectionHeader
            title="新進食譜"
            desc="剛上架的 5 道靈感，先收藏再說。"
            right={
              <Link
                to="/recipes"
                className="btn-ghost no-underline hover:no-underline"
              >
                看全部 →
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {recipes
              .filter((r) => Number(r.id) >= 7)
              .slice(0, 5)
              .map((r, idx) => (
                <Reveal key={r.id} delay={idx * 40}>
                  <RecipeCard recipe={r} aspect="1/1" />
                </Reveal>
              ))}
          </div>
        </section>
      </Reveal>

      {/* 熱搜標籤 */}
      <Reveal>
        <section>
          <SectionHeader title="種類" desc="用主題卡片快速找到靈感。" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { tag: "義大利麵", emoji: "🍝" },
              { tag: "日式", emoji: "🍣" },
              { tag: "韓式", emoji: "🌶️" },
              { tag: "泰式", emoji: "🍛" },
              { tag: "甜點", emoji: "🧁" },
              { tag: "沙拉", emoji: "🥗" },
              { tag: "海鮮", emoji: "🦐" },
              { tag: "家常", emoji: "🏠" },
              { tag: "快速", emoji: "⚡" },
              { tag: "配菜", emoji: "🥔" },
            ].map((c) => (
              <CategoryCard key={c.tag} tag={c.tag} emoji={c.emoji} />
            ))}
          </div>
        </section>{" "}
      </Reveal>

      {/* 最新筆記（沿用你原本邏輯） */}
      <Reveal>
        <section>
          <SectionHeader
            title="最新筆記"
            desc="記錄每次下廚的小成功。"
            right={
              <Link
                to="/notes"
                className="btn-ghost no-underline hover:no-underline"
              >
                查看全部
              </Link>
            }
          />
          {latestNotes.length === 0 ? (
            <div className="border rounded-xl p-6 text-gray-500">
              還沒有筆記，
              <Link
                className="text-blue-600 no-underline hover:no-underline"
                to="/notes/edit"
              >
                立即新增
              </Link>
              。
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestNotes.map((n) => (
                <li
                  key={n.id}
                  className="border rounded-xl p-4 bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(n.date).toLocaleDateString()}
                  </p>
                  {n.content && (
                    <p className="mt-2 line-clamp-3 text-gray-700 dark:text-gray-300">
                      {n.content}
                    </p>
                  )}
                  <Link
                    to={`/notes/edit/${n.id}`}
                    className="inline-block mt-3 text-blue-600 no-underline hover:no-underline"
                  >
                    繼續編輯 →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Reveal>
    </div>
  );
}
function Stat({ num, label }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-3xl font-extrabold">
        <AniCounter value={num} duration={800} />+
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

/** 小巧動畫圖示（不影響效能） */
function CuteFloat() {
  return (
    <div className="pointer-events-none absolute -right-2 -top-3 select-none text-4xl animate-bounce">
      🍳
    </div>
  );
}