const UrlUtils = {
  /**
   * @name getFullUrlWithParams
   * @description Returns the full formatted url for an API end-point
   * by replacing parameters place holder with the actual values.
   * @param baseUrl The base API end-point witht params placeholders like {client}
   * @param params The request params object with the key/value entries for each parameter
   * @returns The fully formatted API end-point url with the actual parameter values
   */
  getFullUrlWithParams: (
    baseUrl: string,
    params: { [key: string]: number | string }
  ): string => {
    const lowerBaseUrl = baseUrl || "";
    const keys: string[] = Object.keys(params || {});
    if (lowerBaseUrl.indexOf("[") === -1 || keys.length === 0) {
      return lowerBaseUrl;
    }
    let fullUrl = lowerBaseUrl;
    keys.forEach((key) => {
      const value = (params[key] || "null").toString();
      const lowerKey = key || "";
      fullUrl = fullUrl.replace(`[${lowerKey}]`, value);
    });
    return fullUrl;
  },
};

export { UrlUtils };
