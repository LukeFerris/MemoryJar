var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var s3 = new AWS.S3();

const sharp = require('sharp');

const Sentry = require("@sentry/serverless");

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_LAMBDA_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

exports.handler = Sentry.AWSLambda.wrapHandler(async (event) => {

  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
   
    let request = JSON.parse(event.body);
    let encodedMediaItem = request.image;
    let decodedMediaItem = Buffer.from(encodedMediaItem, 'base64');
    
    let extension = 'jpg';
    if (request.mimeType == "video/mp4" || request.mimeType == "audio/mp4") extension = 'mp4';
    let path = request.userId + '/' + request.mediaItemId + '.' + extension;
  
    // put main object
    await s3.putObject({
      Body: decodedMediaItem,
      Key: path,
      ContentType: request.mimeType,
      Bucket: process.env.BUCKET_NAME,
      ACL: 'public-read'
    }).promise();
    
    console.log('Main object uploaded');
    
    if (extension == "jpg")
    {
      let thumbPath = request.userId + '/' + request.mediaItemId + '-thumb.jpg';
      
      // put thumbnail
    let thumbnail = await sharp(decodedMediaItem)
        .resize(200)
        .toBuffer();
        
    await s3.putObject({
      Body: thumbnail,
      Key: thumbPath,
      ContentType: 'image/jpeg',
      Bucket: process.env.BUCKET_NAME,
      ACL: 'public-read'
    }).promise();
    
    console.log('Thumbnail uploaded');
    }
    
    body = 'Processed item with id: ' + request.mediaItemId;
  }
  catch (err) {
    statusCode = 400;
    console.log(err.message);
    body = err.message;
  }
  finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };

})
