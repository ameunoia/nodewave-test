import { r2 } from "$utils/r2Storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export async function uploadExcel(file: Express.Multer.File) {
  const fileKey = `excel/${randomUUID()}-${file.originalname}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return {
    key: fileKey,
    url: `${process.env.R2_PUBLIC_URL}/${fileKey}`,
  };
}
