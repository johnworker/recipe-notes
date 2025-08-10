export default function EmptyState({ title="目前沒有資料", hint, action }) {
  return (
    <div className="card p-10 text-center">
      <div className="text-5xl mb-2">🍽️</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {hint && <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
