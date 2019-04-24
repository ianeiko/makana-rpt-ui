import React, { Fragment } from 'react';
import Comment from './Comment';
import { compose } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ListComments = ({ comments, user }) => (
  <Fragment>
    {comments &&
      comments.map(({ id, ...comment }) => (
        <Comment user={user} commentId={id} key={id} {...comment} />
      ))}
  </Fragment>
);

export default compose(renderWhileLoading)(ListComments);
