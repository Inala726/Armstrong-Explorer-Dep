import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center mr-2">
                <div className="w-3 h-3 border-2 border-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-gray-800">Armstrong Explorer</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-900">Explorer</Link>
            <Link to="/documentation" className="hover:text-blue-900">Documentation</Link>
            <Link to="/api" className="hover:text-blue-900">API</Link>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-gray-800 hover:text-blue-900"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-blue-900">Login</Link>
                <Link
                  to="/register"
                  className="bg-blue-900 text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
