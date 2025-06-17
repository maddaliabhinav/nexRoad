// Services management functionality
class ServicesManager {
    constructor() {
        this.fuelServices = [
            {
                id: '1',
                fuelType: 'Regular (87)',
                pricePerLiter: 65,
                isAvailable: true,
                deliveryRadius: 10,
                estimatedTime: '15-20 min'
            },
            {
                id: '2',
                fuelType: 'Premium (91+)',
                pricePerLiter: 73,
                isAvailable: true,
                deliveryRadius: 10,
                estimatedTime: '15-20 min'
            },
            {
                id: '3',
                fuelType: 'Diesel',
                pricePerLiter: 69,
                isAvailable: false,
                deliveryRadius: 8,
                estimatedTime: '20-25 min'
            }
        ];

        this.mechanicServices = [
            {
                id: '1',
                serviceName: 'Tire Replacement',
                basePrice: 2400,
                isAvailable: true,
                serviceRadius: 15,
                estimatedTime: '30-45 min',
                description: 'Complete tire replacement service'
            },
            {
                id: '2',
                serviceName: 'Battery Jump Start',
                basePrice: 1700,
                isAvailable: true,
                serviceRadius: 20,
                estimatedTime: '15-20 min',
                description: 'Emergency battery jump start'
            },
            {
                id: '3',
                serviceName: 'Engine Diagnostics',
                basePrice: 3000,
                isAvailable: true,
                serviceRadius: 12,
                estimatedTime: '45-60 min',
                description: 'Complete engine diagnostic scan'
            },
            {
                id: '4',
                serviceName: 'Towing Service',
                basePrice: 4000,
                isAvailable: false,
                serviceRadius: 25,
                estimatedTime: '20-30 min',
                description: 'Emergency vehicle towing'
            }
        ];
    }

    renderFuelServices() {
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = `
            <div class="space-y-6">
                <!-- Header -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Fuel Services Management</h1>
                            <p class="text-gray-600 mt-1">Manage your fuel types, pricing, and availability</p>
                        </div>
                        <button id="add-fuel-service-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                            <i data-lucide="plus" class="h-4 w-4 mr-2"></i>
                            Add Fuel Type
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-blue-100 rounded-lg">
                                <i data-lucide="fuel" class="h-6 w-6 text-blue-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Services</p>
                                <p class="text-2xl font-bold text-gray-900">${this.fuelServices.length}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-green-100 rounded-lg">
                                <i data-lucide="toggle-right" class="h-6 w-6 text-green-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Available</p>
                                <p class="text-2xl font-bold text-gray-900">${this.fuelServices.filter(s => s.isAvailable).length}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-yellow-100 rounded-lg">
                                <i data-lucide="dollar-sign" class="h-6 w-6 text-yellow-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Avg. Price</p>
                                <p class="text-2xl font-bold text-gray-900">₹${(this.fuelServices.reduce((sum, s) => sum + s.pricePerLiter, 0) / this.fuelServices.length).toFixed(0)}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-purple-100 rounded-lg">
                                <i data-lucide="map-pin" class="h-6 w-6 text-purple-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Max Radius</p>
                                <p class="text-2xl font-bold text-gray-900">${Math.max(...this.fuelServices.map(s => s.deliveryRadius))} km</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Services List -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200 p-6">
                        <h2 class="text-xl font-semibold text-gray-900">Fuel Services</h2>
                    </div>

                    <div class="p-6">
                        <div class="space-y-4" id="fuel-services-list">
                            <!-- Services will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.updateFuelServicesList();
        this.setupFuelServicesListeners();
    }

    renderMechanicServices() {
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = `
            <div class="space-y-6">
                <!-- Header -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Mechanic Services Management</h1>
                            <p class="text-gray-600 mt-1">Manage your mechanical services, pricing, and availability</p>
                        </div>
                        <button id="add-mechanic-service-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
                            <i data-lucide="plus" class="h-4 w-4 mr-2"></i>
                            Add Service
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-green-100 rounded-lg">
                                <i data-lucide="wrench" class="h-6 w-6 text-green-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Services</p>
                                <p class="text-2xl font-bold text-gray-900">${this.mechanicServices.length}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-blue-100 rounded-lg">
                                <i data-lucide="toggle-right" class="h-6 w-6 text-blue-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Available</p>
                                <p class="text-2xl font-bold text-gray-900">${this.mechanicServices.filter(s => s.isAvailable).length}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-yellow-100 rounded-lg">
                                <i data-lucide="dollar-sign" class="h-6 w-6 text-yellow-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Avg. Price</p>
                                <p class="text-2xl font-bold text-gray-900">₹${(this.mechanicServices.reduce((sum, s) => sum + s.basePrice, 0) / this.mechanicServices.length).toFixed(0)}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="p-3 bg-purple-100 rounded-lg">
                                <i data-lucide="map-pin" class="h-6 w-6 text-purple-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Max Radius</p>
                                <p class="text-2xl font-bold text-gray-900">${Math.max(...this.mechanicServices.map(s => s.serviceRadius))} km</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Services List -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200 p-6">
                        <h2 class="text-xl font-semibold text-gray-900">Mechanical Services</h2>
                    </div>

                    <div class="p-6">
                        <div class="space-y-4" id="mechanic-services-list">
                            <!-- Services will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.updateMechanicServicesList();
        this.setupMechanicServicesListeners();
    }

