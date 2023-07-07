import type { Handler as ServerHandler } from "@netlify/functions";

export const handler: ServerHandler = async () => {
  return {
    statusCode: 200,
    headers: {
    'Content-Type': 'application/json',
    },
    body: `{
      "extensionsGallery": {
        "nlsBaseUrl": "https://www.vscode-unpkg.net/_lp/",
        "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
        "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
        "itemUrl": "https://marketplace.visualstudio.com/items",
        "publisherUrl": "https://marketplace.visualstudio.com/publishers",
        "resourceUrlTemplate": "https://{publisher}.vscode-unpkg.net/{publisher}/{name}/{version}/{path}",
        "controlUrl": "https://az764295.vo.msecnd.net/extensions/marketplace.json"
      }
    }`,
  };
};

/***
 * Resources
 *   https://medium.com/better-practices/serverless-functions-the-fast-way-43d6128ff8d5
 *   https://docs.netlify.com/functions/create/?fn-language=ts
 ***/