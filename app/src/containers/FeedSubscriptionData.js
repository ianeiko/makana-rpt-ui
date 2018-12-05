import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import { basicFeedSubscription } from '../queries';

const enhanced = compose(
  graphql(basicFeedSubscription),
  withProps(({ data: { feedSubscription } }) => {
    if (!feedSubscription) {
      return;
    }

    const { mutation, previousValues, node } = feedSubscription;
    const values = mutation === 'DELETED' ? previousValues : node;

    return { ...values, mutation };
  })
);

export default toRenderProps(enhanced);
