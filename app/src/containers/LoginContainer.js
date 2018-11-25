import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, compose, renderComponent, withHandlers } from 'recompose';
import LoginForm from '../components/LoginForm';
import LogoutContainer from './LogoutContainer';

const checkAuth = isAuthenticated => branch(
  isAuthenticated,
  renderComponent(LogoutContainer),
  renderComponent(LoginForm),
);

const loginMutationHandler = ({ mutate }) => ({ email, password }) => (
  mutate({
    // this does not work: https://github.com/apollographql/apollo-client/issues/423
    // onError: () => {},
    variables: { email, password, },
    refetchQueries: ['me', 'feed'],
  })
  .catch(error => {
    // hack: this should be handled in onError
    return { errors: error.graphQLErrors.map(error => error.message) };
  })
);

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        name
      }
    }
  }
`;

const enhanced = compose(
  graphql(loginMutation),
  withHandlers({
    loginMutation: loginMutationHandler,
  }),
  checkAuth(({ data }) => data && data.me),
);

export default enhanced();
