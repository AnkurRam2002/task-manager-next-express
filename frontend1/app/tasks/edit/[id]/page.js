'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../api/axiosInstance';

export default function EditTask() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useRouter().query;
  const router = useRouter();

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
          setLoading(false);
        } catch (error) {
          console.error('Error fetching task for edit:', error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.push('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="border p-2"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="border p-2"
        required
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="border p-2"
        required
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="border p-2"
        required
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="border p-2"
        required
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Update Task
      </button>
    </form>
  );
}
