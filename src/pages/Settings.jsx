import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Alexander Mathos',
    email: 'alexander.m@university.edu',
    contact: '+1 (555) 012-3456'
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Changes saved successfully!');
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const tabs = [
    { id: 'profile', label: 'View/Update Profile' },
    { id: 'password', label: 'Change Password' },
    { id: 'delete', label: 'Delete Account' },
  ];

  return (
    <DashboardLayout title="Account Settings">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex space-x-12 border-b border-gray-100 mb-10 overflow-x-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative shrink-0 ${
                activeTab === tab.id ? 'text-blue-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900"></div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-950 mb-2">Personal Information</h2>
                <p className="text-gray-400 text-xs italic">Update your identity details for academic certification.</p>
              </div>

              <form onSubmit={handleSave} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-4 text-blue-950 outline-none focus:border-blue-900 transition-colors font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-4 text-blue-950 outline-none focus:border-blue-900 transition-colors font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-green-600 italic tracking-tight">Verified academic email address.</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Number</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-4 text-blue-950 outline-none focus:border-blue-900 transition-colors font-medium"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    className="px-8 py-3 rounded border border-gray-200 text-blue-900 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded bg-blue-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-900 transition-colors shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Profile Security Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10">
              <h3 className="text-xl font-bold text-blue-900 mb-8">Profile Security</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-2 rounded text-blue-900">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 mb-1">Two-Factor Auth</p>
                    <p className="text-[10px] text-gray-400 leading-tight">Enabled via Authenticator App</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-2 rounded text-blue-900">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 mb-1">Last Login</p>
                    <p className="text-[10px] text-gray-400 leading-tight">2 hours ago from London, UK</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ID Integrity Check */}
            <div className="bg-blue-50/50 border border-blue-50 rounded-xl p-8">
              <p className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] mb-6">ID Integrity Check</p>
              <div className="font-mono text-[10px] text-blue-900/60 leading-relaxed space-y-1">
                <p>user_hash =</p>
                <p>Σ(char_code^3)</p>
                <p>alexander_mathos</p>
                <p>validity: TRUE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-10">
          <div className="flex items-center space-x-4 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-2xl font-bold text-gray-900">Delete Account</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-2xl">
            Once you delete your account, all your numerical attempt history and premium status will be permanently removed. <span className="text-red-600 font-bold">This action is irreversible.</span>
          </p>

          <form onSubmit={handleDelete} className="max-w-md space-y-6">
            <div>
              <input
                type="password"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-red-500 transition-colors"
                placeholder="Confirm password to delete"
              />
              <p className="mt-2 text-[10px] font-bold text-red-600 uppercase tracking-tight">Please enter your password to proceed with deletion.</p>
            </div>
            <button
              type="submit"
              className="px-8 py-4 rounded bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-md"
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
