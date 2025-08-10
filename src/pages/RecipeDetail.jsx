import React, { useContext, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvider";

import Breadcrumbs from "../components/Breadcrumbs";
import StarRating from "../components/StarRating";
import ShareButtons from "../components/ShareButtons";
import LightboxModal from "../components/LightboxModal";

import StatGrid from "../components/StatGrid";
import IngredientList from "../components/IngredientList";
import StepTimeline from "../components/StepTimeline";
import ClipboardButton from "../components/ClipboardButton";
import QRCodeButton from "../components/QRCodeButton";

import saladFallback from "../assets/images/salad.jpg";

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes, favorites, toggleFavorite } = useContext(RecipeContext);
  const recipe = recipes.find((r) => r.id === id);
  const [open, setOpen] = useState(false);

  const related = useMemo(() => {
    if (!recipe) return [];
    const set = new Set(recipe.tags || []);
    return recipes
      .filter((r) => r.id !== id && (r.tags || []).some((t) => set.has(t)))
      .slice(0, 3);
  }, [recipe, recipes, id]);

  if (!recipe) {
    return (
      <main className="container py-14">
        <p className="text-center">找不到此食譜。</p>
        <div className="text-center mt-4">
          <Link className="underline" to="/recipes">
            回食譜列表
          </Link>
        </div>
      </main>
    );
  }

  const isFav = favorites.includes(recipe.id);
  const ingredients = recipe.ingredients?.length
    ? recipe.ingredients
    : ["鹽少許", "黑胡椒少許", "橄欖油 1 大匙", "蒜末 1 瓣"];
  const seasonings = recipe.seasonings?.length ? recipe.seasonings : [];

  return (
    <main className="container py-8 space-y-10">
      <Breadcrumbs
        trail={[{ to: "/recipes", label: "食譜" }, { label: recipe.title }]}
      />

      {/* Hero：大圖置中（上方多留白 → 往下移） */}
      <section className="space-y-5">
        <div
          className="mx-auto w-full max-w-[520px] aspect-square relative rounded-2xl overflow-hidden
                        bg-gray-100 dark:bg-gray-800"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = saladFallback;
            }}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setOpen(true)}
          />
          <LightboxModal
            open={open}
            src={recipe.image}
            alt={recipe.title}
            onClose={() => setOpen(false)}
          />
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={`absolute top-3 right-3 rounded-full px-3 py-1.5 text-sm transition
                        ${
                          isFav
                            ? "bg-rose-600 text-white"
                            : "bg-white/90 dark:bg-gray-900/70 border dark:border-gray-700"
                        }`}
          >
            {isFav ? "已收藏 ❤️" : "加入收藏 🤍"}
          </button>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-extrabold">{recipe.title}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {recipe.description}
          </p>

          {/* 評分 + 分享 + 列印 */}
          <div className="flex items-center justify-center gap-3">
            <StarRating recipeId={recipe.id} />
            <ShareButtons title={recipe.title} />
            <ClipboardButton text={window.location.href} />
            <QRCodeButton url={window.location.href} />
            <button
              onClick={() => window.print()}
              className="btn-ghost no-print"
            >
              列印
            </button>
          </div>
        </div>
      </section>

      {/* 圖標資訊列（卡片化） */}
      <section className="max-w-5xl mx-auto rounded-2xl border dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 p-5">
        <StatGrid recipe={recipe} />
      </section>

      {/* 標籤 */}
      <section className="max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {(recipe.tags || []).map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-sm rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              #{t}
            </span>
          ))}
        </div>
      </section>

      {/* 材料：左右雙欄卡片 */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 p-6">
          <h2 className="text-xl font-bold mb-3">食材</h2>
          <IngredientList items={ingredients} />
        </div>
        <div className="rounded-2xl border dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 p-6">
          <h2 className="text-xl font-bold mb-3">調味料</h2>
          <IngredientList items={seasonings} />
        </div>
      </section>

      {/* 步驟：時間線卡片 */}
      <section className="max-w-5xl mx-auto rounded-2xl border dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 p-6">
        <h2 className="text-xl font-bold mb-3">步驟</h2>
        <StepTimeline steps={recipe.steps || []} />
      </section>

      {/* 相關食譜 */}
      {related.length > 0 && (
        <section className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-3">你可能也會喜歡</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/recipes/${r.id}`}
                className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow transition"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-28 object-cover"
                />
                <div className="p-3">
                  <div className="font-semibold line-clamp-1">{r.title}</div>
                  <div className="text-xs text-gray-500">
                    {(r.tags || [])
                      .slice(0, 2)
                      .map((t) => `#${t}`)
                      .join(" ")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-5xl mx-auto">
        <Link
          to="/notes/edit"
          state={{ recipeId: recipe.id }}
          className="btn-secondary"
        >
          為此食譜新增筆記
        </Link>
      </div>
    </main>
  );
}
