import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

function ViewAllTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await fetch(`${API}/api/tasks/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        alert(data.message);
        if (res.ok) {
          setTasks(tasks.filter((task) => task.id !== id));
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="min-h-screen p-8 text-white rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-300">All Tasks</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="overflow-x-auto  border border-gray-700">
        <table className="w-full border-collapse text-left">
          <thead className="bg-black text-white uppercase text-sm">
            <tr className="text-center">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-center">
            {tasks.map((task,index) => (
              <tr key={task.id} className="text-black hover:bg-gray-700 hover:text-white">
                <td className="px-4 py-3">{index+1}</td>
                <td className="px-4 py-3">{task.title}</td>
                <td className="px-4 py-3">{task.desc}</td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/edit-task/${task.id}`)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-500 px-3 py-1.5 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-gray-400">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllTask;
