import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: string) => Promise<boolean>;
  signup: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'user@demo.com',
    password: 'demo123',
    name: 'John Doe',
    phone: '+1234567890',
    userType: 'user',
    location: { lat: 40.7128, lng: -74.0060, address: 'New York, NY' }
  },
  {
    id: '2',
    email: 'gas@demo.com',
    password: 'demo123',
    name: 'Shell Gas Station',
    phone: '+1234567891',
    userType: 'gas_station',
    location: { lat: 40.7589, lng: -73.9851, address: 'Times Square, NY' },
    rating: 4.5,
    isOnline: true
  },
  {
    id: '3',
    email: 'mechanic@demo.com',
    password: 'demo123',
    name: 'Quick Fix Auto',
    phone: '+1234567892',
    userType: 'mechanic',
    location: { lat: 40.7505, lng: -73.9934, address: 'Midtown, NY' },
    rating: 4.8,
    isOnline: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, userType: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => 
      u.email === email && u.password === password && u.userType === userType
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      phone: userData.phone!,
      userType: userData.userType!,
      location: userData.location,
      rating: userData.userType !== 'user' ? 5.0 : undefined,
      isOnline: userData.userType !== 'user' ? true : undefined
    };

    mockUsers.push({ ...newUser, password: userData.password });
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};