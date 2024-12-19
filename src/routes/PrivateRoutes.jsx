import React from 'react';
import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function PrivateRoutes({children}) {


  const token = localStorage.getItem('token');
  if (!token) return <Navigate to='/'/>;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = decodedToken.exp * 1000 < Date.now()

    if (currentTime) {
      localStorage.removeItem('token');
      return <Navigate to='/'/>;
    }

  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    localStorage.removeItem('token');
    return <Navigate to='/'/>;
  }

  return children
};
