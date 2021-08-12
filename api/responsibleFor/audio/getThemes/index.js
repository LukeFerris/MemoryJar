// require data-api
const data = require('data-api-client')({
  secretArn: process.env.DB_ROOT_USER_SECRET_ARN,
  resourceArn: process.env.DB_ARN,
  hydrateColumnNames: false,
  options: { convertResponseTypes: false },
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
    body = await data.query('select row_to_json(art) as theme from (select a."themeId", a."themeName", (select json_agg(alb) from (select * from prompt where "themeId" = a."themeId") alb) as prompts from theme as a) art;');

    for (let i = 0; i < body.records.length; i++) {
      body.records[i] = JSON.parse(body.records[i]);
    }

    console.log(body);

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

})