    updateFuelServicesList() {
        const servicesList = document.getElementById('fuel-services-list');
        servicesList.innerHTML = '';

        this.fuelServices.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'border border-gray-200 rounded-lg p-4';
            serviceElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="p-3 bg-blue-100 rounded-lg">
                            <i data-lucide="fuel" class="h-6 w-6 text-blue-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900">${service.fuelType}</h3>
                            <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <div class="flex items-center">
                                    <i data-lucide="dollar-sign" class="h-4 w-4 mr-1"></i>
                                    ₹${service.pricePerLiter.toFixed(2)}/L
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                                    ${service.deliveryRadius} km radius
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="h-4 w-4 mr-1"></i>
                                    ${service.estimatedTime}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center space-x-3">
                        <div class="toggle-switch ${service.isAvailable ? 'active' : 'inactive'}" data-service-id="${service.id}" data-type="fuel">
                            <span class="toggle-switch-handle"></span>
                        </div>
                        <button class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <i data-lucide="edit" class="h-5 w-5"></i>
                        </button>
                        <button class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" data-delete-id="${service.id}" data-type="fuel">
                            <i data-lucide="trash-2" class="h-5 w-5"></i>
                        </button>
                    </div>
                </div>
            `;

            servicesList.appendChild(serviceElement);
        });

        lucide.createIcons();
    }

    updateMechanicServicesList() {
        const servicesList = document.getElementById('mechanic-services-list');
        servicesList.innerHTML = '';

        this.mechanicServices.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'border border-gray-200 rounded-lg p-4';
            serviceElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="p-3 bg-green-100 rounded-lg">
                            <i data-lucide="wrench" class="h-6 w-6 text-green-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900">${service.serviceName}</h3>
                            <p class="text-sm text-gray-600 mb-1">${service.description}</p>
                            <div class="flex items-center space-x-4 text-sm text-gray-600">
                                <div class="flex items-center">
                                    <i data-lucide="dollar-sign" class="h-4 w-4 mr-1"></i>
                                    ₹${service.basePrice} base
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="map-pin" class="h-4 w-4 mr-1"></i>
                                    ${service.serviceRadius} km radius
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="h-4 w-4 mr-1"></i>
                                    ${service.estimatedTime}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center space-x-3">
                        <div class="toggle-switch ${service.isAvailable ? 'active' : 'inactive'}" data-service-id="${service.id}" data-type="mechanic">
                            <span class="toggle-switch-handle"></span>
                        </div>
                        <button class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <i data-lucide="edit" class="h-5 w-5"></i>
                        </button>
                        <button class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" data-delete-id="${service.id}" data-type="mechanic">
                            <i data-lucide="trash-2" class="h-5 w-5"></i>
                        </button>
                    </div>
                </div>
            `;

            servicesList.appendChild(serviceElement);
        });

        lucide.createIcons();
    }

    setupFuelServicesListeners() {
        // Add service button
        document.getElementById('add-fuel-service-btn').addEventListener('click', () => {
            this.showAddFuelServiceModal();
        });

        // Toggle switches and delete buttons
        this.setupServiceListeners('fuel');
    }

    setupMechanicServicesListeners() {
        // Add service button
        document.getElementById('add-mechanic-service-btn').addEventListener('click', () => {
            this.showAddMechanicServiceModal();
        });

        // Toggle switches and delete buttons
        this.setupServiceListeners('mechanic');
    }

    setupServiceListeners(type) {
        // Toggle switches
        document.querySelectorAll(`.toggle-switch[data-type="${type}"]`).forEach(toggle => {
            toggle.addEventListener('click', () => {
                const serviceId = toggle.dataset.serviceId;
                this.toggleServiceAvailability(serviceId, type, toggle);
            });
        });

        // Delete buttons
        document.querySelectorAll(`[data-delete-id][data-type="${type}"]`).forEach(btn => {
            btn.addEventListener('click', () => {
                const serviceId = btn.dataset.deleteId;
                this.deleteService(serviceId, type);
            });
        });
    }

    toggleServiceAvailability(serviceId, type, toggleElement) {
        const services = type === 'fuel' ? this.fuelServices : this.mechanicServices;
        const service = services.find(s => s.id === serviceId);
        
        if (service) {
            service.isAvailable = !service.isAvailable;
            
            if (service.isAvailable) {
                toggleElement.classList.add('active');
                toggleElement.classList.remove('inactive');
            } else {
                toggleElement.classList.remove('active');
                toggleElement.classList.add('inactive');
            }
        }
    }

    deleteService(serviceId, type) {
        if (confirm('Are you sure you want to delete this service?')) {
            if (type === 'fuel') {
                this.fuelServices = this.fuelServices.filter(s => s.id !== serviceId);
                this.updateFuelServicesList();
            } else {
                this.mechanicServices = this.mechanicServices.filter(s => s.id !== serviceId);
                this.updateMechanicServicesList();
            }
        }
    }

    showAddFuelServiceModal() {
        // Create and show modal for adding fuel service
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Fuel Service</h3>
                
                <form id="add-fuel-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                        <input type="text" id="fuel-type" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Regular (87)">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Price per Liter (₹)</label>
                        <input type="number" step="0.01" id="fuel-price" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="65.00">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (km)</label>
                        <input type="number" id="fuel-radius" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="10">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery Time</label>
                        <input type="text" id="fuel-time" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="15-20 min">
                    </div>

                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Add Service
                        </button>
                        <button type="button" id="cancel-fuel-modal" class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup modal listeners
        document.getElementById('add-fuel-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFuelService();
            document.body.removeChild(modal);
        });

        document.getElementById('cancel-fuel-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    showAddMechanicServiceModal() {
        // Create and show modal for adding mechanic service
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Mechanical Service</h3>
                
                <form id="add-mechanic-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                        <input type="text" id="mechanic-name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="e.g., Brake Repair">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Base Price (₹)</label>
                        <input type="number" id="mechanic-price" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="3000">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Service Radius (km)</label>
                        <input type="number" id="mechanic-radius" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="15">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                        <input type="text" id="mechanic-time" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="30-45 min">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea id="mechanic-description" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Brief description of the service" rows="3"></textarea>
                    </div>

                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Add Service
                        </button>
                        <button type="button" id="cancel-mechanic-modal" class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup modal listeners
        document.getElementById('add-mechanic-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addMechanicService();
            document.body.removeChild(modal);
        });

        document.getElementById('cancel-mechanic-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    addFuelService() {
        const newService = {
            id: Date.now().toString(),
            fuelType: document.getElementById('fuel-type').value,
            pricePerLiter: parseFloat(document.getElementById('fuel-price').value),
            deliveryRadius: parseInt(document.getElementById('fuel-radius').value),
            estimatedTime: document.getElementById('fuel-time').value,
            isAvailable: true
        };

        this.fuelServices.push(newService);
        this.updateFuelServicesList();
        this.setupFuelServicesListeners();
    }

    addMechanicService() {
        const newService = {
            id: Date.now().toString(),
            serviceName: document.getElementById('mechanic-name').value,
            basePrice: parseInt(document.getElementById('mechanic-price').value),
            serviceRadius: parseInt(document.getElementById('mechanic-radius').value),
            estimatedTime: document.getElementById('mechanic-time').value,
            description: document.getElementById('mechanic-description').value,
            isAvailable: true
        };

        this.mechanicServices.push(newService);
        this.updateMechanicServicesList();
        this.setupMechanicServicesListeners();
    }
}

// Initialize services manager
window.servicesManager = new ServicesManager();