import React from 'react';

/** 可愛小膠囊：icon 可用 emoji 或 SVG；label 是要顯示的文字 */
export default function StatPill({ icon = '⏱️', label = '', className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
                  bg-white/85 dark:bg-gray-900/70 backdrop-blur border text-sm
                  border-gray-200 dark:border-gray-700 ${className}`}
    >
      <span aria-hidden className="text-base leading-none">{icon}</span>
      <span className="leading-none">{label}</span>
    </div>
  );
}
