import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from './AuthContext.jsx';
// import LoginPage from './LoginPage';


export default function Navbar({user, setUser, setToken}) {
  const { isSubscribed, setIsSubscribed } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCancel = () => {
    alert("Are you sure you want to cancel subscription")
    setIsSubscribed(false);
    navigate("/start");     
  };

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout")){
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <header className="bg-[#0B0F1A] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
        <Zap className="w-6 h-6 text-green-500" />
        Energy Optimizer <span className="text-sm text-gray-400"></span>
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? 'block' : 'hidden'
        } absolute top-16 left-0 w-full bg-[#0B0F1A] border-t border-gray-800 md:static md:flex md:items-center md:space-x-6 md:w-auto md:border-none`}
      >
        <div className="flex flex-col md:flex-row gap-4 px-6 py-4 md:p-0 text-sm">
          <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" className="hover:underline" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          {isSubscribed && <Link to="/upload" className="hover:underline" onClick={() => setMenuOpen(false)}>Upload Data</Link>}
          <Link to="/reports" className="hover:underline" onClick={() => setMenuOpen(false)}>Reports</Link> 
          <Link to="/contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </div>

        <div className="flex flex-col md:flex-row gap-3 px-6 py-4 md:py-0 md:px-0">
          {/* <Button onClick={() => navigate("/login")} variant="ghost" className="text-white border border-white w-full md:w-auto cursor-pointer">
            Login
          </Button> */}
          {user ? <>
            <Button onClick={handleLogout} variant="ghost" className="text-white border border-white w-full md:w-auto cursor-pointer">
            Log Out
          </Button> 
          </> : <>
            <Button onClick={() => navigate("/login")} variant="ghost" className="text-white border border-white w-full md:w-auto cursor-pointer">
              Login
            </Button> 
          </>}
          {!isSubscribed && <Button onClick={() => navigate("/start")}  className="bg-green-500 hover:bg-green-600 text-black w-full md:w-auto cursor-pointer ">
            Get Started
          </Button>}
          {isSubscribed && <button
            onClick={handleCancel}
            className="ml-4 bg-red-600 px-3 py-1 rounded"
          >
            Cancel Subscription
          </button>}
        </div>
      </nav>
    </header>
  );
}
