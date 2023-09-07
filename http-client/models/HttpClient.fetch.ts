// file: src/http-client/models/HttpClient.fetch.ts
import "cross-fetch/polyfill";
import { IHttpRequestParams } from "./HttpRequestParams.interface";
import { IHttpClient } from "./HttpClient.interface";
import { HttpRequestType } from "./HttpRequestType.enum";
import { UrlUtils } from "./UrlUtils";
import { httpResponseHelper } from "./HttpResponseHelper";
import { IHttpClientConfig } from "@/app-config/models/AppConfig.interface";
import { customFetch } from "./HttpClient.custom.fetch";
const mimeContentTypes = Object.freeze({
  applicationJson: "application/json",
  imageJpeg: "image/jpeg",
  imagePng: "image/png",
  imageSvgXml: "image/svg+xml",
});
const imageMimeTypes: Readonly<string[]> = Object.freeze([
  mimeContentTypes.imageJpeg,
  mimeContentTypes.imagePng,
  mimeContentTypes.imageSvgXml,
]);
const isContentTypeJson = (contentType: string): boolean => {
  return (contentType || "").indexOf("application/json") !== -1;
};
const getContentType = (response: { headers: any }) => {
  if (response && response.headers) {
    return response.headers.get("Content-Type");
  }
  return "text/plain";
};
const getResultFromResponse = async <R>(response: Response) => {
  const contentType = getContentType(response);
  if (isContentTypeJson(contentType)) {
    return (await response.json()) as any as R;
  } else if (imageMimeTypes.includes(contentType)) {
    return (await response.blob()) as any as R;
  } else {
    return (await response.text()) as any as R;
  }
};
const getSerializedExceptionInfo = (
  response: any,
  overrideMessage: string = "",
  exceptionInfo?: any
): any => {
  const { statusText, headers, status } = response;
  let message = overrideMessage || response.message;
  return JSON.stringify({
    status,
    statusText,
    headers,
    message,
    error: true,
    failed: true,
    success: false,
  });
};
// a list of http status code that we'll be ignored by the try/catch block in the request method
// and will bubble up to the UI so we can handle with app notification
const _bubbleUpStatusCodes = Object.freeze([400, 401]);
const statusCodeIsError = (statusCode: number): boolean => {
  return (
    _bubbleUpStatusCodes.indexOf(Number(statusCode)) === -1 &&
    Number(statusCode) >= 400
  );
};
/**
 * @name HttpClientFetch
 * @description
 * Wraps http client functionality to avoid directly using fetch
 * and simplify replacement in the future if such npm package would stop being developed or other reasons
 */
