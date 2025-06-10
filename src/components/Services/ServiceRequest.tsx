import React, { useState } from 'react';
import { MapPin, Fuel, Wrench, AlertTriangle, Clock, ArrowRight } from 'lucide-react';

export const ServiceRequest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fuel' | 'mechanic'>('fuel');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [fuelType, setFuelType] = useState('regular');
  const [fuelQuantity, setFuelQuantity] = useState(20);
  const [mechanicService, setMechanicService] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle service request submission
    console.log('Service request submitted:', {
      type: activeTab,
      urgency,
      location,
      description,
      ...(activeTab === 'fuel' ? { fuelType, fuelQuantity } : { mechanicService })
    });
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-500 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-500 bg-green-50 text-green-700';
      default: return 'border-gray-300 bg-white text-gray-700';
    }
  };

  const mechanicServices = [
    'Tire Replacement',
    'Battery Jump Start',
    'Engine Won\'t Start',
    'Flat Tire Repair',
    'Towing Service',
    'Emergency Repair',
    'Other (specify in description)'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Service</h1>
          <p className="text-gray-600">Get help from nearby service providers</p>
        </div>

        {/* Service Type Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('fuel')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'fuel'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Fuel className="h-5 w-5 inline mr-2" />
              Fuel Delivery
            </button>
            <button
              onClick={() => setActiveTab('mechanic')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'mechanic'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Wrench className="h-5 w-5 inline mr-2" />
              Mechanical Service
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Your Location
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your current location or address"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
              >
                Use GPS
              </button>
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <AlertTriangle className="h-4 w-4 inline mr-1" />
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setUrgency(level as any)}
                  className={`p-3 border-2 rounded-lg text-center font-medium transition-all ${
                    urgency === level ? getUrgencyColor(level) : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="capitalize">{level}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {level === 'low' && 'Can wait 30+ min'}
                    {level === 'medium' && 'Need help soon'}
                    {level === 'high' && 'Emergency!'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Service-Specific Options */}
          {activeTab === 'fuel' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="regular">Regular (87)</option>
                  <option value="midgrade">Mid-Grade (89)</option>
                  <option value="premium">Premium (91+)</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (Liters)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={fuelQuantity}
                    onChange={(e) => setFuelQuantity(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="bg-gray-100 px-3 py-2 rounded-lg font-medium min-w-16 text-center">
                    {fuelQuantity}L
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>5L</span>
                  <span>50L</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mechanicServices.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setMechanicService(service)}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      mechanicService === service
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={
                activeTab === 'fuel'
                  ? 'Any specific instructions for fuel delivery...'
                  : 'Describe the problem or what help you need...'
              }
            />
          </div>

          {/* Estimated Cost */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Estimated Cost</h4>
                <p className="text-sm text-gray-600">
                  Based on your location and selected options
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ${activeTab === 'fuel' ? (fuelQuantity * 3.25).toFixed(2) : '85.00'}
                </p>
                <p className="text-sm text-gray-600">+ service fee</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center"
          >
            <Clock className="h-5 w-5 mr-2" />
            Request {activeTab === 'fuel' ? 'Fuel Delivery' : 'Mechanic Service'}
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};