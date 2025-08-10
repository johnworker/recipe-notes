import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';

export default function NoteEditor() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { notes, setNotes, recipes } = useContext(RecipeContext);

  const editing = Boolean(id);
  const existing = notes.find(n => n.id === id) || {};

  const [title, setTitle] = useState(editing ? existing.title : '');
  const [content, setContent] = useState(editing ? existing.content : '');
  const [recipeId, setRecipeId] = useState(
    editing ? existing.recipeId : location.state?.recipeId || ''
  );

  useEffect(() => {
    if (editing && !existing.id) navigate('/notes');
  }, []);

  const handleSave = () => {
    const newId = editing
      ? id
      : window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : Date.now().toString();
    const note = { id: newId, title, content, recipeId, date: new Date().toISOString() };
    const updated = editing
      ? notes.map(n => (n.id === id ? note : n))
      : [...notes, note];
    setNotes(updated);
    navigate('/notes');
  };

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-6">編輯筆記</h1>

      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <div>
          <label className="form-label" htmlFor="title">標題</label>
          <input
            id="title"
            type="text"
            className="form-field"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="輸入筆記標題"
            required
          />
        </div>

        <div>
          <label className="form-label" htmlFor="recipe">關聯食譜（選填）</label>
          <select
            id="recipe"
            className="form-field"
            value={recipeId}
            onChange={e => setRecipeId(e.target.value)}
          >
            <option value="">— 請選擇關聯食譜 —</option>
            {recipes.map(r => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="content">內容</label>
          <textarea
            id="content"
            className="form-field h-40 resize-y"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="今天做了什麼？有什麼小技巧？"
          />
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-primary">儲存變更</button>
        </div>
      </form>
    </main>
  );
}
