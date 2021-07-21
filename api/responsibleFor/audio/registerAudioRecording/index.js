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
      let promptResult = await data.query("SELECT * from prompt WHERE prompt_id = '" + mediaItem.promptId + "'");

      if (promptResult.records.length == 0) {
        body = "No prompts with id: " + mediaItem.promptId + " could be found";
        statusCode = 400;
      }
      else {
        console.log('found prompt with id: ' + mediaItem.promptId);
        const prompt = promptResult.records[0];

        // see if the memory for this theme already exists for this user
        let memoryResult = await data.query("SELECT * from memory WHERE theme_id = '" + prompt.theme_id + "' AND user_id='" + mediaItem.userId + "';");

        let memory;

        // if not, create it
        if (memoryResult.records.length == 0) {

          console.log('No memory found for this theme and user, creating..');
          memory = {
            memory_id: context.awsRequestId,
            theme_id: prompt.theme_id,
            user_id: mediaItem.userId
          }

          // insert the memory first
          await data.query(
            `INSERT INTO memory (memory_id, theme_id, user_id) VALUES(:memory_id::UUID, :theme_id::UUID, :user_id::UUID)`,
            memory
          )
        }
        else {
          console.log(memoryResult.records[0]);
          console.log('found memory for theme: ' + prompt.theme_id + ' for user. Id is: ' + memoryResult.records[0].memory_id);
          memory = memoryResult.records[0];
        }

        // now insert the audio clip
        const newMediaItem =
        {
          audio_clip_id: mediaItem.mediaItemId,
          prompt_id: prompt.prompt_id,
          memory_id: memory.memory_id,
          user_id: mediaItem.userId
        }

        await data.query(
          `INSERT INTO audio_clip (memory_id, prompt_id, audio_clip_id, user_id) VALUES(:memory_id::UUID, :prompt_id::UUID, :audio_clip_id::UUID, :user_id::UUID)`,
          newMediaItem
        )

        body = `Put media item ${newMediaItem.audio_clip_id}`;
      }
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
