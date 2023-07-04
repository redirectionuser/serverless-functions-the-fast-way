import type { Handler as ServerHandler } from "@netlify/functions";
import type { HandlerResponse as ServerResponse } from "@netlify/functions";
import { Response as FetchResponse } from 'node-fetch';
import { FetchError } from 'node-fetch';
import fetch from 'node-fetch';

export const handler: ServerHandler = async () => {
  let serverResponse: ServerResponse =  { statusCode: 500 };
  let apiResponse = await fetch('https://nodejs.org/dist/latest-hydrogen/SHASUMS256.txt')
  .then((response) => response as FetchResponse)
  .catch((error) => error as FetchError);
  if (apiResponse instanceof FetchResponse) {
    let tag_name = (await apiResponse.text())?.match(/v\d+\.\d+\.\d/)?.find(String);
    serverResponse = {
      statusCode: 302,
      headers: {
        'Content-Type': 'text/plain',
        'Location': `https://nodejs.org/dist/${tag_name}/node-${tag_name}-win-x64.zip`,
      },
    };
  }
  if (apiResponse instanceof FetchError) {
    serverResponse = {
      statusCode: 503,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: apiResponse.message,
    };
  }
  return serverResponse;
};

/***
 * Resources
 *   https://medium.com/better-practices/serverless-functions-the-fast-way-43d6128ff8d5
 *   https://docs.netlify.com/functions/create/?fn-language=ts
 ***/