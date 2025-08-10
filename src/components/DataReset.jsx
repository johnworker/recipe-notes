import React from 'react';

export default function DataReset() {
  const reset = () => {
    if (!confirm('將清除本機資料並還原預設食譜/收藏/筆記，確定？')) return;
    // 清舊 key：若你未改 Provider key，這兩行能確保乾淨
    localStorage.removeItem('recipes');
    localStorage.removeItem('recipes_v2');
    // 可選：把 v3 一起清除，重建預設資料
    localStorage.removeItem('recipes_v3');
    localStorage.removeItem('favorites');
    localStorage.removeItem('notes');
    location.reload();
  };
  return (
    <button onClick={reset}
      className="inline-flex items-center rounded-lg px-3 py-1.5 border hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
      還原預設資料
    </button>
  );
}
