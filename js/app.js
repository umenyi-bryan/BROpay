// BROpay Main Application
console.log('🚀 BROpay app loading...');

class BROpay {
    constructor() {
        this.prices = {
            BTC: 45123.50, ETH: 3250.75, SOL: 102.45,
            AAPL: 182.63, TSLA: 245.18, NVDA: 495.22
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('✅ BROpay app ready');
    }

    setupEventListeners() {
        console.log('🔄 Setting up event listeners...');
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        console.log(`📱 Showing section: ${sectionName}`);
    }

    selectCrypto(symbol, price) {
        const selectedElement = document.getElementById('selectedCrypto');
        if (selectedElement) {
            selectedElement.textContent = symbol;
        }
        console.log(`₿ Selected crypto: ${symbol} at $${price}`);
    }

    selectStock(symbol, price) {
        const selectedElement = document.getElementById('selectedStock');
        if (selectedElement) {
            selectedElement.textContent = symbol;
        }
        console.log(`📈 Selected stock: ${symbol} at $${price}`);
    }

    executeTrade(action) {
        const symbol = document.getElementById('selectedCrypto')?.textContent || 'BTC';
        const amountInput = document.getElementById('cryptoAmount');
        const amount = amountInput ? parseFloat(amountInput.value) : 0;
        
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const price = this.prices[symbol] || 45000;
        const cost = amount * price;

        alert(`${action === 'buy' ? 'Buying' : 'Selling'} ${amount} ${symbol} for $${cost.toFixed(2)}`);
        
        if (amountInput) amountInput.value = '';
    }

    executeStockTrade(action) {
        const symbol = document.getElementById('selectedStock')?.textContent || 'AAPL';
        const quantityInput = document.getElementById('stockQuantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 0;
        
        if (!quantity || quantity <= 0) {
            alert('Please enter a valid quantity');
            return;
        }

        const price = this.prices[symbol] || 180;
        const cost = quantity * price;

        alert(`${action === 'buy' ? 'Buying' : 'Selling'} ${quantity} shares of ${symbol} for $${cost.toFixed(2)}`);
        
        if (quantityInput) quantityInput.value = '';
    }

    executeTransfer() {
        const recipient = document.getElementById('recipient')?.value;
        const amount = document.getElementById('transferAmount')?.value;
        const currency = document.getElementById('transferCurrency')?.value || 'USD';
        
        if (!recipient || !amount) {
            alert('Please fill all fields');
            return;
        }

        alert(`✅ Sent ${amount} ${currency} to ${recipient}`);
        
        // Clear form
        document.getElementById('recipient').value = '';
        document.getElementById('transferAmount').value = '';
        document.getElementById('transferNote').value = '';
    }

    simulateDeposit() {
        alert('✅ $1000 deposited successfully!');
    }
}

// Global functions
window.showSection = function(sectionName) { bropay.showSection(sectionName); };
window.selectCrypto = function(symbol, price) { bropay.selectCrypto(symbol, price); };
window.selectStock = function(symbol, price) { bropay.selectStock(symbol, price); };
window.executeTrade = function(action) { bropay.executeTrade(action); };
window.executeStockTrade = function(action) { bropay.executeStockTrade(action); };
window.executeTransfer = function() { bropay.executeTransfer(); };
window.simulateDeposit = function() { bropay.simulateDeposit(); };

// Initialize
const bropay = new BROpay();
