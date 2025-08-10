import React from 'react';

export default function CuteBand({ position = 'top', items = ['🍅','🥑','🍜','🍣','🥞','🥗'] }) {
  const isTop = position === 'top';
  return (
    <div aria-hidden
      className={`relative overflow-hidden h-14 md:h-16 ${isTop ? 'mb-3 -mt-2' : 'mt-3'}`}>
      <div className="absolute inset-0 pointer-events-none">
        {items.map((em, i) => (
          <div key={i}
            className="absolute text-2xl md:text-3xl animate-cute-float opacity-80"
            style={{
              left: `${5 + (i * 16) % 90}%`,
              top: isTop ? '0%' : '40%',
              animationDelay: `${i * 0.6}s`
            }}
          >
            {em}
          </div>
        ))}
      </div>
    </div>
  );
}
