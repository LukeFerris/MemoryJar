var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

const imageThumbnail = require('image-thumbnail');
const ThumbnailGenerator = require('video-thumbnail-generator').default;

const Sentry = require("@sentry/serverless");

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_LAMBDA_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

exports.handler = Sentry.AWSLambda.wrapHandler(async (event, context) => {

  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {

    if (typeof event.requestContext == 'undefined') {
      console.log('No valid user supplied');
      body = "No valid user supplied";
      statusCode = 400;
    }
    else {
      
      let file = JSON.parse(event.body);

      // force user on clip to be the authorised user - this will also be used as the folder structure in AWS
      let userId = event.requestContext.authorizer.jwt.claims.sub;
      console.log('user is: ' + userId);

      body = 'Item with id: ' + file.fileId + ' for user: ' + userId + 'uploaded successfully'; 
  
    }
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