export class HttpClientFetch implements IHttpClient {
  private _httpClientConfig?: IHttpClientConfig;
  constructor(httpClientConfig?: IHttpClientConfig) {
    this._httpClientConfig = httpClientConfig;
    // OPTIONAL for now: Add request interceptor to handle errors or other things for each request in one place
  }
  /**
   * @name request
   * @description
   * A method that executes different types of http requests (i.e. GET/POST/etc)
   * based on the parameters argument.
   * The type R specify the type of the result returned
   * The type P specify the type of payload if any
   * @returns A Promise<R> as the implementation of this method will be async.
   */
  async request<R, P = void>(parameters: IHttpRequestParams<P>): Promise<R> {
    // if (LocalStorageUtils.getOffline()) {
    //   return new Promise<R>((resolve, reject) => {
    //     reject("You are offline");
    //   });
    // }
    // use destructuring to extract the parameters into local variables
    const {
      requestType,
      url,
      requiresToken,
      payload,
      headers,
      addOptions,
      mockDelay,
      dynamicContentType,
      returnRawResponse,
      injectPayloadDirectly,
      handleReject,
      getServerResponse,
    } = parameters;
    // use helper to build the fullUrl with request parameters derived from the payload
    const fullUrl = UrlUtils.getFullUrlWithParams(url, payload as any);

    //logger.log('HttpClient: fetch: fullUrl: ', fullUrl, payload)
    // set fetch options
    let options: RequestInit | any = {
      credentials: "include",
      redirect: "follow",
      headers: {},
    };
    if (headers) {
      options.headers = {
        ...headers,
      };
    }
    if (addOptions && typeof addOptions === "object") {
      options = {
        ...options,
        ...addOptions,
      };
    }
    if (
      !options.headers?.hasOwnProperty("Content-Type") &&
      !dynamicContentType
    ) {
      options.headers = {
        ...headers,
        "Content-Type": mimeContentTypes.applicationJson,
      };
    }
    // set headers Authorization
    if (requiresToken && options.headers) {
      // set the Authorization header with a bearer token
      //options.headers.Authorization = `bearer ${JwtHelpers.getRawJwtToken()}`
    }
    const checkRedirect = async (resp: any) => {
      if (resp.redirected) {
        //logger.log('fetch: checkRedirect: response.redirected')
        document.location = resp.url;
        return true;
      }
      return false;
    };
    let result!: R;
    try {
      switch (requestType) {
        // executes a get request:
        case HttpRequestType.get: {
          options.method = "GET";
          const response = (await customFetch(fullUrl, options)) as Response;

          const redirected = await checkRedirect(response);
          if (returnRawResponse) {
            result = (<any>response) as R;
            break;
          }
          if (!redirected) {
            if (statusCodeIsError(response.status)) {
              const exceptionInfo = getSerializedExceptionInfo(
                response,
                "GET: Exception"
              );
              throw Error(exceptionInfo);
            } else {
              try {
                result = await getResultFromResponse<R>(response);
              } catch (exception) {
                const exceptionInfo = getSerializedExceptionInfo(
                  response,
                  "GET: Exception Parsing Response",
                  exception
                );
                console.error(
                  `HttpClient.fetch: ${exceptionInfo.message}:`,
                  exceptionInfo
                );
                throw Error(exceptionInfo);
              }
            }
          }
          break;
        }
        // executes a post request:
        case HttpRequestType.post: {
          options.method = "POST";
          if (injectPayloadDirectly) {
            options.body = payload;
          } else {
            options.body =
              typeof payload === "string" ? payload : JSON.stringify(payload);
          }
          // fetch response
          let response = (await fetch(fullUrl, options)) as any;
          const redirected = await checkRedirect(response);
          if (!redirected) {
            if (
              statusCodeIsError(response.status) &&
              !url.toLowerCase().includes("Picture".toLowerCase())
            ) {
              const exceptionInfo = getSerializedExceptionInfo(
                response,
                "POST: Exception"
              );
              throw Error(exceptionInfo);
            } else {
              try {
                result = await getResultFromResponse<R>(response);
              } catch (exception) {
                const exceptionInfo = getSerializedExceptionInfo(
                  response,
                  "POST: Exception Parsing Response",
                  exception
                );
                console.error(
                  `HttpClient.fetch: ${exceptionInfo.message}:`,
                  exceptionInfo
                );
                throw Error(exceptionInfo);
              }
            }
          }
          break;
        }
        // executes a put request:
        case HttpRequestType.put: {
          options.method = "PUT";
          if (injectPayloadDirectly) {
            options.body = payload;
          } else {
            options.body =
              typeof payload === "string" ? payload : JSON.stringify(payload);
          }
          const response = (await fetch(fullUrl, options)) as any;
          if (getServerResponse) {
            result = (await response.json()) as R;
            break;
          }
          const redirected = await checkRedirect(response);
          if (!redirected) {
            if (statusCodeIsError(response.status)) {
              const exceptionInfo = getSerializedExceptionInfo(
                response,
                "PUT: Exception"
              );
              throw Error(exceptionInfo);
            } else {
              try {
                result = await getResultFromResponse<R>(response);
              } catch (exception) {
                const exceptionInfo = getSerializedExceptionInfo(
                  response,
                  "PUT: Exception Parsing Response",
                  exception
                );
                console.error(
                  `HttpClient.fetch: ${exceptionInfo.message}:`,
                  exceptionInfo
                );
                throw Error(exceptionInfo);
              }
            }
          }
          break;
        }
        // executes a delete request:
        case HttpRequestType.delete: {
          options.method = "DELETE";
          const response = (await fetch(fullUrl, options)) as any;
          const redirected = await checkRedirect(response);
          if (!redirected) {
            if (statusCodeIsError(response.status)) {
              const exceptionInfo = getSerializedExceptionInfo(
                response,
                "DELETE: Exception"
              );
              throw Error(exceptionInfo);
            } else {
              try {
                result = await getResultFromResponse<R>(response);
              } catch (exception) {
                const exceptionInfo = getSerializedExceptionInfo(
                  response,
                  "DELETE: Exception Parsing Response",
                  exception
                );
                console.error(
                  `HttpClient.fetch: ${exceptionInfo.message}:`,
                  exceptionInfo
                );
                throw Error(exceptionInfo);
              }
            }
          }
          break;
        }
        // executes a patch request:
        case HttpRequestType.patch: {
          options.method = "PATCH";
          options.body =
            typeof payload === "string" ? payload : JSON.stringify(payload);
          const response = (await fetch(fullUrl, options)) as any;
          const redirected = await checkRedirect(response);
          if (!redirected) {
            if (statusCodeIsError(response.status)) {
              const exceptionInfo = getSerializedExceptionInfo(
                response,
                "POST: Exception"
              );
              throw Error(exceptionInfo);
            } else {
              try {
                result = await getResultFromResponse<R>(response);
              } catch (exception) {
                const exceptionInfo = getSerializedExceptionInfo(
                  response,
                  "PATCH: Exception Parsing Response",
                  exception
                );
                console.error(
                  `HttpClient.fetch: ${exceptionInfo.message}:`,
                  exceptionInfo
                );
                throw Error(exceptionInfo);
              }
            }
          }
          break;
        }
        default: {
        }
      }
    } catch (e: any) {
      if (handleReject) {
        return new Promise<R>((resolve, reject) => {
          const exceptionInfo = JSON.parse(e.message);
          const appNotification =
            httpResponseHelper.getAppNotificationFromHttpExceptionInfo(
              exceptionInfo as any
            );
          reject(appNotification.message);
        });
      } else {
        try {
          const exceptionInfo = JSON.parse(e.message);
          const appNotification =
            httpResponseHelper.getAppNotificationFromHttpExceptionInfo(
              exceptionInfo as any
            );
          // use postbox (pub-sub) to broadcast the appNotification
        } catch {}
      }
    }
    if ((mockDelay || 0) > 0) {
      return new Promise<R>((resolve) => {
        setTimeout(() => {
          resolve(result);
        }, mockDelay);
      });
    }
    return result;
  }
}
