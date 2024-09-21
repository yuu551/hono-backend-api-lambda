import { handle } from 'hono/aws-lambda'
import app from './src/app'

// index.ts で定義された純粋なHTTPサーバをAWS Lambda用のアダプタでラップしてハンドラとしてエクスポート
export const handler = handle(app)