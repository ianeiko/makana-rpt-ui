import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import LoggedinView from '../components/LoggedinView';

const logoutMutationHandler = ({ mutate }) => () => (
  mutate({
    refetchQueries: ['me', 'feed'],
  })
);

const logoutMutation = gql`
  mutation logout {
    logout
  }
`;

const enhanced = compose(
  graphql(logoutMutation),
  withHandlers({
    logoutMutation: logoutMutationHandler,
  }),
);

export default enhanced(LoggedinView);
