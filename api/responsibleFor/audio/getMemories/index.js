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
    console.log('checking for auth data');
    console.log(event.requestContext.authorizer);
    body = await data.query(`SELECT * from audio_clip;`);
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