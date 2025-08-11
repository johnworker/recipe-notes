import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GH Pages 會有這個環境變數，例如 "johnworker/recipe-notes"
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isCI = !!process.env.GITHUB_ACTIONS

export default defineConfig({
  base: isCI && repoName ? `/${repoName}/` : '/',  // GH Pages 自動帶 /recipe-notes/
  plugins: [react()],
})