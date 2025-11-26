class BROpay {
    constructor() {
        this.currentUser = null;
        this.balances = {
            USD: 8120.45,
            BTC: 0.42,
            ETH: 0,
            SOL: 0,
            AAPL: 0,
            TSLA: 0,
            NVDA: 0
        };
        
        this.prices = {
            BTC: 45123.50,
            ETH: 3250.75,
            SOL: 102.45,
            AAPL: 182.63,
            TSLA: 245.18,
            NVDA: 495.22
        };
        
        this.activityLog = [];
        this.init();
    }

    init() {
        console.log('🚀 BROpay initialized - Secured by bedusec AI');
        this.setupEventListeners();
        this.simulateAISecurity();
        this.updateUI();
        this.logActivity('System', 'BROpay AI Security initialized');
    }

    setupEventListeners() {
        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        const modal = document.getElementById('loginModal');
        const closeBtn = document.querySelector('.close');
        const loginForm = document.getElementById('loginForm');

        loginBtn.addEventListener('click', () => this.showModal());
        closeBtn.addEventListener('click', () => this.hideModal());
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal();
            }
        });

        // Navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.showSection(target);
            });
        });
    }

    showModal() {
        document.getElementById('loginModal').style.display = 'block';
    }

    hideModal() {
        document.getElementById('loginModal').style.display = 'none';
    }

    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username') || 'demo';
        const password = formData.get('password') || 'demo';

        // Simulate AI authentication
        this.logActivity('Security', 'AI face recognition in progress...');
        
        await this.simulateAIAuth();
        
        this.currentUser = username;
        document.getElementById('userName').textContent = username;
        this.hideModal();
        this.showSection('dashboard');
        this.logActivity('System', `User ${username} logged in securely`);
    }

    async simulateAIAuth() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('🤖 AI Authentication: Biometric verification successful');
                resolve();
            }, 2000);
        });
    }

    simulateAISecurity() {
        setInterval(() => {
            const threats = ['Malware Scan', 'Network Analysis', 'Behavior Monitoring'];
            const randomThreat = threats[Math.floor(Math.random() * threats.length)];
            console.log(`🛡️ AI Security: ${randomThreat} - All clear`);
        }, 10000);
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        document.getElementById(sectionName).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = link.getAttribute('href') === `#${sectionName}` ? '#00d4aa' : '#ffffff';
        });
    }

    updateUI() {
        // Update total balance
        const total = this.calculateTotalBalance();
        document.getElementById('totalBalance').textContent = `$${total.toLocaleString()}`;
        
        // Update activity feed
        this.updateActivityFeed();
    }

    calculateTotalBalance() {
        let total = this.balances.USD;
        total += this.balances.BTC * this.prices.BTC;
        total += this.balances.ETH * this.prices.ETH;
        total += this.balances.SOL * this.prices.SOL;
        total += this.balances.AAPL * this.prices.AAPL;
        total += this.balances.TSLA * this.prices.TSLA;
        total += this.balances.NVDA * this.prices.NVDA;
        return Math.round(total * 100) / 100;
    }

    // Crypto Trading
    selectCrypto(symbol, price) {
        document.getElementById('selectedCrypto').textContent = symbol;
        document.getElementById('cryptoAmount').placeholder = `Amount in ${symbol}`;
        this.logActivity('Trading', `Selected ${symbol} for trading at $${price}`);
    }

    async executeTrade(action) {
        const symbol = document.getElementById('selectedCrypto').textContent;
        const amount = parseFloat(document.getElementById('cryptoAmount').value);
        
        if (!amount || amount <= 0) {
            this.showTradeResult('Please enter a valid amount', 'error');
            return;
        }

        const price = this.prices[symbol];
        const cost = amount * price;

        if (action === 'buy' && cost > this.balances.USD) {
            this.showTradeResult('Insufficient USD balance', 'error');
            return;
        }

        if (action === 'sell' && amount > this.balances[symbol]) {
            this.showTradeResult(`Insufficient ${symbol} balance`, 'error');
            return;
        }

        // Simulate AI trade analysis
        this.logActivity('AI Analysis', `Analyzing ${action} order for ${amount} ${symbol}...`);
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (action === 'buy') {
            this.balances.USD -= cost;
            this.balances[symbol] += amount;
            this.showTradeResult(`Successfully bought ${amount} ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Bought ${amount} ${symbol} for $${cost.toFixed(2)}`);
        } else {
            this.balances.USD += cost;
            this.balances[symbol] -= amount;
            this.showTradeResult(`Successfully sold ${amount} ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Sold ${amount} ${symbol} for $${cost.toFixed(2)}`);
        }

        this.updateUI();
        document.getElementById('cryptoAmount').value = '';
    }

    // Stock Trading
    selectStock(symbol, price) {
        document.getElementById('selectedStock').textContent = symbol;
        document.getElementById('stockQuantity').placeholder = `Shares of ${symbol}`;
        this.logActivity('Trading', `Selected ${symbol} for trading at $${price}`);
    }

    async executeStockTrade(action) {
        const symbol = document.getElementById('selectedStock').textContent;
        const quantity = parseInt(document.getElementById('stockQuantity').value);
        
        if (!quantity || quantity <= 0) {
            this.showStockTradeResult('Please enter a valid quantity', 'error');
            return;
        }

        const price = this.prices[symbol];
        const cost = quantity * price;

        if (action === 'buy' && cost > this.balances.USD) {
            this.showStockTradeResult('Insufficient USD balance', 'error');
            return;
        }

        if (action === 'sell' && quantity > this.balances[symbol]) {
            this.showStockTradeResult(`Insufficient ${symbol} shares`, 'error');
            return;
        }

        // Simulate AI trade analysis
        this.logActivity('AI Analysis', `Analyzing ${action} order for ${quantity} shares of ${symbol}...`);
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (action === 'buy') {
            this.balances.USD -= cost;
            this.balances[symbol] += quantity;
            this.showStockTradeResult(`Successfully bought ${quantity} shares of ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Bought ${quantity} ${symbol} shares for $${cost.toFixed(2)}`);
        } else {
            this.balances.USD += cost;
            this.balances[symbol] -= quantity;
            this.showStockTradeResult(`Successfully sold ${quantity} shares of ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Sold ${quantity} ${symbol} shares for $${cost.toFixed(2)}`);
        }

        this.updateUI();
        document.getElementById('stockQuantity').value = '';
    }

    // Money Transfer
    async executeTransfer() {
        const recipient = document.getElementById('recipient').value;
        const amount = parseFloat(document.getElementById('transferAmount').value);
        const currency = document.getElementById('transferCurrency').value;
        const note = document.getElementById('transferNote').value;

        if (!recipient || !amount || amount <= 0) {
            this.showTransferResult('Please fill all fields correctly', 'error');
            return;
        }

        if (currency === 'USD' && amount > this.balances.USD) {
            this.showTransferResult('Insufficient USD balance', 'error');
            return;
        }

        if (currency !== 'USD' && amount > this.balances[currency]) {
            this.showTransferResult(`Insufficient ${currency} balance`, 'error');
            return;
        }

        // Simulate AI fraud detection
        this.logActivity('AI Security', 'Scanning transfer for fraud patterns...');
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (currency === 'USD') {
            this.balances.USD -= amount;
        } else {
            this.balances[currency] -= amount;
        }

        const message = `Successfully sent ${amount} ${currency} to ${recipient}${note ? `: "${note}"` : ''}`;
        this.showTransferResult(message, 'success');
        this.logActivity('Transfer', message);

        this.updateUI();
        
        // Clear form
        document.getElementById('recipient').value = '';
        document.getElementById('transferAmount').value = '';
        document.getElementById('transferNote').value = '';
    }

    // Deposit Simulation
    simulateDeposit() {
        const depositAmount = 1000;
        this.balances.USD += depositAmount;
        this.showTradeResult(`Successfully deposited $${depositAmount}`, 'success');
        this.logActivity('Deposit', `Deposited $${depositAmount}`);
        this.updateUI();
    }

    // Result Display Methods
    showTradeResult(message, type) {
        const resultDiv = document.getElementById('tradeResult');
        resultDiv.textContent = message;
        resultDiv.style.background = type === 'success' ? 'rgba(0, 212, 170, 0.1)' : 'rgba(255, 107, 107, 0.1)';
        resultDiv.style.borderColor = type === 'success' ? '#00d4aa' : '#ff6b6b';
    }

    showStockTradeResult(message, type) {
        const resultDiv = document.getElementById('stockTradeResult');
        resultDiv.textContent = message;
        resultDiv.style.background = type === 'success' ? 'rgba(0, 212, 170, 0.1)' : 'rgba(255, 107, 107, 0.1)';
        resultDiv.style.borderColor = type === 'success' ? '#00d4aa' : '#ff6b6b';
    }

    showTransferResult(message, type) {
        const resultDiv = document.getElementById('transferResult');
        resultDiv.textContent = message;
        resultDiv.style.background = type === 'success' ? 'rgba(0, 212, 170, 0.1)' : 'rgba(255, 107, 107, 0.1)';
        resultDiv.style.borderColor = type === 'success' ? '#00d4aa' : '#ff6b6b';
    }

    // Activity Logging
    logActivity(type, message) {
        const timestamp = new Date().toLocaleTimeString();
        this.activityLog.unshift({ type, message, timestamp });
        
        if (this.activityLog.length > 10) {
            this.activityLog.pop();
        }
        
        this.updateActivityFeed();
    }

    updateActivityFeed() {
        const feed = document.getElementById('activityFeed');
        feed.innerHTML = '';
        
        this.activityLog.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <strong>${activity.type}</strong>
                <div>${activity.message}</div>
                <small>${activity.timestamp}</small>
            `;
            feed.appendChild(item);
        });
    }
}

// Global functions for HTML onclick handlers
function showSection(sectionName) {
    bropay.showSection(sectionName);
}

function selectCrypto(symbol, price) {
    bropay.selectCrypto(symbol, price);
}

function executeTrade(action) {
    bropay.executeTrade(action);
}

function selectStock(symbol, price) {
    bropay.selectStock(symbol, price);
}

function executeStockTrade(action) {
    bropay.executeStockTrade(action);
}

function executeTransfer() {
    bropay.executeTransfer();
}

function simulateDeposit() {
    bropay.simulateDeposit();
}

// Initialize BROpay when DOM is loaded
let bropay;
document.addEventListener('DOMContentLoaded', () => {
    bropay = new BROpay();
});
