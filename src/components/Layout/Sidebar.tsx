import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Map, 
  MessageCircle, 
  User, 
  Settings, 
  Fuel, 
  Wrench,
  Plus,
  BarChart3,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Map, label: 'Map View', path: '/map' },
      { icon: MessageCircle, label: 'Messages', path: '/messages' },
      { icon: User, label: 'Profile', path: '/profile' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    if (user?.userType === 'user') {
      return [
        ...commonItems.slice(0, 1),
        { icon: Plus, label: 'Request Service', path: '/request' },
        ...commonItems.slice(1),
      ];
    } else if (user?.userType === 'gas_station') {
      return [
        ...commonItems.slice(0, 1),
        { icon: Fuel, label: 'Fuel Services', path: '/fuel-services' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        ...commonItems.slice(1),
      ];
    } else if (user?.userType === 'mechanic') {
      return [
        ...commonItems.slice(0, 1),
        { icon: Wrench, label: 'Services', path: '/mechanic-services' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        ...commonItems.slice(1),
      ];
    }

    return commonItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Fuel className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ServiceHub</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-6 pb-6">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};