# My Review Tool

レビュー収集・管理ツール

## 機能

1. ランディングページ（LP）でのレビュー収集
2. Stripe Webhookによる支払い処理
3. 管理画面での設定管理
4. フィードバック機能
   - Yesの場合：URL保存とリターンリンク生成
   - Noの場合：メール送信

## セットアップ

1. 必要なパッケージのインストール
```bash
npm install
```

2. 環境変数の設定
`.env.example`を`.env`にコピーし、必要な環境変数を設定してください。

3. サーバーの起動
```bash
npm start
```

## ディレクトリ構造

- `public/`: フロントエンド関連ファイル
  - `index.html`: ランディングページ
  - `admin.html`: 管理画面
  - `f/`: フィードバックページ
- `api/`: バックエンドAPI
  - `webhook.js`: Stripe Webhook処理
  - `settings.js`: 設定管理
  - `feedback.js`: フィードバック処理
- `data/`: データファイル
  - `users.json`: ユーザーデータ
  - `settings.json`: 設定データ 