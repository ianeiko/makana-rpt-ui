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
});

const handleSubmit = ({ commentMutation, message, isPublic, setErrors, setMessage, parentCommentId }) => async event => {
  event.preventDefault();
  const errors = validateMessage({ message });
  setErrors(errors);
  if (errors) { return; }
  commentMutation({ message, isPublic, parentCommentId })
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

const onChangeIsPublic = ({ setIsPublic }) => (event, checked) => {
  setIsPublic(checked);
};

const ReplyComment = ({
  classes,
  errors,
  handleSubmit,
  isPublic,
  message,
  onChangeIsPublic,
  onChangeMessage,
  onKeyPress,
}) => (
  <form onSubmit={handleSubmit}>
    <FormControl
      errors={errors}
      field="message"
      label="Reply to post"
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
      label={isPublic ? 'Public reply' : 'Registered members only'}
    />
    <Button
      className={classes.button}
      color="primary"
      disabled={!!errors}
      variant="contained"
      type="submit">
      Reply
    </Button>
  </form>
);

const enhanced = compose(
  withState('message', 'setMessage', ''),
  withState('isPublic', 'setIsPublic', true),
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
export default enhanced(ReplyComment);
