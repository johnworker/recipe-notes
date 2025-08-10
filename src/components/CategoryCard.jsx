import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';

export default function CategoryCard({ tag, emoji }) {
  const { recipes } = useContext(RecipeContext);
  const count = useMemo(
    () => recipes.filter(r => (r.tags || []).includes(tag)).length,
    [recipes, tag]
  );

  return (
    <Link to={`/recipes?tag=${encodeURIComponent(tag)}`} className="no-underline group">
      <div className="border rounded-xl p-5 bg-white dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-0.5 hover:shadow transition h-full flex flex-col items-center text-center">
        <div className="text-4xl mb-2">{emoji}</div>
        <div className="font-semibold">#{tag}</div>
        <div className="text-xs text-gray-500 mt-1">共 {count} 道</div>
      </div>
    </Link>
  );
}
