import { Carousel, Col, Image, Row } from 'antd';
import './TestimonialCarousel.scss';
import {
  AmazonOutlined,
  AppleOutlined,
  RedditOutlined,
} from '@ant-design/icons';
import testimonial from '../../../../assets/testimonial1.jpg';
import testimonial2 from '../../../../assets/testimonial2.jpg';
import testimonial4 from '../../../../assets/testimonial4.jpg';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

export default function TestimonialCarousel() {
  const testimonials = [
    {
      quote:
        "TaskSpaces completely transformed the way we manage projects. It's intuitive and powerful!",
      name: 'Jane Doe',
      position: 'Lead Product Manager',
      photo: testimonial,
      companyLogo: <AmazonOutlined />,
    },
    {
      quote:
        'A must-have tool for any team looking to stay organized and collaborate efficiently.',
      name: 'John Smith',
      position: 'CTO',
      photo: testimonial2,
      companyLogo: <RedditOutlined />,
    },
    {
      quote:
        'Thanks to TaskSpaces, our productivity has soared, and deadlines are no longer a stress point.',
      name: 'Emily Davis',
      position: 'Project Coordinator',
      photo: testimonial4,
      companyLogo: <AppleOutlined />,
    },
  ];

  return (
    <>
      <div className="testimonial">
        <div className="testimonial-container">
          <Carousel autoplay arrows={true}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="card">
                  <div className="card-quote-p">
                    <blockquote>
                      <Paragraph className="testimonial-quote">
                        "{testimonial.quote}"
                      </Paragraph>
                    </blockquote>
                  </div>
                  <div className="card-person">
                    <div className="card-person-image">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="testimonial-photo"
                      />
                    </div>
                    <div className="card-person-name">
                      <Title level={4} className="testimonial-name">
                        {testimonial.name}
                      </Title>
                    </div>
                    <div className="card-person-company">
                      <div className="card-person-position">
                        <Paragraph className="testimonial-position">
                          {testimonial.position}
                        </Paragraph>
                      </div>
                      <div className="card-person-logo">
                        {testimonial.companyLogo}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
