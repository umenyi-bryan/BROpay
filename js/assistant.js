// BROpsGPT Assistant
console.log('🤖 Assistant loading...');

class BROpsGPT {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('✅ Assistant ready');
    }

    setupEventListeners() {
        // Enter key to send message
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Close assistant
        const closeBtn = document.querySelector('.close-assistant');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.toggleAssistant();
            });
        }
    }

    toggleAssistant() {
        const assistant = document.getElementById('aiAssistant');
        if (assistant) {
            assistant.classList.toggle('active');
        }
    }

    async sendMessage() {
        const input = document.getElementById('aiInput');
        const message = input?.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        if (input) input.value = '';

        // Show typing
        this.showTyping();

        // Simulate AI response
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = this.generateResponse(message);
        this.removeTyping();
        this.addMessage(response, 'ai');
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('assistantMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTyping() {
        const messagesContainer = document.getElementById('assistantMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'message ai-message';
        typingDiv.innerHTML = '🤖 <em>BROpsGPT is typing...</em>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! I'm BROpsGPT, your AI banking assistant. I can help you with banking, crypto, stocks, and more!";
        }
        
        if (message.includes('crypto') || message.includes('bitcoin')) {
            return "I can help you with crypto trading! BROpay supports Bitcoin, Ethereum, and Solana with real-time prices and secure trading.";
        }
        
        if (message.includes('stock') || message.includes('invest')) {
            return "For stock trading, we offer major companies like Apple (AAPL), Tesla (TSLA), and NVIDIA (NVDA) with commission-free trading.";
        }
        
        if (message.includes('transfer') || message.includes('send money')) {
            return "You can send money instantly using the Transfer section. Supports USD, Bitcoin, and Ethereum transfers to any BROpay user.";
        }
        
        return "I'm here to help with your banking needs! You can ask me about account balances, crypto trading, stock investments, or money transfers.";
    }
}

// Global functions
window.toggleAssistant = function() { bropsGPT.toggleAssistant(); };
window.sendMessage = function() { bropsGPT.sendMessage(); };

// Initialize
const bropsGPT = new BROpsGPT();
