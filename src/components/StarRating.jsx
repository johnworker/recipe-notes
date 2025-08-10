import React, { useState, useEffect } from 'react';

export default function StarRating({ recipeId, size = 22 }) {
  const key = `rating:${recipeId}`;
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem(key) || 0);
    setValue(isNaN(saved) ? 0 : saved);
  }, [key]);

  const set = (v) => { setValue(v); localStorage.setItem(key, String(v)); };

  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          onMouseEnter={()=>setHover(n)}
          onMouseLeave={()=>setHover(0)}
          onClick={()=>set(n)}
          aria-label={`評分 ${n} 星`}
          className="p-0.5"
          title={`${n} / 5`}
        >
          <svg width={size} height={size} viewBox="0 0 24 24" className={(hover>=n || value>=n) ? 'fill-yellow-400' : 'fill-gray-300 dark:fill-gray-600'}>
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </button>
      ))}
      <span className="text-sm text-gray-500 ml-1">{value || '尚未評分'}</span>
    </div>
  );
}
