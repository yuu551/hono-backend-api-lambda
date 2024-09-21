# 【CDK】Hono Todo Application

下記記事のレポジトリです。

## 準備
プロジェクト直下に`.env`ファイルを作成し、下記値を設定します。
- Basic認証のユーザー名とパスワード
- 環境名(ex.`production`)
```
BASIC_USERNAME=XXX
BASIC_PASSWORD=YYY
ENV=production
```

また、必要なライブラリもインストールします。
```
npm install
```

## 起動
まずdocker-composeコマンドでdynamodb-localを起動します。
```
docker-compose up -d
```
その後、サーバを起動します。
```
bun run dev
```

## デプロイ
CDKのコマンドを使ってデプロイします。
```
cdk deploy
```

もし、CDKを使うデプロイが初めての場合は下記コマンドを実行してデプロイ用のS3 バケットを作成します。
```
cdk bootstrap
```