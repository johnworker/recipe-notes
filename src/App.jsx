import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastHost from './components/ToastHost';

import { AuthProvider } from './context/AuthProvider';
import { UiStoreProvider } from './context/UiStore';
import { RecipeProvider } from './context/RecipeProvider';
import ProtectedRoute from './components/ProtectedRoute';

// 其它既有頁面可保留
const Home = lazy(() => import('./pages/Home'));
const Recipes = lazy(() => import('./pages/Recipes'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));

// ✅ 這三個一定要有
const About = lazy(() => import('./pages/About'));
const Notes = lazy(() => import('./pages/Notes'));
const NoteEditor = lazy(() => import('./pages/NoteEditor'));

// ✅ 設定頁（之前你已建立）
const Settings = lazy(() => import('./pages/Settings'));

// （可選）後台
const RecipeForm = lazy(() => import('./pages/admin/RecipeForm'));
const Login = lazy(() => import('./pages/Login'));

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}