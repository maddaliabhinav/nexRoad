// Profile functionality
class ProfileManager {
    constructor() {
        this.isEditing = false;
    }

    render() {
        const user = window.authManager.getCurrentUser();
        const contentDiv = document.getElementById('page-content');
        
        contentDiv.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-6">
                <!-- Profile Header -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
                    <div class="relative px-6 pb-6">
                        <div class="flex items-end space-x-4 -mt-16">
                            <div class="h-24 w-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                <i data-lucide="user" class="h-12 w-12 text-gray-600"></i>
                            </div>
                            <div class="pb-2">
                                <h1 class="text-2xl font-bold text-gray-900">${user.name}</h1>
                                <p class="text-gray-600 capitalize">${user.userType.replace('_', ' ')}</p>
                                ${user.rating ? `
                                    <div class="flex items-center mt-1">
                                        <i data-lucide="star" class="h-4 w-4 text-yellow-400 fill-current mr-1"></i>
                                        <span class="text-sm font-medium text-gray-900">${user.rating}</span>
                                        <span class="text-sm text-gray-500 ml-1">(${Math.floor(Math.random() * 100) + 50} reviews)</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="mt-4 flex justify-end">
                            <button id="edit-profile-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                <i data-lucide="edit" class="h-4 w-4 inline mr-2"></i>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Profile Information -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Personal Information -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" id="profile-name" value="${user.name}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" readonly>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" id="profile-email" value="${user.email}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" readonly>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" id="profile-phone" value="${user.phone}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" readonly>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                                <input type="text" value="${user.userType.replace('_', ' ')}" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" readonly>
                            </div>
                        </div>
                    </div>

                    <!-- Location & Business Info -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">
                            ${user.userType === 'user' ? 'Location Information' : 'Business Information'}
                        </h2>
                        
                        <div class="space-y-4">
                            ${user.location ? `
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input type="text" id="profile-address" value="${user.location.address}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" readonly>
                                </div>
                            ` : ''}
                            
                            ${user.userType !== 'user' ? `
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                                    <input type="text" id="profile-business" value="${user.name}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" readonly>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Service Radius</label>
                                    <input type="text" value="15 km" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" readonly>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <div class="flex items-center space-x-2">
                                        <span class="px-3 py-1 rounded-full text-sm font-medium ${user.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                            ${user.isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Statistics (for providers) -->
                ${user.userType !== 'user' ? `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Performance Statistics</h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600">156</div>
                                <div class="text-sm text-gray-600">Total Services</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">₹57,094</div>
                                <div class="text-sm text-gray-600">Total Earnings</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-yellow-600">${user.rating}</div>
                                <div class="text-sm text-gray-600">Average Rating</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-purple-600">8 min</div>
                                <div class="text-sm text-gray-600">Avg Response</div>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Recent Activity -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    
                    <div class="space-y-4">
                        ${user.userType === 'user' ? `
                            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div class="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i data-lucide="fuel" class="h-4 w-4 text-blue-600"></i>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-900">Fuel delivery completed</p>
                                    <p class="text-xs text-gray-500">2 hours ago • ₹1,300.00</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div class="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <i data-lucide="wrench" class="h-4 w-4 text-green-600"></i>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-900">Tire replacement service</p>
                                    <p class="text-xs text-gray-500">1 day ago • ₹2,400.00</p>
                                </div>
                            </div>
                        ` : `
                            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div class="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <i data-lucide="check-circle" class="h-4 w-4 text-green-600"></i>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-900">Service completed for Rajesh Kumar</p>
                                    <p class="text-xs text-gray-500">1 hour ago • ₹1,900.00</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div class="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i data-lucide="user-plus" class="h-4 w-4 text-blue-600"></i>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-900">New service request accepted</p>
                                    <p class="text-xs text-gray-500">3 hours ago • Priya Sharma</p>
                                </div>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Action Buttons -->
                <div id="profile-actions" class="hidden bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex space-x-4">
                        <button id="save-profile-btn" class="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <i data-lucide="check" class="h-4 w-4 inline mr-2"></i>
                            Save Changes
                        </button>
                        <button id="cancel-edit-btn" class="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            <i data-lucide="x" class="h-4 w-4 inline mr-2"></i>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const editBtn = document.getElementById('edit-profile-btn');
        const saveBtn = document.getElementById('save-profile-btn');
        const cancelBtn = document.getElementById('cancel-edit-btn');

        editBtn.addEventListener('click', () => {
            this.toggleEditMode(true);
        });

        saveBtn.addEventListener('click', () => {
            this.saveProfile();
        });

        cancelBtn.addEventListener('click', () => {
            this.toggleEditMode(false);
        });
    }

    toggleEditMode(editing) {
        this.isEditing = editing;
        
        const inputs = ['profile-name', 'profile-email', 'profile-phone', 'profile-address', 'profile-business'];
        const editBtn = document.getElementById('edit-profile-btn');
        const actionsDiv = document.getElementById('profile-actions');

        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.readOnly = !editing;
                if (editing) {
                    input.classList.remove('bg-gray-50', 'text-gray-500');
                    input.classList.add('bg-white');
                } else {
                    input.classList.add('bg-gray-50', 'text-gray-500');
                    input.classList.remove('bg-white');
                }
            }
        });

        if (editing) {
            editBtn.classList.add('hidden');
            actionsDiv.classList.remove('hidden');
        } else {
            editBtn.classList.remove('hidden');
            actionsDiv.classList.add('hidden');
        }
    }

    saveProfile() {
        const updatedData = {
            name: document.getElementById('profile-name').value,
            email: document.getElementById('profile-email').value,
            phone: document.getElementById('profile-phone').value,
        };

        const addressInput = document.getElementById('profile-address');
        if (addressInput) {
            updatedData.location = {
                ...window.authManager.getCurrentUser().location,
                address: addressInput.value
            };
        }

        window.authManager.updateUser(updatedData);
        this.toggleEditMode(false);
        
        // Show success message
        alert('Profile updated successfully!');
    }
}

// Initialize profile manager
window.profileManager = new ProfileManager();