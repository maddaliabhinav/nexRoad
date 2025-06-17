// Authentication functionality
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isLoginMode = true;
        this.mockUsers = [
            {
                id: '1',
                email: 'user@demo.com',
                password: 'demo123',
                name: 'Rajesh Kumar',
                phone: '+91 9876543210',
                userType: 'user',
                location: { lat: 16.3067, lng: 80.4365, address: 'Guntur, Andhra Pradesh' }
            },
            {
                id: '2',
                email: 'gas@demo.com',
                password: 'demo123',
                name: 'Bharat Petroleum',
                phone: '+91 9876543211',
                userType: 'gas_station',
                location: { lat: 16.3100, lng: 80.4400, address: 'Brodipet, Guntur, AP' },
                rating: 4.5,
                isOnline: true
            },
            {
                id: '3',
                email: 'mechanic@demo.com',
                password: 'demo123',
                name: 'Srinivas Auto Works',
                phone: '+91 9876543212',
                userType: 'mechanic',
                location: { lat: 16.3000, lng: 80.4300, address: 'Kothapet, Guntur, AP' },
                rating: 4.8,
                isOnline: true
            }
        ];
        this.init();
    }

    init() {
        // Check for saved user
        const savedUser = localStorage.getItem('nexroad_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainApp();
        } else {
            this.showAuthPage();
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Auth form submission
        document.getElementById('auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuthSubmit();
        });

        // Mode switching
        document.getElementById('auth-mode-switch').addEventListener('click', () => {
            this.toggleAuthMode();
        });

        // Password toggle
        document.getElementById('toggle-password').addEventListener('click', () => {
            this.togglePassword();
        });

        // Demo account buttons
        document.querySelectorAll('.demo-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.fillDemoData(btn.dataset.email, btn.dataset.type);
            });
        });

        // User type change
        document.getElementById('userType').addEventListener('change', () => {
            this.handleUserTypeChange();
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    }

    toggleAuthMode() {
        this.isLoginMode = !this.isLoginMode;
        this.updateAuthUI();
    }

    updateAuthUI() {
        const subtitle = document.getElementById('auth-subtitle');
        const submitBtn = document.getElementById('auth-submit');
        const switchText = document.getElementById('auth-switch-text');
        const switchBtn = document.getElementById('auth-mode-switch');
        const nameField = document.getElementById('name-field');
        const phoneField = document.getElementById('phone-field');
        const businessFields = document.getElementById('business-fields');
        const demoAccounts = document.getElementById('demo-accounts');

        if (this.isLoginMode) {
            subtitle.textContent = 'Welcome back!';
            submitBtn.textContent = 'Sign In';
            switchText.textContent = "Don't have an account?";
            switchBtn.textContent = 'Sign up';
            nameField.classList.add('hidden');
            phoneField.classList.add('hidden');
            businessFields.classList.add('hidden');
            demoAccounts.classList.remove('hidden');
        } else {
            subtitle.textContent = 'Join our service network';
            submitBtn.textContent = 'Create Account';
            switchText.textContent = 'Already have an account?';
            switchBtn.textContent = 'Sign in';
            nameField.classList.remove('hidden');
            phoneField.classList.remove('hidden');
            demoAccounts.classList.add('hidden');
            this.handleUserTypeChange();
        }
    }

    handleUserTypeChange() {
        const userType = document.getElementById('userType').value;
        const businessFields = document.getElementById('business-fields');
        
        if (!this.isLoginMode && userType !== 'user') {
            businessFields.classList.remove('hidden');
        } else {
            businessFields.classList.add('hidden');
        }
    }

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.querySelector('#toggle-password i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.setAttribute('data-lucide', 'eye-off');
        } else {
            passwordInput.type = 'password';
            toggleIcon.setAttribute('data-lucide', 'eye');
        }
        lucide.createIcons();
    }

    fillDemoData(email, type) {
        document.getElementById('email').value = email;
        document.getElementById('password').value = 'demo123';
        document.getElementById('userType').value = type;
    }

    async handleAuthSubmit() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;

        if (this.isLoginMode) {
            const success = await this.login(email, password, userType);
            if (!success) {
                this.showError('Invalid credentials');
            }
        } else {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const businessName = document.getElementById('businessName').value;
            const address = document.getElementById('address').value;

            const userData = {
                email, password, name, phone, userType,
                businessName, address
            };

            const success = await this.signup(userData);
            if (!success) {
                this.showError('Signup failed');
            }
        }
    }

    async login(email, password, userType) {
        const user = this.mockUsers.find(u => 
            u.email === email && u.password === password && u.userType === userType
        );

        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            this.currentUser = userWithoutPassword;
            localStorage.setItem('nexroad_user', JSON.stringify(userWithoutPassword));
            this.showMainApp();
            return true;
        }
        return false;
    }

    async signup(userData) {
        const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            userType: userData.userType,
            location: userData.address ? {
                lat: 16.3067 + Math.random() * 0.01,
                lng: 80.4365 + Math.random() * 0.01,
                address: userData.address
            } : undefined,
            rating: userData.userType !== 'user' ? 5.0 : undefined,
            isOnline: userData.userType !== 'user' ? true : undefined
        };

        this.mockUsers.push({ ...newUser, password: userData.password });
        this.currentUser = newUser;
        localStorage.setItem('nexroad_user', JSON.stringify(newUser));
        this.showMainApp();
        return true;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('nexroad_user');
        this.showAuthPage();
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        const errorText = errorDiv.querySelector('p');
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
        
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    }

    showAuthPage() {
        document.getElementById('auth-page').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
        this.updateAuthUI();
    }

    showMainApp() {
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        
        // Update user info in header
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('user-type').textContent = this.currentUser.userType.replace('_', ' ');
        
        // Initialize navigation and dashboard
        if (window.navigationManager) {
            window.navigationManager.init();
        }
        if (window.dashboardManager) {
            window.dashboardManager.init();
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth manager
window.authManager = new AuthManager();