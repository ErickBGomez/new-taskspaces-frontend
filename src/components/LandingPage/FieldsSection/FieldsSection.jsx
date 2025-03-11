import Title from 'antd/es/typography/Title';
import './FieldsSection.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import { Tabs } from 'antd';

export default function FieldsSection() {
  return (
    <>
      <div className="fields">
        <div className="fields-container">
          <div className="fields-container-title">
            <div className="title-t">
              <Title level={2}>One App, Endless Possibilities</Title>
            </div>
            <div className="title-p">
              <Paragraph>
                TaskSpaces adapts to fit your unique work style based on your
                needs.
              </Paragraph>
            </div>
          </div>
          <div className="fields-container-info">
            <div className="fields-img">
              <img src="/images/fields_landing.svg" />
            </div>
            <div className="fields-content">
              <Tabs>
                <Tabs.TabPane tab="Product management" key="1">
                  <div className="tab-container">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        From ideation to launch, streamline your product's
                        journey with tools designed to prioritize features,
                        track progress, and ensure a flawless delivery.
                      </Paragraph>
                    </div>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Development" key="2">
                  <div className="tab-container">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Code smarter, not harder. Manage sprints, track bugs,
                        and align your development team with a clear roadmap
                        tailored to tech projects.
                      </Paragraph>
                    </div>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Art and design" key="3">
                  <div className="tab-container">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Unleash creativity with boards that bring ideas to life.
                        Manage visual projects, share inspiration, and
                        collaborate on stunning designs effortlessly.
                      </Paragraph>
                    </div>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Marketing" key="4">
                  <div className="tab-container">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Plan campaigns, track performance, and organize content
                        calendars all in one place. Make every marketing
                        initiative a success story.
                      </Paragraph>
                    </div>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Personal use" key="5">
                  <div className="tab-container">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Turn chaos into clarity. Manage your personal goals,
                        daily tasks, or side hustles with tools that keep life
                        beautifully organized.
                      </Paragraph>
                    </div>
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
