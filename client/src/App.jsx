import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import ListBlog from './pages/admin/ListBlog';
import Comments from './pages/admin/Comments';
import Login from './components/admin/Login';
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const { token } = useAppContext();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50/10 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'border border-slate-100 shadow-xl text-xs font-semibold tracking-wide rounded-2xl text-slate-800 bg-white/95 backdrop-blur-md px-4 py-3',
          duration: 3500,
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } }
        }}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
          <Route path='/blog/:id' element={<PageWrapper><Blog /></PageWrapper>} />

          <Route path='/admin' element={token ? <Layout /> : <Login />}>
            <Route index element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path='addBlog' element={<PageWrapper><AddBlog /></PageWrapper>} />
            <Route path='listBlog' element={<PageWrapper><ListBlog /></PageWrapper>} />
            <Route path='comments' element={<PageWrapper><Comments /></PageWrapper>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;