import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import CommentForm from '../components/CommentForm';

const commentMutationHandler = ({ mutate }) => ({ message, isPublic }) => (
  mutate({
    variables: { message, isPublic }
  })
);

const commentMutation = gql`
  mutation($message: String!, $isPublic: Boolean!) {
    createComment(
      message: $message
      isPublic: $isPublic
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

export default enhanced(CommentForm);
