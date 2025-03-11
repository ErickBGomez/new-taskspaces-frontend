import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Select,
  Typography,
  Form,
  Popconfirm,
  App,
  DatePicker,
} from 'antd';
import {
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  AlignLeftOutlined,
  CommentOutlined,
  TagOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import './TaskDialog.scss';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { AuthContext } from '../../context/auth/AuthContext';
import { titleRules } from '../../helpers/forms/taskValidation';
import { useDeleteTask, useUpdateTask } from '../../hooks/socketio/useTask';
import dayjs from 'dayjs';
import Timer from '../Timer/Timer';
import CommentForm from '../Comments/CommentForm/CommentForm';
import TagRender from '../TagRender/TagRender';

const { Title } = Typography;

const TaskDialog = () => {
  const { workspaceId, projectId, taskId } = useParams();
  const { token } = useContext(AuthContext);
  const { message } = App.useApp();
  const {
    data: taskData,
    loading: taskLoading,
    error: taskError,
  } = useFetchData(`tasks/${taskId}/p/${projectId}`, token);
  const { data: workspaceData, loading: workspaceLoading } = useFetchData(
    `workspaces/${workspaceId}`,
    token
  );
  const [members, setMembers] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {
    updateTask,
    loading: putLoading,
    error: putError,
  } = useUpdateTask(taskId, projectId, token);
  const {
    deleteTask,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteTask(taskId, projectId, token);
  const [timerValue, setTimerValue] = useState(0);
  const statuses = ['pending', 'doing', 'done'];
  const tags = ['low', 'medium', 'high'];
  const statusOptions = statuses.map((status, index) => ({
    key: index,
    value: status,
    label: status.charAt(0).toLocaleUpperCase() + status.slice(1),
  }));

  useEffect(() => {
    if (workspaceData) {
      setMembers(workspaceData.content.members);
    }
  }, [workspaceData]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleOkModal = () => {
    form.submit();
  };

  const handleTimerChange = (newValue) => {
    setTimerValue(newValue);
  };

  const handleCreateTask = async (values) => {
    try {
      await updateTask({
        ...values,
        timer: timerValue,
      });
      if (!putError) {
        navigate(-1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask();
      if (!deleteError) {
        message.success('Task deleted successfully');
        navigate(-1);
      }
    } catch (e) {
      message.error('Error deleting task');
    }
  };

  if (!taskData || !workspaceData) return null;

  const initialDate = taskData?.content?.date
    ? dayjs(taskData.content.date.split('T')[0])
    : null;

  const membersOptions = members.map((member, index) => ({
    key: index,
    value: member.user._id,
    label: member.user.username,
  }));

  const membersInitialValues =
    taskData && taskData.content.members.length > 0
      ? taskData.content.members.map((member) => member._id)
      : [];

  const tagOptions = tags.map((tag, index) => ({
    key: index,
    value: tag,
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
  }));

  return (
    <>
      <Modal
        className="taskDialog-container"
        open
        onCancel={handleClose}
        footer={[
          <Popconfirm
            key="delete-popconfirm"
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleDelete}
            okText="Yes"
            okButtonProps={{ danger: true }}
            cancelText="No"
          >
            <Button
              key="delete"
              loading={deleteLoading}
              color="danger"
              variant="outlined"
            >
              Delete
            </Button>
          </Popconfirm>,
          <Button
            key="ok"
            type="primary"
            onClick={handleOkModal}
            loading={putLoading}
          >
            Save
          </Button>,
        ]}
        width="auto"
        loading={taskLoading}
      >
        <Form
          form={form}
          onFinish={handleCreateTask}
          initialValues={{
            ...taskData.content,
            date: initialDate,
            members: [...membersInitialValues],
          }}
        >
          {/* Header */}
          <div className="header">
            <div className="header-right">
              <div className="task-title">
                <FileTextOutlined />
                <Form.Item label="" name="title" rules={titleRules}>
                  <Input placeholder="Title" />
                </Form.Item>
              </div>
            </div>
          </div>
          {/* Left Content */}
          <div className="task-content">
            <div className="left-section">
              <div className="section">
                <div className="task-status">
                  <InfoCircleOutlined />
                  <Form.Item label="" name="status">
                    <Select options={statusOptions} />
                  </Form.Item>
                </div>
              </div>
              {/* Description */}
              <div className="section">
                <Title
                  level={5}
                  className="title-level-five"
                  style={{ cursor: 'pointer' }}
                >
                  <AlignLeftOutlined /> Description
                </Title>
                <Form.Item label="" name="description">
                  <Input.TextArea
                    placeholder="Write a description..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
              {/* Comments */}
              <div className="section comments-section">
                <Title level={5} className="title-level-five">
                  <CommentOutlined /> Comments
                </Title>
                <CommentForm />
              </div>
            </div>
            {/* Sidebar */}
            <div className="task-sidebar">
              {/* Tags */}
              <div className="sidebar-item">
                <Title level={5} className="title-level-five">
                  <TagOutlined /> Tag
                </Title>
                <div className="tags">
                  <div className="tag-options">
                    <Form.Item label="" name="tag">
                      <Select
                        className="tag-select"
                        placeholder="Select a tag"
                        tagRender={TagRender}
                        options={tagOptions}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* Dates */}
              <div className="sidebar-item">
                <Title level={5} className="title-level-five">
                  <CalendarOutlined /> Date
                </Title>
                <Form.Item label="" name="date">
                  <DatePicker />
                </Form.Item>
              </div>
              {/* Timer */}
              <div className="sidebar-item">
                <Title level={5} className="title-level-five">
                  <ClockCircleOutlined /> Timer
                </Title>
                <Timer
                  initialValue={taskData.content.timer}
                  value={timerValue}
                  onChange={handleTimerChange}
                />
              </div>
              {/* Members */}
              <div className="sidebar-item">
                <Title level={5} className="title-level-five">
                  <UserOutlined /> Assigned
                </Title>
                <Form.Item label="" name="members">
                  <Select
                    placeholder="Select users"
                    mode="multiple"
                    options={membersOptions}
                    suffixIcon={<UserOutlined />}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default TaskDialog;
