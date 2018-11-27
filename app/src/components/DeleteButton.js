import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { compose, withHandlers } from 'recompose';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit
  },
});

const handleDelete = ({ deleteCommentMutation, commentId }) => () => {
  deleteCommentMutation(commentId);
};


const DeleteButton = ({ classes, handleDelete }) => (
  <IconButton className={classes.button} onClick={handleDelete}>
    <DeleteIcon />
  </IconButton>
);

const enhanced = compose(
  withHandlers({
    handleDelete,
  }),
  withStyles(styles)
);
export default enhanced(DeleteButton);
