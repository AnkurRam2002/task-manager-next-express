'use client'
import { useState } from 'react';
import api from '../api/axiosInstance';
import { useRouter } from 'next/navigation';
import { setToken } from '../../utils/auth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/users/register', form);
    setToken(res.data.token);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2" required />
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2" required />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="border p-2" required />
      <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
    </form>
  );
}
