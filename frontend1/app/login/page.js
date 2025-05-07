'use client'
import { useState } from 'react';
import api from '../../api/axiosInstance';
import { useRouter } from 'next/navigation';
import { setToken } from '../../utils/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/users/login', form);
    setToken(res.data.token);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2" required />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="border p-2" required />
      <button type="submit" className="bg-green-500 text-white p-2">Login</button>
    </form>
  );
}
