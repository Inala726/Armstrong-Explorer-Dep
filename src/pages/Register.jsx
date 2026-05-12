import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HelpCircle, AlertCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Simulate successful registration
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 pb-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">Armstrong Explorer</h1>
        <p className="text-gray-600 text-sm">Join the pursuit of numerical excellence.</p>
      </div>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-gray-100 p-10">
        <h2 className="text-2xl font-bold text-blue-950 mb-1">Create Account</h2>
        <p className="text-gray-500 text-sm italic mb-8">A journey into mathematical patterns begins here.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black ${errors.name ? 'border-red-600' : 'border-gray-200'}`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              {errors.name && <p className="mt-1 text-[9px] font-bold text-red-600 uppercase tracking-tight">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Contact Number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black ${errors.contact ? 'border-red-600' : 'border-gray-200'}`}
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
              {errors.contact && <p className="mt-1 text-[9px] font-bold text-red-600 uppercase tracking-tight">{errors.contact}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Username</label>
            <input
              type="text"
              placeholder="math_enthusiast"
              className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black ${errors.username ? 'border-red-600' : 'border-gray-200'}`}
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            {errors.username && <p className="mt-1 text-[9px] font-bold text-red-600 uppercase tracking-tight">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Email Address</label>
            <div className="relative">
              <input
                type="email"
                className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black ${errors.email ? 'border-red-600' : 'border-gray-200'}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <AlertCircle className="absolute right-3 top-2.5 w-4 h-4 text-red-600" />}
            </div>
            {errors.email && <p className="mt-1.5 text-[9px] font-bold text-red-600 uppercase tracking-tight">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Password</label>
              <input
                type="password"
                className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black ${errors.password ? 'border-red-600' : 'border-gray-200'}`}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              {errors.password && <p className="mt-1 text-[9px] font-bold text-red-600 uppercase tracking-tight">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded focus:ring-1 focus:ring-blue-900 outline-none text-[13px] text-black ${errors.confirmPassword ? 'border-red-600' : 'border-gray-200'}`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                {errors.confirmPassword && <AlertCircle className="absolute right-3 top-2.5 w-4 h-4 text-red-600" />}
              </div>
              {errors.confirmPassword && <p className="mt-1 text-[9px] font-bold text-red-600 uppercase tracking-tight">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full border border-blue-200">
                <HelpCircle className="w-5 h-5 text-blue-900" />
              </div>
              <p className="text-xs font-bold text-blue-900 max-w-[150px]">Is 153 an Armstrong number?</p>
            </div>
            <p className="text-xs font-bold text-blue-900">1³ + 5³ + 3³ = 153</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors"
          >
            Register
          </button>

          <div className="pt-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="font-bold text-blue-950 hover:underline">Login</Link>
            </p>
          </div>
        </form>
      </div>

      <div className="mt-12 flex space-x-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <Link to="/privacy" className="hover:text-blue-900 transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-blue-900 transition-colors">Terms of Service</Link>
        <Link to="/support" className="hover:text-blue-900 transition-colors">Academic Support</Link>
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

export default Register;
