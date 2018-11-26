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
  subscription($includePrivate: Boolean) {
    feedSubscription(includePrivate: $includePrivate) {
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

const subscribeToMore = (user) => ({
  document: subscriptionQuery,
  updateQuery,
  variables: { includePrivate: !!user },
});

const enhanced = compose(
  graphql(query),
  withProps(({ data: { loading, feed } }) => ({
    loading: loading,
    comments: feed
  })),
  lifecycle({
    componentWillMount() {
      this.unsubscribe = this.props.data.subscribeToMore(subscribeToMore(this.props.user));
    },
    componentWillReceiveProps(nextProps) {
      const userChanged = this.props.user !== nextProps.user;
      if (userChanged) {
        this.unsubscribe();
        this.unsubscribe = this.props.data.subscribeToMore(subscribeToMore(nextProps.user));
      }
    },
  }),
);

export default toRenderProps(enhanced);
