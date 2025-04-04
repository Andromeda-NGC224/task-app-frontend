import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Layout, Typography, notification } from "antd";
import SearchBar from "../components/SearchBar/SearchBar";
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";
import taskService from "../api/taskService";
import { Task } from "../types/types";
import AppFooter from "../components/Footer/Footer";

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: "Не вдалося завантажити задачі",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        title.includes(query) || description.includes(query);

      const matchesStatus =
        statusFilter === "" ||
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "uncompleted" && !task.completed);

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  console.log("tasks", tasks);
  console.log("filteredTasks", filteredTasks);

  const handleStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleAddTask = useCallback(() => {
    setCurrentTask(undefined);
    setFormVisible(true);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setCurrentTask(task);
    setFormVisible(true);
  }, []);

  const handleSubmitTask = useCallback(
    async (task: Omit<Task, "id"> | Task) => {
      try {
        setLoading(true);
        if ("id" in task) {
          await taskService.updateTask(task.id, task);
          setTasks((prev) =>
            prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
          );
          notification.success({
            message: "Успішно",
            description: "Задачу оновлено",
          });
        } else {
          const newTask = await taskService.createTask(task);
          setTasks((prev) => [...prev, newTask]);
          notification.success({
            message: "Успішно",
            description: "Нову задачу створено",
          });
        }
        setFormVisible(false);
      } catch (error) {
        notification.error({
          message: "Помилка",
          description: "Не вдалося зберегти задачу",
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteTask = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      notification.success({
        message: "Успішно",
        description: "Задачу видалено",
      });
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: "Не вдалося видалити задачу",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = useCallback(
    async (id: number, completed: boolean) => {
      try {
        setLoading(true);
        await taskService.updateTask(id, { completed });

        setTasks((prev) =>
          prev.map((task) => (task.id === id ? { ...task, completed } : task))
        );

        notification.success({
          message: "Успішно",
          description: `Задачу позначено як ${
            completed ? "виконану" : "не виконану"
          }`,
        });
      } catch (error) {
        notification.error({
          message: "Помилка",
          description: "Не вдалося змінити статус задачі",
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 16px" }}>
        <Title level={2} style={{ margin: "16px 54px" }}>
          TaskApp
        </Title>
      </Header>

      <Content style={{ padding: "24px", background: "#f5f5f5" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SearchBar
            onSearch={handleSearch}
            onStatusFilter={handleStatusFilter}
            onAddTask={handleAddTask}
          />

          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />

          <TaskForm
            visible={formVisible}
            onCancel={() => setFormVisible(false)}
            onSubmit={handleSubmitTask}
            initialValues={currentTask}
            isEditing={!!currentTask}
          />
        </div>
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default HomePage;
