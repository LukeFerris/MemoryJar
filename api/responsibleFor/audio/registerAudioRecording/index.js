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
    switch (event.routeKey) {
      case "GET /audio_clips":
        body = await data.query(`SELECT * from audio_clip;`);
        break;
      case "PUT /audio_clips":
        let clip = JSON.parse(event.body);

        await data.query(
          `INSERT INTO audio_clip (memory_id, audio_clip_id) VALUES(:memory_id,:audio_clip_id)`,
          clip
        )

        body = `Put item ${clip.audio_clip_id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
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

