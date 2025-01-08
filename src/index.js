import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Seminary from "./pages/Seminary/Seminary";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile"; // Current user's profile
import ProfileList from "./pages/ProfileList"; // List of all profiles
import UserProfile from "./pages/UserProfile"; // Specific user profile
import Meta from "./pages/Meta";
import Formation from "./pages/Seminary/Formation";
import Requirements from "./pages/Seminary/Requirements";
import Foundations from "./pages/Seminary/Foundations";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout for the site */}
        <Route path="/" element={<Layout />}>
          {/* Main routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="meta" element={<Meta />} />
          <Route path="blogs" element={<Blogs />} />

          {/* Profile-related routes */}
          <Route path="profile" element={<Profile />} /> {/* Current user's profile */}
          <Route path="profiles" element={<ProfileList />} /> {/* List of all profiles */}
          <Route path="profile/:displayName" element={<UserProfile />} /> {/* View specific user profile */}

          {/* Seminary-related routes */}
          <Route path="seminary/*" element={<Seminary />} />
          <Route path="seminary/formation" element={<Formation />} />
          <Route path="seminary/requirements" element={<Requirements />} />
          <Route path="seminary/foundations" element={<Foundations />} />

          {/* Catch-all route */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
