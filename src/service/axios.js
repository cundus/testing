import axios from "axios";
import { INVALID_LOGIN_TOKEN, NOT_AUTHORIZED } from "../redux/status-code-type";
import apiUrl from "../utils/apiUrl";
import { authProvider } from "./activeDirectory";
import { loginByADToken } from "./auth";
const {
  REACT_APP_API_URL,
  REACT_APP_API_TIMEOUT,
  REACT_APP_MAX_REQUESTS_COUNT,
} = process.env;

const MAX_REQUESTS_COUNT = parseInt(REACT_APP_MAX_REQUESTS_COUNT);
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;
let REFRESH_TOKEN = 0;

const uuidv1 = require("uuid/v1");

// custom config to create a new instance
export const customAxios = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: parseInt(REACT_APP_API_TIMEOUT),
});

customAxios.interceptors.request.use(async (config) => {
  // console.log(config);
  return new Promise((resolve, reject) => {
    let interval = setInterval(async () => {
      if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
        PENDING_REQUESTS++;
        clearInterval(interval);

        config.baseURL = await apiUrl();
        let newHeaders = Object.assign(config.headers, {
          "X-Requested-With": `${uuidv1()}-${new Date().getTime()}`,
          Authorization: localStorage.getItem("sfToken")
            ? `Bearer ${localStorage.getItem("sfToken")}`
            : "",
        });
        if (!newHeaders.Authorization) {
          delete newHeaders.Authorization;
        }
        config.headers = newHeaders;
        resolve(config);
      }
    }, INTERVAL_MS);
  });
});

customAxios.interceptors.response.use(
  async function (response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    // console.log(response)
    if (
      REFRESH_TOKEN <= 2 &&
      (response?.data?.status_code === NOT_AUTHORIZED ||
        response?.data?.status_code === INVALID_LOGIN_TOKEN)
    ) {
      const originalRequest = response.config;
      const token = await authProvider.getAccessToken();
      try {
        const res = await loginByADToken(token?.accessToken);
        if (res?.data?.status_code === 0) {
          REFRESH_TOKEN++;
          const result = res?.data?.result;
          await localStorage.setItem("sfToken", result?.accessToken);
          customAxios.defaults.headers.common["Authorization"] =
            result?.accessToken ? `Bearer ${result?.accessToken}` : "";
          return customAxios(originalRequest);
        }
      } catch (error) {
        Promise.reject(error);
      }
    } else {
      REFRESH_TOKEN = 0;
      return Promise.resolve(response);
    }
  },
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
  }
);
