import React from 'react';
import toast from 'react-hot-toast';
export default function ClipboardButton({ text, className='' }) {
  return (
    <button
      className={`btn-ghost ${className}`}
      onClick={async ()=>{ await navigator.clipboard.writeText(text); toast.success('已複製連結'); }}
    >
      複製連結
    </button>
  );
}
