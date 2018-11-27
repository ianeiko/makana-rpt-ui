import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import DeleteButton from '../components/DeleteButton';

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
);

export default enhanced(DeleteButton);
