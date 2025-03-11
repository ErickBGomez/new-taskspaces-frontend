import Title from 'antd/es/typography/Title';
import './BenefitsSection.scss';
import {
  LayoutOutlined,
  StarOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';

export default function BenefitsSection() {
  return (
    <>
      <div className="benefits">
        <div className="benefits-container">
          <div className="benefits-cards">
            <div className="benefit">
              <div className="icon">
                <StarOutlined style={{ fontSize: '24px' }} />
              </div>
              <div className="info">
                <div className="info-title">
                  <Title level={4}>Easy to use</Title>
                </div>
                <div className="info-text">
                  <Paragraph>
                    Intuitive design with zero learning curve. Start managing
                    your projects in minutes!
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className="benefit">
              <div className="icon">
                <ZoomInOutlined style={{ fontSize: '24px' }} />
              </div>
              <div className="info">
                <div className="info-title">
                  <Title level={4}>Multiple purposes</Title>
                </div>
                <div className="info-text">
                  <Paragraph>
                    Adaptable to any workflow: personal tasks, team projects, or
                    large-scale operations.
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className="benefit">
              <div className="icon">
                <LayoutOutlined style={{ fontSize: '24px' }} />
              </div>
              <div className="info">
                <div className="info-title">
                  <Title level={4}>Sleek and Simple</Title>
                </div>
                <div className="info-text">
                  <Paragraph>
                    Clean design with powerful features to keep you focused on
                    what matters most, for better concentration.
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
