import GreetingUser from './GreetingUser/GreetingUser.jsx';
import GreetingWorkspace from './GreetingWorkspace/GreetingWorkspace';

export default function Greeting({ user, title }) {
  return (
    <>
      <GreetingUser user={user} />
      <GreetingWorkspace title={title} />
    </>
  );
}
