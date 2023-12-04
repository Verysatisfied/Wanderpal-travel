import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Landing,
  AboutPage,
  ErrorPage,
  BlogPage,
  Register,
  ProtectedRoute,
} from "./pages";
import { Navbar, Sidebar, BlogDetail } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/dashboard";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="all-records" element={<AllJobs />} />
            <Route path="add-record" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
