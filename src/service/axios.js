import axios from "axios";
import apiUrl from "../utils/apiUrl";
const { REACT_APP_API_URL, REACT_APP_API_TIMEOUT, REACT_APP_MAX_REQUESTS_COUNT} = process.env;

const MAX_REQUESTS_COUNT = parseInt(REACT_APP_MAX_REQUESTS_COUNT);
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

const uuidv1 = require("uuid/v1");

// custom config to create a new instance
export const customAxios = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: parseInt(REACT_APP_API_TIMEOUT)
});

customAxios.interceptors.request.use(async (config) => {
  return new Promise((resolve, reject) => {
    let interval = setInterval( async() => {
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

customAxios.interceptors.response.use(function (response) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.resolve(response)
}, function (error) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.reject(error)
})