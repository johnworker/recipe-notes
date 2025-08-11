import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastHost from './components/ToastHost';

import { AuthProvider } from './context/AuthProvider';
import { UiStoreProvider } from './context/UiStore';
import { RecipeProvider } from './context/RecipeProvider';
import ProtectedRoute from './components/ProtectedRoute';

// 其它既有頁面可保留
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

// ✅ 這三個一定要有
import About from './pages/About.jsx';
import Notes from './pages/Notes';
import NoteEditor from './pages/NoteEditor.jsx';

// ✅ 設定頁（之前你已建立）
import Settings from './pages/Settings.jsx';

// （可選）後台
import RecipeForm from'./pages/admin/RecipeForm';
import Login from './pages/Login.jsx';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <UiStoreProvider>
          <RecipeProvider>
            <ToastHost />
            <Navbar />
            <Suspense fallback={<main className="container py-10">載入中…</main>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/favorites" element={<Favorites />} />

                {/* ✅ 這三條是你現在缺的或名字不一致 */}
                <Route path="/about" element={<About />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/notes/edit" element={<NoteEditor />} />
                <Route path="/notes/edit/:id" element={<NoteEditor />} />
                <Route path="/settings" element={<Settings />} />

                {/* 登入與後台（可選） */}
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin/recipes/new"
                  element={<ProtectedRoute><RecipeForm /></ProtectedRoute>}
                />
                <Route
                  path="/admin/recipes/:id"
                  element={<ProtectedRoute><RecipeForm /></ProtectedRoute>}
                />

                {/* 404 放最後 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </RecipeProvider>
        </UiStoreProvider>
      </AuthProvider>
    </HashRouter>
  );
}