import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Seminary from "./pages/Seminary/Seminary";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

import ProfileList from "./pages/ProfileList";
import UserProfile from "./pages/UserProfile";
import ManageBlogs from "./pages/ManageBlogs";
import Meta from "./pages/Meta";

import Formation from "./pages/Seminary/Formation";
import Requirements from "./pages/Seminary/Requirements";
import Foundations from "./pages/Seminary/Foundations";
import CertificatePrograms from "./pages/Seminary/CertificatePrograms";
import DegreePrograms from "./pages/Seminary/DegreePrograms";
import Ministry from "./pages/Seminary/Ministry";
import Recommended from "./pages/Seminary/Recommended";
import Accreditation from "./pages/Seminary/Accreditation";
import Events from "./pages/Seminary/Events";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="meta" element={<Meta />} />
          <Route path="blogs" element={<Blogs />} />

          {/* Profile routes */}
          <Route path="profilelist" element={<ProfileList />} />
          <Route path="users/:displayName" element={<UserProfile />} />
          <Route path="blogs/:displayName" element={<ManageBlogs />} />

          {/* Seminary routes */}
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

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
