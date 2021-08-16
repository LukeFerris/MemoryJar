var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var lambda = new AWS.Lambda();

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
      
      let mediaItem = JSON.parse(event.body);
      
      // force user on clip to be the authorised user - this will also be used as the folder structure in AWS
      mediaItem.userId = event.requestContext.authorizer.jwt.claims.sub;
      console.log('user is: ' + mediaItem.userId);

      let payload = {
        mediaItemBase64: mediaItem.base64Item,
        userId: mediaItem.userId,
        mediaItemId: mediaItem.mediaItemId
      };

      // await process and upload files to S3 using separate lambda
      var params = {
        FunctionName: process.env.FUNCTION_NAME, // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.parse(payload)
      };
    
      lambda.invoke(params, function(err, data) {

          // now that it's successfully uploaded, check if the item already exists
        let mediaItemResult = await data.query("SELECT * from \"mediaItem\" WHERE \"mediaItemId\" = '" + mediaItem.mediaItemId + "'");

        if (mediaItemResult.records.length == 0) {

          // item does not exist so register it
          // find the prompt associated with this media item
          let promptResult = await data.query("SELECT * from prompt WHERE \"promptId\" = '" + mediaItem.promptId + "'");

          if (promptResult.records.length == 0) {
            body = "No prompts with id: " + mediaItem.promptId + " could be found";
            statusCode = 400;
          }
          else {
            console.log('found prompt with id: ' + mediaItem.promptId);
            const prompt = promptResult.records[0];

            // see if a memory for this theme already exists for this user
            let memoryResult = await data.query("SELECT * from memory WHERE \"themeId\" = '" + prompt.themeId + "' AND \"userId\"='" + mediaItem.userId + "';");

            let memory;

            // if not, create it
            if (memoryResult.records.length == 0) {

              console.log('No memory found for this theme and user, creating..');
              memory = {
                memoryId: context.awsRequestId,
                themeId: prompt.themeId,
                userId: mediaItem.userId
              }

              // insert the memory first
              await data.query(
                'INSERT INTO memory ("memoryId", "themeId", "userId") VALUES(:memoryId::UUID, :themeId::UUID, :userId::UUID)',
                memory
              )
            }
            else {
              console.log(memoryResult.records[0]);
              console.log('found memory for theme: ' + prompt.themeId + ' for user. Id is: ' + memoryResult.records[0].memoryId);
              memory = memoryResult.records[0];
            }

            // now insert the audio clip
            const newMediaItem =
            {
              mediaItemId: mediaItem.mediaItemId,
              promptId: prompt.promptId,
              memoryId: memory.memoryId,
              userId: mediaItem.userId,
              mediaType: mediaItem.mediaType,
              relatedMediaItemId: mediaItem.relatedMediaItemId
            }

            await data.query(
              'INSERT INTO "mediaItem" ("memoryId", "promptId", "mediaItemId", "userId", "mediaType", "relatedMediaItemId") VALUES(:memoryId::UUID, :promptId::UUID, :mediaItemId::UUID, :userId::UUID, :mediaType::SMALLINT, :relatedMediaItemId::UUID)',
              newMediaItem
            )

            // if a related media item was present - update the partner mediaitem
            if (newMediaItem.relatedMediaItemId) {
              await data.query(
                `UPDATE "mediaItem" SET "relatedMediaItemId"=\'${newMediaItem.mediaItemId}\' WHERE "mediaItemId"=\'${newMediaItem.relatedMediaItemId}\';`
              )
            }
          }

          body = `Post media item ${mediaItem.mediaItemId}`; 
        }
        else
        {
          body = "MediaItem with id: " + mediaItem.mediaItemId + " already exists.";
          statusCode = 400;
        }
      })
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
