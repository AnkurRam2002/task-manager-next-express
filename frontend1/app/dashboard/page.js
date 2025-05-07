'use client'
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import { useRouter } from 'next/navigation';
import { removeToken } from '../../utils/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    api.get('/users/me')
      .then(res => setUser(res.data))
      .catch(() => router.push('/login'));
  }, []);

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Dashboard</h1>
      {user && <p className="mt-2">Welcome, {user.name}</p>}
      <button onClick={logout} className="mt-4 bg-red-500 text-white p-2">Logout</button>
    </div>
  );
}
