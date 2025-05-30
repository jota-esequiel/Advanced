'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if(res.ok) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else {
                setErro(data.message || 'Erro ao fazer login!');
            }

        } catch(error) {
            setErro('Erro na conexão com o servidor!');
        }
    }

    return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={{ marginTop: 10 }}>
          Senha:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 20 }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
