import React, { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="回到頂部"
      className="fixed bottom-6 right-6 z-50 rounded-full px-4 py-3 shadow-lg
                 backdrop-blur bg-white/80 dark:bg-gray-800/80 hover:bg-white
                 border border-gray-200 dark:border-gray-700"
    >
      ↑
    </button>
  );
}
