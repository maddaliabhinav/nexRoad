// Messages functionality
class MessagesManager {
    constructor() {
        this.selectedChat = '1';
        this.conversations = [
            {
                id: '1',
                name: 'Bharat Petroleum',
                lastMessage: 'I\'ll be there in 10 minutes with your fuel',
                timestamp: '2 min ago',
                unread: 2,
                avatar: '🛡️',
                isOnline: true,
                type: 'fuel_provider'
            },
            {
                id: '2',
                name: 'Srinivas Auto Works',
                lastMessage: 'The tire replacement is complete. Total cost is ₹2,400',
                timestamp: '1 hour ago',
                unread: 0,
                avatar: '🔧',
                isOnline: true,
                type: 'mechanic'
            },
            {
                id: '3',
                name: 'Rajesh Kumar',
                lastMessage: 'Thanks for the quick service!',
                timestamp: '3 hours ago',
                unread: 0,
                avatar: '👤',
                isOnline: false,
                type: 'customer'
            }
        ];

        this.messages = [
            {
                id: '1',
                senderId: '1',
                content: 'Hello! I received your fuel delivery request',
                timestamp: '10:30 AM',
                isMe: false
            },
            {
                id: '2',
                senderId: 'me',
                content: 'Great! How long will it take to get here?',
                timestamp: '10:32 AM',
                isMe: true
            },
            {
                id: '3',
                senderId: '1',
                content: 'I\'m about 5 minutes away from your location. I have 20L of regular gasoline ready.',
                timestamp: '10:35 AM',
                isMe: false
            },
            {
                id: '4',
                senderId: 'me',
                content: 'Perfect! I\'ll be waiting outside.',
                timestamp: '10:36 AM',
                isMe: true
            },
            {
                id: '5',
                senderId: '1',
                content: 'I\'ll be there in 10 minutes with your fuel',
                timestamp: '10:45 AM',
                isMe: false
            }
        ];
    }

    render() {
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = `
            <div class="h-full">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
                    <!-- Conversations List -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
                            <div class="relative">
                                <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"></i>
                                <input type="text" placeholder="Search conversations..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                        </div>

                        <div class="overflow-y-auto h-full" id="conversations-list">
                            <!-- Conversations will be populated by JavaScript -->
                        </div>
                    </div>

                    <!-- Chat Area -->
                    <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div id="chat-area">
                            <!-- Chat will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
        this.updateConversations();
        this.updateChatArea();
    }

    updateConversations() {
        const conversationsList = document.getElementById('conversations-list');
        conversationsList.innerHTML = '';

        this.conversations.forEach(conversation => {
            const conversationElement = document.createElement('div');
            conversationElement.className = `p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                this.selectedChat === conversation.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
            }`;
            
            conversationElement.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div class="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                            ${conversation.avatar}
                        </div>
                        ${conversation.isOnline ? `
                            <div class="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                        ` : ''}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <h4 class="font-medium text-gray-900 truncate">${conversation.name}</h4>
                            <span class="text-xs text-gray-500">${conversation.timestamp}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-gray-600 truncate">${conversation.lastMessage}</p>
                            ${conversation.unread > 0 ? `
                                <span class="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    ${conversation.unread}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;

            conversationElement.addEventListener('click', () => {
                this.selectedChat = conversation.id;
                this.updateConversations();
                this.updateChatArea();
            });

            conversationsList.appendChild(conversationElement);
        });
    }

    updateChatArea() {
        const selectedConversation = this.conversations.find(c => c.id === this.selectedChat);
        const chatArea = document.getElementById('chat-area');

        if (!selectedConversation) {
            chatArea.innerHTML = `
                <div class="flex-1 flex items-center justify-center">
                    <div class="text-center">
                        <div class="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="search" class="h-8 w-8 text-gray-400"></i>
                        </div>
                        <p class="text-gray-500">Select a conversation to start messaging</p>
                    </div>
                </div>
            `;
            return;
        }

        chatArea.innerHTML = `
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="relative">
                            <div class="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                ${selectedConversation.avatar}
                            </div>
                            ${selectedConversation.isOnline ? `
                                <div class="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                            ` : ''}
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900">${selectedConversation.name}</h3>
                            <p class="text-sm text-gray-600">
                                ${selectedConversation.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                            </p>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                        <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i data-lucide="phone" class="h-5 w-5"></i>
                        </button>
                        <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i data-lucide="video" class="h-5 w-5"></i>
                        </button>
                        <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i data-lucide="more-vertical" class="h-5 w-5"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4" id="messages-container">
                ${this.messages.map(message => `
                    <div class="flex ${message.isMe ? 'justify-end' : 'justify-start'}">
                        <div class="chat-message ${message.isMe ? 'sent' : 'received'}">
                            <p class="text-sm">${message.content}</p>
                            <p class="text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}">
                                ${message.timestamp}
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Message Input -->
            <form id="message-form" class="p-4 border-t border-gray-200">
                <div class="flex items-center space-x-2">
                    <button type="button" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="paperclip" class="h-5 w-5"></i>
                    </button>
                    
                    <div class="flex-1 relative">
                        <input type="text" id="message-input" placeholder="Type a message..." class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <button type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900 rounded">
                            <i data-lucide="smile" class="h-4 w-4"></i>
                        </button>
                    </div>
                    
                    <button type="submit" class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="send" class="h-5 w-5"></i>
                    </button>
                </div>
            </form>
        `;

        lucide.createIcons();
        this.setupMessageForm();
    }

    setupMessageForm() {
        const messageForm = document.getElementById('message-form');
        const messageInput = document.getElementById('message-input');

        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageInput.value.trim();
            
            if (message) {
                this.sendMessage(message);
                messageInput.value = '';
            }
        });
    }

    sendMessage(content) {
        const newMessage = {
            id: Date.now().toString(),
            senderId: 'me',
            content: content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        this.messages.push(newMessage);
        this.updateChatArea();

        // Scroll to bottom
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize messages manager
window.messagesManager = new MessagesManager();