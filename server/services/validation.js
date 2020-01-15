const { emailRegex } = require('../templates/types').regex;

const validRegisterData = ({ email, password, passwordRepeat }) => {
  const error = {};
  let isError = false;
  if (email && !emailRegex.test(email)) {
    error.email = 'E-mail address is incorrect';
    isError = true;
  }
  if (password && password.length < 10) {
    error.password = 'Password is too short';
    isError = true;
  }
  if (passwordRepeat && password !== passwordRepeat) {
    error.passwordRepeat = 'Passwords are not the same';
    isError = true;
  }
  if (password && passwordRepeat === undefined) {
    error.passwordRepeat = 'You need repeat password';
    isError = true;
  }
  return isError ? error : isError;
};

module.exports = {
  validRegisterData,
};
