import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Layers, 
  History, 
  Settings, 
  Phone, 
  MessageSquare, 
  Bell, 
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = ({ children, title }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'Alexander Mathos';

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Search, label: 'Check Armstrong', path: '/calculator' },
    { icon: Layers, label: 'Find in Range', path: '/range' },
    { icon: History, label: 'My Attempts', path: '/attempts' },
  ];

  const secondaryMenuItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Phone, label: 'Contact Us', path: '/contact' },
    { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold text-blue-950">Armstrong</span>
          <span className="text-2xl font-bold text-blue-950 -mt-1">Explorer</span>
        </Link>
      </div>

      {/* User Profile Card in Sidebar */}
      <div className="px-4 mb-8">
        <div className="bg-gray-100/50 rounded-lg p-3 flex items-center space-x-3 border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" 
            alt="Profile" 
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="overflow-hidden">
              <p className="text-sm font-bold text-blue-950 truncate leading-tight">{userName}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1.5">Premium Member</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3.5 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-900 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-blue-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-blue-900' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="pt-10 pb-4">
            <div className="border-t border-gray-100 mx-4"></div>
          </div>

          {secondaryMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3.5 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-900 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-blue-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-blue-900' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3.5 px-4 py-3 w-full text-left text-[14px] font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col shrink-0 overflow-y-auto scrollbar-hide">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600/50 backdrop-blur-sm"></div>
          <aside 
            className="absolute left-0 top-0 bottom-0 w-64 bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-blue-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 mr-2 text-gray-500 hover:text-blue-900 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-blue-950 truncate">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-3 lg:space-x-6">
            <button className="hidden sm:flex text-gray-400 hover:text-blue-900 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex text-gray-400 hover:text-blue-900 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
          
          {/* Dashboard Footer */}
          <footer className="mt-20 pt-10 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-blue-950 font-bold text-lg mb-2">Armstrong Explorer</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                  © 2024 Armstrong Explorer. Academic excellence through numerical patterns.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <Link to="/privacy" className="hover:text-blue-900">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-blue-900">Terms of Service</Link>
                <Link to="/api" className="hover:text-blue-900">API Documentation</Link>
                <Link to="/support" className="hover:text-blue-900">Support</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
