const getChallengeYourselfChecker = (data) => {
  if (data === '----------') {
    return '';
  } else {
    return data;
  }
};

const sendChallengeYourselfChecker = (data) => {
  if (data === '') {
    return '----------';
  } else {
    return data;
  }
};

export {
  getChallengeYourselfChecker,
  sendChallengeYourselfChecker
};
