import React from 'react';

function Profile({ user }) {
  return (
    <div className="container">
      <h1>Profile Page</h1>
      <p>Username: {user?.username}</p>
    </div>
  );
}

export default Profile;
