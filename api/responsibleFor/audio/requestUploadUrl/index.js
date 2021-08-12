const AWS = require('aws-sdk')
const Sentry = require("@sentry/serverless");

AWS.config.update({ region: process.env.REGION || 'eu-central-1' })
const s3 = new AWS.S3();

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_LAMBDA_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

exports.handler = Sentry.AWSLambda.wrapHandler(async (event) => {
  if (event && event.queryStringParameters && event.queryStringParameters.mediaItemId && event.queryStringParameters.mediaItemType) {
    return await getUploadURL(event.queryStringParameters.mediaItemId, event.queryStringParameters.mediaItemType);
  }
  else {
    return "You must specify mediaItemType and mediaItemId";
  }
})

const getUploadURL = async (mediaItemId, mediaItemType) => {

  let itemType = 'mp4';
  let contentType = 'audio/webm';
  if (mediaItemType == 1) {
    itemType = 'jpg';
    contentType = 'image/jpeg'
  }


  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${mediaItemId}.${itemType}`,
    ContentType: `${contentType}`,
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
        "clipFilename": `${mediaItemId}.${itemType}`,
        "id": mediaItemId
      })
    })
  })
}