// Map functionality
class MapManager {
    constructor() {
        this.activeFilter = 'all';
        this.selectedProvider = null;
        this.providers = [
            {
                id: '1',
                name: 'Bharat Petroleum',
                type: 'fuel',
                location: { lat: 16.3100, lng: 80.4400 },
                address: 'Brodipet, Guntur, AP',
                distance: '0.8 km',
                rating: 4.5,
                isOnline: true,
                services: ['Regular', 'Premium', 'Diesel'],
                prices: { regular: 65, premium: 73, diesel: 69 },
                estimatedTime: '10-15 min'
            },
            {
                id: '2',
                name: 'Srinivas Auto Works',
                type: 'mechanic',
                location: { lat: 16.3000, lng: 80.4300 },
                address: 'Kothapet, Guntur, AP',
                distance: '1.2 km',
                rating: 4.8,
                isOnline: true,
                services: ['Tire Replacement', 'Battery Jump', 'Engine Repair'],
                prices: { tire: 2400, battery: 1700, engine: 4000 },
                estimatedTime: '15-20 min'
            },
            {
                id: '3',
                name: 'Indian Oil Station',
                type: 'fuel',
                location: { lat: 16.2950, lng: 80.4450 },
                address: 'Arundelpet, Guntur, AP',
                distance: '1.9 km',
                rating: 4.2,
                isOnline: true,
                services: ['Regular', 'Premium'],
                prices: { regular: 66, premium: 74 },
                estimatedTime: '12-18 min'
            },
            {
                id: '4',
                name: 'Ramesh Motors',
                type: 'mechanic',
                location: { lat: 16.3150, lng: 80.4250 },
                address: 'Lakshmipuram, Guntur, AP',
                distance: '2.1 km',
                rating: 4.6,
                isOnline: false,
                services: ['Emergency Repair', 'Towing', 'Diagnostics'],
                prices: { emergency: 3000, towing: 2000, diagnostics: 1500 },
                estimatedTime: '20-25 min'
            }
        ];
    }

