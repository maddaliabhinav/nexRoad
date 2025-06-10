import React, { useState } from 'react';
import { TrendingUp, Users, Clock, DollarSign, Star, MapPin, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProviderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  const stats = [
    { label: 'Total Earnings', value: '$2,847', change: '+12%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Completed Services', value: '47', change: '+8%', icon: Users, color: 'text-blue-600' },
    { label: 'Average Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-yellow-600' },
    { label: 'Response Time', value: '8 min', change: '-2 min', icon: Clock, color: 'text-purple-600' },
  ];

  const pendingRequests = [
    {
      id: '1',
      customerName: 'John Doe',
      serviceType: user?.userType === 'gas_station' ? 'Fuel Delivery' : 'Tire Replacement',
      location: 'Broadway, New York',
      distance: '2.3 miles',
      urgency: 'high',
      estimatedCost: user?.userType === 'gas_station' ? '$65.50' : '$120.00',
      timeAgo: '2 min ago'
    },
    {
      id: '2',
      customerName: 'Sarah Smith',
      serviceType: user?.userType === 'gas_station' ? 'Premium Fuel' : 'Battery Jump',
      location: '5th Avenue, New York',
      distance: '1.8 miles',
      urgency: 'medium',
      estimatedCost: user?.userType === 'gas_station' ? '$45.30' : '$85.00',
      timeAgo: '5 min ago'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Service Status</h3>
            <p className="text-gray-600">
              You are currently {isOnline ? 'online' : 'offline'} and {isOnline ? 'accepting' : 'not accepting'} new requests
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOnline ? 'bg-green-600' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm font-medium mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') && stat.label === 'Response Time' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Pending Requests</h2>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">{pendingRequests.length} new</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No pending requests</p>
              <p className="text-sm text-gray-400 mt-1">New requests will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{request.customerName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.serviceType}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {request.location}
                        </div>
                        <span>{request.distance} away</span>
                        <span>{request.timeAgo}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{request.estimatedCost}</p>
                      <p className="text-sm text-gray-500">Estimated</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Accept Request
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Completed service', customer: 'Mike Johnson', amount: '$95.00', time: '1 hour ago' },
              { action: 'Accepted request', customer: 'Emma Wilson', amount: '$150.00', time: '2 hours ago' },
              { action: 'Completed service', customer: 'David Brown', amount: '$75.50', time: '3 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">Customer: {activity.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{activity.amount}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};