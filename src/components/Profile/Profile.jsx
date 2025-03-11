import { Avatar } from 'antd';

const Profile = ({ user, size }) => {
  const { username, avatar } = user;

  if (avatar) {
    return <Avatar src={avatar} alt={username} size={size} />;
  }

  return (
    <Avatar alt={username} size={size} style={{ backgroundColor: '#7A35DB' }}>
      {username[0].toUpperCase()}
    </Avatar>
  );
};

export default Profile;
