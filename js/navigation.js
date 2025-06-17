// Navigation functionality
class NavigationManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarOpen = false;
    }

    init() {
        this.setupEventListeners();
        this.updateNavigation();
        this.navigateTo('dashboard');
    }

    setupEventListeners() {
        // Mobile menu toggle
        document.getElementById('menu-toggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Close sidebar
        document.getElementById('close-sidebar').addEventListener('click', () => {
            this.closeSidebar();
        });

        // Sidebar overlay
        document.getElementById('sidebar-overlay').addEventListener('click', () => {
            this.closeSidebar();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.closeSidebar();
            }
        });
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        this.updateSidebarState();
    }

    closeSidebar() {
        this.sidebarOpen = false;
        this.updateSidebarState();
    }

    updateSidebarState() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');

        if (this.sidebarOpen) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    }

    getNavigationItems() {
        const user = window.authManager.getCurrentUser();
        const commonItems = [
            { icon: 'home', label: 'Dashboard', path: 'dashboard' },
            { icon: 'map', label: 'Map View', path: 'map' },
            { icon: 'message-circle', label: 'Messages', path: 'messages' },
            { icon: 'user', label: 'Profile', path: 'profile' },
            { icon: 'settings', label: 'Settings', path: 'settings' },
        ];

        if (user?.userType === 'user') {
            return [
                commonItems[0],
                { icon: 'plus', label: 'Request Service', path: 'request' },
                ...commonItems.slice(1),
            ];
        } else if (user?.userType === 'gas_station') {
            return [
                commonItems[0],
                { icon: 'fuel', label: 'Fuel Services', path: 'fuel-services' },
                { icon: 'bar-chart-3', label: 'Analytics', path: 'analytics' },
                ...commonItems.slice(1),
            ];
        } else if (user?.userType === 'mechanic') {
            return [
                commonItems[0],
                { icon: 'wrench', label: 'Services', path: 'mechanic-services' },
                { icon: 'bar-chart-3', label: 'Analytics', path: 'analytics' },
                ...commonItems.slice(1),
            ];
        }

        return commonItems;
    }

    updateNavigation() {
        const navItems = document.getElementById('nav-items');
        const navigationItems = this.getNavigationItems();

        navItems.innerHTML = '';

        navigationItems.forEach(item => {
            const navItem = document.createElement('a');
            navItem.href = '#';
            navItem.className = 'nav-item';
            navItem.dataset.path = item.path;
            navItem.innerHTML = `
                <i data-lucide="${item.icon}"></i>
                <span>${item.label}</span>
            `;

            navItem.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(item.path);
                if (window.innerWidth < 768) {
                    this.closeSidebar();
                }
            });

            navItems.appendChild(navItem);
        });

        lucide.createIcons();
    }

    navigateTo(page) {
        this.currentPage = page;
        this.updateActiveNavItem();
        this.updatePageTitle();
        this.loadPageContent();
    }

    updateActiveNavItem() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.querySelector(`[data-path="${this.currentPage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    updatePageTitle() {
        const titles = {
            'dashboard': 'Dashboard',
            'map': 'Map View',
            'request': 'Request Service',
            'messages': 'Messages',
            'profile': 'Profile',
            'settings': 'Settings',
            'fuel-services': 'Fuel Services',
            'mechanic-services': 'Mechanic Services',
            'analytics': 'Analytics'
        };

        document.getElementById('page-title').textContent = titles[this.currentPage] || 'Dashboard';
    }

    loadPageContent() {
        const contentDiv = document.getElementById('page-content');
        
        switch (this.currentPage) {
            case 'dashboard':
                if (window.dashboardManager) {
                    window.dashboardManager.render();
                }
                break;
            case 'map':
                if (window.mapManager) {
                    window.mapManager.render();
                }
                break;
            case 'request':
                this.loadRequestPage();
                break;
            case 'messages':
                if (window.messagesManager) {
                    window.messagesManager.render();
                }
                break;
            case 'profile':
                if (window.profileManager) {
                    window.profileManager.render();
                }
                break;
            case 'settings':
                if (window.settingsManager) {
                    window.settingsManager.render();
                }
                break;
            case 'fuel-services':
                if (window.servicesManager) {
                    window.servicesManager.renderFuelServices();
                }
                break;
            case 'mechanic-services':
                if (window.servicesManager) {
                    window.servicesManager.renderMechanicServices();
                }
                break;
            case 'analytics':
                this.loadAnalyticsPage();
                break;
            default:
                contentDiv.innerHTML = '<div class="text-center py-8"><p class="text-gray-500">Page not found</p></div>';
        }
    }

    loadRequestPage() {
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="border-b border-gray-200 p-6">
                        <h1 class="text-2xl font-bold text-gray-900 mb-2">Request Service</h1>
                        <p class="text-gray-600">Get help from nearby service providers</p>
                    </div>

                    <div class="border-b border-gray-200">
                        <div class="flex">
                            <button id="fuel-tab" class="flex-1 px-6 py-4 text-center font-medium transition-colors text-blue-600 border-b-2 border-blue-600 bg-blue-50">
                                <i data-lucide="fuel" class="h-5 w-5 inline mr-2"></i>
                                Fuel Delivery
                            </button>
                            <button id="mechanic-tab" class="flex-1 px-6 py-4 text-center font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                <i data-lucide="wrench" class="h-5 w-5 inline mr-2"></i>
                                Mechanical Service
                            </button>
                        </div>
                    </div>

                    <form id="service-request-form" class="p-6 space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i data-lucide="map-pin" class="h-4 w-4 inline mr-1"></i>
                                Your Location
                            </label>
                            <div class="relative">
                                <input type="text" id="location" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your current location">
                                <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors">
                                    Use GPS
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-3">
                                <i data-lucide="alert-triangle" class="h-4 w-4 inline mr-1"></i>
                                Urgency Level
                            </label>
                            <div class="grid grid-cols-3 gap-3">
                                <button type="button" class="urgency-btn p-3 border-2 border-yellow-500 bg-yellow-50 text-yellow-700 rounded-lg text-center font-medium" data-urgency="medium">
                                    <div class="capitalize">Medium</div>
                                    <div class="text-xs opacity-75 mt-1">Need help soon</div>
                                </button>
                                <button type="button" class="urgency-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-center font-medium" data-urgency="low">
                                    <div class="capitalize">Low</div>
                                    <div class="text-xs opacity-75 mt-1">Can wait 30+ min</div>
                                </button>
                                <button type="button" class="urgency-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-center font-medium" data-urgency="high">
                                    <div class="capitalize">High</div>
                                    <div class="text-xs opacity-75 mt-1">Emergency!</div>
                                </button>
                            </div>
                        </div>

                        <div id="fuel-options" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                                <select id="fuel-type" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="regular">Regular (87)</option>
                                    <option value="midgrade">Mid-Grade (89)</option>
                                    <option value="premium">Premium (91+)</option>
                                    <option value="diesel">Diesel</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity (Liters)</label>
                                <div class="flex items-center space-x-3">
                                    <input type="range" id="fuel-quantity" min="5" max="50" value="20" class="flex-1">
                                    <span id="quantity-display" class="bg-gray-100 px-3 py-2 rounded-lg font-medium min-w-16 text-center">20L</span>
                                </div>
                                <div class="flex justify-between text-sm text-gray-500 mt-1">
                                    <span>5L</span>
                                    <span>50L</span>
                                </div>
                            </div>
                        </div>

                        <div id="mechanic-options" class="hidden">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button type="button" class="service-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-left transition-all" data-service="Tire Replacement">Tire Replacement</button>
                                <button type="button" class="service-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-left transition-all" data-service="Battery Jump Start">Battery Jump Start</button>
                                <button type="button" class="service-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-left transition-all" data-service="Engine Won't Start">Engine Won't Start</button>
                                <button type="button" class="service-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-left transition-all" data-service="Flat Tire Repair">Flat Tire Repair</button>
                                <button type="button" class="service-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-left transition-all" data-service="Towing Service">Towing Service</button>
                                <button type="button" class="service-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-left transition-all" data-service="Other">Other (specify in description)</button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                            <textarea id="description" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Any specific instructions..."></textarea>
                        </div>

                        <div class="bg-gray-50 rounded-lg p-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="font-medium text-gray-900">Estimated Cost</h4>
                                    <p class="text-sm text-gray-600">Based on your location and selected options</p>
                                </div>
                                <div class="text-right">
                                    <p id="estimated-cost" class="text-2xl font-bold text-gray-900">₹1,300.00</p>
                                    <p class="text-sm text-gray-600">+ service fee</p>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center">
                            <i data-lucide="clock" class="h-5 w-5 mr-2"></i>
                            Request Service
                            <i data-lucide="arrow-right" class="h-5 w-5 ml-2"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.setupRequestPageListeners();
    }

    setupRequestPageListeners() {
        let activeTab = 'fuel';
        let selectedUrgency = 'medium';
        let selectedService = '';

        // Tab switching
        document.getElementById('fuel-tab').addEventListener('click', () => {
            activeTab = 'fuel';
            this.updateRequestTabs();
        });

        document.getElementById('mechanic-tab').addEventListener('click', () => {
            activeTab = 'mechanic';
            this.updateRequestTabs();
        });

        // Urgency selection
        document.querySelectorAll('.urgency-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedUrgency = btn.dataset.urgency;
                this.updateUrgencyButtons();
            });
        });

        // Service selection
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedService = btn.dataset.service;
                this.updateServiceButtons();
            });
        });

        // Fuel quantity slider
        const quantitySlider = document.getElementById('fuel-quantity');
        const quantityDisplay = document.getElementById('quantity-display');
        
        quantitySlider.addEventListener('input', () => {
            quantityDisplay.textContent = quantitySlider.value + 'L';
            this.updateEstimatedCost();
        });

        // Form submission
        document.getElementById('service-request-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleServiceRequest();
        });

        this.updateRequestTabs = () => {
            const fuelTab = document.getElementById('fuel-tab');
            const mechanicTab = document.getElementById('mechanic-tab');
            const fuelOptions = document.getElementById('fuel-options');
            const mechanicOptions = document.getElementById('mechanic-options');

            if (activeTab === 'fuel') {
                fuelTab.className = 'flex-1 px-6 py-4 text-center font-medium transition-colors text-blue-600 border-b-2 border-blue-600 bg-blue-50';
                mechanicTab.className = 'flex-1 px-6 py-4 text-center font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50';
                fuelOptions.classList.remove('hidden');
                mechanicOptions.classList.add('hidden');
            } else {
                mechanicTab.className = 'flex-1 px-6 py-4 text-center font-medium transition-colors text-green-600 border-b-2 border-green-600 bg-green-50';
                fuelTab.className = 'flex-1 px-6 py-4 text-center font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50';
                mechanicOptions.classList.remove('hidden');
                fuelOptions.classList.add('hidden');
            }
            this.updateEstimatedCost();
        };

        this.updateUrgencyButtons = () => {
            document.querySelectorAll('.urgency-btn').forEach(btn => {
                const urgency = btn.dataset.urgency;
                if (urgency === selectedUrgency) {
                    if (urgency === 'high') {
                        btn.className = 'urgency-btn p-3 border-2 border-red-500 bg-red-50 text-red-700 rounded-lg text-center font-medium';
                    } else if (urgency === 'medium') {
                        btn.className = 'urgency-btn p-3 border-2 border-yellow-500 bg-yellow-50 text-yellow-700 rounded-lg text-center font-medium';
                    } else {
                        btn.className = 'urgency-btn p-3 border-2 border-green-500 bg-green-50 text-green-700 rounded-lg text-center font-medium';
                    }
                } else {
                    btn.className = 'urgency-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-center font-medium';
                }
            });
        };

        this.updateServiceButtons = () => {
            document.querySelectorAll('.service-btn').forEach(btn => {
                if (btn.dataset.service === selectedService) {
                    btn.className = 'service-btn p-3 border-2 border-green-500 bg-green-50 text-green-700 rounded-lg text-left transition-all';
                } else {
                    btn.className = 'service-btn p-3 border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 rounded-lg text-left transition-all';
                }
            });
        };

        this.updateEstimatedCost = () => {
            const costDisplay = document.getElementById('estimated-cost');
            if (activeTab === 'fuel') {
                const quantity = document.getElementById('fuel-quantity').value;
                const cost = quantity * 65; // ₹65 per liter
                costDisplay.textContent = `₹${cost.toFixed(2)}`;
            } else {
                costDisplay.textContent = '₹1,700.00';
            }
        };

        this.handleServiceRequest = () => {
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;
            
            if (!location) {
                alert('Please enter your location');
                return;
            }

            if (activeTab === 'mechanic' && !selectedService) {
                alert('Please select a service type');
                return;
            }

            // Simulate request submission
            alert('Service request submitted successfully! You will be notified when a provider accepts your request.');
            this.navigateTo('dashboard');
        };
    }

    loadAnalyticsPage() {
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Business Analytics</h1>
                            <p class="text-gray-600 mt-1">Track your performance and earnings</p>
                        </div>
                        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>Last Week</option>
                            <option selected>Last Month</option>
                            <option>Last Quarter</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Total Revenue</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">₹2,57,940</p>
                                <p class="text-sm font-medium mt-1 text-green-600">+23% from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="dollar-sign" class="h-6 w-6 text-green-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Total Orders</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">156</p>
                                <p class="text-sm font-medium mt-1 text-green-600">+18% from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="users" class="h-6 w-6 text-blue-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Avg Response Time</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">12 min</p>
                                <p class="text-sm font-medium mt-1 text-green-600">-5 min from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="clock" class="h-6 w-6 text-purple-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Customer Rating</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">4.8</p>
                                <p class="text-sm font-medium mt-1 text-green-600">+0.3 from last month</p>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-50">
                                <i data-lucide="trending-up" class="h-6 w-6 text-yellow-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200 p-6">
                        <h2 class="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div class="flex items-center space-x-4">
                                    <div class="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <i data-lucide="users" class="h-5 w-5 text-gray-600"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-medium text-gray-900">Ramesh Reddy</h4>
                                        <p class="text-sm text-gray-600">Fuel Delivery</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">completed</span>
                                    <div class="text-right">
                                        <p class="font-medium text-gray-900">₹1,310.00</p>
                                        <p class="text-sm text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    }
}

// Initialize navigation manager
window.navigationManager = new NavigationManager();