import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import PostInfo from "./pages/PostInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="blog/:slug" element={<PostInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
