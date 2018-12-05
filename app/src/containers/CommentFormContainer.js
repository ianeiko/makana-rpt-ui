import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { commentMutation } from '../queries';
import CommentForm from '../components/CommentForm';

const commentMutationHandler = ({ mutate }) => ({ message, isPublic }) => (
  mutate({
    variables: { message, isPublic }
  })
);

const enhanced = compose(
  graphql(commentMutation),
  withHandlers({
    commentMutation: commentMutationHandler,
  }),
);

export default enhanced(CommentForm);
