import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Clock, Calendar, BarChart3, PieChart, Activity } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  const stats = [
    { label: 'Total Revenue', value: '$12,847', change: '+23%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Total Orders', value: '156', change: '+18%', icon: Users, color: 'text-blue-600' },
    { label: 'Avg Response Time', value: '12 min', change: '-5 min', icon: Clock, color: 'text-purple-600' },
    { label: 'Customer Rating', value: '4.8', change: '+0.3', icon: TrendingUp, color: 'text-yellow-600' },
  ];

  const recentOrders = [
    { id: '1', customer: 'John Doe', service: 'Fuel Delivery', amount: '$65.50', status: 'completed', time: '2 hours ago' },
    { id: '2', customer: 'Sarah Smith', service: 'Tire Replacement', amount: '$120.00', status: 'completed', time: '4 hours ago' },
    { id: '3', customer: 'Mike Johnson', service: 'Battery Jump', amount: '$85.00', status: 'in_progress', time: '6 hours ago' },
    { id: '4', customer: 'Emma Wilson', service: 'Engine Repair', amount: '$250.00', status: 'completed', time: '1 day ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Analytics</h1>
            <p className="text-gray-600 mt-1">Track your performance and earnings</p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
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
                <p className={`text-sm font-medium mt-1 ${stat.change.startsWith('+') || (stat.change.startsWith('-') && stat.label.includes('Time')) ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last {timeRange}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-center">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-gray-500">Revenue chart visualization</p>
              <p className="text-sm text-gray-400">Chart implementation needed</p>
            </div>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Service Distribution</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Fuel Delivery</span>
              </div>
              <span className="font-medium text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Tire Services</span>
              </div>
              <span className="font-medium text-gray-900">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Battery Services</span>
              </div>
              <span className="font-medium text-gray-900">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Other Services</span>
              </div>
              <span className="font-medium text-gray-900">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{order.customer}</h4>
                    <p className="text-sm text-gray-600">{order.service}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Peak Hours</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Morning (6-12)</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Afternoon (12-18)</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Evening (18-24)</span>
              <span className="font-medium">30%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Satisfaction</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">96%</div>
            <p className="text-gray-600">Positive feedback</p>
            <p className="text-sm text-gray-500 mt-2">Based on 156 reviews</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Repeat Customers</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">68%</div>
            <p className="text-gray-600">Return rate</p>
            <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};