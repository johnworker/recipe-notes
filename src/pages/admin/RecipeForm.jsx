import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { RecipeContext } from '../../context/RecipeProvider';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

export default function RecipeForm() {
  const { id } = useParams();               // /admin/recipes/new 沒有 id，/admin/recipes/:id 才有
  const isEdit = !!id;                      // ✅ 正確的判斷
  const { user } = useAuth();
  const { recipes, createRecipe, updateRecipe } = useContext(RecipeContext);
  const nav = useNavigate();

  const current = useMemo(
    () => (isEdit ? recipes.find(r => String(r.id) === String(id)) : null),
    [recipes, id, isEdit]
  );

  const [form, setForm] = useState({
    title: '', description: '', image: '', tags: [],
    prepTime: 0, cookTime: 0, servings: 1, calories: 0, difficulty: '簡單',
    ingredients: [], seasonings: [], stepsHtml: ''
  });

  useEffect(() => {
    if (isEdit && current) {
      setForm({
        title: current.title || '',
        description: current.description || '',
        image: current.image || '',
        tags: current.tags || [],
        prepTime: Number(current.prepTime || 0),
        cookTime: Number(current.cookTime || 0),
        servings: Number(current.servings || 1),
        calories: Number(current.calories || 0),
        difficulty: current.difficulty || '簡單',
        ingredients: current.ingredients || [],
        seasonings: current.seasonings || [],
        stepsHtml: current.stepsHtml || ''
      });
    }
  }, [isEdit, current]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('請輸入標題');

    const payload = {
      ...form,
      // 保證型別正確
      prepTime: Number(form.prepTime || 0),
      cookTime: Number(form.cookTime || 0),
      servings: Number(form.servings || 1),
      calories: Number(form.calories || 0),
      tags: Array.isArray(form.tags)
        ? form.tags.filter(Boolean)
        : String(form.tags || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
    };

    if (isEdit) {
      if (!current) {
        toast.error('找不到要編輯的食譜');
        return;
      }
      updateRecipe(String(id), payload);
      toast.success('已更新');
      nav(`/recipes/${id}`);
    } else {
      const newId = createRecipe(payload);   // ✅ 要回傳新 id
      if (!newId) {
        toast.error('新增失敗：未取得新 ID');
        return;
      }
      toast.success('新增成功');
      nav(`/recipes/${newId}`);
    }
  };

  const addItem = (key) => setForm(f => ({ ...f, [key]: [...f[key], ''] }));
  const setArrayItem = (key, idx, v) =>
    setForm(f => ({ ...f, [key]: f[key].map((x, i) => (i === idx ? v : x)) }));
  const delArrayItem = (key, idx) =>
    setForm(f => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));

  if (!user) return <main className="container py-10">請先登入。</main>;

  return (
    <main className="container py-8 space-y-6">
      <h1 className="text-2xl font-extrabold">{isEdit ? '編輯食譜' : '新增食譜'}</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* 基本欄位 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">標題</label>
            <input className="form-field" value={form.title}
                   onChange={e=>setForm({...form,title:e.target.value})}/>
          </div>
          <div>
            <label className="form-label">封面圖片 URL</label>
            <input className="form-field" value={form.image}
                   onChange={e=>setForm({...form,image:e.target.value})}/>
          </div>
          <div>
            <label className="form-label">描述</label>
            <input className="form-field" value={form.description}
                   onChange={e=>setForm({...form,description:e.target.value})}/>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div><label className="form-label">準備</label>
              <input type="number" className="form-field" value={form.prepTime}
                     onChange={e=>setForm({...form,prepTime:e.target.value})}/></div>
            <div><label className="form-label">烹煮</label>
              <input type="number" className="form-field" value={form.cookTime}
                     onChange={e=>setForm({...form,cookTime:e.target.value})}/></div>
            <div><label className="form-label">份量</label>
              <input type="number" className="form-field" value={form.servings}
                     onChange={e=>setForm({...form,servings:e.target.value})}/></div>
            <div><label className="form-label">卡路里</label>
              <input type="number" className="form-field" value={form.calories}
                     onChange={e=>setForm({...form,calories:e.target.value})}/></div>
          </div>

          <div>
            <label className="form-label">難度</label>
            <select className="form-field" value={form.difficulty}
                    onChange={e=>setForm({...form,difficulty:e.target.value})}>
              <option>簡單</option><option>中等</option><option>較難</option>
            </select>
          </div>

          <div>
            <label className="form-label">標籤（用逗號分隔）</label>
            <input className="form-field"
                   value={Array.isArray(form.tags) ? form.tags.join(',') : form.tags}
                   onChange={e=>setForm({...form,tags:e.target.value})}/>
          </div>
        </div>

        {/* 陣列欄位：食材/調味料 */}
        <div className="grid md:grid-cols-2 gap-6">
          {['ingredients','seasonings'].map(key=>(
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{key==='ingredients'?'食材':'調味料'}</h3>
                <button type="button" className="btn-ghost" onClick={()=>addItem(key)}>+ 新增一行</button>
              </div>
              <div className="space-y-2">
                {form[key].map((line, idx)=>(
                  <div className="flex gap-2" key={idx}>
                    <input className="form-field flex-1" value={line}
                           onChange={e=>setArrayItem(key, idx, e.target.value)}/>
                    <button type="button" className="btn-ghost"
                            onClick={()=>delArrayItem(key, idx)}>刪</button>
                  </div>
                ))}
                {!form[key].length && <p className="text-sm text-gray-500">尚無資料</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Rich Text：步驟 */}
        <div>
          <h3 className="font-semibold mb-2">步驟（Rich Text）</h3>
          <ReactQuill theme="snow"
            value={form.stepsHtml}
            onChange={(html)=>setForm({...form, stepsHtml: html})}/>
        </div>

        <div className="pt-2 flex gap-3">
          <button className="btn-secondary">儲存</button>
          <button type="button" className="btn-ghost" onClick={()=>window.history.back()}>取消</button>
        </div>
      </form>
    </main>
  );
}
