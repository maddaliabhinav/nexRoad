import React, { useState } from 'react';
import { Plus, Edit, Trash2, Fuel, DollarSign, Clock, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';

export const FuelServices: React.FC = () => {
  const [services, setServices] = useState([
    {
      id: '1',
      fuelType: 'Regular (87)',
      pricePerLiter: 3.25,
      isAvailable: true,
      deliveryRadius: 10,
      estimatedTime: '15-20 min'
    },
    {
      id: '2',
      fuelType: 'Premium (91+)',
      pricePerLiter: 3.65,
      isAvailable: true,
      deliveryRadius: 10,
      estimatedTime: '15-20 min'
    },
    {
      id: '3',
      fuelType: 'Diesel',
      pricePerLiter: 3.45,
      isAvailable: false,
      deliveryRadius: 8,
      estimatedTime: '20-25 min'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    fuelType: '',
    pricePerLiter: 0,
    deliveryRadius: 10,
    estimatedTime: '15-20 min'
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
    setNewService({ fuelType: '', pricePerLiter: 0, deliveryRadius: 10, estimatedTime: '15-20 min' });
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
            <h1 className="text-2xl font-bold text-gray-900">Fuel Services Management</h1>
            <p className="text-gray-600 mt-1">Manage your fuel types, pricing, and availability</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Fuel Type
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Fuel className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ToggleRight className="h-6 w-6 text-green-600" />
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
                ${(services.reduce((sum, s) => sum + s.pricePerLiter, 0) / services.length).toFixed(2)}
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
              <p className="text-2xl font-bold text-gray-900">{Math.max(...services.map(s => s.deliveryRadius))} mi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Fuel Services</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Fuel className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.fuelType}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${service.pricePerLiter.toFixed(2)}/L
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {service.deliveryRadius} mi radius
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Fuel Service</h3>
            
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                <input
                  type="text"
                  required
                  value={newService.fuelType}
                  onChange={(e) => setNewService({ ...newService, fuelType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Regular (87)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Liter ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newService.pricePerLiter}
                  onChange={(e) => setNewService({ ...newService, pricePerLiter: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (miles)</label>
                <input
                  type="number"
                  required
                  value={newService.deliveryRadius}
                  onChange={(e) => setNewService({ ...newService, deliveryRadius: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery Time</label>
                <input
                  type="text"
                  required
                  value={newService.estimatedTime}
                  onChange={(e) => setNewService({ ...newService, estimatedTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15-20 min"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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