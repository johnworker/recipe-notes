import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';
import RecipeCard from '../components/RecipeCard';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import AniCounter from '../components/AniCounter';

export default function Favorites() {
  const { recipes, favorites } = useContext(RecipeContext);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('grid'); // grid | byTag
  const [sortKey, setSortKey] = useState('title_asc');

  const favRecipes = useMemo(() => {
    const list = recipes.filter(r => favorites.includes(r.id));
    const q = query.trim().toLowerCase();
    const filtered = !q ? list : list.filter(r => (r.title + ' ' + r.description).toLowerCase().includes(q));
    if (sortKey === 'title_asc') filtered.sort((a,b)=>a.title.localeCompare(b.title));
    if (sortKey === 'title_desc') filtered.sort((a,b)=>b.title.localeCompare(a.title));
    return filtered;
  }, [recipes, favorites, sortKey, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    favRecipes.forEach(r => (r.tags||['未分類']).forEach(t => {
      if (!map.has(t)) map.set(t, []);
      map.get(t).push(r);
    }));
    return Array.from(map.entries());
  }, [favRecipes]);

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold wiggle">我的收藏</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">共 {favRecipes.length} 道食譜</p>
          </div>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="搜尋收藏中的食譜"
              className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            />
            <select className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800" value={sortKey} onChange={e=>setSortKey(e.target.value)}>
              <option value="title_asc">名稱 A→Z</option>
              <option value="title_desc">名稱 Z→A</option>
            </select>
            <div className="border rounded-lg p-1">
              <button onClick={()=>setView('grid')}  className={`px-3 py-1 rounded btn-bounce ${view==='grid' ? 'bg-blue-600 text-white' : ''}`}>卡片</button>
              <button onClick={()=>setView('byTag')} className={`px-3 py-1 rounded btn-bounce ${view==='byTag' ? 'bg-blue-600 text-white' : ''}`}>依標籤</button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border rounded-xl p-4 text-center hover-lift">
            <div className="text-3xl font-extrabold"><AniCounter value={grouped.length} /></div>
            <div className="text-gray-500">標籤總數</div>
          </div>
          <div className="border rounded-xl p-4 text-center hover-lift">
            <div className="text-3xl font-extrabold">
              {grouped.length ? grouped[0][0] : '—'}
            </div>
            <div className="text-gray-500">熱門標籤</div>
          </div>
          <div className="border rounded-xl p-4 text-center hover-lift">
            <div className="text-3xl font-extrabold"><AniCounter value={favRecipes.length} /></div>
            <div className="text-gray-500">收藏總數</div>
          </div>
        </div>
      </Reveal>

      {favRecipes.length === 0 ? (
        <Reveal>
          <div className="text-center border rounded-xl p-10">
            <div className="text-4xl mb-2 animate-bounce">💛</div>
            <p className="mb-3">目前沒有收藏。</p>
            <Link to="/recipes" className="inline-flex rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 no-underline hover:no-underline btn-bounce">
              先去看看食譜 →
            </Link>
          </div>
        </Reveal>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favRecipes.map((r, idx) => (
            <Reveal key={r.id} delay={idx*40}>
              <div className="hover-lift">
                <RecipeCard recipe={r} />
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([tag, items], gi) => (
            <Reveal key={tag} delay={gi*60}>
              <section>
                <SectionHeader title={`#${tag}`} desc={`共 ${items.length} 道`} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((r, idx) => (
                    <Reveal key={r.id} delay={idx*40}>
                      <div className="hover-lift"><RecipeCard recipe={r} /></div>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
