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
import DegreePrograms from "./pages/Seminary/DegreePrograms";
import CertificatePrograms from "./pages/Seminary/CertificatePrograms";
import Events from "./pages/Seminary/Events";
import Accreditation from "./pages/Seminary/Accreditation";
import ProfileList from "./pages/ProfileList"; // List of all profiles
import UserProfile from "./pages/UserProfile"; // Specific user profile
import ManageBlogs from "./pages/ManageBlogs"; // Manage blogs page
import Meta from "./pages/Meta";
import Formation from "./pages/Seminary/Formation";
import Requirements from "./pages/Seminary/Requirements";
import Foundations from "./pages/Seminary/Foundations";
import Ministry from "./pages/Seminary/Ministry";
import Recommended from "./pages/Seminary/Recommended";

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
          <Route path="profilelist" element={<ProfileList />} />
          <Route path="users/:displayName" element={<UserProfile />} />
          <Route path="blogs/:displayName" element={<ManageBlogs />} />

          {/* Seminary-related routes */}
          <Route path="seminary" element={<Seminary />} />
          <Route path="seminary/formation" element={<Formation />} />
          <Route path="seminary/requirements" element={<Requirements />} />
          <Route path="seminary/foundations" element={<Foundations />} />
          <Route path="seminary/ministry" element={<Ministry />} />
          <Route path="seminary/recommended" element={<Recommended />} />
          <Route path="seminary/degree-programs" element={<DegreePrograms />} />
          <Route path="seminary/certificate-programs" element={<CertificatePrograms />} />
          <Route path="seminary/accreditation" element={<Accreditation />} />
          <Route path="seminary/events" element={<Events />} />

          {/* Catch-all route */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
