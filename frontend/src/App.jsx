import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard.jsx";
import Home from "./components/Home.jsx";
import Addtask from "./components/Addtask.jsx";
import Profile from "./components/Profile.jsx";
import Viewalltask from "./components/Viewalltask.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserRoute from "./components/UserRoute.jsx";
import TaskEdit from "./components/TaskEdit.jsx";
function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right"/>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<UserRoute><Home/></UserRoute>} />
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/add-task" element={<AdminRoute><Addtask /></AdminRoute>} />
          <Route path="/viewalltask" element={<AdminRoute><Viewalltask /></AdminRoute>} />
          <Route path="/userprofile" element={<AdminRoute><Profile /></AdminRoute>} />
          <Route path="/edit-task/:id" element={<TaskEdit><Profile /></TaskEdit>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
