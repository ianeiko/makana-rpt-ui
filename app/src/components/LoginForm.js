import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { compose, withHandlers, withState } from 'recompose';
import FormControl from './FormControl';
import Notice from './Notice';
import errorForField from '../utils/errorForField';
import validateLogin from '../validators/validateLogin';

const styles = theme => ({
  button: {
    float: 'right',
    marginTop: theme.spacing.unit
  },
  formLoading: {
    visibility: 'hidden'
  },
  form: {
    maxWidth: 400,
    width: '80%',
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2,
  },
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

const handleLogin = ({ email, loginMutation, setErrors, password }) => async event => {
  event.preventDefault();
  const errors = validateLogin({ email, password });
  setErrors(errors);
  if (errors) { return; }

  const result = await loginMutation({ email, password });
  if (result.errors && result.errors.length) {
    return setErrors(result.errors.map(error => ({ message: error })));
  }
};

const onChangeEmail = ({ errors, setEmail, setErrors }) => ({ target: { value }}) => {
  if (errorForField(errors, 'email') || errorForField(errors)) {
    setErrors(null);
  }
  setEmail(value);
};

const onChangePassword = ({ errors, setPassword, setErrors }) => ({ target: { value }}) => {
  if (errorForField(errors, 'password') || errorForField(errors)) {
    setErrors(null);
  }
  setPassword(value);
};

const LoginForm = ({
  classes,
  data,
  email,
  errors,
  handleLogin,
  onChangeEmail,
  onChangePassword,
  password,
}) => (
  <form className={data.loading ? classes.formLoading : classes.form} onSubmit={handleLogin}>
    <Notice message={errorForField(errors)} />
    <FormControl
      errors={errors}
      field="email"
      label="Email:"
      onChange={onChangeEmail}
      value={email}
    />
    <FormControl
      errors={errors}
      field="password"
      label="Password:"
      onChange={onChangePassword}
      type="password"
      value={password}
    />
    <Button
      className={classes.button}
      color="primary"
      disabled={!!errors}
      variant="contained"
      type="submit">
      Login
    </Button>
  </form>
);

const enhanced = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('errors', 'setErrors', null),
  withHandlers({
    onChangeEmail,
    onChangePassword,
    handleLogin,
  }),
  withStyles(styles)
);
export default enhanced(LoginForm);
