// require data-api
const data = require('data-api-client')({
  secretArn: process.env.DB_ROOT_USER_SECRET_ARN,
  resourceArn: process.env.DB_ARN,
  database: 'memoryjar'
})

exports.handler = async (event, context) => {

  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    // check that auth data is present
    if (typeof event.requestContext == 'undefined') {
      console.log('No valid user supplied');
      body = "No valid user supplied";
      statusCode = 400;
    }
    else {
      const userId = event.requestContext.authorizer.jwt.claims.sub;
      console.log('user is: ' + userId);
      body = await data.query("SELECT * from \"mediaItem\" where \"userId\"='" + userId + "';");
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };

}