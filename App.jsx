import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import UploadData from './components/UploadData';
import ReportsPage from './components/ReportsPage'; 
import LoginPage from './components/LoginPage';
import StartPage from './components/StartPage';
import ContactPage from './components/ContactPage';
import { useEffect, useState } from 'react';

export default function App() {
  


  const [token , setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.companyData);
          localStorage.setItem("user", JSON.stringify(data.companyData));
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Token verify error:", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    verifyToken();
  }, [token]);


  useEffect(() => {
    if(!token){
      setUser(null);
    }
  },[token]);

  return (
    <div className="bg-[#0B0F1A] text-white font-sans min-h-screen">
      <Navbar user={user} setUser={setUser} setToken={setToken} />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FeaturesSection />
              <BenefitsSection />
              <CTASection />
            </>
          }
        />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard user={user} token={token} />} />

        {/* login Page */}
        <Route path='/login' element={<LoginPage setUser={setUser} setToken={setToken}/>}/>

        {/* Start Page */}
        <Route path='/start' element={<StartPage/>}/>


        {/* Contact Page  */}
        <Route path='/contact' element={<ContactPage/>}/>


        {/* Upload Data Page */}
        <Route path="/upload" element={<UploadData />} />

        {/* Reports Page */}
        <Route path="/reports" element={<ReportsPage user={user} token={token} />} />
      </Routes>
      <Footer />
    </div>
  );
}