import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import RangeSearch from './pages/RangeSearch';
import Attempts from './pages/Attempts';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes with Top Navbar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes with Sidebar Layout (handled inside components) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/calculator" 
          element={
            <PrivateRoute>
              <Calculator />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/range" 
          element={
            <PrivateRoute>
              <RangeSearch />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/attempts" 
          element={
            <PrivateRoute>
              <Attempts />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/feedback" 
          element={
            <PrivateRoute>
              <Feedback />
            </PrivateRoute>
          } 
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
