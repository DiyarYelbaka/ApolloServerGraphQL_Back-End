import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import NewPostScreen from "./pages/NewPostScreen/NewPostScreen";
import { Col, Row } from 'antd';
import styles from './styles.module.css'
import CustomHeaderMenu from "./components/CustomHeaderMenu/CustomHeaderMenu";
import PostDetailScreen from "./pages/PostDetailScreen/PostDetailScreen";


function App() {
  return (

    <div className={styles.container}>
      <Row justify={'center'}  >
        <Col span={10}>
          <CustomHeaderMenu/>
          <div className={styles.content}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/new" element={<NewPostScreen />} />
            <Route path="/post/:id" element={<PostDetailScreen />} />
          </Routes>
          </div>
        </Col>
      </Row>
    </div>


  );
}



export default App

