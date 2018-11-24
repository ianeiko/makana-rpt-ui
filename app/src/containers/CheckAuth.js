import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

const checkAuth = isAuthenticated => branch(
  isAuthenticated,
  renderComponent(props => props.children),
  renderNothing,
);

const query = gql`
  query {
    me {
      name
    }
  }
`;

const enhanced = compose(
  graphql(query),
  checkAuth(({ data, not }) => (data && data.me && !not) || (!(data && data.me) && not))
);

export default enhanced();
