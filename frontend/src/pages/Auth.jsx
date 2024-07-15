import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialForm = { email: '', password: '' };

const Auth = () => {
  const { login, isUserLogged } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (isUserLogged) {
      navigate('/');
    }
  }, [isUserLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, navigate);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isUserLogged) {
    return null; // Or you can render a loading indicator
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connectez-vous à votre compte
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Adresse Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                required
                autoComplete="email"
                className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mot de Passe
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="block w-full rounded-md p-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Se connecter
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Pas de compte?{' '}
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Inscrivez-vous et recevez un essai gratuit !
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
