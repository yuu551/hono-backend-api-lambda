#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { HonoLambdaApiGwStack } from "../lib/hono-lambda-api-gw-stack";

const app = new cdk.App();
new HonoLambdaApiGwStack(app, "HonoLambdaApiGwStack", {
  env: { region: "ap-northeast-1" },
});
