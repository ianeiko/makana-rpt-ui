import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import EditCommentForm from '../components/EditCommentForm';

const editCommentMutationHandler = ({ mutate }) => ({ commentId, message, isPublic }) => (
  mutate({
    variables: { id: commentId, message, isPublic }
  })
);

const editCommentMutation = gql`
  mutation($id: ID!, $message: String!, $isPublic: Boolean) {
    editComment(
      id: $id,
      message: $message
      isPublic: $isPublic
    ) {
      message
      isPublic
    }
  }
`;

const enhanced = compose(
  graphql(editCommentMutation),
  withHandlers({
    editCommentMutation: editCommentMutationHandler,
  }),
);

export default enhanced(EditCommentForm);
