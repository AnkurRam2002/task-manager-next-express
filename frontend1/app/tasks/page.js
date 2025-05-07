'use client'
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import TaskCard from '../../components/TaskCard';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/tasks').then(res => setTasks(res.data));
  }, []);

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-3">Tasks</h1>
      <input type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} className="border p-2 mb-4" />
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
