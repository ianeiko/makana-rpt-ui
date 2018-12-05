import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, compose, renderComponent, withHandlers } from 'recompose';
import LoginForm from '../components/LoginForm';
import LoggedinView from '../components/LoggedinView';

const checkAuth = isAuthenticated => branch(
  isAuthenticated,
  renderComponent(LoggedinView),
  renderComponent(LoginForm),
);

const loginMutationHandler = ({ mutate }) => ({ email, password }) => (
  mutate({
    variables: { email, password, },
    refetchQueries: ['me', 'feed'],
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
