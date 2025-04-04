import React, { useState } from "react";
import { Input, Select, Space, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
  onStatusFilter: (status: string) => void;
  onAddTask: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onStatusFilter,
  onAddTask,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", marginBottom: 16 }}
      align="center"
    >
      <Input
        placeholder="Пошук задач"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        prefix={<SearchOutlined />}
      />
      <Select defaultValue="" onChange={onStatusFilter}>
        <Option value="">Усі задачі</Option>
        <Option value="completed">Виконані</Option>
        <Option value="uncompleted">Не виконані</Option>
      </Select>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddTask}>
        Додати задачу
      </Button>
    </Space>
  );
};

export default SearchBar;
