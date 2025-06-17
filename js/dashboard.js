// Dashboard functionality
class DashboardManager {
    constructor() {
        this.activeTab = 'active';
    }

    init() {
        // Dashboard will be initialized when navigation loads it
    }

    render() {
        const user = window.authManager.getCurrentUser();
        const contentDiv = document.getElementById('page-content');

        if (user.userType === 'user') {
            this.renderUserDashboard();
        } else {
            this.renderProviderDashboard();
        }
    }

    renderUserDashboard() {
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = `
            <div class="space-y-6">
                <!-- Quick Actions -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all" id="request-fuel-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold mb-2">Need Fuel?</h3>
                                <p class="text-blue-100 mb-4">Get fuel delivered to your location</p>
                                <div class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center">
                                    <i data-lucide="plus" class="h-4 w-4 mr-2"></i>
                                    Request Fuel
                                </div>
                            </div>
                            <i data-lucide="fuel" class="h-12 w-12 text-blue-200"></i>
                        </div>
                    </div>

                    <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white cursor-pointer hover:from-green-600 hover:to-green-700 transition-all" id="request-service-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold mb-2">Need Repairs?</h3>
                                <p class="text-green-100 mb-4">Find nearby mechanics instantly</p>
                                <div class="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors inline-flex items-center">
                                    <i data-lucide="plus" class="h-4 w-4 mr-2"></i>
                                    Request Service
                                </div>
                            </div>
                            <i data-lucide="wrench" class="h-12 w-12 text-green-200"></i>
                        </div>
                    </div>
                </div>

                <!-- Service Requests -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200 p-6">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold text-gray-900">Service Requests</h2>
                            <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
                                <button id="active-tab" class="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm">
                                    Active (1)
                                </button>
                                <button id="history-tab" class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900">
                                    History (2)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <div id="active-requests">
                            <div class="space-y-4">
                                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div class="flex justify-between items-start mb-3">
                                        <div class="flex items-center space-x-3">
                                            <div class="p-2 rounded-lg bg-blue-100">
                                                <i data-lucide="fuel" class="h-5 w-5 text-blue-600"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-medium text-gray-900">Fuel Service</h4>
                                                <p class="text-sm text-gray-600">Need 20L of Regular gasoline</p>
                                            </div>
                                        </div>
                                        <div class="flex space-x-2">
                                            <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">in progress</span>
                                            <span class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">high</span>
                                        </div>
                                    </div>

                                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                                        <div class="flex items-center">
                                            <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                                            Brodipet, Guntur, AP
                                        </div>
                                        <div class="flex items-center">
                                            <i data-lucide="clock" class="h-4 w-4 mr-1"></i>
                                            ETA: 15 minutes
                                        </div>
                                    </div>

                                    <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                                        <p class="text-sm font-medium text-gray-900">Accepted by: Bharat Petroleum</p>
                                        <p class="text-sm text-gray-600">Total Cost: ₹1,300.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="history-requests" class="hidden">
                            <div class="space-y-4">
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <div class="flex justify-between items-start mb-3">
                                        <div class="flex items-center space-x-3">
                                            <div class="p-2 rounded-lg bg-green-100">
                                                <i data-lucide="wrench" class="h-5 w-5 text-green-600"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-medium text-gray-900">Mechanical Service</h4>
                                                <p class="text-sm text-gray-600">Flat tire replacement needed</p>
                                            </div>
                                        </div>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Completed</span>
                                    </div>

                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                                            <div class="flex items-center">
                                                <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                                                Kothapet, Guntur, AP
                                            </div>
                                            <div>Provider: Srinivas Auto Works</div>
                                        </div>
                                        <div class="flex items-center space-x-4">
                                            <span class="text-sm font-medium text-gray-900">₹2,400.00</span>
                                            <div class="flex items-center">
                                                <i data-lucide="star" class="h-4 w-4 text-yellow-400 fill-current"></i>
                                                <span class="text-sm text-gray-600 ml-1">Rate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="border border-gray-200 rounded-lg p-4">
                                    <div class="flex justify-between items-start mb-3">
                                        <div class="flex items-center space-x-3">
                                            <div class="p-2 rounded-lg bg-blue-100">
                                                <i data-lucide="fuel" class="h-5 w-5 text-blue-600"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-medium text-gray-900">Fuel Service</h4>
                                                <p class="text-sm text-gray-600">Emergency fuel delivery</p>
                                            </div>
                                        </div>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Completed</span>
                                    </div>

                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                                            <div class="flex items-center">
                                                <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                                                Arundelpet, Guntur, AP
                                            </div>
                                            <div>Provider: Indian Oil Station</div>
                                        </div>
                                        <div class="flex items-center space-x-4">
                                            <span class="text-sm font-medium text-gray-900">₹975.00</span>
                                            <div class="flex items-center">
                                                <i data-lucide="star" class="h-4 w-4 text-yellow-400 fill-current"></i>
                                                <span class="text-sm text-gray-600 ml-1">Rate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.setupUserDashboardListeners();
    }

    renderProviderDashboard() {
        const user = window.authManager.getCurrentUser();
        const contentDiv = document.getElementById('page-content');
        
        contentDiv.innerHTML = `
            <div class="space-y-6">
                <!-- Status Toggle -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Service Status</h3>
                            <p class="text-gray-600">You are currently online and accepting new requests</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Online</span>
                            <div class="toggle-switch active" id="status-toggle">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Total Earnings</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">₹57,094</p>
                                <p class="text-sm font-medium mt-1 text-green-600">+12% from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="dollar-sign" class="h-6 w-6 text-green-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Completed Services</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">47</p>
                                <p class="text-sm font-medium mt-1 text-green-600">+8% from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="users" class="h-6 w-6 text-blue-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Average Rating</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">4.8</p>
                                <p class="text-sm font-medium mt-1 text-green-600">+0.2 from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="star" class="h-6 w-6 text-yellow-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Response Time</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">8 min</p>
                                <p class="text-sm font-medium mt-1 text-green-600">-2 min from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="clock" class="h-6 w-6 text-purple-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pending Requests -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-semibold text-gray-900">Pending Requests</h2>
                            <div class="flex items-center space-x-2">
                                <i data-lucide="bell" class="h-5 w-5 text-gray-400"></i>
                                <span class="text-sm text-gray-600">2 new</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <div class="flex items-center space-x-2 mb-1">
                                            <h4 class="font-medium text-gray-900">Rajesh Kumar</h4>
                                            <span class="px-2 py-1 rounded-full text-xs font-medium border border-red-200 bg-red-100 text-red-800">high priority</span>
                                        </div>
                                        <p class="text-sm text-gray-600 mb-2">${user.userType === 'gas_station' ? 'Fuel Delivery' : 'Tire Replacement'}</p>
                                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                                            <div class="flex items-center">
                                                <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                                                Brodipet, Guntur
                                            </div>
                                            <span>2.3 km away</span>
                                            <span>2 min ago</span>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-lg font-semibold text-gray-900">₹${user.userType === 'gas_station' ? '1,310.00' : '2,400.00'}</p>
                                        <p class="text-sm text-gray-500">Estimated</p>
                                    </div>
                                </div>

                                <div class="flex space-x-3">
                                    <button class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                                        Accept Request
                                    </button>
                                    <button class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <div class="flex items-center space-x-2 mb-1">
                                            <h4 class="font-medium text-gray-900">Priya Sharma</h4>
                                            <span class="px-2 py-1 rounded-full text-xs font-medium border border-yellow-200 bg-yellow-100 text-yellow-800">medium priority</span>
                                        </div>
                                        <p class="text-sm text-gray-600 mb-2">${user.userType === 'gas_station' ? 'Premium Fuel' : 'Battery Jump'}</p>
                                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                                            <div class="flex items-center">
                                                <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                                                Kothapet, Guntur
                                            </div>
                                            <span>1.8 km away</span>
                                            <span>5 min ago</span>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-lg font-semibold text-gray-900">₹${user.userType === 'gas_station' ? '906.00' : '1,700.00'}</p>
                                        <p class="text-sm text-gray-500">Estimated</p>
                                    </div>
                                </div>

                                <div class="flex space-x-3">
                                    <button class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                                        Accept Request
                                    </button>
                                    <button class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200 p-6">
                        <h2 class="text-xl font-semibold text-gray-900">Recent Activity</h2>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between py-2">
                                <div>
                                    <p class="font-medium text-gray-900">Completed service</p>
                                    <p class="text-sm text-gray-600">Customer: Venkat Reddy</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium text-gray-900">₹1,900.00</p>
                                    <p class="text-sm text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <div>
                                    <p class="font-medium text-gray-900">Accepted request</p>
                                    <p class="text-sm text-gray-600">Customer: Lakshmi Devi</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium text-gray-900">₹3,000.00</p>
                                    <p class="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <div>
                                    <p class="font-medium text-gray-900">Completed service</p>
                                    <p class="text-sm text-gray-600">Customer: Ravi Kumar</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium text-gray-900">₹1,510.00</p>
                                    <p class="text-sm text-gray-500">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.setupProviderDashboardListeners();
    }

