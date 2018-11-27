import React, { Fragment } from 'react';
import { compose, withHandlers, withState } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import CommentReplyView from './CommentReplyView';
import DeleteButtonContainer from '../containers/DeleteButtonContainer';
import EditCommentContainer from '../containers/EditCommentContainer';
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
    minHeight: 48,
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  actionButton: {
    marginTop: theme.spacing.unit,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  }
});

const onChangeEditMode = ({ isEditMode, setEditMode }) => () => {
  setEditMode(!isEditMode);
};

const Comment = ({
  author,
  children,
  classes,
  commentId,
  createdAt,
  isEditMode,
  isPublic,
  message,
  onChangeEditMode,
  setEditMode,
  user,
 }) => (
  <Card className={classes.card}>
    <CardHeader
      className={classes.cardHeader}
      action={
        <Fragment>
          <IconButton className={classes.actionButton} onClick={onChangeEditMode} title="Edit">
            <EditIcon />
          </IconButton>
          <DeleteButtonContainer {...{ author, commentId, user }} />
        </Fragment>
      }
      subheader={
        <Typography variant="caption" color="textSecondary">
          {`Posted by ${author && author.name} `}
          <TimeAgo date={createdAt} />
        </Typography>
      }
    />
    <CardContent className={classes.cardContent}>
      {!isEditMode ? (
        <Typography variant="h5" component="h2">
          {message}
        </Typography>
      ) : <EditCommentContainer {...{ commentId, isPublic, setEditMode, message }} />}
      {children && children.map((reply, index) => (
        <CommentReplyView key={`${commentId}-reply-${index}`} {...reply} />
      ))}
    </CardContent>
    <CardActions className={classes.cardActions}>
      <ReplyFormContainer parentCommentId={commentId} user={user} />
    </CardActions>
  </Card>
);

const enhanced = compose(
  withState('isEditMode', 'setEditMode', false),
  withHandlers({
    onChangeEditMode,
  }),
  withStyles(styles)
);

export default enhanced(Comment);
