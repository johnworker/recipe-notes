import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const Home = lazy(()=>import('./pages/Home'));
const Recipes = lazy(()=>import('./pages/Recipes'));
const RecipeDetail = lazy(()=>import('./pages/RecipeDetail'));
const Notes = lazy(()=>import('./pages/Notes'));
const NoteEditor = lazy(()=>import('./pages/NoteEditor'));
const Favorites = lazy(()=>import('./pages/Favorites'));
const About = lazy(()=>import('./pages/About'));
const NotFound = lazy(()=>import('./pages/NotFound'));
const Settings = lazy(()=>import('./pages/Settings'));

export default function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Navbar />
          <main className="container py-10">
            <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({length:6}).map((_,i)=><div key={i} className="border rounded-xl p-4 animate-pulse"><div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-3"/><div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"/><div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"/></div>)}</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/notes/edit/:id?" element={<NoteEditor />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </main>
          <BackToTop />
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    </RecipeProvider>
  );
}
