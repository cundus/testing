import React from "react";
import { Layout, Spin } from "antd";
import Logo from '../../assets/xl.png';

export const LoadingSplash  = () => {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <img src={Logo} alt="logo" style={{ marginBottom: 20, }} />
        <Spin />
      </Layout>
    );
  };

export const Loading = () => {
  return (
    <Layout
      style={{
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Spin />
    </Layout>
  );
};

export default Loading;
