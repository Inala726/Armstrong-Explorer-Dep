import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Globe, Save, Trash2, MapPin, Plus } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { api, clearAuthSession, getDisplayName, getStoredUser, updateStoredUser } from '../lib/api';

const splitFullName = (fullName) => {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts.shift() || '';
  const last_name = parts.join(' ');
  return { first_name, last_name };
};

const Settings = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [formData, setFormData] = useState({
    name: getDisplayName(user),
    email: user?.email || '',
    username: user?.username || '',
    phone: user?.contact_number || '',
    notifications: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
  });
  const [showAddressInput, setShowAddressInput] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await api.getProfile();
        updateStoredUser(profile);
        setFormData({
          name: getDisplayName(profile),
          email: profile.email || '',
          username: profile.username || '',
          phone: profile.contact_number || '',
          notifications: true,
        });
      } catch (err) {
        setError(err.message || 'Unable to load profile details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage('');
    setError('');

    const { first_name, last_name } = splitFullName(formData.name);

    try {
      await api.updateProfile({
        first_name,
        last_name,
        email: formData.email,
        contact_number: formData.phone,
      });
      const updatedUser = {
        ...getStoredUser(),
        first_name,
        last_name,
        email: formData.email,
        contact_number: formData.phone,
      };
      updateStoredUser(updatedUser);
      setStatusMessage('Profile updated.');
    } catch (err) {
      setError(err.message || 'Unable to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('CRITICAL: Are you sure you want to delete your profile? This action cannot be undone and all your investigation history will be lost.')) {
      try {
        await api.deleteProfile();
      } catch (err) {
        setError(err.message || 'Unable to delete profile.');
        return;
      }
      clearAuthSession();
      navigate('/register');
    }
  };

  const addAddress = async () => {
    if (Object.values(newAddress).every((value) => value.trim())) {
      setError('');
      setStatusMessage('');
      try {
        const data = await api.addAddress(newAddress);
        setAddresses([...addresses, { id: data.id || Date.now(), type: 'Additional', detail: `${newAddress.street}, ${newAddress.city}, ${newAddress.state}, ${newAddress.country} ${newAddress.zip_code}` }]);
        setNewAddress({ street: '', city: '', state: '', country: '', zip_code: '' });
        setShowAddressInput(false);
        setStatusMessage(data.message || 'Address added.');
      } catch (err) {
        setError(err.message || 'Unable to add address.');
      }
    } else {
      setError('Please fill every address field.');
    }
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
            {isLoading && (
              <div className="rounded-lg border border-[var(--border)] bg-gray-50 px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">
                Loading profile details...
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}
            {statusMessage && (
              <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-xs font-semibold text-[var(--success)]">
                {statusMessage}
              </div>
            )}
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
              <button onClick={handleSave} disabled={isSaving || isLoading} className="btn-primary py-2.5 flex items-center space-x-2 disabled:opacity-60">
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Updating...' : 'Update Profile'}</span>
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
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-3">New Address Detail</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ['street', 'Street'],
                    ['city', 'City'],
                    ['state', 'State'],
                    ['country', 'Country'],
                    ['zip_code', 'Zip Code'],
                  ].map(([key, label]) => (
                    <input
                      key={key}
                      type="text"
                      className="input-premium"
                      placeholder={label}
                      value={newAddress[key]}
                      onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })}
                    />
                  ))}
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
                    disabled
                    title="Address deletion is not available in the API."
                    className="p-1.5 text-gray-400 opacity-40 cursor-not-allowed"
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
