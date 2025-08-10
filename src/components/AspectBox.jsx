import React from "react";

/** 保證 1:1、支援內部任意內容（通常放 <img/>） */
export default function AspectBox({ className = "", children }) {
  return (
    <div className={`aspect-square overflow-hidden rounded-xl ${className}`}>
      {children}
    </div>
  );
}
