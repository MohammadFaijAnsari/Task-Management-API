import React, { useEffect, useState, useContext } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { API } from "../api/api";
import { AuthContext } from "../context/authcontext";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext); // 👈 User info from context

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API}/api/tasks`);
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await fetch(`${API}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="min-h-screen text-white p-6 rounded-xl">
      <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">
          Welcome, {user?.name || "Guest"}
        </h2>
        <p className="text-gray-300">
          <span className="font-semibold">Role:</span> {user?.role}
        </p>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl text-amber-400">All Tasks</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-xl shadow-lg overflow-hidden text-center">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Task Status</th>
              <th className="px-4 py-3">Status Icon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-black bg-white/90">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id} className="hover:bg-gray-200 transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{task.title}</td>
                  <td className="px-4 py-3">{task.desc}</td>
                  <td className="px-4 py-3">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      className="border border-gray-400 rounded-lg px-2 py-1 bg-white text-black"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="text-center px-4 py-3">
                    {task.status === "Completed" ? (
                      <CheckCircle className="text-green-500 w-6 h-6 mx-auto" />
                    ) : (
                      <XCircle className="text-red-500 w-6 h-6 mx-auto" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-gray-500">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
