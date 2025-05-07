'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../api/axiosInstance';

export default function CreateTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    assignedTo: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/tasks', task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.push('/tasks'); // Redirect to the tasks list
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

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
      <input
        type="text"
        name="assignedTo"
        value={task.assignedTo}
        onChange={handleChange}
        placeholder="Assigned To (User ID)"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Task
      </button>
    </form>
  );
}
