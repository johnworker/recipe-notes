import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="border rounded-xl p-4 animate-pulse">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}
