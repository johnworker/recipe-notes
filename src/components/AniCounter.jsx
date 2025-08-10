import React, { useEffect, useRef, useState } from 'react';

export default function AniCounter({ value = 0, duration = 900, className = '' }) {
  const [show, setShow] = useState(false);
  const [num, setNum] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.disconnect(); }
    }, { threshold: 0.4 });
    el && io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!show) return;
    let start = null;
    const from = 0;
    const to = Number(value) || 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setNum(Math.floor(from + (to - from) * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [show, value, duration]);

  return <span ref={ref} className={className}>{num}</span>;
}
