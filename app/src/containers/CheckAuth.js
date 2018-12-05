import { graphql } from 'react-apollo';
import { queryMe } from '../queries';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

const checkAuth = isAuthenticated => branch(
  isAuthenticated,
  renderComponent(props => props.children),
  renderNothing,
);

const enhanced = compose(
  graphql(queryMe),
  checkAuth(({ data, not }) => (data && data.me && !not) || (!(data && data.me) && not))
);

export default enhanced();
