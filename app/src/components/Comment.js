import React from 'react';
import { compose } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CommentReplyView from './CommentReplyView';
import ReplyFormContainer from '../containers/ReplyFormContainer';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
    marginRight: 0,
    maxWidth: 400,
    width: '80%'
  },
  cardActions: {
    borderTop: '2px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.grey[100],
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  }
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ children, classes, message, createdAt, user, commentId }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        <TimeAgo date={createdAt} />
      </Typography>
      <Typography variant="h5" component="h2">
        {message}
      </Typography>
      {children && children.map((reply, index) => (
        <CommentReplyView key={`${commentId}-reply-${index}`} {...reply} />
      ))}
    </CardContent>
    <CardActions className={classes.cardActions}>
      <ReplyFormContainer parentCommentId={commentId} user={user} />
    </CardActions>
  </Card>
));
