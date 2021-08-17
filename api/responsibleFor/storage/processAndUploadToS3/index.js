var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var s3 = new AWS.S3();

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
    let encodedImage = request.image;
    let decodedImage = Buffer.from(encodedImage, 'base64');
    let path = request.userId + '/' + request.mediaItemId + '.jpg';

    await s3.putObject({
      Body: decodedImage,
      Key: path,
      ContentType: 'image/jpeg',
      Bucket: process.env.BUCKET_NAME,
      ACL: 'public-read'
    }).promise();
    
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
