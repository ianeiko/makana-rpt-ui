import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { editCommentMutation } from '../queries';
import EditCommentForm from '../components/EditCommentForm';

const editCommentMutationHandler = ({ mutate }) => ({ commentId, message, isPublic }) => (
  mutate({
    variables: { id: commentId, message, isPublic }
  })
);

const enhanced = compose(
  graphql(editCommentMutation),
  withHandlers({
    editCommentMutation: editCommentMutationHandler,
  }),
);

export default enhanced(EditCommentForm);
