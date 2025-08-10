import React from 'react';

export default function SectionHeader({ title, desc, right }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        {desc && <p className="text-gray-600 dark:text-gray-300">{desc}</p>}
      </div>
      {right}
    </div>
  );
}
