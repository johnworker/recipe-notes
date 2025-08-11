import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isCI = !!process.env.GITHUB_ACTIONS

export default defineConfig({
  base: isCI && repoName ? `/${repoName}/` : '/', // CI 自動帶入 /recipe-notes/
  plugins: [react()],
})