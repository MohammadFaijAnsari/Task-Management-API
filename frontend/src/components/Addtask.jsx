import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";
function AddTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          desc:formData.desc
          }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Add Task Sccessfully ");
        navigate('/dashboard');
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error while registering user ❌");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
           Add New Task
        </h2>

        <form  onSubmit={handleSubmit} className="space-y-5" method="post">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Description
            </label>
            <textarea
              placeholder="Enter task description"
              rows="4"
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Task
          </button>
          <button
            type="reset"
            className="w-full bg-red-500  text-white font-semibold py-2 rounded-lg transition"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
