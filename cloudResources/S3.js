const { S3Client, GetObjectCommand, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const fs = require("fs")
const aws = require('aws-sdk')
const s3 = new aws.S3();

const Client = new S3Client({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})


async function listFromS3(Prefix){
  const ListObjects = new ListObjectsCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: Prefix,
  })
  return Client.send(ListObjects)
}

async function getFromS3(filename){
  let x = await s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: filename }).promise();
  return x
}

async function uploadToS3 (filename, file){
  data = fs.readFileSync(file)
  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: data
  })
  fs.unlinkSync(file)
  return Client.send(putCommand)
}

function deleteFromS3 (filename){  
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename
  })
  return Client.send(deleteCommand)
}

module.exports = { listFromS3, getFromS3, uploadToS3, deleteFromS3 }
