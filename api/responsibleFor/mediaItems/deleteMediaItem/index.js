// require data-api
const data = require('data-api-client')({
  secretArn: process.env.DB_ROOT_USER_SECRET_ARN,
  resourceArn: process.env.DB_ARN,
  database: 'memoryjar'
})

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
      const { mediaItemId } = event.pathParameters;

      // force user on clip to be the authorised user
      const userId = event.requestContext.authorizer.jwt.claims.sub;
      console.log('user is: ' + userId);

      // clear any references
      await data.query("UPDATE \"mediaItem\" SET \"relatedMediaItemId\"=NULL WHERE \"relatedMediaItemId\"='" + mediaItemId + "' AND \"userId\" = '" + userId + "'");
      
      // find the prompt associated with this media item
      await data.query("DELETE FROM \"mediaItem\" WHERE \"mediaItemId\" = '" + mediaItemId + "' AND \"userId\" = '" + userId + "'");

      body = `Deleted media item ${mediaItemId}`;
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
