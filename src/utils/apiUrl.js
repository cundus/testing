const { REACT_APP_API_URL } = process.env;

const apiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('apiUrl', REACT_APP_API_URL);
    return REACT_APP_API_URL;
  } else if (window.location.pathname !== '/') {
    localStorage.setItem('apiUrl', `${window.location.href.replace(window.location.pathname, '/')}api`);
    return `${window.location.href.replace(window.location.pathname, '/')}api`;
  } else {
    localStorage.setItem('apiUrl', `${window.location.href}api`);
    return `${window.location.href}api`;
  }
};

export default apiUrl;
