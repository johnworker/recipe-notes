import React, { useMemo } from "react";
import DataReset from "../components/DataReset";

const KEYS = ["recipes", "notes", "favorites"];

export default function Settings() {
  const preview = useMemo(() => {
    const data = {};
    KEYS.forEach((k) => {
      try {
        data[k] = JSON.parse(localStorage.getItem(k) || "[]");
      } catch {
        data[k] = [];
      }
    });
    return data;
  }, []);

  const download = () => {
    const payload = {};
    KEYS.forEach(
      (k) => (payload[k] = JSON.parse(localStorage.getItem(k) || "[]"))
    );
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "recipe-notes-backup.json",
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const onImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      KEYS.forEach((k) => {
        if (!Array.isArray(data[k])) throw new Error(`無效資料：${k}`);
      });
      KEYS.forEach((k) => localStorage.setItem(k, JSON.stringify(data[k])));
      alert("匯入成功，將重新載入頁面。");
      window.location.reload();
    } catch (err) {
      alert("匯入失敗：" + err.message);
    } finally {
      e.target.value = "";
    }
  };

  const resetAll = () => {
    if (!confirm("確定清除所有本機資料？此動作無法復原。")) return;
    KEYS.forEach((k) => localStorage.removeItem(k));
    alert("已清除，將重新載入頁面。");
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold">資料與備份</h1>
      <p className="text-gray-600 dark:text-gray-300">
        你可以在此匯出／匯入本機資料（食譜、筆記、收藏），或一鍵清除以還原預設
        Demo。
      </p>

      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-bold">快速動作</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={download} className="btn-primary">
            匯出 JSON
          </button>
          <label className="btn-secondary cursor-pointer">
            匯入 JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={onImport}
            />
          </label>
          <button onClick={resetAll} className="btn-ghost">
            清除所有資料
          </button>
          <DataReset />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-2">目前資料摘要</h3>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
          <li>食譜數：{preview.recipes?.length || 0}</li>
          <li>筆記數：{preview.notes?.length || 0}</li>
          <li>收藏數：{preview.favorites?.length || 0}</li>
        </ul>
      </div>
    </div>
  );
}
