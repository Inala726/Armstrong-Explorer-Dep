import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api, setAuthSession } from '../lib/api';

const splitFullName = (fullName) => {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts.shift() || '';
  const last_name = parts.join(' ');
  return { first_name, last_name };
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    const { first_name, last_name } = splitFullName(formData.fullName);
    const registrationPayload = {
      first_name,
      last_name,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      contact_number: formData.contactNumber,
    };

    try {
      await api.register(registrationPayload);
      const loginData = await api.login({
        username: formData.username,
        password: formData.password,
      });
      setAuthSession({
        ...loginData,
        user: {
          ...loginData.user,
          first_name,
          last_name,
          contact_number: formData.contactNumber,
        },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4 py-12 lg:py-20">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[var(--primary)] opacity-[0.02] rounded-full blur-[80px]"></div>
      </div>

      <div className="w-full max-w-[520px] relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--primary)] rounded-xl shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create Account</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-2">Join our academic community of numerical explorers</p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--border)] shadow-xl p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-[var(--text-muted)]" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mathos"
                    className="input-premium pl-10"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Contact Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-[var(--text-muted)]" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="input-premium pl-10"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[var(--text-muted)]" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="alex@university.edu"
                  className="input-premium pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-[var(--text-muted)]" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="alex_mathos"
                  className="input-premium pl-10"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[var(--text-muted)]" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="input-premium pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[var(--text-muted)]" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="input-premium pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-[var(--border)] rounded cursor-pointer"
                />
              </div>
              <label htmlFor="terms" className="ml-2 block text-xs text-[var(--text-secondary)] leading-relaxed">
                I agree to the <Link to="/terms" className="text-[var(--primary)] font-semibold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[var(--primary)] font-semibold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Already have an account? <Link to="/login" className="font-bold text-[var(--primary)] hover:underline">Sign In</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Academic Access</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Secure Data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
