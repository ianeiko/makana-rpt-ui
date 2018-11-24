import React from 'react';

const getUserObject = (data, user) => {
  if (!user) {
    return data && data.me && data.me.name;
  }
  return user && user.name;
};

const LoggedinView = ({ data, user }) => (
  <div>Hello, {getUserObject(data, user)}!</div>
);

export default LoggedinView;
