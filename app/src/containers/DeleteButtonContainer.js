import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, compose, renderComponent, renderNothing, withHandlers } from 'recompose';
import DeleteButton from '../components/DeleteButton';

const checkOwner = currentUserIsOwner => branch(
  currentUserIsOwner,
  renderComponent(DeleteButton),
  renderNothing,
);

const deleteCommentMutationHandler = ({ mutate }) => commentId => (
  mutate({
    variables: { id: commentId }
  })
);

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(
      id: $id
    ) {
      id
    }
  }
`;

const enhanced = compose(
  graphql(deleteComment),
  withHandlers({
    deleteCommentMutation: deleteCommentMutationHandler,
  }),
  checkOwner(({ author, user }) => author && user && author.id === user.id),
);

export default enhanced();
