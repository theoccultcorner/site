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

// Newly added components
import CertificatePrograms from "./pages/Seminary/CertificatePrograms";
import DegreePrograms from "./pages/Seminary/DegreePrograms";
import Ministry from "./pages/Seminary/Ministry";
import Ecclesiastical from "./pages/Seminary/Ecclesiastical";
import Fellowships from "./pages/Seminary/Fellowships";
import HonoraryDegrees from "./pages/Seminary/HonoraryDegrees";
import Recommended from "./pages/Seminary/Recommended";
import Accreditation from "./pages/Seminary/Accreditation";

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
          <Route path="seminary" element={<Seminary />} />
          <Route path="seminary/formation" element={<Formation />} />
          <Route path="seminary/requirements" element={<Requirements />} />
          <Route path="seminary/foundations" element={<Foundations />} />

          {/* New seminary program routes */}
          <Route path="./pages/seminary/certificateprograms" element={<CertificatePrograms />} />
          <Route path="./pages/seminary/degreeprograms" element={<DegreePrograms />} />
          <Route path="./pages/seminary/ministry" element={<Ministry />} />
          <Route path="./pages/seminary/ecclesiastical" element={<Ecclesiastical />} />
          <Route path="./pages/seminary/fellowships" element={<Fellowships />} />
          <Route path="./pages/seminary/honorarydegrees" element={<HonoraryDegrees />} />
          <Route path="./pages/seminary/recommended" element={<Recommended />} />
          <Route path="./pages/seminary/accreditation" element={<Accreditation />} />

          {/* Catch-all route */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
