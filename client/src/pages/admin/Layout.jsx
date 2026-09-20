import React from 'react';
import { Outlet } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
  };

  return (
    <div className="bg-slate-50/50 min-h-screen text-slate-800 font-sans antialiased">
      <div className='flex items-center justify-between bg-white/80 backdrop-blur-md h-[64px] sm:h-[72px] px-4 sm:px-10 border-b border-slate-200/80 sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.01)]'>
        <img
          src={assets.logo}
          alt="Logo"
          className='w-28 sm:w-40 md:w-56 cursor-pointer hover:opacity-90 transition-opacity active:scale-[0.98]'
          onClick={() => navigate('/')}
        />

        <button
          onClick={logout}
          className='text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl border border-slate-200/60 hover:border-rose-100 cursor-pointer transition-all duration-200 shadow-sm active:scale-95'
        >
          Logout
        </button>
      </div>

      <div className="flex min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)]">
        <Sidebar />
        <div className="flex-1 w-full min-w-0 overflow-hidden bg-slate-50/40">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;