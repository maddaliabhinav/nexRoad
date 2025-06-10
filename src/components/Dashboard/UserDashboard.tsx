import React, { useState } from 'react';
import { Plus, MapPin, Clock, Fuel, Wrench, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceRequest } from '../../types';

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const navigate = useNavigate();

  const mockRequests: ServiceRequest[] = [
    {
      id: '1',
      userId: '1',
      serviceType: 'fuel',
      location: { lat: 40.7128, lng: -74.0060, address: 'Broadway, New York' },
      description: 'Need 20L of Regular gasoline',
      urgency: 'high',
      status: 'in_progress',
      createdAt: new Date(),
      acceptedBy: 'Shell Gas Station',
      estimatedArrival: new Date(Date.now() + 15 * 60 * 1000),
      totalCost: 65.50,
      fuelQuantity: 20,
      fuelType: 'Regular'
    },
    {
      id: '2',
      userId: '1',
      serviceType: 'mechanical',
      location: { lat: 40.7589, lng: -73.9851, address: '5th Avenue, New York' },
      description: 'Flat tire replacement needed',
      urgency: 'medium',
      status: 'completed',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      acceptedBy: 'Quick Fix Auto',
      totalCost: 120.00
    }
  ];

  const activeRequests = mockRequests.filter(r => r.status !== 'completed');
  const historyRequests = mockRequests.filter(r => r.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Need Fuel?</h3>
              <p className="text-blue-100 mb-4">Get fuel delivered to your location</p>
              <button 
                onClick={() => navigate('/request')}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Request Fuel
              </button>
            </div>
            <Fuel className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Need Repairs?</h3>
              <p className="text-green-100 mb-4">Find nearby mechanics instantly</p>
              <button 
                onClick={() => navigate('/request')}
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Request Service
              </button>
            </div>
            <Wrench className="h-12 w-12 text-green-200" />
          </div>
        </div>
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Service Requests</h2>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'active'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Active ({activeRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                History ({historyRequests.length})
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'active' && (
            <div className="space-y-4">
              {activeRequests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No active service requests</p>
                  <p className="text-sm text-gray-400 mt-1">Request a service to get started</p>
                </div>
              ) : (
                activeRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${request.serviceType === 'fuel' ? 'bg-blue-100' : 'bg-green-100'}`}>
                          {request.serviceType === 'fuel' ? 
                            <Fuel className={`h-5 w-5 ${request.serviceType === 'fuel' ? 'text-blue-600' : 'text-green-600'}`} /> :
                            <Wrench className={`h-5 w-5 ${request.serviceType === 'fuel' ? 'text-blue-600' : 'text-green-600'}`} />
                          }
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{request.serviceType} Service</h4>
                          <p className="text-sm text-gray-600">{request.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {request.location.address}
                      </div>
                      {request.estimatedArrival && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          ETA: {request.estimatedArrival.toLocaleTimeString()}
                        </div>
                      )}
                    </div>

                    {request.acceptedBy && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">
                          Accepted by: {request.acceptedBy}
                        </p>
                        {request.totalCost && (
                          <p className="text-sm text-gray-600">
                            Total Cost: ${request.totalCost.toFixed(2)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {historyRequests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No service history</p>
                </div>
              ) : (
                historyRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${request.serviceType === 'fuel' ? 'bg-blue-100' : 'bg-green-100'}`}>
                          {request.serviceType === 'fuel' ? 
                            <Fuel className={`h-5 w-5 ${request.serviceType === 'fuel' ? 'text-blue-600' : 'text-green-600'}`} /> :
                            <Wrench className={`h-5 w-5 ${request.serviceType === 'fuel' ? 'text-blue-600' : 'text-green-600'}`} />
                          }
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{request.serviceType} Service</h4>
                          <p className="text-sm text-gray-600">{request.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        Completed
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {request.location.address}
                        </div>
                        <div>
                          Provider: {request.acceptedBy}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-900">
                          ${request.totalCost?.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">Rate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};