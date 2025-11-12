import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/', { replace: true });
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black px-4 relative">
      <div className="relative w-full max-w-md z-10">
        {/* Ícone flutuante com z-index alto */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full p-6 shadow-xl border border-white/30 z-20">
          <User className="h-10 w-10 text-white" />
        </div>

        {/* Card com efeito vidro e z-index baixo */}
        <div className="rounded-xl shadow-2xl p-8 pt-20 bg-white/10 backdrop-blur-lg border border-white/30 text-white z-10">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center bg-white/5 border border-white/30 rounded-lg px-3 py-2">
              <User className="text-white/70 h-5 w-5 mr-2" />
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent w-full text-white placeholder-white/50 text-sm focus:outline-none"
              />
            </div>

            <div className="flex items-center bg-white/5 border border-white/30 rounded-lg px-3 py-2">
              <Lock className="text-white/70 h-5 w-5 mr-2" />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full text-white placeholder-white/50 text-sm focus:outline-none"
              />
            </div>

            <div className="flex items-center text-sm text-white/80">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-white" />
                Lembrar de mim
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition"
            >
              ENTRAR
            </button>
          </form>

          {error && (
            <p className="text-red-400 mt-4 text-sm text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
