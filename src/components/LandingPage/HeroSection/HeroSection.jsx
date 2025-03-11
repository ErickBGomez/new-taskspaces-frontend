import Title from 'antd/es/typography/Title';
import './HeroSection.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import { Button, Image } from 'antd';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <>
      <div className="hero">
        <div className="hero-container">
          <div className="hero-info">
            <div className="hero-info-text">
              <div className="hero-info-text-title">
                <Title level={2}>Complete Your Goals with TaskSpaces</Title>
              </div>
              <div className="hero-info-text-p">
                <Paragraph>
                  Experience seamless project management designed to help you
                  reach your goals faster and with ease.
                </Paragraph>
              </div>
            </div>
            <div className="hero-info-button">
              <Link to={{ pathname: '/register' }}>
                <Button type="default" variant="outlined">
                  Get started now
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero_image.svg" />
          </div>
        </div>
      </div>
    </>
  );
}
