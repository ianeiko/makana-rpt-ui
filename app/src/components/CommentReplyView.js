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

const LoggedinView = ({ classes, createdAt, message }) => (
  <div className={classes.reply}>
    <Typography className={classes.timeStamp} variant="subtitle1" color="textSecondary" gutterBottom>
      <TimeAgo date={createdAt} />
    </Typography>
    <Typography variant="subtitle2">
      {message}
    </Typography>
  </div>
);

const enhanced = compose(
  withStyles(styles)
);

export default enhanced(LoggedinView);
