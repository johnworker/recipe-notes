import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Carousel({
  slides = [],
  interval = 4500,
  ratio = '5/4',         // ← 新增：預設 5:4
  className = ''
}) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const reduce = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, []);
  const timer = useRef(null);

  // 以 padding 建立比例框（5/4 = 0.8 -> 80%）
  const ratioClass = useMemo(() => {
    if (ratio === '1/1') return 'pt-[100%]';
    if (ratio === '5/4') return 'pt-[80%]';
    if (ratio === '16/9') return 'pt-[56.25%]';
    return 'pt-[100%]';
  }, [ratio]);

  useEffect(() => {
    if (reduce || hover || slides.length <= 1) return;
    timer.current = setInterval(() => setI(p => (p + 1) % slides.length), interval);
    return () => clearInterval(timer.current);
  }, [hover, reduce, slides.length, interval]);

  const go = (idx) => setI((idx + slides.length) % slides.length);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 ${ratioClass} ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      onKeyDown={(e)=>{ if(e.key==='ArrowRight') go(i+1); if(e.key==='ArrowLeft') go(i-1); }}
      aria-roledescription="carousel"
    >
      {/* 內層絕對定位填滿比例框 */}
      <div className="absolute inset-0">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx===i?'opacity-100':'opacity-0'}`}
            aria-hidden={idx!==i}
          >
            <img
              loading={idx===0?'eager':'lazy'}
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow">{s.title}</h3>
              {s.desc && <p className="mt-1 text-sm md:text-base opacity-90">{s.desc}</p>}
              {s.cta && (
                <Link to={s.cta.to} className="mt-3 inline-flex rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700">
                  {s.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* 箭頭 */}
        {slides.length > 1 && (
          <>
            <button aria-label="上一張" onClick={()=>go(i-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/70 border rounded-full w-9 h-9 grid place-items-center hover:bg-white">‹</button>
            <button aria-label="下一張" onClick={()=>go(i+1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/70 border rounded-full w-9 h-9 grid place-items-center hover:bg-white">›</button>
          </>
        )}

        {/* 點點 */}
        {slides.length > 1 && (
          <div className="absolute left-0 right-0 bottom-2 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`第 ${idx+1} 張`}
                onClick={()=>go(idx)}
                className={`w-2.5 h-2.5 rounded-full ${i===idx?'bg-white':'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
