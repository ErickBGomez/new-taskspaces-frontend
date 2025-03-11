import { Image } from 'antd';
import './GreetingUser.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import Profile from '../../../Profile/Profile';

export default function GreetingUser({ user }) {
  const { name: fullname, avatar } = user;
  const timeOfDay = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    hour12: false,
  });

  let greetingText;
  if (timeOfDay < 12) {
    greetingText = 'Good Morning';
  } else if (timeOfDay < 18) {
    greetingText = 'Good Afternoon';
  } else {
    greetingText = 'Goodnight';
  }

  return (
    <>
      <div className="greeting-user">
        <div className="greeting-user-main">
          <div className="greeting-user-profile">
            <Profile user={user} size={60} />
          </div>
          <div className="greeting-user-text">
            <Paragraph>
              {greetingText}, {name}
            </Paragraph>
          </div>
        </div>
      </div>
    </>
  );
}
