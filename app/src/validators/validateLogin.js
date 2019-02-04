import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

const validateLogin = ({ email, password }) => {
  if (isEmpty(email)) {
    return [{ message: 'Email cannot be blank', field: 'email' }];
  }
  if (!isEmail(email)) {
    return [{ message: 'Email is not valid', field: 'email' }];
  }
  if (isEmpty(password)) {
    return [{ message: 'Password cannot be blank', field: 'password' }];
  }
  return null;
};

export default validateLogin;
