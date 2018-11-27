import React from 'react';
import { compose } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CommentReplyView from './CommentReplyView';
import DeleteButtonContainer from '../containers/DeleteButtonContainer';
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
  },
  cardContent: {
    paddingTop: 0,
  },
  cardHeader: {
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
  }
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ children, classes, message, createdAt, user, commentId }) => (
  <Card className={classes.card}>
    <CardHeader
      className={classes.cardHeader}
      action={<DeleteButtonContainer commentId={commentId} />}
      subheader={<TimeAgo date={createdAt} />}
    />
    <CardContent className={classes.cardContent}>
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
