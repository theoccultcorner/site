import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Seminary from "./pages/Seminary";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Profile from './pages/Profile';
import ProfileList from './pages/ProfileList';
import UserProfile from './pages/UserProfile';
import Meta from './pages/Meta';
import Formation from './pages/Formation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Seminary" element={<Seminary />} />
          <Route path="profiles" element={<ProfileList />} />
          <Route path="formation" element={<Formation />} /> {/* Added Formation route */}
          <Route path="/profile/:displayName" element={<UserProfile />} /> {/* Route to UserProfile */}
          <Route path="meta" element={<Meta />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
