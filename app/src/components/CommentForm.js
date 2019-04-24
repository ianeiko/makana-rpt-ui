import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { compose, withHandlers, withState } from 'recompose';
import FormControl from './FormControl';
import errorForField from '../utils/errorForField';
import validateMessage from '../validators/validateMessage';

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
  }
});

const handleSubmit = ({ commentMutation, message, setErrors, setMessage }) => async event => {
  event.preventDefault();
  const errors = validateMessage({ message });
  setErrors(errors);
  if (errors) { return; }
  commentMutation({ message })
    .then(() => {
      setMessage('');
    });
};

const onKeyPress = ({ handleSubmit }) => event => {
  if (event.key === 'Enter' && event.ctrlKey) {
    handleSubmit(event);
  }
};

const onChangeMessage = ({ errors, setErrors, setMessage }) => ({ target: { value }}) => {
  if (errorForField(errors, 'message')) {
    setErrors(null);
  }
  setMessage(value);
};

const CommentForm = ({
  classes,
  errors,
  handleSubmit,
  message,
  onChangeMessage,
  onKeyPress,
}) => (
  <form className={classes.form} onSubmit={handleSubmit}>
    <FormControl
      errors={errors}
      field="message"
      label="How will you make our world a better place?"
      onChange={onChangeMessage}
      value={message}
      textFieldOptions={{
        multiline: true,
        onKeyPress,
      }}
    />
    <Button
      className={classes.button}
      color="primary"
      disabled={!!errors}
      variant="contained"
      type="submit">
      Post
    </Button>
  </form>
);

const enhanced = compose(
  withState('message', 'setMessage', ''),
  withState('errors', 'setErrors', null),
  withHandlers({
    handleSubmit,
  }),
  withHandlers({
    onKeyPress,
    onChangeMessage,
  }),
  withStyles(styles)
);
export default enhanced(CommentForm);
