const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION || 'eu-central-1' })
const s3 = new AWS.S3();

exports.handler = async (event) => {
  if (event && event.queryStringParameters && event.queryStringParameters.audio_clip_id) {
    return await getUploadURL(event.queryStringParameters.audio_clip_id);
  }
}

const getUploadURL = async (audio_clip_id) => {
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${audio_clip_id}.mp4`,
    ContentType: 'audio/webm',
    ACL: 'public-read',
  }

  return new Promise((resolve, reject) => {

    // outrageous hack to get ios and safari to play recorded audio => make file ending mp4.
    // Chrome will play webm audio even if it's downloaded as .mp4
    // Safari will refuse to play (including ios) unless it's .mp4.

    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": { "Access-Control-Allow-Origin": "*" },
      "body": JSON.stringify({
        "uploadURL": uploadURL,
        "clipFilename": `${audio_clip_id}.mp4`,
        "id": audio_clip_id
      })
    })
  })
}