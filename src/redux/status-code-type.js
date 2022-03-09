export const Success = 0;
export const SUCCESS = 0;
export const INVALID_LOGIN_TOKEN = 1001;
export const USER_NOT_FOUND = 1002;
export const ODATA_RESPONSE_ERROR = 1003;
export const MULTI_SESSION_NOT_ALLOWED = 1004;
export const FAILED_SAVE_OR_UPDATE_KPIS = 2001;
export const FAILED_DELETE_KPIS = 2002;
export const ATTACHMENT_NOT_FOUND = 2008;
export const FAILED_SAVE_CHALLENGE_YOURSELF = 2003;
export const REQUEST_NOT_RECOGNIZED = 9001;
export const NOT_AUTHORIZED = 9003;
export const JSON_PARSING_ERROR = 9004;
export const OPERATION_NOT_AUTHORIZED = 9005;
export const BAD_REQUEST = 9006;
export const GENERAL = 9999;

export const httpHeaders = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 403,
  ERR_SERVER: 500
};

export const errorHandlerCode = (statusCode, statusDesc) => {
  switch (statusCode) {
    case INVALID_LOGIN_TOKEN:
      return {
        status: httpHeaders.NOT_AUTHORIZED,
        title: `Failed to login
Please refresh this page, if Error still persist try to login again into PMGM web.`,
        subTitle: "(Invalid refresh token)"
      };
      case USER_NOT_FOUND:
        return {
          status: httpHeaders.NOT_AUTHORIZED,
          title: `Failed to login
You are not authorized to access PMGM web.`,
          subTitle: `${statusDesc}. Error ${statusCode}`
        };
    case MULTI_SESSION_NOT_ALLOWED:
      return {
        status: httpHeaders.NOT_AUTHORIZED,
        title: `Failed to login
Sign Out from other device/browser and try to login again into PMGM web.`,
        subTitle: `(${statusDesc}. Error ${statusCode})`
      };
    case NOT_AUTHORIZED:
      return {
        status: httpHeaders.NOT_AUTHORIZED,
        title: `Login session expired
Please refresh this page, if Error still persist try to login again into PMGM web`,
        subTitle: "(Invalid refresh token)"
      };
    default:
      return {
        status: httpHeaders.ERR_SERVER,
        title: `Something went wrong with the server.
Please try again later`,
        subTitle: statusCode ? `(${statusDesc}. Error ${statusCode})` : "(Internal Server Error)"
      };
  }
};
