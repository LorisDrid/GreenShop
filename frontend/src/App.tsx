import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import PostInfo from "./pages/PostInfo";
import AuthorInfo from "./pages/AuthorInfo";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Supplier from "./pages/Supplier";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="supplier" element={<Supplier />} />
        <Route path="admin" element={<Admin />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<PostInfo />} />
        <Route path="blog/author/:slug" element={<AuthorInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
