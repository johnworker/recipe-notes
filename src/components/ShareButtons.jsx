import React from 'react';

export default function ShareButtons({ title, url = window.location.href }) {
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('已複製分享連結！');
      }
    } catch {/* 使用者取消 */}
  };
  return (
    <button onClick={share} className="btn-ghost" aria-label="分享">
      分享
    </button>
  );
}
