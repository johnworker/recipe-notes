import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] // ex: "recipe-notes"
const isCI = !!process.env.GITHUB_ACTIONS

export default defineConfig({
  // 在 GitHub Actions 內自動使用 /{repo}/ 作為 base；本機為 "/"
  base: isCI && repo ? `/${repo}/` : '/',
  plugins: [react()],
})