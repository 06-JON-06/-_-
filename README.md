# Vite App

シンプルな Vite (vanilla) プロジェクトの雛形です。

インストールと実行:

```bash
# 依存をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

ファイル構成の主なファイル:

- `index.html` - エントリHTML
- `src/main.js` - エントリJS
- `src/style.css` - サンプルスタイル
- `package.json` - スクリプトと依存

自動デプロイ:

- GitHub Actions で `main` ブランチへの push 時にビルドし、`gh-pages` ブランチへデプロイします。
- 公開 URL の例: https://06-JON-06.github.io/-_-/

必要があれば、リポジトリの Settings → Pages で公開先を確認してください。
# -_-
役を一回保存できるスロットの検証
