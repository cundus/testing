import apiUrl, {redirectUrl} from "./apiUrl";

const { REACT_APP_REDIRECT_URI_AADMS } = process.env;

const redirectAadmsurl = () => {
  return `${REACT_APP_REDIRECT_URI_AADMS}`;
};

export default redirectAadmsurl;
