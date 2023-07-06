import type { Handler as ServerHandler } from "@netlify/functions";
import type { HandlerResponse as ServerResponse } from "@netlify/functions";
import { Response as FetchResponse } from 'node-fetch';
import { FetchError } from 'node-fetch';
import fetch from 'node-fetch';

export const handler: ServerHandler = async () => {
  let serverResponse: ServerResponse =  { statusCode: 500 };
  let apiResponse = await fetch('https://storage.googleapis.com/flutter_infra_release/releases/releases_windows.json')
  .then((response) => response as FetchResponse)
  .catch((error) => error as FetchError);
  if (apiResponse instanceof FetchResponse) {
    let announcement = JSON.parse(await apiResponse.text());
    let hashLatestStable = announcement?.current_release?.stable;
    let tagNumber = announcement?.releases?.find(release => release.hash === hashLatestStable).version;
    serverResponse = {
      statusCode: 302,
      headers: {
        'Content-Type': 'text/plain',
        'Location': `https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_${tagNumber}-stable.zip`,
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