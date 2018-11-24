import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose';
import LoginForm from '../components/LoginForm';
import LoggedinView from '../components/LoggedinView';

const checkAuth = noUserData => branch(
  noUserData,
  renderComponent(LoginForm),
  renderComponent(LoggedinView),
);

const loginMutationHandler = ({ mutate, setUser }) => ({ email, password }) => (
  mutate({
    variables: { email, password }
  })
  .then(({ data: { login: { user }}}) => {
    if (user) {
      setUser(user);
    }
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
  withState('user', 'setUser', null),
  withHandlers({
    loginMutation: loginMutationHandler,
  }),
  checkAuth(props => !(props.data && props.data.me) && !props.user),
);

export default enhanced();
