import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { replyMutation } from '../queries';
import ReplyForm from '../components/ReplyForm';

const commentMutationHandler = ({ mutate }) => ({ message, isPublic, parentCommentId }) => (
  mutate({
    variables: { message, isPublic, parentCommentId }
  })
);

const enhanced = compose(
  graphql(replyMutation),
  withHandlers({
    commentMutation: commentMutationHandler,
  }),
);

export default enhanced(ReplyForm);
