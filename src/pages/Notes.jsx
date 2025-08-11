import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvider";
import formatDate from "../utils/formatDate";
import Reveal from "../components/Reveal";

export default function Notes() {
  const { notes, setNotes, recipes } = useContext(RecipeContext);
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("date_desc"); // date_desc | date_asc | title

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    let list = !kw
      ? notes
      : notes.filter((n) => {
          const recipe = recipes.find((r) => r.id === n.recipeId);
          const hay = (
            n.title +
            " " +
            n.content +
            " " +
            (recipe?.title || "")
          ).toLowerCase();
          return hay.includes(kw);
        });
    if (sortKey === "date_desc")
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortKey === "date_asc")
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortKey === "title")
      list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [q, notes, recipes, sortKey]);

  const remove = (id) => {
    if (!confirm("確定刪除此筆記？")) return;
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="page space-y-6">
      <Reveal>
        <div className="grid gap-3 md:grid-cols-[1fr_auto] items-end">
          <div>
            <h1 className="text-2xl font-bold wiggle">我的筆記</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              共 {notes.length} 筆
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜尋標題 / 內容 / 關聯食譜"
              className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 w-full"
            />
            <select
              className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 w-full"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="date_desc">時間：新 → 舊</option>
              <option value="date_asc">時間：舊 → 新</option>
              <option value="title">標題 A→Z</option>
            </select>
            <Link
              to="/notes/edit"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700 no-underline hover:no-underline w-full"
            >
              新增筆記
            </Link>
          </div>
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <Reveal>
          <div className="text-center border rounded-xl p-10">
            <div className="text-4xl mb-2 animate-bounce">📝</div>
            <p className="mb-3 text-gray-500">沒有找到符合的筆記。</p>
            <Link
              to="/notes/edit"
              className="inline-flex rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 no-underline hover:no-underline btn-bounce"
            >
              寫一篇新筆記 →
            </Link>
          </div>
        </Reveal>
      ) : (
        <ul className="space-y-4">
          {filtered.map((n, idx) => {
            const recipe = recipes.find((r) => r.id === n.recipeId);
            return (
              <Reveal key={n.id} delay={idx * 40}>
                <li className="border rounded-xl p-4 hover-lift">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{n.title}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(n.date)} {recipe && `｜${recipe.title}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/notes/edit/${n.id}`}
                        className="inline-flex rounded-lg px-3 py-1.5 border hover:bg-gray-100 dark:hover:bg-gray-800 no-underline hover:no-underline btn-bounce"
                      >
                        編輯
                      </Link>
                      <button
                        onClick={() => remove(n.id)}
                        className="inline-flex rounded-lg px-3 py-1.5 border hover:bg-gray-100 dark:hover:bg-gray-800 btn-bounce"
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                  {n.content && (
                    <p className="mt-2 whitespace-pre-wrap">{n.content}</p>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ul>
      )}
    </div>
  );
}
