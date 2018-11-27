import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, lifecycle, withProps, toRenderProps } from 'recompose';

const findNodeIndex = (feed, id) => feed.findIndex(node => node.id === id);

const updateQuery = (prev, { subscriptionData: { data }}) => {
  if (!data) {
    return prev;
  }

  const { node, mutation, previousValues } = data.feedSubscription;
  if (mutation === 'CREATED') {
    if (node.parent && node.parent.id) {
      const resultFeed = prev.feed;
      const repliedNodeIndex = findNodeIndex(prev.feed, node.parent.id);
      const repliedNode = resultFeed[repliedNodeIndex];
      repliedNode.children = [...repliedNode.children, node];
      return { feed: resultFeed };
    }
    return {
      feed: [node, ...prev.feed]
    };
  } else if (mutation === 'DELETED') {
    const deletedNodeId = previousValues.id.match(/^StringIdGCValue\((.+)\)/);
    if (!deletedNodeId && !deletedNodeId[1]) {
      return prev;
    }
    return {
      feed: prev.feed.filter(node => node.id !== deletedNodeId[1]),
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
      children {
        id
        message
        createdAt
        parent {
          id
        }
      }
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
        parent {
          id
        }
        children {
          id
          message
          createdAt
        }
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
