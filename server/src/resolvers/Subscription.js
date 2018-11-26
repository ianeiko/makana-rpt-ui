const Subscription = {
  feedSubscription: {
    subscribe: (parent, { includePrivate }, ctx, info) => {
      const queryPublic = !includePrivate ? {
        where: {
          node: {
            isPublic: true
          }
        }
      } : {};
      return ctx.db.subscription.comment(
        queryPublic,
        info
      );
    }
  }
};

module.exports = { Subscription };
