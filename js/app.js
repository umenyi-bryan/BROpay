class BROpay {
    constructor() {
        this.currentUser = null;
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
    }

    setUserData(user) {
        this.currentUser = user;
        this.updateUI();
        this.logActivity('System', 'User data loaded successfully');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.showSection(target);
            });
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
        if (!this.currentUser) return;
        
        // Update total balance
        const total = this.calculateTotalBalance();
        document.getElementById('totalBalance').textContent = `$${total.toLocaleString()}`;
        
        // Update activity feed
        this.updateActivityFeed();
    }

    calculateTotalBalance() {
        if (!this.currentUser) return 0;
        
        let total = this.currentUser.balances.USD;
        total += this.currentUser.balances.BTC * this.prices.BTC;
        total += this.currentUser.balances.ETH * this.prices.ETH;
        total += this.currentUser.balances.SOL * this.prices.SOL;
        total += this.currentUser.balances.AAPL * this.prices.AAPL;
        total += this.currentUser.balances.TSLA * this.prices.TSLA;
        total += this.currentUser.balances.NVDA * this.prices.NVDA;
        return Math.round(total * 100) / 100;
    }

    // Crypto Trading
    selectCrypto(symbol, price) {
        document.getElementById('selectedCrypto').textContent = symbol;
        document.getElementById('cryptoAmount').placeholder = `Amount in ${symbol}`;
        this.logActivity('Trading', `Selected ${symbol} for trading at $${price}`);
    }

    async executeTrade(action) {
        if (!this.currentUser) {
            this.showTradeResult('Please login first', 'error');
            return;
        }

        const symbol = document.getElementById('selectedCrypto').textContent;
        const amount = parseFloat(document.getElementById('cryptoAmount').value);
        
        if (!amount || amount <= 0) {
            this.showTradeResult('Please enter a valid amount', 'error');
            return;
        }

        const price = this.prices[symbol];
        const cost = amount * price;

        if (action === 'buy' && cost > this.currentUser.balances.USD) {
            this.showTradeResult('Insufficient USD balance', 'error');
            return;
        }

        if (action === 'sell' && amount > this.currentUser.balances[symbol]) {
            this.showTradeResult(`Insufficient ${symbol} balance`, 'error');
            return;
        }

        // Simulate AI trade analysis
        this.logActivity('AI Analysis', `Analyzing ${action} order for ${amount} ${symbol}...`);
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (action === 'buy') {
            this.currentUser.balances.USD -= cost;
            this.currentUser.balances[symbol] += amount;
            this.showTradeResult(`Successfully bought ${amount} ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Bought ${amount} ${symbol} for $${cost.toFixed(2)}`);
        } else {
            this.currentUser.balances.USD += cost;
            this.currentUser.balances[symbol] -= amount;
            this.showTradeResult(`Successfully sold ${amount} ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Sold ${amount} ${symbol} for $${cost.toFixed(2)}`);
        }

        this.saveUserData();
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
        if (!this.currentUser) {
            this.showStockTradeResult('Please login first', 'error');
            return;
        }

        const symbol = document.getElementById('selectedStock').textContent;
        const quantity = parseInt(document.getElementById('stockQuantity').value);
        
        if (!quantity || quantity <= 0) {
            this.showStockTradeResult('Please enter a valid quantity', 'error');
            return;
        }

        const price = this.prices[symbol];
        const cost = quantity * price;

        if (action === 'buy' && cost > this.currentUser.balances.USD) {
            this.showStockTradeResult('Insufficient USD balance', 'error');
            return;
        }

        if (action === 'sell' && quantity > this.currentUser.balances[symbol]) {
            this.showStockTradeResult(`Insufficient ${symbol} shares`, 'error');
            return;
        }

        // Simulate AI trade analysis
        this.logActivity('AI Analysis', `Analyzing ${action} order for ${quantity} shares of ${symbol}...`);
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (action === 'buy') {
            this.currentUser.balances.USD -= cost;
            this.currentUser.balances[symbol] += quantity;
            this.showStockTradeResult(`Successfully bought ${quantity} shares of ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Bought ${quantity} ${symbol} shares for $${cost.toFixed(2)}`);
        } else {
            this.currentUser.balances.USD += cost;
            this.currentUser.balances[symbol] -= quantity;
            this.showStockTradeResult(`Successfully sold ${quantity} shares of ${symbol} for $${cost.toFixed(2)}`, 'success');
            this.logActivity('Trade', `Sold ${quantity} ${symbol} shares for $${cost.toFixed(2)}`);
        }

        this.saveUserData();
        this.updateUI();
        document.getElementById('stockQuantity').value = '';
    }

    // Money Transfer
    async executeTransfer() {
        if (!this.currentUser) {
            this.showTransferResult('Please login first', 'error');
            return;
        }

        const recipient = document.getElementById('recipient').value;
        const amount = parseFloat(document.getElementById('transferAmount').value);
        const currency = document.getElementById('transferCurrency').value;
        const note = document.getElementById('transferNote').value;

        if (!recipient || !amount || amount <= 0) {
            this.showTransferResult('Please fill all fields correctly', 'error');
            return;
        }

        if (currency === 'USD' && amount > this.currentUser.balances.USD) {
            this.showTransferResult('Insufficient USD balance', 'error');
            return;
        }

        if (currency !== 'USD' && amount > this.currentUser.balances[currency]) {
            this.showTransferResult(`Insufficient ${currency} balance`, 'error');
            return;
        }

        // Simulate AI fraud detection
        this.logActivity('AI Security', 'Scanning transfer for fraud patterns...');
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (currency === 'USD') {
            this.currentUser.balances.USD -= amount;
        } else {
            this.currentUser.balances[currency] -= amount;
        }

        const message = `Successfully sent ${amount} ${currency} to ${recipient}${note ? `: "${note}"` : ''}`;
        this.showTransferResult(message, 'success');
        this.logActivity('Transfer', message);

        this.saveUserData();
        this.updateUI();
        
        // Clear form
        document.getElementById('recipient').value = '';
        document.getElementById('transferAmount').value = '';
        document.getElementById('transferNote').value = '';
    }

    // Deposit Simulation
    simulateDeposit() {
        if (!this.currentUser) {
            this.showTradeResult('Please login first', 'error');
            return;
        }

        const depositAmount = 1000;
        this.currentUser.balances.USD += depositAmount;
        this.showTradeResult(`Successfully deposited $${depositAmount}`, 'success');
        this.logActivity('Deposit', `Deposited $${depositAmount}`);
        this.saveUserData();
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

    saveUserData() {
        if (this.currentUser) {
            // Update users in localStorage
            const users = JSON.parse(localStorage.getItem('bropay_users')) || {};
            users[this.currentUser.email] = this.currentUser;
            localStorage.setItem('bropay_users', JSON.stringify(users));
            localStorage.setItem('bropay_current_user', JSON.stringify(this.currentUser));
        }
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
