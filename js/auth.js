// Simple Authentication System
console.log('🔐 Auth system loading...');

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('bropay_users')) || {};
        this.init();
    }

    init() {
        console.log('🔄 Initializing auth system...');
        const savedUser = localStorage.getItem('bropay_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showApp();
        }
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginFormElement');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Signup form
        const signupForm = document.getElementById('signupFormElement');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        console.log('✅ Auth event listeners setup');
    }

    showLogin() {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('signupForm').classList.remove('active');
    }

    showSignup() {
        document.getElementById('signupForm').classList.add('active');
        document.getElementById('loginForm').classList.remove('active');
    }

    async handleLogin(event) {
        event.preventDefault();
        console.log('🔐 Handling login...');
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Show loading
        const btn = event.target.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '🔐 Logging in...';
        btn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (this.authenticateUser(email, password)) {
            this.currentUser = this.users[email];
            localStorage.setItem('bropay_current_user', JSON.stringify(this.currentUser));
            this.showApp();
            alert('✅ Login successful!');
        } else {
            alert('❌ Invalid email or password');
        }

        btn.textContent = originalText;
        btn.disabled = false;
    }

    async handleSignup(event) {
        event.preventDefault();
        console.log('🚀 Handling signup...');
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;

        if (password !== confirm) {
            alert('❌ Passwords do not match');
            return;
        }

        if (this.users[email]) {
            alert('❌ Email already registered');
            return;
        }

        // Show loading
        const btn = event.target.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '🚀 Creating account...';
        btn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create user
        this.users[email] = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString(),
            balances: { USD: 5000.00, BTC: 0, ETH: 0, SOL: 0, AAPL: 0, TSLA: 0, NVDA: 0 }
        };

        localStorage.setItem('bropay_users', JSON.stringify(this.users));
        this.currentUser = this.users[email];
        localStorage.setItem('bropay_current_user', JSON.stringify(this.currentUser));
        
        this.showApp();
        alert('✅ Account created successfully!');
        
        btn.textContent = originalText;
        btn.disabled = false;
    }

    authenticateUser(email, password) {
        const user = this.users[email];
        return user && user.password === password;
    }

    showApp() {
        document.getElementById('authContainer').classList.remove('active');
        document.getElementById('mainApp').classList.add('active');
        
        if (this.currentUser) {
            document.getElementById('userName').textContent = this.currentUser.name;
            document.getElementById('userGreeting').textContent = `Welcome, ${this.currentUser.name.split(' ')[0]}`;
        }
        
        console.log('🏠 App shown');
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('bropay_current_user');
        
        document.getElementById('mainApp').classList.remove('active');
        document.getElementById('authContainer').classList.add('active');
        this.showLogin();
        
        // Clear forms
        document.getElementById('loginFormElement').reset();
        document.getElementById('signupFormElement').reset();
        
        console.log('👋 User logged out');
    }
}

// Global functions
window.showLogin = function() { authSystem.showLogin(); };
window.showSignup = function() { authSystem.showSignup(); };
window.handleLogout = function() { authSystem.handleLogout(); };

// Initialize
const authSystem = new AuthSystem();
console.log('✅ Auth system ready');
