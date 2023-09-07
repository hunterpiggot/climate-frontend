export interface IApiResponseWithFault {
  fault?: {
    detail: {
      errorcode: string;
    };
    faultstring: string;
  };
}
