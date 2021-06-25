const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION || 'eu-central-1' })
const s3 = new AWS.S3();

exports.handler = async (event) => {
  if (event && event.query && event.query.audio_clip_id) {
    return await getUploadURL(event.query.audio_clip_id);
  }
}

const getUploadURL = async (audio_clip_id) => {
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${audio_clip_id}.webm`,
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
        "clipFilename": `${actionId}.webm`,
        "id": audio_clip_id
      })
    })
  })
}



