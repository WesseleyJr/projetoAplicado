import React, { createContext, useState, useContext } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.style.setProperty(
      '--azul-secundario',
      !darkMode ? '#13293d' : '#006494'
    );

    document.documentElement.style.setProperty(
      '--branco-transparente',
      !darkMode ? 'rgba(78, 78, 78, 0.39)' : 'rgba(255, 255, 255, 0.678)'
    );

    document.documentElement.style.setProperty(
      '--preto-secundario',
      !darkMode ? '#fff' : '#333'
    );

    document.documentElement.style.setProperty(
      '--azul-primario',
      !darkMode ? '#1b98e0' : '#13293d'
    );

    document.documentElement.style.setProperty(
      '--azul-primario-claro',
      !darkMode ? '#13293d' : '#247ba0'
    );

    document.documentElement.style.setProperty(
      '--azul-link',
      !darkMode ? '#e8f6fd' : '#0015ff'
    );

    document.documentElement.style.setProperty(
      '--preto-primario',
      !darkMode ? '#fff' : '#000'
    );

    //-----------------------------------------

    document.documentElement.style.setProperty(
      '--emergencia', 
      !darkMode ? '#8e0000' : '#ff1e1e'  
    );
    
    document.documentElement.style.setProperty(
      '--muito-urgente', 
      !darkMode ? '#8c8c00' : '#FFFF00'  
    );
    
    document.documentElement.style.setProperty(
      '--urgente', 
      !darkMode ? '#8e5c00' : '#FFA500'  
    );
    
    document.documentElement.style.setProperty(
      '--pouco-urgente', 
      !darkMode ? '#0b8500' : '#15ff00'  
    );
    
    document.documentElement.style.setProperty(
      '--nao-urgente', 
      !darkMode ? '#005c7e' : '#00bbff'  
    );
    
    document.documentElement.style.setProperty(
      '--default', 
      !darkMode ? '#7d7d7d' : '#d9d9d9'  
    );
    
    


  };

  const increaseFontSize = () => {
    setFontSize((prev) => {
      const newFontSize = Math.min(prev + 2, 24);
      document.documentElement.style.setProperty('--font-size', `${newFontSize}px`);
      return newFontSize;
    });
  };
  
  const decreaseFontSize = () => {
    setFontSize((prev) => {
      const newFontSize = Math.max(prev - 2, 12);
      console.log('Diminuindo fonte para:', newFontSize);
      document.documentElement.style.setProperty('--font-size', `${newFontSize}px`);
      return newFontSize;
    });
  };
  

  return (
    <AccessibilityContext.Provider
      value={{ darkMode, toggleDarkMode, fontSize, increaseFontSize, decreaseFontSize }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

