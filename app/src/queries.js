import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        name
      }
    }
  }
`;

export const logoutMutation = gql`
  mutation logout {
    logout
  }
`;

export const queryMe = gql`
  query me {
    me {
      id
      name
    }
  }
`;

export const commentMutation = gql`
  mutation($message: String!, $isPublic: Boolean!) {
    createComment(
      message: $message
      isPublic: $isPublic
    ) {
      message
    }
  }
`;

export const replyMutation = gql`
  mutation($message: String!, $isPublic: Boolean!, $parentCommentId: ID) {
    createComment(
      message: $message
      isPublic: $isPublic
      parentCommentId: $parentCommentId,
    ) {
      message
    }
  }
`;

export const editCommentMutation = gql`
  mutation($id: ID!, $message: String!, $isPublic: Boolean) {
    editComment(
      id: $id,
      message: $message
      isPublic: $isPublic
    ) {
      message
      isPublic
    }
  }
`;

export const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(
      id: $id
    ) {
      id
    }
  }
`;

export const feedQuery = gql`
  query feed {
    feed {
      id
      message
      createdAt
      isPublic
      author {
        id
        name
      }
      children {
        id
        message
        createdAt
        author {
          id
          name
        }
        parent {
          id
        }
      }
    }
  }
`;

export const feedSubscriptionQuery = gql`
  subscription($includePrivate: Boolean) {
    feedSubscription(includePrivate: $includePrivate) {
      mutation
      node {
        id
        message
        createdAt
        isPublic
        author {
          id
          name
        }
        parent {
          id
        }
        children {
          id
          message
          createdAt
          author {
            id
            name
          }
        }
      }
      previousValues {
        id
        message
      }
    }
  }
`;

export const basicFeedSubscription = gql`
  subscription {
    feedSubscription {
      mutation
      node {
        id
        message
        updatedAt
      }
      previousValues {
        id
        message
      }
    }
  }
`;
