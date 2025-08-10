import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ trail = [] }) {
  return (
    <nav className="text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li><Link to="/" className="hover:underline">首頁</Link></li>
        {trail.map((t, i) => (
          <li key={i} className="flex items-center gap-2">
            <span>/</span>
            {t.to ? <Link to={t.to} className="hover:underline">{t.label}</Link> : <span aria-current="page">{t.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
