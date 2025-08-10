import React from 'react';

export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 ${className}`}>
      {children}
    </span>
  );
}
