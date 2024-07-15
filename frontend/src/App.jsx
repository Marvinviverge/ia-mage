import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import {logoblack} from './assets/';
import { Home, CreatePost, Auth, Signup } from './pages';
import AuthGuard from './utils/AuthGuard';
import { AuthProvider, useAuth } from './utils/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { isUserLogged, logout } = useAuth();

  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b-[#e6ebf4]'>
        <Link to="/">
          <img src={logoblack} alt="logo" className='w-28 object-contain' />
        </Link>
        <div className='flex gap-1'>
          <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
            Créer une image
          </Link>
          {isUserLogged ? (
            <button onClick={logout} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
              Se déconnecter
            </button>
          ) : (
            <Link to="/auth" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
              Connexion
            </Link>
          )}
        </div>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-post" element={
            <AuthGuard>
              <CreatePost />
            </AuthGuard>
          } />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
