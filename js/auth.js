// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('bropay_users')) || {};
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('bropay_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showApp();
        }
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
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simulate AI authentication
        this.showLoading('AI face recognition...');
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (this.authenticateUser(email, password)) {
            this.currentUser = this.users[email];
            localStorage.setItem('bropay_current_user', JSON.stringify(this.currentUser));
            this.showApp();
            bropay.logActivity('Security', `User ${email} logged in securely`);
        } else {
            this.showError('Invalid email or password');
        }
    }

    async handleSignup(event) {
        event.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;

        if (password !== confirm) {
            this.showError('Passwords do not match');
            return;
        }

        if (this.users[email]) {
            this.showError('Email already registered');
            return;
        }

        // Simulate AI account creation
        this.showLoading('Creating secure account with AI...');
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create new user
        this.users[email] = {
            name: name,
            email: email,
            password: password, // In real app, this would be hashed
            createdAt: new Date().toISOString(),
            balances: {
                USD: 5000.00, // Starting balance
                BTC: 0,
                ETH: 0,
                SOL: 0,
                AAPL: 0,
                TSLA: 0,
                NVDA: 0
            }
        };

        localStorage.setItem('bropay_users', JSON.stringify(this.users));
        
        this.currentUser = this.users[email];
        localStorage.setItem('bropay_current_user', JSON.stringify(this.currentUser));
        
        this.showApp();
        bropay.logActivity('System', `New account created for ${name}`);
    }

    authenticateUser(email, password) {
        const user = this.users[email];
        return user && user.password === password;
    }

    showApp() {
        document.getElementById('authContainer').classList.remove('active');
        document.getElementById('mainApp').classList.add('active');
        
        // Update UI with user data
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('userGreeting').textContent = `Welcome, ${this.currentUser.name.split(' ')[0]}`;
        
        // Initialize BROpay with user data
        if (window.bropay) {
            bropay.setUserData(this.currentUser);
        }
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('bropay_current_user');
        
        document.getElementById('mainApp').classList.remove('active');
        document.getElementById('authContainer').classList.add('active');
        this.showLogin();
        
        // Clear forms
        document.getElementById('loginForm').reset();
        document.getElementById('signupForm').reset();
    }

    showLoading(message) {
        // Simple loading indicator
        const btn = event.target.querySelector('button[type="submit"]') || event.target;
        const originalText = btn.textContent;
        btn.textContent = message;
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }

    showError(message) {
        alert(`❌ ${message}`); // In production, use a proper toast/notification
    }
}

// Global functions for HTML
function showLogin() {
    authSystem.showLogin();
}

function showSignup() {
    authSystem.showSignup();
}

function handleLogin(event) {
    authSystem.handleLogin(event);
}

function handleSignup(event) {
    authSystem.handleSignup(event);
}

function handleLogout() {
    authSystem.handleLogout();
}

// Initialize auth system
const authSystem = new AuthSystem();
