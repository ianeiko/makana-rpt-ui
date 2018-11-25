import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import CommentForm from '../components/CommentForm';

const commentMutationHandler = ({ mutate }) => ({ message }) => (
  mutate({
    variables: { message }
  })
);

const commentMutation = gql`
  mutation($message: String!) {
    createComment(
      message: $message
      isPublic: true
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
