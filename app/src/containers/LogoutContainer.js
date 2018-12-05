import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { logoutMutation } from '../queries';
import LoggedinView from '../components/LoggedinView';

const logoutMutationHandler = ({ mutate }) => () => (
  mutate({
    refetchQueries: ['me', 'feed'],
  })
);

const enhanced = compose(
  graphql(logoutMutation),
  withHandlers({
    logoutMutation: logoutMutationHandler,
  }),
);

export default enhanced(LoggedinView);
