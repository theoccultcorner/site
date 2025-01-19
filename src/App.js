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
          <Route path="profiles" element={<ProfileList />} />
          <Route path="users/:displayName" element={<UserProfile />} />
          <Route path="blogs/:displayName" element={<ManageBlogs />} />
          <Route path="seminary" element={<Seminary />} />
          <Route path="seminary/formation" element={<Formation />} />
          <Route path="seminary/requirements" element={<Requirements />} />
          <Route path="seminary/foundations" element={<Foundations />} />
          <Route path="seminary/certificateprograms" element={<CertificatePrograms />} />
          <Route path="seminary/degreeprograms" element={<DegreePrograms />} />
          <Route path="seminary/ministry" element={<Ministry />} />
          <Route path="seminary/recommended" element={<Recommended />} />
          <Route path="seminary/accreditation" element={<Accreditation />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