    setupUserDashboardListeners() {
        // Quick action cards
        document.getElementById('request-fuel-card').addEventListener('click', () => {
            window.navigationManager.navigateTo('request');
        });

        document.getElementById('request-service-card').addEventListener('click', () => {
            window.navigationManager.navigateTo('request');
        });

        // Tab switching
        document.getElementById('active-tab').addEventListener('click', () => {
            this.switchTab('active');
        });

        document.getElementById('history-tab').addEventListener('click', () => {
            this.switchTab('history');
        });
    }

    setupProviderDashboardListeners() {
        // Status toggle
        const statusToggle = document.getElementById('status-toggle');
        let isOnline = true;

        statusToggle.addEventListener('click', () => {
            isOnline = !isOnline;
            if (isOnline) {
                statusToggle.classList.add('active');
                statusToggle.classList.remove('inactive');
            } else {
                statusToggle.classList.remove('active');
                statusToggle.classList.add('inactive');
            }
        });
    }

    switchTab(tab) {
        this.activeTab = tab;
        
        const activeTabBtn = document.getElementById('active-tab');
        const historyTabBtn = document.getElementById('history-tab');
        const activeRequests = document.getElementById('active-requests');
        const historyRequests = document.getElementById('history-requests');

        if (tab === 'active') {
            activeTabBtn.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm';
            historyTabBtn.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900';
            activeRequests.classList.remove('hidden');
            historyRequests.classList.add('hidden');
        } else {
            historyTabBtn.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm';
            activeTabBtn.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900';
            historyRequests.classList.remove('hidden');
            activeRequests.classList.add('hidden');
        }
    }
}

// Initialize dashboard manager
window.dashboardManager = new DashboardManager();