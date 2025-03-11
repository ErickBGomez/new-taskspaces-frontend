import './Testimonial.scss';
import TestimonialCarousel from '../TestimonialCarousel/TestimonialCarousel';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import {
  AmazonOutlined,
  AppleOutlined,
  RedditOutlined,
  SpotifyOutlined,
  TwitchFilled,
} from '@ant-design/icons';

export default function Testimonial() {
  return (
    <>
      <div className="testimonial-final">
        <div className="testimonial-final-container">
          <div className="testimonial-final-title">
            <div className="testimonial-final-title-t">
              <Title level={2}>Hear from Our Happy Users</Title>
            </div>
            <div className="testimonial-final-title-p">
              <Paragraph>
                See why teams around the world love TaskSpaces and trust it for
                their work.
              </Paragraph>
            </div>
          </div>
          <div className="testimonial-final-carousel">
            <TestimonialCarousel />
          </div>
          <div className="testimonial-final-companies">
            <div className="testimonial-final-companies-p">
              <Paragraph>Trusted by these companies</Paragraph>
            </div>
            <div className="testimonial-final-companies-logos">
              <div className="logo-final">
                <AmazonOutlined />
              </div>
              <div className="logo-final">
                <AppleOutlined />
              </div>
              <div className="logo-final">
                <RedditOutlined />
              </div>
              <div className="logo-final">
                <TwitchFilled />
              </div>
              <div className="logo-final">
                <SpotifyOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
