import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// 讓不同平台可覆寫 base（例如 GH Pages 需要子路徑）
const base = process.env.VITE_BASE ?? '/'


export default defineConfig({
  base,                // ex: '/recipe-notes/'（GH Pages）
  plugins: [react()],
})