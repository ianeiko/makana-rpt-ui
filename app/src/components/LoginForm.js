import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { compose, withHandlers, withState } from 'recompose';

const handleLogin = ({ email, loginMutation, password }) => () => (
  loginMutation({ email, password })
);

const onChangeEmail = ({ setEmail }) => ({ target: { value }}) => {
  setEmail(value);
};

const onChangePassword = ({ setPassword }) => ({ target: { value }}) => {
  setPassword(value);
};

const LoginForm = ({
  email,
  handleLogin,
  password,
  onChangeEmail,
  onChangePassword,
}) => (
  <div>
    <FormControl fullWidth>
      <TextField
        label="Email:"
        onChange={onChangeEmail}
        value={email}
      />
    </FormControl>
    <FormControl fullWidth>
      <TextField
        label="Password:"
        onChange={onChangePassword}
        type="password"
        value={password}
      />
    </FormControl>
    <Button color="primary" onClick={handleLogin}>Login</Button>
  </div>
);

const enhanced = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    handleLogin,
    onChangeEmail,
    onChangePassword,
  })
);
export default enhanced(LoginForm);
