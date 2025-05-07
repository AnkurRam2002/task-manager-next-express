'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../api/axiosInstance';

export default function TaskDetails() {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get task ID from the URL

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await api.get(`/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setTask(res.data);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      fetchTask();
    }
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <button
        className="text-blue-500"
        onClick={() => router.push(`/tasks/edit/${task._id}`)}
      >
        Edit Task
      </button>
    </div>
  );
}
