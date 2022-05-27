import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPost from "../pages/AddPost";
import Home from "../pages/Home";
import Post from "../pages/Post";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/new" element={<AddPost />} />
        <Route path="/post/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
