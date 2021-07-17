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
    // pull public key from database cache
    let keys = await data.query('SELECT * from keys');

    if (keys.records.length == 0) {
      console.log('no keys present in database, downloading..');
      break;
    }
    // if it doesn't exist, pull it from Amazon and cache it
    // validate incoming jwt
    // extract user id
    // return audio clips only for selected user
    body = await data.query(`SELECT * from audio_clip;`);
    break;
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