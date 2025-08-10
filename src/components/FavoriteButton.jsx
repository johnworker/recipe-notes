import React, { useContext, useMemo } from 'react';
import { RecipeContext } from '../context/RecipeProvider';

/**
 * props:
 * - recipeId: string（建議使用）
 * - id: string（為了相容舊版，如果你還沒改，仍可用）
 * - size: 圓鈕尺寸（預設 36）
 */
export default function FavoriteButton({ recipeId, id, size = 36 }) {
  const rid = useMemo(() => recipeId ?? id, [recipeId, id]); // 相容舊 prop 名
  const { favorites, toggleFavorite } = useContext(RecipeContext);
  const isFav = favorites.includes(rid);

  if (!rid) return null; // 沒 id 就不顯示，避免誤加 undefined

  return (
    <button
      type="button"
      aria-label={isFav ? '移除收藏' : '加入收藏'}
      aria-pressed={isFav}
      onClick={(e) => {
        e.preventDefault(); // 不觸發卡片的 Link
        toggleFavorite(rid);
      }}
      className={`grid place-items-center bg-white/90 dark:bg-gray-900/70 rounded-full shadow border hover:bg-white transition
                  ${isFav ? 'scale-105' : ''}`}
      style={{ width: size, height: size }}
    >
      <span className={`text-lg transition-transform ${isFav ? 'animate-[heartPop_.25s_ease]' : ''}`}>
        {isFav ? '❤️' : '🤍'}
      </span>
      {/* 小動畫 keyframes（放到 index.css 也行） */}
      <style>{`
        @keyframes heartPop { 0%{transform:scale(.9)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
      `}</style>
    </button>
  );
}
