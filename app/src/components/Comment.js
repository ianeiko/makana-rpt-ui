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

function renderActionButtons({ author, commentId, classes, onChangeEditMode, user }) {
  return (
    <Fragment>
      <IconButton className={classes.actionButton} onClick={onChangeEditMode} title="Edit">
        <EditIcon />
      </IconButton>
      <DeleteButtonContainer {...{ author, commentId, user }} />
    </Fragment>
  );
}

function renderSubheader({ author, createdAt }) {
  return (
    <Typography variant="caption" color="textSecondary">
      {`Posted by ${author && author.name} `}
      <TimeAgo date={createdAt} />
    </Typography>
  );
}

function renderReplies({ children: replies, commentId }) {
  return (
    <Fragment>
      {replies && replies.map((reply, index) => (
        <CommentReplyView key={`${commentId}-reply-${index}`} {...reply} />
      ))}
    </Fragment>
  );
}

const Comment = (props) => {
  const {
    classes,
    commentId,
    isEditMode,
    isPublic,
    message,
    setEditMode,
    user,
  } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        action={renderActionButtons(props)}
        subheader={renderSubheader(props)}
      />
      <CardContent className={classes.cardContent}>
        <EditCommentContainer {...{ commentId, isPublic, isEditMode, setEditMode, message }} />
        {renderReplies(props)}
      </CardContent>
      {!isEditMode ? (
        <CardActions className={classes.cardActions}>
          <ReplyFormContainer parentCommentId={commentId} user={user} />
        </CardActions>
      ) : null}
    </Card>
  );
};

const enhanced = compose(
  withState('isEditMode', 'setEditMode', false),
  withHandlers({
    onChangeEditMode,
  }),
  withStyles(styles)
);

export default enhanced(Comment);
