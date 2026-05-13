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
  X,
  ChevronRight
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
    <div className="flex flex-col h-full bg-white border-r border-[var(--border)]">
      <div className="p-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-[var(--primary)] rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-[var(--text-primary)] leading-none">Armstrong</span>
          <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase">Explorer</span>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-1">
        <p className="px-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Main Menu</p>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-all ${
              location.pathname === item.path
                ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                : 'text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className={`w-4 h-4 ${location.pathname === item.path ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} />
              <span>{item.label}</span>
            </div>
            {location.pathname === item.path && <ChevronRight className="w-3 h-3" />}
          </Link>
        ))}

        <div className="pt-6 pb-2">
          <p className="px-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Support & Account</p>
        </div>

        {secondaryMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-all ${
              location.pathname === item.path
                ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                : 'text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className={`w-4 h-4 ${location.pathname === item.path ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} />
              <span>{item.label}</span>
            </div>
            {location.pathname === item.path && <ChevronRight className="w-3 h-3" />}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-[var(--border)] bg-gray-50/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] font-bold">
            {userName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[var(--text-primary)] truncate">{userName}</p>
            <p className="text-[10px] text-[var(--text-muted)] truncate">Student Account</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 w-full text-left text-sm font-semibold text-red-600 hover:bg-red-50 rounded transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--bg-main)] overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-[var(--text-primary)]/40 backdrop-blur-sm"></div>
          <aside 
            className="absolute left-0 top-0 bottom-0 w-72 flex flex-col animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 bg-white rounded-full shadow-md text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-[var(--border)] flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-[var(--text-secondary)] hover:bg-gray-100 rounded lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base lg:text-lg font-bold text-[var(--text-primary)] truncate">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex p-1.5 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-[var(--border)] mx-1 lg:mx-2"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-[var(--border)]">
              <img 
                src={`https://ui-avatars.com/api/?name=${userName}&background=DEEBFF&color=0052CC&bold=true`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
            
            {/* Dashboard Footer */}
            <footer className="mt-12 pt-8 border-t border-[var(--border)] pb-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div>
                  <h4 className="text-[var(--text-primary)] font-bold text-base mb-1">Armstrong Explorer</h4>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed max-w-sm">
                    © 2024 Armstrong Explorer. Academic excellence through numerical patterns.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  <Link to="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="hover:text-[var(--primary)] transition-colors">Terms of Service</Link>
                  <Link to="/support" className="hover:text-[var(--primary)] transition-colors">Support</Link>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;;
