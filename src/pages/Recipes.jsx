import React, { useContext, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';
import SectionHeader from '../components/SectionHeader';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import Reveal from '../components/Reveal';

export default function Recipes() {
  const { recipes } = useContext(RecipeContext);

  // 讀取 URL 參數（支援 /recipes?tag=xxx&q=keyword&sort=title_asc&page=1）
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const currentTag = params.get('tag') || 'all';
  const sort = params.get('sort') || 'title_asc';
  const page = Math.max(1, parseInt(params.get('page') || '1', 10));
  const perPage = 6; // 每頁顯示數量

  // 取出所有標籤（產生標籤快速篩選）
  const allTags = useMemo(
    () => Array.from(new Set(recipes.flatMap(r => r.tags || []))).sort(),
    [recipes]
  );

  // 篩選＋排序
  const filtered = useMemo(() => {
    let list = recipes;

    if (currentTag !== 'all') {
      list = list.filter(r => (r.tags || []).includes(currentTag));
    }

    if (q.trim()) {
      const kw = q.trim().toLowerCase();
      list = list.filter(r => {
        const hay = (r.title + ' ' + r.description + ' ' + (r.tags || []).join(' ')).toLowerCase();
        return hay.includes(kw);
      });
    }

    // 排序（名稱、新舊）
    if (sort === 'title_asc')  list = [...list].sort((a,b)=>a.title.localeCompare(b.title));
    if (sort === 'title_desc') list = [...list].sort((a,b)=>b.title.localeCompare(a.title));
    if (sort === 'newest')     list = [...list].sort((a,b)=>Number(b.id)-Number(a.id));
    if (sort === 'oldest')     list = [...list].sort((a,b)=>Number(a.id)-Number(b.id));

    return list;
  }, [recipes, currentTag, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  // 操作 handlers
  const updateParam = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k,v]) => {
      if (v === null || v === undefined || v === '') next.delete(k);
      else next.set(k, String(v));
    });
    // 換搜尋、換標籤、換排序時，回到第 1 頁
    if ('q' in patch || 'tag' in patch || 'sort' in patch) next.set('page', '1');
    setParams(next, { replace: true });
  };

  const onSearch = (text) => updateParam({ q: text });
  const onTagClick = (tag) => updateParam({ tag });
  const onSortChange = (e) => updateParam({ sort: e.target.value });
  const onPageChange = (p) => updateParam({ page: p });

  return (
    <div className="page space-y-8">
      {/* 頂部：標題＋搜尋＋排序 */}
      <Reveal>
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">所有食譜</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">共 {filtered.length} 道（目前顯示 {paged.length} 道）</p>
          </div>
        </div>
      </Reveal>

      {/* 標籤快速篩選 */}
      <Reveal>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={()=>onTagClick('all')}
            className={`px-3 py-1 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 ${currentTag==='all' ? 'bg-blue-600 text-white border-blue-600' : ''}`}
          >
            全部
          </button>
          {allTags.map(t => (
            <button
              key={t}
              onClick={()=>onTagClick(t)}
              className={`px-3 py-1 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 ${currentTag===t ? 'bg-blue-600 text-white border-blue-600' : ''}`}
            >
              #{t}
            </button>
          ))}
        </div>
      </Reveal>

      {/* 清單 */}
      {paged.length === 0 ? (
        <Reveal>
          <div className="text-center border rounded-xl p-10">
            <div className="text-4xl mb-2 animate-bounce">🔎</div>
            <p className="mb-3">沒有找到符合的食譜。</p>
            <Link to="/recipes" className="inline-flex rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 no-underline hover:no-underline">
              清除篩選
            </Link>
          </div>
        </Reveal>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((r, idx) => (
              <Reveal key={r.id} delay={idx*40}>
                <RecipeCard key={r.id} recipe={r} aspect="1/1" />
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
