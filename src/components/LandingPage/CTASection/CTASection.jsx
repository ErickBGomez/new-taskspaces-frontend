import Title from 'antd/es/typography/Title';
import './CTASection.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function CTASection() {
  return (
    <>
      <div className="cta">
        <div className="cta-container">
          <div className="cta-text">
            <div className="cta-text-t">
              <Title level={2}>Simplify Your Projects Today</Title>
            </div>
            <div className="cta-text-p">
              <Paragraph>
                Get started with TaskSpaces and experience project management
                that’s simple, powerful, and built for you.
              </Paragraph>
            </div>
          </div>
          <div className="cta-button">
            <Link to={{ pathname: '/register' }}>
              <Button type="primary">Get started now</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
