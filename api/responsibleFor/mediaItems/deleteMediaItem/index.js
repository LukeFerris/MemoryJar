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

    if (typeof event.requestContext == 'undefined') {
      console.log('No valid user supplied');
      body = "No valid user supplied";
      statusCode = 400;
    }
    else {
      let mediaItem = JSON.parse(event.body);

      // force user on clip to be the authorised user
      mediaItem.userId = event.requestContext.authorizer.jwt.claims.sub;
      console.log('user is: ' + mediaItem.userId);

      // find the prompt associated with this media item
      let deleteResult = await data.query("DELETE FROM \"mediaItem\" WHERE \"mediaItemId\" = '" + mediaItem.mediaItemId + "'");

      body = `Deleted media item ${mediaItem.mediaItemId}`;
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

}
