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

## 役の選択と動作確認

- レバー横のドロップダウンで「自動」または特定の役を選べます。
- `自動` の場合は確率に応じて内部で役が決まります。
- 任意の役（例: `チェリー`）を選ぶと、その役が揃って停止します。
- 開発サーバーを起動してブラウザで `index.html` を開き、`Pull Lever` を押して確認してください。
