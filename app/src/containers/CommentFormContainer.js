import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, compose, renderComponent, renderNothing, withHandlers } from 'recompose';
import CommentForm from '../components/CommentForm';

const checkUserState = userLoggedIn => branch(
  userLoggedIn,
  renderComponent(CommentForm),
  renderNothing,
);

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
  // TODO: fix with checkAuth
  checkUserState(() => true)
);

export default enhanced(CommentForm);
