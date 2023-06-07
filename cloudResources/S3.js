const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const fs = require("fs")

const Client = new S3Client({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})


async function uploadToS3 (filename, file){
  data = fs.readFileSync(file.path)
  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: data
  })
  fs.unlinkSync(file.path)
  return Client.send(putCommand)
}

function deleteFromS3 (filename){  
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename
  })
  return Client.send(deleteCommand)
}

module.exports = { uploadToS3, deleteFromS3 }
