import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import ReplyForm from '../components/ReplyForm';

const commentMutationHandler = ({ mutate }) => ({ message, isPublic, parentCommentId }) => (
  mutate({
    variables: { message, isPublic, parentCommentId }
  })
);

const commentMutation = gql`
  mutation($message: String!, $isPublic: Boolean!, $parentCommentId: ID) {
    createComment(
      message: $message
      isPublic: $isPublic
      parentCommentId: $parentCommentId,
    ) {
      message
    }
  }
`;

const enhanced = compose(
  graphql(commentMutation),
  withHandlers({
    commentMutation: commentMutationHandler,
  }),
);

export default enhanced(ReplyForm);
