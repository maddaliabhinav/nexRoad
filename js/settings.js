// Settings functionality
class SettingsManager {
    constructor() {
        this.settings = {
            notifications: {
                email: true,
                push: true,
                sms: false,
                marketing: false
            },
            privacy: {
                profileVisible: true,
                locationSharing: true,
                activityStatus: true
            },
            preferences: {
                language: 'en',
                currency: 'INR',
                theme: 'light',
                autoAccept: false
            }
        };
    }

    render() {
        const user = window.authManager.getCurrentUser();
        const contentDiv = document.getElementById('page-content');
        
        contentDiv.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-6">
                <!-- Settings Header -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p class="text-gray-600">Manage your account preferences and privacy settings</p>
                </div>

                <!-- Notification Settings -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">
                        <i data-lucide="bell" class="h-5 w-5 inline mr-2"></i>
                        Notification Preferences
                    </h2>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-900">Email Notifications</h3>
                                <p class="text-sm text-gray-600">Receive notifications via email</p>
                            </div>
                            <div class="toggle-switch ${this.settings.notifications.email ? 'active' : 'inactive'}" data-setting="notifications.email">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-900">Push Notifications</h3>
                                <p class="text-sm text-gray-600">Receive push notifications on your device</p>
                            </div>
                            <div class="toggle-switch ${this.settings.notifications.push ? 'active' : 'inactive'}" data-setting="notifications.push">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-900">SMS Notifications</h3>
                                <p class="text-sm text-gray-600">Receive important updates via SMS</p>
                            </div>
                            <div class="toggle-switch ${this.settings.notifications.sms ? 'active' : 'inactive'}" data-setting="notifications.sms">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-900">Marketing Communications</h3>
                                <p class="text-sm text-gray-600">Receive promotional offers and updates</p>
                            </div>
                            <div class="toggle-switch ${this.settings.notifications.marketing ? 'active' : 'inactive'}" data-setting="notifications.marketing">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Privacy Settings -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">
                        <i data-lucide="shield" class="h-5 w-5 inline mr-2"></i>
                        Privacy & Security
                    </h2>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-900">Profile Visibility</h3>
                                <p class="text-sm text-gray-600">Make your profile visible to other users</p>
                            </div>
                            <div class="toggle-switch ${this.settings.privacy.profileVisible ? 'active' : 'inactive'}" data-setting="privacy.profileVisible">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-900">Location Sharing</h3>
                                <p class="text-sm text-gray-600">Share your location with service providers</p>
                            </div>
                            <div class="toggle-switch ${this.settings.privacy.locationSharing ? 'active' : 'inactive'}" data-setting="privacy.locationSharing">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-900">Activity Status</h3>
                                <p class="text-sm text-gray-600">Show when you're online or offline</p>
                            </div>
                            <div class="toggle-switch ${this.settings.privacy.activityStatus ? 'active' : 'inactive'}" data-setting="privacy.activityStatus">
                                <span class="toggle-switch-handle"></span>
                            </div>
                        </div>
                        
                        <div class="pt-4 border-t border-gray-200">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                <i data-lucide="key" class="h-4 w-4 inline mr-2"></i>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                <!-- App Preferences -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">
                        <i data-lucide="settings" class="h-5 w-5 inline mr-2"></i>
                        App Preferences
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <select id="language-select" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="en" ${this.settings.preferences.language === 'en' ? 'selected' : ''}>English</option>
                                <option value="hi" ${this.settings.preferences.language === 'hi' ? 'selected' : ''}>हिंदी (Hindi)</option>
                                <option value="te" ${this.settings.preferences.language === 'te' ? 'selected' : ''}>తెలుగు (Telugu)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <select id="currency-select" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="INR" ${this.settings.preferences.currency === 'INR' ? 'selected' : ''}>₹ Indian Rupee (INR)</option>
                                <option value="USD" ${this.settings.preferences.currency === 'USD' ? 'selected' : ''}>$ US Dollar (USD)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                            <select id="theme-select" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="light" ${this.settings.preferences.theme === 'light' ? 'selected' : ''}>Light</option>
                                <option value="dark" ${this.settings.preferences.theme === 'dark' ? 'selected' : ''}>Dark</option>
                                <option value="auto" ${this.settings.preferences.theme === 'auto' ? 'selected' : ''}>Auto</option>
                            </select>
                        </div>
                        
                        ${user.userType !== 'user' ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Auto-Accept Requests</label>
                                <div class="flex items-center space-x-3">
                                    <div class="toggle-switch ${this.settings.preferences.autoAccept ? 'active' : 'inactive'}" data-setting="preferences.autoAccept">
                                        <span class="toggle-switch-handle"></span>
                                    </div>
                                    <span class="text-sm text-gray-600">Automatically accept service requests</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Account Management -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">
                        <i data-lucide="user-cog" class="h-5 w-5 inline mr-2"></i>
                        Account Management
                    </h2>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 class="font-medium text-gray-900">Export Data</h3>
                                <p class="text-sm text-gray-600">Download a copy of your account data</p>
                            </div>
                            <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                <i data-lucide="download" class="h-4 w-4 inline mr-2"></i>
                                Export
                            </button>
                        </div>
                        
                        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 class="font-medium text-gray-900">Deactivate Account</h3>
                                <p class="text-sm text-gray-600">Temporarily disable your account</p>
                            </div>
                            <button class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-medium hover:bg-yellow-200 transition-colors">
                                <i data-lucide="pause" class="h-4 w-4 inline mr-2"></i>
                                Deactivate
                            </button>
                        </div>
                        
                        <div class="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                            <div>
                                <h3 class="font-medium text-red-900">Delete Account</h3>
                                <p class="text-sm text-red-600">Permanently delete your account and all data</p>
                            </div>
                            <button class="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                <i data-lucide="trash-2" class="h-4 w-4 inline mr-2"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Save Settings -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="font-medium text-gray-900">Save Changes</h3>
                            <p class="text-sm text-gray-600">Your settings are automatically saved</p>
                        </div>
                        <button id="save-settings-btn" class="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <i data-lucide="check" class="h-4 w-4 inline mr-2"></i>
                            Save All Settings
                        </button>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Toggle switches
        document.querySelectorAll('.toggle-switch').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const setting = toggle.dataset.setting;
                this.toggleSetting(setting, toggle);
            });
        });

        // Select dropdowns
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.settings.preferences.language = e.target.value;
        });

        document.getElementById('currency-select').addEventListener('change', (e) => {
            this.settings.preferences.currency = e.target.value;
        });

        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.settings.preferences.theme = e.target.value;
        });

        // Save button
        document.getElementById('save-settings-btn').addEventListener('click', () => {
            this.saveSettings();
        });
    }

    toggleSetting(settingPath, toggleElement) {
        const keys = settingPath.split('.');
        let current = this.settings;
        
        // Navigate to the setting
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Toggle the value
        const finalKey = keys[keys.length - 1];
        current[finalKey] = !current[finalKey];
        
        // Update UI
        if (current[finalKey]) {
            toggleElement.classList.add('active');
            toggleElement.classList.remove('inactive');
        } else {
            toggleElement.classList.remove('active');
            toggleElement.classList.add('inactive');
        }
    }

    saveSettings() {
        // Save settings to localStorage
        localStorage.setItem('nexroad_settings', JSON.stringify(this.settings));
        
        // Show success message
        alert('Settings saved successfully!');
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('nexroad_settings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }
}

// Initialize settings manager
window.settingsManager = new SettingsManager();