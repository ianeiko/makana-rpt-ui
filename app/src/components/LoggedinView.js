import React, { Fragment } from 'react';

const LoggedinView = ({ data }) => (
  <Fragment>
    Hello, {data && data.me && data.me.name}!
  </Fragment>
);

export default LoggedinView;
