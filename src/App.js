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
  Manage,
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
  Weather,
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
          <Route path="/manage" element={<Manage />} />
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

            <Route
              path="group"
              element={
                <RequirePayment>
                  <Group />
                </RequirePayment>
              }
            />
            <Route path="accommodation" element={<Accommodation />} />
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
            <Route
              path="weather"
              element={
                <RequirePayment>
                  <Weather />
                </RequirePayment>
              }
            />
            <Route
              path="profile"
              element={
                <RequirePayment>
                  <Profile />
                </RequirePayment>
              }
            />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
