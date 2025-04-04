import React from "react";
import { Empty, List, Spin } from "antd";
import TaskItem from "../TaskItem/TaskItem";
import { Task } from "../../types/types";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return <Empty description="Задач не знайдено" />;
  }

  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item style={{ display: "block", width: "100%" }}>
          <TaskItem
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
