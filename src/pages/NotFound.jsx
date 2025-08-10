import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404 找不到頁面</h1>
      <p className="text-gray-600 mb-6">您所請求的頁面不存在。</p>
      <Link to="/" className="text-blue-500 hover:underline">回到首頁</Link>
    </div>
  );
}