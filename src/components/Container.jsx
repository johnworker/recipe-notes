import React from "react";

export default function Container({ className = "", children }) {
  // 1200px 容器、依斷點加大左右 padding
  return (
    <div className={`max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
