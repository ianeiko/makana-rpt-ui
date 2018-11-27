import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { compose, withHandlers, withState } from 'recompose';
import FormControl from './FormControl';
import errorForField from '../utils/errorForField';
import validateMessage from '../validators/validateMessage';

const styles = theme => ({
  button: {
    float: 'right',
    marginTop: theme.spacing.unit
  },
  form: {
    maxWidth: 400,
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  }
});

const handleSubmit = ({ editCommentMutation, commentId, message, isPublic, setErrors, setEditMode }) => async event => {
  event.preventDefault();
  const errors = validateMessage({ message });
  setErrors(errors);
  if (errors) { return; }
  editCommentMutation({ commentId, message, isPublic })
    .then(() => setEditMode(false));
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

const onChangeIsPublic = ({ setIsPublic }) => (event, checked) => {
  setIsPublic(checked);
};

const CommentForm = ({
  classes,
  errors,
  handleSubmit,
  isPublic,
  message,
  onChangeIsPublic,
  onChangeMessage,
  onKeyPress,
}) => (
  <form className={classes.form} onSubmit={handleSubmit}>
    <FormControl
      errors={errors}
      field="message"
      label="edit:"
      onChange={onChangeMessage}
      value={message}
      textFieldOptions={{
        multiline: true,
        onKeyPress,
      }}
    />
    <FormControlLabel
      control={
        <Switch
          checked={isPublic}
          value={isPublic}
          onChange={onChangeIsPublic}
          color="primary"
        />
      }
      label={isPublic ? 'Share with everyone?' : 'Only registered users'}
    />
    <Button
      className={classes.button}
      color="primary"
      disabled={!!errors}
      variant="contained"
      type="submit">
      Save
    </Button>
  </form>
);

const enhanced = compose(
  withState('message', 'setMessage', ({ message }) => message),
  withState('isPublic', 'setIsPublic', ({ isPublic }) => isPublic),
  withState('errors', 'setErrors', null),
  withHandlers({
    handleSubmit,
  }),
  withHandlers({
    onKeyPress,
    onChangeMessage,
    onChangeIsPublic,
  }),
  withStyles(styles)
);
export default enhanced(CommentForm);
