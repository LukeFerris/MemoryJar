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
      let clip = JSON.parse(event.body);

      // force user on clip to be the authorised user
      clip.user_id = event.requestContext.authorizer.jwt.claims.sub;
      console.log('user is: ' + clip.user_id);

      // check to see if the memory exists
      let memory = await data.query("SELECT COUNT(*) from memory WHERE memory_id = '" + clip.memory_id + "' AND user_id='" + clip.user_id + "';");
      let memoryCount = memory.records[0].count;
      console.log('found ' + memoryCount + ' memories with that id and user');

      if (memoryCount == 0) {
        // insert the memory first
        await data.query(
          `INSERT INTO memory (memory_id, user_id) VALUES(:memory_id::UUID, :user_id::UUID)`,
          clip
        )
      }

      // now insert the audio clip
      await data.query(
        `INSERT INTO audio_clip (memory_id, audio_clip_id, user_id) VALUES(:memory_id::UUID,:audio_clip_id::UUID, :user_id::UUID)`,
        clip
      )

      body = `Put item ${clip.audio_clip_id}`;
    }
  }
  catch (err) {
    statusCode = 400;
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
