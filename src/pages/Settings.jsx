import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, User, Bell, Lock, Globe, Shield, Save, Trash2, MapPin, Plus, X } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Settings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    name: user.name || 'Alexander Mathos',
    email: user.email || 'alex@university.edu',
    username: user.username || 'alex_mathos',
    phone: user.phone || '+1 (555) 000-0000',
    notifications: true,
  });

  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', detail: '123 University Plaza, New York, NY' }
  ]);
  const [newAddress, setNewAddress] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('CRITICAL: Are you sure you want to delete your profile? This action cannot be undone and all your investigation history will be lost.')) {
      localStorage.removeItem('user');
      localStorage.removeItem('attempts');
      alert('Your profile has been successfully deleted.');
      navigate('/register');
    }
  };

  const addAddress = () => {
    if (newAddress.trim()) {
      setAddresses([...addresses, { id: Date.now(), type: 'Additional', detail: newAddress }]);
      setNewAddress('');
      setShowAddressInput(false);
    }
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <DashboardLayout title="Account Settings">
      <div className="max-w-4xl space-y-6">
        {/* Profile Information */}
        <div className="card-premium">
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className="text-base font-bold text-[var(--text-primary)]">Profile Management</h3>
            <p className="text-xs text-[var(--text-muted)]">Update your academic identity and contact details</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    className="input-premium pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Username</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    className="input-premium pl-10 bg-gray-50/50"
                    value={formData.username}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    className="input-premium pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Contact Number</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="tel"
                    className="input-premium pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-[var(--border)]">
              <button onClick={handleSave} className="btn-primary py-2.5 flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Update Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Address Management */}
        <div className="card-premium">
          <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Manage Addresses</h3>
              <p className="text-xs text-[var(--text-muted)]">Maintain your primary and secondary locations</p>
            </div>
            <button 
              onClick={() => setShowAddressInput(!showAddressInput)}
              className="btn-secondary py-1.5 px-3 text-xs flex items-center space-x-1"
            >
              <Plus className="w-3 h-3" />
              <span>Add New</span>
            </button>
          </div>
          <div className="p-6 space-y-4">
            {showAddressInput && (
              <div className="p-4 bg-gray-50 rounded-lg border border-[var(--border)] animate-in fade-in slide-in-from-top-2">
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">New Address Detail</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="input-premium" 
                    placeholder="Enter full address..."
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                  <button onClick={addAddress} className="btn-primary px-4">Add</button>
                </div>
              </div>
            )}
            <div className="space-y-3">
              {addresses.map(addr => (
                <div key={addr.id} className="flex items-center justify-between p-4 bg-white border border-[var(--border)] rounded-lg group hover:border-[var(--primary)] transition-all">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[var(--primary)] mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{addr.type}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{addr.detail}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeAddress(addr.id)}
                    className="p-1.5 text-gray-400 hover:text-[var(--danger)] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card-premium border-red-100 bg-red-50/10">
          <div className="p-6 border-b border-red-100">
            <h3 className="text-base font-bold text-red-700">Danger Zone</h3>
            <p className="text-xs text-red-500">Critical account actions that cannot be reversed</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Delete Student Profile</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Once you delete your profile, there is no going back. Please be certain.</p>
              </div>
              <button 
                onClick={handleDeleteAccount}
                className="btn-outline border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
