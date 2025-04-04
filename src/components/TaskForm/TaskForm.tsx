import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch, Modal } from "antd";
import { Task } from "../../types/types";

const { TextArea } = Input;

interface TaskFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (task: Omit<Task, "id"> | Task) => void;
  initialValues?: Task;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  isEditing = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (isEditing && initialValues) {
        onSubmit({ ...values, id: initialValues.id });
      } else {
        onSubmit(values);
      }
      form.resetFields();
    });
  };

  return (
    <Modal
      title={isEditing ? "Редагувати задачу" : "Створити нову задачу"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Скасувати
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {isEditing ? "Зберегти" : "Створити"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Заголовок"
          rules={[
            { required: true, message: "Будь ласка, введіть заголовок задачі" },
          ]}
        >
          <Input placeholder="Введіть заголовок задачі" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Опис"
          rules={[
            { required: true, message: "Будь ласка, введіть опис задачі" },
          ]}
        >
          <TextArea rows={4} placeholder="Введіть опис задачі" />
        </Form.Item>
        <Form.Item name="completed" label="Статус" valuePropName="checked">
          <Switch checkedChildren="Виконано" unCheckedChildren="Не виконано" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
