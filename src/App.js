import React from "react";
import { ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

import {
  Landing,
  AboutPage,
  ErrorPage,
  BlogPage,
  Register,
  ProtectedRoute,
  PaymentPage,
} from "./pages";
import RequirePayment from "./pages/ProtectedFeatureLink";
import { Navbar, Sidebar, BlogDetail } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
  Group,
  Accommodation,
  Transportation,
  Map,
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
          <Route path="/pay" element={<PaymentPage />} />

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
            {/* <Route path="group" element={<Group />} />
            <Route path="accommodation" element={<Accommodation />} />
            <Route path="Transportation" element={<Transportation />} /> */}

            <Route
              path="group"
              element={
                <RequirePayment>
                  <Group />
                </RequirePayment>
              }
            />
            <Route
              path="accommodation"
              element={
                <RequirePayment>
                  <Accommodation />
                </RequirePayment>
              }
            />
            <Route
              path="transportation"
              element={
                <RequirePayment>
                  <Transportation />
                </RequirePayment>
              }
            />
            <Route
              path="map"
              element={
                <RequirePayment>
                  <Map />
                </RequirePayment>
              }
            />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
