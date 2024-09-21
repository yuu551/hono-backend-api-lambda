FROM amazon/aws-cli

ENV AWS_ACCESS_KEY_ID=fake_access_key\
    AWS_SECRET_ACCESS_KEY=fake_secret_access_key\
    DYNAMODB_REGION=ap-northeast-1\
    AWS_DEFAULT_REGION=ap-northeast-1
    
WORKDIR /usr/app