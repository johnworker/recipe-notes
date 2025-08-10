import React, { useEffect } from 'react';

export default function LightboxModal({ open, src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <img src={src} alt={alt} className="max-w-[90vw] max-h-[90vh] rounded-lg shadow" onClick={(e)=>e.stopPropagation()} />
      <button className="absolute top-4 right-4 btn-ghost bg-white/70 dark:bg-gray-800/70" onClick={onClose} aria-label="關閉">✕</button>
    </div>
  );
}
