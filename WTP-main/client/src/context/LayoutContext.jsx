// Vår layout struktur är nu komplett och vi kan använda useLayout i våra komponenter.
// Vi kan nu använda useLayout för att hantera route-ändringar och uppdateringar av data.
//  shouldFetchData för att kontrollera om en viss datatyp behöver uppdateras.
// triggerRefresh för att trigga omedelbar uppdatering av data.


import { createContext, useContext, useState, useRef } from 'react';

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [currentPath, setCurrentPath] = useState('/');
  const lastFetchTimeRef = useRef({
    tickets: 0,
    chat: 0,
    forms: 0
  });
  
  // Funktion för att kontrollera om en viss datatyp behöver uppdateras
  const shouldFetchData = (dataType, minInterval = 10000) => {
    const now = Date.now();
    if (now - lastFetchTimeRef.current[dataType] >= minInterval) {
      lastFetchTimeRef.current[dataType] = now;
      return true;
    }
    return false;
  };
  
  // Funktion för att trigga omedelbar uppdatering
  const triggerRefresh = (dataType) => {
    if (dataType) {
      // Nollställ tiden för en specifik datatyp
      lastFetchTimeRef.current[dataType] = 0;
    } else {
      // Nollställ tiden för alla datatyper
      lastFetchTimeRef.current = {
        tickets: 0,
        chat: 0, 
        forms: 0
      };
    }
  };
  
  // Funktion för att hantera route-ändringar
  const handleRouteChange = (pathname) => {
    if (currentPath !== pathname) {
      console.log(`Route changed: ${currentPath} -> ${pathname}`);
      setCurrentPath(pathname);
      
      // Trigga uppdatering av relevant data baserat på path
      if (pathname.includes('/admin/dashboard')) {
        triggerRefresh('tickets');
      } 
      else if (pathname.includes('/staff/dashboard')) {
        triggerRefresh('forms');
      }
      else if (pathname.includes('/chat')) {
        triggerRefresh('chat');
      }
    }
  };

  return (
    <LayoutContext.Provider
      value={{
        currentPath,
        shouldFetchData,
        triggerRefresh,
        handleRouteChange
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};