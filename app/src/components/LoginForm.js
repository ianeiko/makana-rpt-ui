import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { compose, withHandlers, withState } from 'recompose';
import Notice from './Notice';

const styles = theme => ({
  button: {
    float: 'right',
    marginTop: theme.spacing.unit
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

const validateInputs = ({ email, password }) => {
  if (email === '') {
    return [{ message: 'Email cannot be blank!' }];
  }
  if (password === '') {
    return [{ message: 'Password cannot be blank!' }];
  }
  return null;
};

const handleLogin = ({ email, loginMutation, setErrors, password }) => async event => {
  event.preventDefault();
  const errors = validateInputs({ email, password });
  if (errors) {
    return setErrors(errors);
  }
  setErrors(null);

  const result = await loginMutation({ email, password });
  if (result.errors && result.errors.length) {
    return setErrors(result.errors.map(error => ({ message: error })));
  }
};

const onChangeEmail = ({ setEmail, setErrors }) => ({ target: { value }}) => {
  setErrors(null);
  setEmail(value);
};

const onChangePassword = ({ setPassword, setErrors }) => ({ target: { value }}) => {
  setErrors(null);
  setPassword(value);
};

const LoginForm = ({
  classes,
  email,
  errors,
  handleLogin,
  password,
  onChangeEmail,
  onChangePassword,
}) => (
  <form className={classes.form} onSubmit={handleLogin}>
    <Notice message={errors && errors[0] && errors[0].message} />
    <FormControl className={classes.formControl} fullWidth>
      <TextField
        label="Email:"
        onChange={onChangeEmail}
        value={email}
      />
    </FormControl>
    <FormControl className={classes.formControl} fullWidth>
      <TextField
        label="Password:"
        onChange={onChangePassword}
        type="password"
        value={password}
      />
    </FormControl>
    <Button
    className={classes.button}
      color="primary"
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
