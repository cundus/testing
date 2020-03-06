const { REACT_APP_API_URL } = process.env;

const apiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return REACT_APP_API_URL;
  } else if (window.location.pathname !== '/') {
    return `${window.location.href.replace(window.location.pathname, '/')}api`;
  } else {
    return `${window.location.href}api`;
  }
};

export default apiUrl;
