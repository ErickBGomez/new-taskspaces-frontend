import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { Button, Result } from 'antd';

const NotFound = ({ type = 'page' }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const redirect = token ? '/w/' : '/';

  const onClick = () => {
    navigate(redirect);
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle={`Sorry, the ${type} you visited does not exist.`}
      extra={
        <Button type="primary" onClick={onClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
