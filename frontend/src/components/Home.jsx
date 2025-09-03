import React, { useEffect, useState } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks"); 
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
  return (
    <div className="min-h-screen text-white p-6 rounded-xl">
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
              <th className="px-4 py-3">Task </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-black bg-white/90">
            {tasks.length > 0 ? (
              tasks.map((task,index)=> (
                <tr key={task.id} className="hover:bg-gray-200 transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{task.title}</td>
                  <td className="px-4 py-3">{task.desc}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-gray-500">
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
