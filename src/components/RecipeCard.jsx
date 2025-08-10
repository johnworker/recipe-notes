import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import StatPill from './StatPill';              // 若你有加資訊膠囊
import saladFallback from '../assets/images/salad.jpg';

export default function RecipeCard({ recipe, aspect = '16/9' }) {
  // 防呆：若沒傳 recipe，直接不要渲染，避免 ReferenceError
  if (!recipe) return null;

  const isNew = Number(recipe.id ?? 0) >= 7;
  const aspectClass = aspect === '1/1' ? 'aspect-square' : 'aspect-[16/9]';
  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

  return (
    <article className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow hover:-translate-y-0.5 transition">
      <div className={`relative overflow-hidden ${aspectClass} `}>
        <Link to={`/recipes/${recipe.id}`} className="block">
          <img
            loading="lazy"
            src={recipe.image}
            alt={recipe.title}
            onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = saladFallback; }}
            className="w-full h-full object-cover"
          />
        </Link>

        {isNew && (
          <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-rose-600 text-white">NEW</span>
        )}

        <div className="absolute top-2 right-2">
          <FavoriteButton recipeId={recipe.id} />
        </div>

        {/* 可選：卡片左下角的小資訊膠囊 */}
        <div className="absolute left-2 bottom-2 flex flex-wrap gap-1">
          <StatPill icon="⏱️" label={`${totalTime}分`} />
          <StatPill icon="🍽️" label={`${recipe.servings ?? 1}人`} />
          <StatPill icon="🔥" label={`${recipe.calories ?? 0}kcal`} />
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg line-clamp-1">
          <Link to={`/recipes/${recipe.id}`} className="no-underline hover:underline">
            {recipe.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{recipe.description}</p>

        <div className="mt-3 flex flex-wrap gap-1 justify-center">
          {(recipe.tags || []).map(t => (
            <Link
              key={t}
              to={`/recipes?tag=${encodeURIComponent(t)}`}
              className="text-xs px-2 py-1 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              #{t}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
