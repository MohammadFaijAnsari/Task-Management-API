import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { API } from "../api/api";
import { ListTodo, CheckCircle2, Clock, User, Edit } from "lucide-react"; 
import { AuthContext } from "../context/authcontext";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${API}/api/latest-tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`${API}/api/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setTasks(tasks.filter((task) => task.id !== id));
        })
        .catch((err) => console.error("Error deleting task:", err));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    fetch(`${API}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col md:flex-row flex-1 rounded-xl">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-900 text-white p-6 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-6">Menu</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/add-task" className="hover:text-indigo-400 block">
                Add Task
              </Link>
            </li>
            <li>
              <Link to="/viewalltask" className="hover:text-indigo-400 block">
                View Tasks
              </Link>
            </li>
            <li>
              <Link to="/userprofile" className="hover:text-indigo-400 block">
                Profile
              </Link>
            </li>
          </ul>

          {/* User Info + Edit Profile */}
          {user && (
            <div className="mt-8 bg-gray-800 rounded-lg p-4 text-center relative">
              <User className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-300">{user.email}</p>
              <span className="text-xs font-bold text-indigo-400 mt-1 inline-block">
                {user.role}
              </span>

              {/* Edit Profile Button */}
              <Link
                to="/update-profile"
                className="absolute top-2 right-2 text-indigo-400 hover:text-indigo-200"
              >
                <Edit size={20} />
              </Link>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Dashboard Overview
          </h2>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
              <ListTodo className="w-10 h-10 text-indigo-600 mb-2" />
              <h3 className="text-lg font-semibold text-indigo-600">Total Tasks</h3>
              <p className="text-3xl font-bold mt-2">{tasks.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-2" />
              <h3 className="text-lg font-semibold text-green-600">Completed</h3>
              <p className="text-3xl font-bold mt-2">
                {tasks.filter((t) => t.status === "Completed").length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
              <Clock className="w-10 h-10 text-red-600 mb-2" />
              <h3 className="text-lg font-semibold text-red-600">Pending</h3>
              <p className="text-3xl font-bold mt-2">
                {tasks.filter((t) => t.status === "Pending").length}
              </p>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="mt-10 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">Recent Tasks</h3>
            <table className="w-full border border-gray-300 overflow-hidden text-center">
              <thead className="text-white bg-black">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {tasks.map((task, index) => (
                  <tr key={task.id} className="hover:bg-gray-600 hover:text-white">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{task.title}</td>
                    <td className="px-4 py-3">{task.desc}</td>
                    <td className="px-4 py-3">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className={`px-2 py-1 rounded border ${
                          task.status === "Completed"
                            ? "text-green-600 border-green-400"
                            : "text-red-600 border-red-400"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <Link
                        to={`/edit-task/${task.id}`}
                        className="w-full sm:w-auto mb-1 sm:mb-0 bg-amber-300 px-3 py-1 rounded block sm:inline-block text-center"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="w-full sm:w-auto bg-red-500 px-3 py-1 rounded text-white block sm:inline-block"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-4 text-gray-500">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
