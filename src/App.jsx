import { Routes, Route, Navigate } from "react-router-dom";
import TestApi from "./TestApi";
import UserManagement from "./pages/UserManagement";
import UserEdit from "./pages/UserEdit";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" />} />
      <Route path="/test_api" element={<TestApi />} />
      <Route path="/user" element={<UserManagement />} />
      <Route path="/user/:id" element={<UserEdit />} />
      <Route path="/profile/:id" element={<UserProfile />} />
    </Routes>
  );
}

export default App;




