import {
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
  KeyType,
  ScalarAttributeType,
  ProjectionType,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// ローカルにアクセスするためだけのアクセスキーを設定。
// 何も権限情報も存在しない。
const devConfig = {
  endpoint: "http://localhost:8000",
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: "fakeaccesskey",
    secretAccessKey: "fakesecretaccesskey",
  },
};

const client = new DynamoDBClient(
  process.env.ENV === "development" ? devConfig : {}
);

const docClient = DynamoDBDocumentClient.from(client);

const createTodosTable = async () => {
  const params = {
    TableName: "Todos",
    KeySchema: [{ AttributeName: "id", KeyType: KeyType.HASH }],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: ScalarAttributeType.S },
      { AttributeName: "userId", AttributeType: ScalarAttributeType.S }, // userId属性を追加
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: "UserIdIndex",
        KeySchema: [{ AttributeName: "userId", KeyType: KeyType.HASH }],
        Projection: { ProjectionType: ProjectionType.ALL },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
  };

  try {
    await client.send(new CreateTableCommand(params));
    console.log("Todos table created successfully with UserIdIndex");
  } catch (err) {
    console.log(err);
  }
};

const initializeDynamoDB = async () => {
  if (process.env.ENV === "development") {
    try {
      const { TableNames } = await client.send(new ListTablesCommand({}));
      if (TableNames && !TableNames.includes("Todos")) {
        await createTodosTable();
      } else if (TableNames) {
        console.log("Todos table already exists");
      } else {
        console.log("Unable to list tables, creating Todos table");
        await createTodosTable();
      }
    } catch (err) {
      console.error("Error initializing DynamoDB:", err);
    }
  }
};

// テーブル初期化を実行
initializeDynamoDB();

export { docClient };
