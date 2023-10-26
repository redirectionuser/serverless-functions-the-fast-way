import type { Handler as ServerHandler } from "@netlify/functions";
import type { HandlerResponse as ServerResponse } from "@netlify/functions";
import { Response as FetchResponse } from 'node-fetch';
import { FetchError } from 'node-fetch';
import fetch from 'node-fetch';

export const handler: ServerHandler = async () => {
  const githubProject = 'adoptium/temurin17-binaries';
  let serverResponse: ServerResponse =  { statusCode: 500 };
  let apiResponse = await fetch(`https://api.github.com/repos/${githubProject}/releases/latest`)
  .then((response) => response as FetchResponse)
  .catch((error) => error as FetchError);
  if (apiResponse instanceof FetchResponse) {
    let tagNumber = JSON.parse(await apiResponse.text())?.tag_name?.match(/\d+[\d\.+]+/)?.find(String);
    let downloadUri = `https://github.com/${githubProject}/releases/download/jdk-${tagNumber}/OpenJDK17U-jdk_x86-32_windows_hotspot_${tagNumber.replace('+','_')}.zip`;
    serverResponse = {
      statusCode: 302,
      headers: {
        'Content-Type': 'text/plain',
        'Location': downloadUri,
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