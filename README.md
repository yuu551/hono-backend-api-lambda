# 【CDK】Hono Todo Application

下記記事のレポジトリです。

## 前提
TypeScriptの実行環境としてBun、環境構築にCDKを使って実装を進めていくので事前にライブラリをインストールしておきます。
またDynamoDBをローカルで起動するためにDockerも併せてインストールしておきます。使用したバージョンは下記となります。

- CDK・・・2.158.0
- Docker・・・27.1.1-rd
- Bun・・・1.1.26

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
bun install
```

## 起動
まずdocker composeコマンドでdynamodb-localを起動します。
```
docker compose up -d
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