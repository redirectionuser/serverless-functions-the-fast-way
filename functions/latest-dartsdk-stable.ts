import type { Handler as ServerHandler } from "@netlify/functions";

export const handler: ServerHandler = async () => {
  return {
    statusCode: 302,
    headers: {
    'Content-Type': 'text/plain',
    'Location': 'https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-windows-x64-release.zip',
    },
  };
};

/***
 * Resources
 *   https://medium.com/better-practices/serverless-functions-the-fast-way-43d6128ff8d5
 *   https://docs.netlify.com/functions/create/?fn-language=ts
 ***/