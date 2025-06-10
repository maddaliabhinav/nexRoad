import React, { useState } from 'react';
import { MapPin, Navigation, Filter, Fuel, Wrench, Phone, MessageCircle, Star } from 'lucide-react';

export const MapView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fuel' | 'mechanic'>('all');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = [
    {
      id: '1',
      name: 'Shell Gas Station',
      type: 'fuel',
      location: { lat: 40.7589, lng: -73.9851 },
      address: 'Times Square, NY',
      distance: '0.5 miles',
      rating: 4.5,
      isOnline: true,
      services: ['Regular', 'Premium', 'Diesel'],
      prices: { regular: 3.25, premium: 3.65, diesel: 3.45 },
      estimatedTime: '10-15 min'
    },
    {
      id: '2',
      name: 'Quick Fix Auto',
      type: 'mechanic',
      location: { lat: 40.7505, lng: -73.9934 },
      address: 'Midtown, NY',
      distance: '0.8 miles',
      rating: 4.8,
      isOnline: true,
      services: ['Tire Replacement', 'Battery Jump', 'Engine Repair'],
      prices: { tire: 120, battery: 85, engine: 200 },
      estimatedTime: '15-20 min'
    },
    {
      id: '3',
      name: 'Mobil Express',
      type: 'fuel',
      location: { lat: 40.7282, lng: -74.0776 },
      address: 'West Village, NY',
      distance: '1.2 miles',
      rating: 4.2,
      isOnline: true,
      services: ['Regular', 'Premium'],
      prices: { regular: 3.30, premium: 3.70 },
      estimatedTime: '12-18 min'
    },
    {
      id: '4',
      name: 'AutoCare Pro',
      type: 'mechanic',
      location: { lat: 40.7614, lng: -73.9776 },
      address: 'Central Park Area, NY',
      distance: '1.5 miles',
      rating: 4.6,
      isOnline: false,
      services: ['Emergency Repair', 'Towing', 'Diagnostics'],
      prices: { emergency: 150, towing: 100, diagnostics: 75 },
      estimatedTime: '20-25 min'
    }
  ];

  const filteredProviders = providers.filter(provider => 
    activeFilter === 'all' || provider.type === activeFilter
  );

  const getProviderIcon = (type: string, isOnline: boolean) => {
    const baseClasses = `h-6 w-6 ${isOnline ? 'text-white' : 'text-gray-400'}`;
    return type === 'fuel' ? 
      <Fuel className={baseClasses} /> : 
      <Wrench className={baseClasses} />;
  };

  const getProviderColor = (type: string, isOnline: boolean) => {
    if (!isOnline) return 'bg-gray-400';
    return type === 'fuel' ? 'bg-blue-500' : 'bg-green-500';
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Map Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Service Providers Near You</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Navigation className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('fuel')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === 'fuel' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Fuel
                  </button>
                  <button
                    onClick={() => setActiveFilter('mechanic')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === 'mechanic' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Mechanic
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Map */}
          <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center min-h-[400px]">
            <div className="absolute inset-0 bg-gray-100 opacity-20"></div>
            
            {/* Your Location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-4 w-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                Your Location
              </div>
            </div>

            {/* Provider Markers */}
            {filteredProviders.map((provider, index) => (
              <div
                key={provider.id}
                className={`absolute cursor-pointer transform transition-all duration-200 hover:scale-110 ${
                  selectedProvider === provider.id ? 'scale-110 z-10' : ''
                }`}
                style={{
                  top: `${30 + index * 15}%`,
                  left: `${25 + index * 20}%`,
                }}
                onClick={() => setSelectedProvider(selectedProvider === provider.id ? null : provider.id)}
              >
                <div className={`h-10 w-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${getProviderColor(provider.type, provider.isOnline)}`}>
                  {getProviderIcon(provider.type, provider.isOnline)}
                </div>
                
                {selectedProvider === provider.id && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-48 z-20">
                    <div className="text-sm">
                      <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                      <p className="text-gray-600">{provider.distance} away</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-gray-600">{provider.rating}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${provider.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {provider.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                  </div>
                )}
              </div>
            ))}

            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                  Your Location
                </div>
                <div className="flex items-center mb-1">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                  Gas Stations
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  Mechanic Shops
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Providers List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Nearby Providers ({filteredProviders.length})
            </h3>
          </div>

          <div className="overflow-y-auto h-full">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getProviderColor(provider.type, provider.isOnline)}`}>
                      {getProviderIcon(provider.type, provider.isOnline)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{provider.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{provider.address}</span>
                        <span>•</span>
                        <span>{provider.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {provider.services.slice(0, 2).map((service) => (
                      <span key={service} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {service}
                      </span>
                    ))}
                    {provider.services.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        +{provider.services.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">ETA: {provider.estimatedTime}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${provider.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {provider.isOnline ? 'Available' : 'Offline'}
                    </span>
                  </div>
                </div>

                {provider.isOnline && (
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Request Service
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};