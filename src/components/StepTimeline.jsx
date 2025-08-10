import React from 'react';

export default function StepTimeline({ steps = [] }) {
  if (!steps?.length) return (
    <p className="text-gray-500 dark:text-gray-400">（此食譜尚未提供烹調步驟）</p>
  );

  return (
    <ol className="space-y-5">
      {steps.map((s, idx) => (
        <li key={idx} className="grid grid-cols-[28px_1fr] gap-3 items-start step-item">
          <div className="step-dot">{idx + 1}</div>
          <div className="bg-white/70 dark:bg-gray-800/70 border dark:border-gray-700 rounded-xl p-3">
            {typeof s === 'string' ? <p>{s}</p> : <p>{s.text}</p>}
            {/* 可擴充：若步驟有圖片、時間…在這裡補 */}
          </div>
        </li>
      ))}
    </ol>
  );
}
