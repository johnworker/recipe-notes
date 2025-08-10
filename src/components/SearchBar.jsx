import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring"
      placeholder="搜尋標題或標籤…"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
