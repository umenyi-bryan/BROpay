// BROpsGPT - AI Banking Assistant
class BROpsGPT {
    constructor() {
        this.conversation = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadConversation();
    }

    setupEventListeners() {
        // Enter key to send message
        document.getElementById('aiInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Close assistant
        document.querySelector('.close-assistant').addEventListener('click', () => {
            this.toggleAssistant();
        });
    }

    toggleAssistant() {
        const assistant = document.getElementById('aiAssistant');
        assistant.classList.toggle('active');
    }

    async sendMessage() {
        const input = document.getElementById('aiInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        // Generate AI response
        const response = this.generateResponse(message);
        
        // Remove typing indicator and add response
        this.removeTypingIndicator();
        this.addMessage(response, 'ai');

        this.saveConversation();
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('assistantMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.conversation.push({ sender, text, timestamp: new Date() });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('assistantMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'message ai-message';
        typingDiv.innerHTML = '🤖 <em>BROpsGPT is typing...</em>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Banking related queries
        if (message.includes('balance') || message.includes('how much')) {
            return this.getBalanceResponse();
        }
        
        if (message.includes('crypto') || message.includes('bitcoin') || message.includes('ethereum')) {
            return this.getCryptoResponse();
        }
        
        if (message.includes('stock') || message.includes('invest') || message.includes('share')) {
            return this.getStockResponse();
        }
        
        if (message.includes('transfer') || message.includes('send money') || message.includes('payment')) {
            return this.getTransferResponse();
        }
        
        if (message.includes('security') || message.includes('safe') || message.includes('secure')) {
            return "🔒 BROpay uses advanced AI security powered by bedusec. Your funds are protected with multi-layer encryption, behavioral analysis, and real-time fraud detection. We also offer insurance on all deposits.";
        }
        
        if (message.includes('help') || message.includes('support')) {
            return "I can help you with: 📊 Account balances, ₿ Crypto trading, 📈 Stock investments, 💸 Money transfers, 🔒 Security questions, and general banking advice. What would you like to know?";
        }
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm BROpsGPT, your AI banking assistant. I can help you manage your finances, trade crypto and stocks, send money, and answer any banking questions!";
        }

        // Default responses
        const defaultResponses = [
            "I'm here to help with your banking needs! You can ask me about your balances, crypto trading, stock investments, or money transfers.",
            "As your AI banking assistant, I can provide insights on market trends, help with transactions, or answer security questions. What would you like to know?",
            "I specialize in banking and financial advice. Feel free to ask about your account, investments, or how to use BROpay's features!",
            "That's an interesting question! I'm designed to help with financial matters. Could you rephrase or ask about banking, crypto, stocks, or transfers?"
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    getBalanceResponse() {
        if (!window.bropay) return "I can't access your balance right now. Please check the dashboard for your current balances.";
        
        const total = bropay.calculateTotalBalance();
        return `💰 Your total balance is $${total.toLocaleString()}. This includes your checking account, crypto holdings, and stock investments. Check the dashboard for a detailed breakdown!`;
    }

    getCryptoResponse() {
        const tips = [
            "📊 Bitcoin is up 2.3% today. Consider dollar-cost averaging for long-term crypto investments.",
            "🚀 Ethereum continues to show strong growth with DeFi and NFT adoption.",
            "💡 Remember: Only invest what you can afford to lose in crypto. Diversification is key!",
            "🔒 Always use secure wallets and enable 2FA for your crypto accounts."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    getStockResponse() {
        const tips = [
            "📈 Apple (AAPL) shows consistent growth with strong fundamentals.",
            "⚡ Tesla (TSLA) is volatile but has high growth potential in the EV market.",
            "🎮 NVIDIA (NVDA) leads in AI and gaming hardware with strong market position.",
            "💡 Consider diversifying your stock portfolio across different sectors for risk management."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    getTransferResponse() {
        return "💸 To send money: Go to the Transfer section, enter recipient details, amount, and currency. BROpay offers instant transfers with AI fraud detection for security. Fees vary by currency and amount.";
    }

    saveConversation() {
        // Keep only last 50 messages
        if (this.conversation.length > 50) {
            this.conversation = this.conversation.slice(-50);
        }
        localStorage.setItem('bropay_assistant_convo', JSON.stringify(this.conversation));
    }

    loadConversation() {
        const saved = localStorage.getItem('bropay_assistant_convo');
        if (saved) {
            this.conversation = JSON.parse(saved);
            // Reload messages
            const messagesContainer = document.getElementById('assistantMessages');
            messagesContainer.innerHTML = '';
            this.conversation.forEach(msg => {
                this.addMessage(msg.text, msg.sender);
            });
        }
    }
}

// Global functions
function toggleAssistant() {
    bropsGPT.toggleAssistant();
}

function sendMessage() {
    bropsGPT.sendMessage();
}

// Initialize BROpsGPT
const bropsGPT = new BROpsGPT();
