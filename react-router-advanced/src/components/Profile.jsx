import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>
      <nav>
        <Link to="details" style={{ marginRight: 10 }}>
          Details
        </Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route path="" element={<ProfileDetails />} /> {/* default sub-route */}
      </Routes>
    </div>
  );
}
