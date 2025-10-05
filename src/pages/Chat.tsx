import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { VoiceCallInterface } from "@/components/VoiceCallInterface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import { Mic, Send, Volume2, Phone, PhoneOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCount, setInputCount] = useState(0);
  const [isInCall, setIsInCall] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const placeholders = [
    "Ask about your credit score…",
    "Type your question in any language…",
    "Need help with taxes?",
  ];

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    
    // Rotate placeholders every 3 seconds
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm here to help you understand financial concepts in your language. What would you like to know?",
      time: "10:30 AM",
    },
  ]);

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    // Increment input count
    const newCount = inputCount + 1;
    setInputCount(newCount);

    // Show reminder on second input if not authenticated
    if (newCount === 2 && !isAuthenticated) {
      toast({
        title: "💡 Sign in to save your conversations",
        description: "Your chat history will be saved and accessible across devices when you create an account.",
        duration: 6000,
      });
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Mock AI response
    const aiMessage = {
      id: messages.length + 2,
      sender: "ai",
      text: "I understand your question. Let me explain that in simple terms...",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, userMessage, aiMessage]);
    setMessage("");
  };

  // Handle initial message from homepage
  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage) {
      setMessage(initialMessage);
      // Auto-send the message
      setTimeout(() => {
        handleSendMessage(initialMessage);
      }, 100);
    }
  }, [location.state]);

  const handleSend = () => {
    if (!message.trim()) return;
    handleSendMessage(message);
  };

  const toggleCall = () => {
    setIsInCall(!isInCall);
  };

  const endCall = () => {
    setIsInCall(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Gradients - Same as homepage */}
      <div className="absolute inset-0 bg-gradient-main pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-clouds pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      
      <Header />

      {/* Main Chat Area */}
      <main className="flex-1 relative z-10 flex flex-col overflow-hidden container mx-auto max-w-4xl">
        {/* Language Selector */}
        <div className="px-4 pt-4 pb-2 flex justify-end">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px] h-10 text-sm border-border/50 hover:border-primary/50 transition-colors bg-gradient-card shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 English</SelectItem>
              <SelectItem value="es">🇪🇸 Español</SelectItem>
              <SelectItem value="zh">🇨🇳 中文</SelectItem>
              <SelectItem value="ar">🇸🇦 العربية</SelectItem>
              <SelectItem value="hi">🇮🇳 हिन्दी</SelectItem>
              <SelectItem value="fr">🇫🇷 Français</SelectItem>
            </SelectContent>
          </Select>
        </div>


        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full px-4 py-4">
            {messages.length === 1 && (
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold shimmer-text mb-4 pb-2 leading-tight px-2">
                  How can I help you today?
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto px-4">
                  Ask me anything about credit, taxes, mortgages, or financial planning in your language
                </p>
              </div>
            )}

            {/* Chat Messages with enhanced styling */}
            <div className="space-y-6">
              {messages.map((msg, index) => (
                index > 0 && (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-lg ${
                        msg.sender === "user"
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-gradient-card border-2 border-border/50"
                      }`}
                    >
                      <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-white/10">
                        <p className="text-xs opacity-60">{msg.time}</p>
                        {msg.sender === "ai" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 hover:bg-primary/10 hover-lift rounded-full"
                            aria-label="Play audio"
                          >
                            <Volume2 className="h-3 w-3 mr-1" />
                            <span className="text-xs">Listen</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Floating Input Bar - Fixed at Bottom */}
        <div className="pb-6 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 glass-card p-2 rounded-3xl shadow-2xl">
              {/* Prominent Call Button */}
              <Button
                size="icon"
                onClick={toggleCall}
                className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl transition-all hover:scale-105 shadow-xl flex-shrink-0 ${
                  isInCall 
                    ? "bg-destructive hover:bg-destructive/90 glow-pulse" 
                    : "bg-gradient-glow text-white glow-pulse"
                }`}
                aria-label={isInCall ? "End call" : "Start voice call"}
              >
                {isInCall ? <PhoneOff className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  placeholder={placeholders[placeholderIndex]}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-14 sm:h-16 text-base sm:text-lg rounded-3xl bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-14 transition-all"
                  aria-label="Message input"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-primary glow-pulse hover:scale-110 transition-all duration-300 shadow-lg disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center flex items-center justify-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              MoneyLingo can make mistakes. Always verify important financial information.
            </p>
          </div>
        </div>
      </main>

      {/* Voice Call Interface */}
      <VoiceCallInterface isActive={isInCall} onEnd={endCall} />
    </div>
  );
};

export default Chat;
