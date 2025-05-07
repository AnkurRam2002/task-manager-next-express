'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../api/axiosInstance';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task List</h1>
      {/* Create Task Button */}
      <button
        onClick={() => router.push('/tasks/create')}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Create New Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 mb-2">
            <h2 className="text-lg">{task.title}</h2>
            <p>{task.description}</p>
            <button
              className="text-blue-500"
              onClick={() => router.push(`/tasks/${task._id}`)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

