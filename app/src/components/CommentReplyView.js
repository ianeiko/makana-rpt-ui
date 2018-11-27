import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TimeAgo from 'react-timeago';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';

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

const LoggedinView = ({ author, classes, createdAt, message }) => (
  <div className={classes.reply}>
    <Typography variant="subtitle2">
      {message}
    </Typography>
    <Typography variant="caption" color="textSecondary">
      <TimeAgo date={createdAt} />
      {` - ${author && author.name}`}
    </Typography>
  </div>
);

const enhanced = compose(
  withStyles(styles)
);

export default enhanced(LoggedinView);
