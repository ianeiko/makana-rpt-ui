const errorsForField = (errors, field) => {
  if (!errors) {
    return false;
  }
  if (!field) {
    const serverError = errors.filter(error => !error.field).map(error => error.message);
    return serverError && serverError[0];
  }
  const match = errors.filter(error => error.field === field);
  if (match && match.length) {
    return match[0].message;
  }
  return false;
};

export default errorsForField;
