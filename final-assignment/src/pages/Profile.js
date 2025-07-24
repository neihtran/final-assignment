function Profile({ user }) {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {user?.username}</p>
    </div>
  );
}
export default Profile;
