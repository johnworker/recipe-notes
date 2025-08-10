import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UiContext = createContext(null);

export function UiStoreProvider({ children }) {
  const [history, setHistory] = useLocalStorage('view_history', []); // [{id, title, at}]
  const [selectedTags, setSelectedTags] = useLocalStorage('selected_tags', []);

  const addHistory = (r) => {
    setHistory(prev => {
      const next = [{ id: r.id, title: r.title, at: Date.now() }, ...prev.filter(x => x.id !== r.id)];
      return next.slice(0, 50);
    });
  };
  const toggleTag = (t) => {
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]);
  };

  const value = useMemo(()=>({ history, addHistory, selectedTags, toggleTag, setSelectedTags }), [history, selectedTags]);
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
export const useUi = () => useContext(UiContext);
