import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { compose, withHandlers, withState } from 'recompose';

const handleSubmit = ({ commentMutation, message }) => () => (
  commentMutation({ message })
);

const onChangeMessage = ({ setMessage }) => ({ target: { value }}) => {
  setMessage(value);
};

const CommentForm = ({
  handleSubmit,
  message,
  onChangeMessage,
}) => (
  <div>
    <FormControl fullWidth>
      <TextField
        label="Message:"
        onChange={onChangeMessage}
        type="message"
        value={message}
      />
    </FormControl>
    <Button color="primary" onClick={handleSubmit}>Post</Button>
  </div>
);

const enhanced = compose(
  withState('message', 'setMessage', ''),
  withHandlers({
    handleSubmit,
    onChangeMessage,
  })
);
export default enhanced(CommentForm);
