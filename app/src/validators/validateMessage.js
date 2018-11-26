import isEmpty from 'validator/lib/isEmpty';

const validateMessage = ({ message }) => {
  if (isEmpty(message, { ignore_whitespace: true })) {
    return [{ message: 'Message cannot be blank', field: 'message' }];
  }
  return null;
};

export default validateMessage;
