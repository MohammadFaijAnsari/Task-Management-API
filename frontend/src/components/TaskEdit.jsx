import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/api";

function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", desc: "", status: "Pending" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching task:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/dashboard");
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Edit Task</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Description</label>
          <textarea
            name="desc"
            value={task.desc}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

export default TaskEdit;
