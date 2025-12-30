import { defineConfig } from 'vite';

// GitHub Pages にデプロイする場合、リポジトリ名を base に設定します。
// このリポジトリ名は "-_-" なので base は '/-_-/'.
export default defineConfig({
  base: '/-_-/',
  // デフォルト設定のまま（必要に応じてここを編集）
});
