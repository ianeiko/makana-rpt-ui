import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, lifecycle, withProps, toRenderProps } from 'recompose';

const updateQuery = (prev, { subscriptionData: { data }}) => {
  if (!data) {
    return prev;
  }

  const { node, mutation } = data.feedSubscription;
  if (mutation === 'CREATED') {
    return {
      feed: [node, ...prev.feed]
    };
  }

  return prev;
};

const query = gql`
  query feed {
    feed {
      id
      message
      createdAt
    }
  }
`;

const subscriptionQuery = gql`
  subscription {
    feedSubscription {
      mutation
      node {
        id
        message
        createdAt
      }
      previousValues {
        id
        message
      }
    }
  }
`;

const enhanced = compose(
  graphql(query),
  withProps(({ data: { loading, feed } }) => ({
    loading: loading,
    comments: feed
  })),
  lifecycle({
    componentWillMount() {
      this.props.data.subscribeToMore({
        document: subscriptionQuery,
        updateQuery,
      });
    }
  }),
);

export default toRenderProps(enhanced);
