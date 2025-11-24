import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/Announcements";
import News from "./pages/News";
import Careers from "./pages/Careers";
import Health from "./pages/Health";
import Posts from "./pages/Posts";
import Settings from "./pages/Settings";
import Media from "./pages/Media";
import ForgotPassword from "./pages/ForgotPassword";
import Hospital from "./pages/Hospital";
import Analytics from "./pages/Analytics";
import Doctors from "./pages/Doctors";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Loading Page */}
        <Route path="/" element={<Loading />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard Layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="news" element={<News />} />
          <Route path="careers" element={<Careers />} />
          <Route path="health" element={<Health />} />
          <Route path="posts" element={<Posts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="media" element={<Media />} />
          <Route path="hospital" element={<Hospital />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="doctors" element={<Doctors />} />
        </Route>

        {/* Catch-all Redirect */}
      </Routes>
    </BrowserRouter>
  );
}
