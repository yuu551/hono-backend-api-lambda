import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as dotenv from "dotenv";

dotenv.config();

export class HonoLambdaApiGwStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDBテーブルの作成
    const todosTable = new dynamodb.Table(this, "TodosTable", {
      tableName: "Todos",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      // Sampleのため1
      readCapacity: 1,
      writeCapacity: 1,
    });

    // ユーザーIDによるグローバルセカンダリインデックスの追加
    todosTable.addGlobalSecondaryIndex({
      indexName: "UserIdIndex",
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    const honoLambda = new NodejsFunction(this, "lambda", {
      entry: "lambda/index.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        ENV: process.env.ENV ? process.env.ENV : "",
        BASIC_USERNAME: process.env.BASIC_USERNAME
          ? process.env.BASIC_USERNAME
          : "",
        BASIC_PASSWORD: process.env.BASIC_PASSWORD
          ? process.env.BASIC_PASSWORD
          : "",
      },
    });

    // Lambda関数にDynamoDBへのアクセス権限を付与
    todosTable.grantReadWriteData(honoLambda);

    const apiGw = new apigw.LambdaRestApi(this, "honoApi", {
      handler: honoLambda,
    });

    // API GatewayのエンドポイントURLを出力
    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: apiGw.url,
      description: "API Gateway endpoint URL",
    });
  }
}
