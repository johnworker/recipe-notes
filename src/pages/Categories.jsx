import React, { useContext, useMemo } from 'react';
import { RecipeContext } from '../context/RecipeProvider';
import { useUi } from '../context/UiStore';
import RecipeCard from '../components/RecipeCard';

export default function Categories() {
  const { recipes } = useContext(RecipeContext);
  const { selectedTags, toggleTag } = useUi();

  const tagCount = useMemo(()=>{
    const map = {};
    recipes.forEach(r => (r.tags||[]).forEach(t => map[t]=(map[t]||0)+1));
    return Object.entries(map).sort((a,b)=>b[1]-a[1]);
  },[recipes]);

  const filtered = useMemo(()=>{
    if(!selectedTags.length) return recipes;
    return recipes.filter(r => (r.tags||[]).some(t=>selectedTags.includes(t)));
  }, [recipes, selectedTags]);

  return (
    <main className="container py-8 space-y-6">
      <h1 className="text-2xl font-extrabold">分類 / 標籤</h1>

      <div className="flex flex-wrap gap-2">
        {tagCount.map(([t, n])=>(
          <button key={t}
            onClick={()=>toggleTag(t)}
            className={`px-3 py-1.5 rounded-full border text-sm ${selectedTags.includes(t)?'bg-gray-900 text-white dark:bg-white dark:text-gray-900':'bg-white dark:bg-gray-800'}`}>
            #{t} <span className="opacity-70 ml-1">{n}</span>
          </button>
        ))}
        {!!selectedTags.length && <button className="btn-ghost" onClick={()=>toggleTag(selectedTags[0]) /* 連按清空也可另外做 */}>取消選取</button>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} aspect="1/1" />)}
      </div>
    </main>
  );
}
