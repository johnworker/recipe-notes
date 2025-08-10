import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const submit = (e) => { e.preventDefault(); alert(`已訂閱：${email}`); setEmail(''); };

  return (
    <section className="rounded-2xl p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">每週靈感，不漏接</h3>
          <p className="text-gray-600 dark:text-gray-300">
            訂閱電子報，接收精選食譜、料理技巧與季節菜單。
          </p>
        </div>
        <form onSubmit={submit} className="flex gap-2 w-full lg:w-auto">
          <input
            type="email"
            required
            placeholder="輸入你的 Email"
            className="flex-1 lg:w-72 border rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <button className="btn-primary">訂閱</button>
        </form>
      </div>
    </section>
  );
}
