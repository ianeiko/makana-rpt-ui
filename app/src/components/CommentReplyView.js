import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TimeAgo from 'react-timeago';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import DeleteButtonContainer from '../containers/DeleteButtonContainer';

const styles = theme => ({
  timeStamp: {
    float: 'right',
  },
  reply: {
    borderTop: '2px solid',
    borderColor: theme.palette.divider,
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  }
});

const LoggedinView = ({ author, id, classes, createdAt, commentId, message, user }) => {
  return (
  <div className={classes.reply}>
    <Typography variant="subtitle2">
      {message}
    </Typography>
    <Typography variant="caption" color="textSecondary">
      <TimeAgo date={createdAt} />
      {` - ${author && author.name}`}
    </Typography>
    <DeleteButtonContainer {...{ author, commentId: id, user }} />
  </div>
);
};

const enhanced = compose(
  withStyles(styles)
);

export default enhanced(LoggedinView);
