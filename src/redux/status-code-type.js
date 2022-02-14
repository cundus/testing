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
        title: 'Sorry, you are not authorized to access this application.',
        subTitle: `Refresh this page or try relogin again`
      };
      case USER_NOT_FOUND:
        return {
          status: httpHeaders.NOT_AUTHORIZED,
          title: 'Sorry, you are not authorized to access this application.',
          subTitle: `Contact the PMGM's help desk with the following information: ${statusDesc}. Error ${statusCode}`
        };
    case MULTI_SESSION_NOT_ALLOWED:
      return {
        status: httpHeaders.NOT_AUTHORIZED,
        title: 'Sorry, you are unable to access the application right now.',
        subTitle: `Sign Out from other device/browser or Contact the PMGM's help desk with the following information: ${statusDesc}. Error ${statusCode}`
      };
    case NOT_AUTHORIZED:
      return {
        status: httpHeaders.NOT_AUTHORIZED,
        title: 'Sorry, you are not authorized to access this application.',
        subTitle: `Refresh this page or try relogin again`
      };
    default:
      return {
        status: httpHeaders.ERR_SERVER,
        title: 'Sorry, Something went wrong with the server.',
        subTitle: `Contact the PMGM's help desk with the following information: ${statusDesc}. Error ${statusCode}`
      };
  }
};
