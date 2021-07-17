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
    let clip = JSON.parse(event.body);

    // check to see if the memory exists
    let memory = await data.query("SELECT COUNT(*) from memory WHERE memory_id = '" + clip.memory_id + "';");
    let memoryCount = memory.records[0].count;
    console.log('found ' + memoryCount + ' memories with that id');

    if (memoryCount == 0) {
      // insert the memory first
      await data.query(
        `INSERT INTO memory (memory_id) VALUES(:memory_id::UUID)`,
        clip
      )
    }

    // now insert the audio clip
    await data.query(
      `INSERT INTO audio_clip (memory_id, audio_clip_id) VALUES(:memory_id::UUID,:audio_clip_id::UUID)`,
      clip
    )

    body = `Put item ${clip.audio_clip_id}`;
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