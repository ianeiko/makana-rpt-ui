import { graphql } from 'react-apollo';
import { feedQuery, feedSubscriptionQuery } from '../queries';
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
  } else if (mutation === 'UPDATED') {
    const resultFeed = prev.feed;
    const updatedNodeIndex = findNodeIndex(prev.feed, node.id);
    resultFeed[updatedNodeIndex] = node;
    return { feed: resultFeed };
  }

  return prev;
};

const subscribeToMore = (user) => ({
  document: feedSubscriptionQuery,
  updateQuery,
  variables: { includePrivate: !!user },
});

const enhanced = compose(
  graphql(feedQuery),
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
