import Title from 'antd/es/typography/Title';
import './FeaturesSection.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import { CopyOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';

export default function FeaturesSection() {
  return (
    <>
      <div className="features">
        <div className="features-container">
          <div className="features-title">
            <div className="features-title-t">
              <Title level={2}>Discover What Makes Us Great</Title>
            </div>
            <div className="features-title-p">
              <Paragraph>
                Explore a suite of features crafted to simplify your workflow of
                your projects.
              </Paragraph>
            </div>
          </div>
          <div className="tabs">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Workspace" key="1">
                <div className="tab-container">
                  <div className="tab-container-info">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Organize your projects in dedicated spaces tailored to
                        your team's needs. Whether you're managing a department
                        or your personal goals, our flexible workspaces keep
                        everything streamlined and accessible.{' '}
                      </Paragraph>
                    </div>
                    <div className="tab-container-info-button">
                      <Link to={{ pathname: '/register' }}>
                        <Button type="primary">Get started</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="tab-container-img">
                    <img src="src\assets\feature_workspace.svg" />
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Projects" key="2">
                <div className="tab-container">
                  <div className="tab-container-info">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Take control of your initiatives with a clear view of
                        all tasks, deadlines, and priorities. Projects in our
                        platform are designed to adapt to any workflow, from
                        small teams to enterprise-level operations.
                      </Paragraph>
                    </div>
                    <div className="tab-container-info-button">
                      <Link to={{ pathname: '/register' }}>
                        <Button type="primary">Get started</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="tab-container-img">
                    <img src="src\assets\feature_projects.svg" />
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tasks" key="3">
                <div className="tab-container">
                  <div className="tab-container-info">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Break down your workload into actionable steps. Assign,
                        track, and complete tasks with ease, ensuring nothing
                        falls through the cracks, no matter how complex the
                        project.
                      </Paragraph>
                    </div>
                    <div className="tab-container-info-button">
                      <Link to={{ pathname: '/register' }}>
                        <Button type="primary">Get started</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="tab-container-img">
                    <img src="src\assets\feature_tasks.svg" />
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Timer" key="4">
                <div className="tab-container">
                  <div className="tab-container-info">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Stay on track and maximize productivity with our
                        integrated timer. The best tool to time tasks, it's all
                        built in to keep you focused and efficient.
                      </Paragraph>
                    </div>
                    <div className="tab-container-info-button">
                      <Link to={{ pathname: '/register' }}>
                        <Button type="primary">Get started</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="tab-container-img">
                    <img src="src\assets\feature_timer.svg" />
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Collaborate" key="5">
                <div className="tab-container">
                  <div className="tab-container-info">
                    <div className="tab-container-info-text">
                      <Paragraph>
                        Work smarter, not harder. Collaborate with your team in
                        real-time, share ideas, and align on goals—all in one
                        place. Communication and teamwork have never been this
                        seamless.
                      </Paragraph>
                    </div>
                    <div className="tab-container-info-button">
                      <Link to={{ pathname: '/register' }}>
                        <Button type="primary">Get started</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="tab-container-img">
                    <img src="src\assets\feature_collaborate.svg" />
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
