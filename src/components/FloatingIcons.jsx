import React from 'react';

// 漂浮可愛食材 emoji：純視覺裝飾（不阻擋點擊）
export default function FloatingIcons({ items = ['🍅','🥑','🍜','🍣','🥞','🥗'] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((em, i) => (
        <div
          key={i}
          className="absolute text-4xl md:text-5xl animate-float-slow opacity-70"
          style={{
            left: `${10 + (i * 15) % 80}%`,
            bottom: `${-10 - i*8}%`,
            animationDelay: `${i * 1.2}s`
          }}
        >
          {em}
        </div>
      ))}
    </div>
  );
}
