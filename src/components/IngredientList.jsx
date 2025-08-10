import React from 'react';

export default function IngredientList({ items = [] }) {
  if (!items?.length) return (
    <p className="text-gray-500 dark:text-gray-400">（此食譜尚未提供食材清單）</p>
  );

  return (
    <ul className="list-none space-y-2 ingredient-list">
      {items.map((line, i) => (
        <li key={i} className="pl-7 relative">
          <span className="ingredient-bullet" aria-hidden>✔</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}
