import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withProps, toRenderProps } from 'recompose';

const query = gql`
  query me {
    me {
      id
      name
    }
  }
`;

const enhanced = compose(
  graphql(query),
  withProps(({ data: { me }}) => me)
);

export default toRenderProps(enhanced);
