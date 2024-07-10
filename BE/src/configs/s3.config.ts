import * as dotenv from 'dotenv';

dotenv.config();

export const S3_CONFIG = {
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
  bucketName: process.env.S3_BUCKET_NAME,
};

console.log(S3_CONFIG);
