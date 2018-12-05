import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import { queryMe } from '../queries';

const enhanced = compose(
  graphql(queryMe),
  withProps(({ data: { me }}) => me)
);

export default toRenderProps(enhanced);
