import React, { useState } from 'react';
import { Plus, Edit, Trash2, Wrench, DollarSign, Clock, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';

export const MechanicServices: React.FC = () => {
  const [services, setServices] = useState([
    {
      id: '1',
      serviceName: 'Tire Replacement',
      basePrice: 120,
      isAvailable: true,
      serviceRadius: 15,
      estimatedTime: '30-45 min',
      description: 'Complete tire replacement service'
    },
    {
      id: '2',
      serviceName: 'Battery Jump Start',
      basePrice: 85,
      isAvailable: true,
      serviceRadius: 20,
      estimatedTime: '15-20 min',
      description: 'Emergency battery jump start'
    },
    {
      id: '3',
      serviceName: 'Engine Diagnostics',
      basePrice: 150,
      isAvailable: true,
      serviceRadius: 12,
      estimatedTime: '45-60 min',
      description: 'Complete engine diagnostic scan'
    },
    {
      id: '4',
      serviceName: 'Towing Service',
      basePrice: 200,
      isAvailable: false,
      serviceRadius: 25,
      estimatedTime: '20-30 min',
      description: 'Emergency vehicle towing'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: '',
    basePrice: 0,
    serviceRadius: 15,
    estimatedTime: '30-45 min',
    description: ''
  });

  const toggleAvailability = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isAvailable: !service.isAvailable } : service
    ));
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const service = {
      id: Date.now().toString(),
      ...newService,
      isAvailable: true
    };
    setServices([...services, service]);
    setNewService({ serviceName: '', basePrice: 0, serviceRadius: 15, estimatedTime: '30-45 min', description: '' });
    setShowAddForm(false);
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mechanic Services Management</h1>
            <p className="text-gray-600 mt-1">Manage your mechanical services, pricing, and availability</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Wrench className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ToggleRight className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.isAvailable).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(services.reduce((sum, s) => sum + s.basePrice, 0) / services.length).toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Max Radius</p>
              <p className="text-2xl font-bold text-gray-900">{Math.max(...services.map(s => s.serviceRadius))} mi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Mechanical Services</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Wrench className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.serviceName}</h3>
                      <p className="text-sm text-gray-600 mb-1">{service.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${service.basePrice} base
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {service.serviceRadius} mi radius
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleAvailability(service.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        service.isAvailable 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {service.isAvailable ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => deleteService(service.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Mechanical Service</h3>
            
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                <input
                  type="text"
                  required
                  value={newService.serviceName}
                  onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Brake Repair"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price ($)</label>
                <input
                  type="number"
                  required
                  value={newService.basePrice}
                  onChange={(e) => setNewService({ ...newService, basePrice: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Radius (miles)</label>
                <input
                  type="number"
                  required
                  value={newService.serviceRadius}
                  onChange={(e) => setNewService({ ...newService, serviceRadius: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                <input
                  type="text"
                  required
                  value={newService.estimatedTime}
                  onChange={(e) => setNewService({ ...newService, estimatedTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="30-45 min"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief description of the service"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Add Service
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};