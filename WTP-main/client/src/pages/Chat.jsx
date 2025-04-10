import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [chatOwner, setChatOwner] = useState(null);
    const [userName, setUserName] = useState(null);
    const emojiPickerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const intervalRef = useRef(null);
    const modalRef = useRef(null);

    // Check authentication status and set sender name accordingly
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Fetch auth status from API
                const response = await fetch('/api/chat/auth-status', {
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (data.isLoggedIn && data.firstName) {
                        setUserName(data.firstName);
                        console.log(`User is logged in as: ${data.firstName}`);
                    }
                }
            } catch (err) {
                console.error('Error checking auth status:', err);
            }
        };
        
        checkAuthStatus();
    }, []);
    
    // Simple fetch for chat messages
    const fetchMessages = async () => {
        if (!token) return;

        try {
            const response = await fetch(`/api/chat/messages/${token}`, {
                credentials: 'include' // Include credentials for session
            });

            if (!response.ok) {
                throw new Error(`Kunde inte hämta chatmeddelanden: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Chat data:', data);
            
            // Set messages from response
            setMessages(data.messages);
            
            // Set chat owner (first sender)
            if (data.chatOwner && !chatOwner) {
                setChatOwner(data.chatOwner);
                
                // If we haven't set a username yet, use the chatOwner
                if (!userName) {
                    setUserName(data.chatOwner);
                    console.log(`Setting username to first message sender: ${data.chatOwner}`);
                }
            }
            
            setError(null);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Set up initial fetch and polling
    useEffect(() => {
        console.log('Setting up chat with token:', token);
        
        // Initial data fetch
        fetchMessages();

        // Set up polling every 5 seconds
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(fetchMessages, 5000);

        // Clean up interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [token]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target) &&
                !event.target.closest(".emoji")
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    // Handle closing the chat and navigating away
    const handleCloseChat = () => {
        // Clear the interval to stop polling
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        // Navigate back to home or specified route
        navigate('/');
    };

    // Handle sending a new message
    const handleSendMessage = async () => {
        if (message.trim() === "" || !userName) return;
        
        // Store message locally before sending (for immediate UI feedback)
        const currentMessage = message.trim();
        
        // Clear the input field immediately for better UX
        setMessage("");
        
        const messageToSend = {
            chatToken: token,
            sender: userName,
            message: currentMessage
            // Server will handle timestamp
        };
        
        // Add temporary message to UI for immediate feedback
        const tempMessage = {
            id: `temp-${Date.now()}`,
            sender: userName,
            message: currentMessage,
            timestamp: new Date().toISOString(),
            chatToken: token
        };
        setMessages(prev => [...prev, tempMessage]);
    
        try {
            console.log('Sending message:', messageToSend);
            const response = await fetch('/api/chat/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageToSend),
                credentials: 'include' // Important: Include credentials for session
            });
    
            if (!response.ok) {
                throw new Error('Kunde inte skicka meddelande');
            }
    
            // Get the server response with the saved message
            const result = await response.json();
            console.log('Message sent successfully:', result);
            
            // Refresh messages to get the official message with server timestamp
            await fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
            setError("Kunde inte skicka meddelande. Försök igen.");
        }
    };

    // Handle emoji selection
    const handleEmojiClick = (emojiObject) => {
        setMessage(prev => prev + emojiObject.emoji);
        setOpen(false);
    };

    // Show loading skeleton
    if (loading) {
        return (
            <div className="chat-modal" ref={modalRef}>
                <div className="chat-modal__container">
                    <div className="chat-modal__header">
                        <div className="chat-modal__header-skeleton"></div>
                    </div>
                    <div className="chat-modal__messages">
                        <div className="chat-modal__messages-loading">
                            <div className="chat-modal__message-skeleton"></div>
                            <div className="chat-modal__message-skeleton chat-modal__message-skeleton--right"></div>
                            <div className="chat-modal__message-skeleton"></div>
                        </div>
                    </div>
                    <div className="chat-modal__input-container">
                        <div className="chat-modal__input-skeleton"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="chat-modal" ref={modalRef}>
                <div className="chat-modal__container">
                    <div className="chat-modal__error">
                        <p>{error}</p>
                        <button 
                            onClick={fetchMessages}
                            className="chat-modal__error-button"
                        >
                            Försök igen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main chat UI
    return (
        <div className="chat-modal" ref={modalRef}>
            <div className="chat-modal__container">
                <div className="chat-modal__header">
                    <h2 className="chat-modal__name">
                        {chatOwner || "Chat"}
                    </h2>
                    <button 
                        className="chat-modal__close" 
                        onClick={handleCloseChat}
                    >
                        &times;
                    </button>
                </div>
                
                <div className="chat-modal__messages">
                    {messages.length === 0 ? (
                        <div className="chat-modal__no-messages">
                            Inga meddelanden än
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div 
                                key={msg.id}
                                className={`chat-modal__message ${
                                    msg.sender === userName 
                                        ? 'chat-modal__message--sent' 
                                        : 'chat-modal__message--received'
                                }`}
                            >
                                <p className="chat-modal__message-text">{msg.message}</p>
                                <small className="chat-modal__message-timestamp">
                                    {new Date(msg.timestamp).toLocaleString()}
                                </small>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-modal__input-container">
                    <input 
                        type="text" 
                        className="chat-modal__input-field"
                        placeholder="Skriv ett meddelande..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />

                    <div className="emoji" onClick={() => setOpen(!open)}>😃
                    </div>
                    {open && (
                    <div ref={emojiPickerRef} className="emojipicker">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                    )}

                    <button 
                        className="chat-modal__send-button" 
                        onClick={handleSendMessage}
                        type="button"
                    >
                        Skicka
                    </button>
                </div>
            </div>
        </div>
    );
}