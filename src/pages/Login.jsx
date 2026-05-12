import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Eye } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // For demo purposes, allow any login if users exist or a default one
    const user = users.find(u => u.username === formData.username) || { username: formData.username };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-12 pb-20 px-4 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] font-mono text-xs select-none p-10 leading-relaxed">
        {Array(20).fill("1³ + 5³ + 3³ = 153   4³ + 0³ + 7³ = 407   3³ + 7³ + 0³ = 370   n = Σ(d_i)^k   ").map((text, i) => (
          <div key={i} className="mb-4">{text}</div>
        ))}
      </div>

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-950 mb-2">Armstrong Explorer</h1>
        <p className="text-gray-600 text-sm">Sign in to continue your numerical exploration</p>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                required
                placeholder="Enter your username"
                className="block w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black transition-all"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" title="Academic Access" className="text-[9px] font-bold text-blue-800 hover:underline uppercase tracking-tight">Forgot password?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-11 pr-12 py-2.5 bg-gray-50/50 border border-gray-200 rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
                <Eye className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-3.5 w-3.5 text-blue-900 focus:ring-blue-800 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-md"
          >
            Login
          </button>

          <div className="pt-6 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/register" className="font-bold text-blue-950 hover:underline">Register</Link>
            </p>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="relative z-10 mt-10 w-full max-w-xs flex items-center justify-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] italic">Academic Access Only</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mt-20 w-full border-t border-gray-200 pt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-blue-950 font-bold text-lg mb-2">Armstrong Explorer</h4>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              © 2024 Armstrong Explorer. Academic excellence through numerical patterns.
            </p>
          </div>
          <div className="flex space-x-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/api">API Documentation</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
