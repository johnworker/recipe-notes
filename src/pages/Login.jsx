import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <main className="container py-10 max-w-md">
      <h1 className="text-2xl font-extrabold mb-6">登入</h1>
      <form onSubmit={(e)=>{e.preventDefault(); login({email}); toast.success('歡迎回來'); nav(loc.state?.from?.pathname || '/');}}>
        <label className="form-label">Email</label>
        <input className="form-field mb-4" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        <button className="btn-secondary w-full">登入</button>
      </form>
    </main>
  );
}