    render() {
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = `
            <div class="h-full">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
                    <!-- Map Area -->
                    <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <h2 class="text-lg font-semibold text-gray-900">Service Providers Near You</h2>
                                <div class="flex items-center space-x-2">
                                    <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                        <i data-lucide="navigation" class="h-5 w-5"></i>
                                    </button>
                                    <div class="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                                        <button id="filter-all" class="px-3 py-1 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm">All</button>
                                        <button id="filter-fuel" class="px-3 py-1 rounded-md text-sm font-medium transition-colors text-gray-600">Fuel</button>
                                        <button id="filter-mechanic" class="px-3 py-1 rounded-md text-sm font-medium transition-colors text-gray-600">Mechanic</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Mock Map -->
                        <div class="relative h-full map-container flex items-center justify-center min-h-[400px]">
                            <div class="absolute inset-0 bg-gray-100 opacity-20"></div>
                            
                            <!-- Your Location -->
                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div class="h-4 w-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                                <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                                    Your Location
                                </div>
                            </div>

                            <!-- Provider Markers -->
                            <div id="map-markers">
                                <!-- Markers will be populated by JavaScript -->
                            </div>

                            <div class="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                                <div class="text-sm text-gray-600">
                                    <div class="flex items-center mb-2">
                                        <div class="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                                        Your Location
                                    </div>
                                    <div class="flex items-center mb-1">
                                        <div class="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                                        Gas Stations
                                    </div>
                                    <div class="flex items-center">
                                        <div class="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                                        Mechanic Shops
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Providers List -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900">
                                Nearby Providers (<span id="provider-count">4</span>)
                            </h3>
                        </div>

                        <div class="overflow-y-auto h-full" id="providers-list">
                            <!-- Providers will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.setupEventListeners();
        this.updateProviders();
        this.updateMapMarkers();
    }

    setupEventListeners() {
        // Filter buttons
        document.getElementById('filter-all').addEventListener('click', () => {
            this.setFilter('all');
        });

        document.getElementById('filter-fuel').addEventListener('click', () => {
            this.setFilter('fuel');
        });

        document.getElementById('filter-mechanic').addEventListener('click', () => {
            this.setFilter('mechanic');
        });
    }

    setFilter(filter) {
        this.activeFilter = filter;
        this.updateFilterButtons();
        this.updateProviders();
        this.updateMapMarkers();
    }

    updateFilterButtons() {
        const buttons = {
            'all': document.getElementById('filter-all'),
            'fuel': document.getElementById('filter-fuel'),
            'mechanic': document.getElementById('filter-mechanic')
        };

        Object.keys(buttons).forEach(key => {
            if (key === this.activeFilter) {
                buttons[key].className = 'px-3 py-1 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm';
            } else {
                buttons[key].className = 'px-3 py-1 rounded-md text-sm font-medium transition-colors text-gray-600';
            }
        });
    }

    getFilteredProviders() {
        return this.providers.filter(provider => 
            this.activeFilter === 'all' || provider.type === this.activeFilter
        );
    }

    updateProviders() {
        const filteredProviders = this.getFilteredProviders();
        const providersList = document.getElementById('providers-list');
        const providerCount = document.getElementById('provider-count');

        providerCount.textContent = filteredProviders.length;

        providersList.innerHTML = '';

        filteredProviders.forEach(provider => {
            const providerElement = document.createElement('div');
            providerElement.className = 'p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors';
            providerElement.innerHTML = `
                <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center space-x-3">
                        <div class="h-10 w-10 rounded-full flex items-center justify-center ${this.getProviderColor(provider.type, provider.isOnline)}">
                            <i data-lucide="${provider.type === 'fuel' ? 'fuel' : 'wrench'}" class="h-5 w-5 ${provider.isOnline ? 'text-white' : 'text-gray-400'}"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900">${provider.name}</h4>
                            <div class="flex items-center space-x-2 text-sm text-gray-600">
                                <i data-lucide="map-pin" class="h-3 w-3"></i>
                                <span>${provider.address}</span>
                                <span>•</span>
                                <span>${provider.distance}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-1">
                        <i data-lucide="star" class="h-4 w-4 text-yellow-400 fill-current"></i>
                        <span class="text-sm font-medium text-gray-900">${provider.rating}</span>
                    </div>
                </div>

                <div class="mb-3">
                    <div class="flex flex-wrap gap-1 mb-2">
                        ${provider.services.slice(0, 2).map(service => 
                            `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">${service}</span>`
                        ).join('')}
                        ${provider.services.length > 2 ? 
                            `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">+${provider.services.length - 2} more</span>` : ''
                        }
                    </div>
                    
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">ETA: ${provider.estimatedTime}</span>
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${provider.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                            ${provider.isOnline ? 'Available' : 'Offline'}
                        </span>
                    </div>
                </div>

                ${provider.isOnline ? `
                    <div class="flex space-x-2">
                        <button class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            Request Service
                        </button>
                        <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i data-lucide="phone" class="h-4 w-4"></i>
                        </button>
                        <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i data-lucide="message-circle" class="h-4 w-4"></i>
                        </button>
                    </div>
                ` : ''}
            `;

            providersList.appendChild(providerElement);
        });

        lucide.createIcons();
    }

    updateMapMarkers() {
        const filteredProviders = this.getFilteredProviders();
        const markersContainer = document.getElementById('map-markers');

        markersContainer.innerHTML = '';

        filteredProviders.forEach((provider, index) => {
            const marker = document.createElement('div');
            marker.className = `map-marker`;
            marker.style.top = `${30 + index * 15}%`;
            marker.style.left = `${25 + index * 20}%`;
            
            marker.innerHTML = `
                <div class="h-10 w-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${this.getProviderColor(provider.type, provider.isOnline)}">
                    <i data-lucide="${provider.type === 'fuel' ? 'fuel' : 'wrench'}" class="h-5 w-5 ${provider.isOnline ? 'text-white' : 'text-gray-400'}"></i>
                </div>
                
                ${this.selectedProvider === provider.id ? `
                    <div class="map-tooltip">
                        <div class="text-sm">
                            <h4 class="font-semibold text-gray-900">${provider.name}</h4>
                            <p class="text-gray-600">${provider.distance} away</p>
                            <div class="flex items-center mt-1">
                                <i data-lucide="star" class="h-3 w-3 text-yellow-400 fill-current mr-1"></i>
                                <span class="text-gray-600">${provider.rating}</span>
                                <span class="ml-2 px-2 py-0.5 rounded-full text-xs ${provider.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                    ${provider.isOnline ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        </div>
                    </div>
                ` : ''}
            `;

            marker.addEventListener('click', () => {
                this.selectedProvider = this.selectedProvider === provider.id ? null : provider.id;
                this.updateMapMarkers();
            });

            markersContainer.appendChild(marker);
        });

        lucide.createIcons();
    }

    getProviderColor(type, isOnline) {
        if (!isOnline) return 'bg-gray-400';
        return type === 'fuel' ? 'bg-blue-500' : 'bg-green-500';
    }
}

// Initialize map manager
window.mapManager = new MapManager();