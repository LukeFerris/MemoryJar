const uuidv4 = require('uuidv4')
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION || 'eu-central-1' })
const s3 = new AWS.S3();

exports.handler = async (event) => {
  return await getUploadURL()
}

const getUploadURL = async () => {
  const actionId = uuidv4.uuid()
  const s3Params = {
    Bucket: 'memoryjarbucket',
    Key:  `${actionId}.webm`,
    ContentType: 'audio/webm',
    ACL: 'public-read',
  }

  return new Promise((resolve, reject) => {
    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": { "Access-Control-Allow-Origin": "*" },
      "body": JSON.stringify({
        "uploadURL": uploadURL,
        "photoFilename": `${actionId}.webm`,
        "id": actionId
      })
    })
  })
}
  
