import React from 'react';

export default function StatGrid({ recipe }) {
  if (!recipe) return null;
  const items = [
    { icon: '⏲️', label: '準備時間', value: `${recipe.prepTime ?? 0}分鐘` },
    { icon: '🍳', label: '烹飪時間', value: `${recipe.cookTime ?? 0}分鐘` },
    { icon: '👥', label: '份量',   value: `${recipe.servings ?? 1}人份` },
    { icon: '🔥', label: '熱量',   value: `${recipe.calories ?? 0}kcal` },
    { icon: '🧑‍🍳', label: '難度', value: recipe.difficulty || '簡單' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {items.map((it, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl mb-1">{it.icon}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{it.label}</div>
          <div className="font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}
