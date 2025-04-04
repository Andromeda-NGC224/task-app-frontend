import React from "react";
import { Card, Typography, Space, Button, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Task } from "../../types/types";

const { Title, Paragraph } = Typography;

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  return (
    <Card
      style={{ marginBottom: 16 }}
      actions={[
        <Button
          icon={
            task.completed ? <CloseCircleOutlined /> : <CheckCircleOutlined />
          }
          type="text"
          onClick={() => onStatusChange(task.id, !task.completed)}
        >
          {task.completed ? "Позначити не виконаним" : "Позначити виконаним"}
        </Button>,
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => onEdit(task)}
        >
          Редагувати
        </Button>,
        <Button
          icon={<DeleteOutlined />}
          type="text"
          danger
          onClick={() => onDelete(task.id)}
        >
          Видалити
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space align="center">
          <Title level={4} style={{ margin: 0 }}>
            {task.title}
          </Title>
          <Tag color={task.completed ? "success" : "warning"}>
            {task.completed ? "Виконано" : "Не виконано"}
          </Tag>
        </Space>
        <Paragraph>{task.description}</Paragraph>
      </Space>
    </Card>
  );
};

export default TaskItem;
