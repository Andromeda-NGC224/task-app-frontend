import React from "react";
import { ConfigProvider } from "antd";
import ukUA from "antd/lib/locale/uk_UA";
import HomePage from "../../pages/HomePage";
import "./App.css";

export default function App() {
  return (
    <ConfigProvider locale={ukUA}>
      <HomePage />
    </ConfigProvider>
  );
}
