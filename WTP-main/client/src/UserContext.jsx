import { createContext, useState, useContext, useEffect } from 'react';

// Create a context for user authentication
const UserContext = createContext();

// Default guest user
const DEFAULT_USER = {
  firstname: '',
  email: '',
  role: 'guest',
  company: '',
  isLoggedIn: false
};

// Create a provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          isLoggedIn: true
        });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        // Clear invalid data
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      // Here you would make an API call to your backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const userData = await response.json();
      
      // Save user data to state and localStorage
      const newUserState = {
        firstname: userData.firstName,
        email: userData.email,
        role: userData.role,
        company: userData.company,
        isLoggedIn: true
      };
      
      setUser(newUserState);
      localStorage.setItem('currentUser', JSON.stringify(newUserState));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // For development/testing - bypass actual API call
  const devLogin = (userData) => {
    const newUserState = {
      firstname: userData.firstName || 'Test',
      email: userData.email || 'test@example.com',
      role: userData.role || 'staff',
      company: userData.company || 'tele',
      isLoggedIn: true
    };
    
    setUser(newUserState);
    localStorage.setItem('currentUser', JSON.stringify(newUserState));
    return { success: true };
  };

  // Logout function
  const logout = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isLoading,
        devLogin // For development only
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}