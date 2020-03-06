const { REACT_APP_REDIRECT_URI_AADMS } = process.env;

const redirectAadmsurl = () => {
  if (process.env.NODE_ENV === 'development') {
    return REACT_APP_REDIRECT_URI_AADMS;
  } else {
    return `${window.location.href}home`;
  }
};

export default redirectAadmsurl;
