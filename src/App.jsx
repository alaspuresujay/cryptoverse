import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Exchanges from "./components/Exchanges";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";

import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/cryptoverse" element={<HomePage />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center " }}
          >
            Cryptoverse
          </Typography.Title>
          <Space>
            <Link to="/cryptoverse">Home</Link>
            {/* <Link to="/cryptocurrencies">Cryptocurrencies</Link> */}
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
