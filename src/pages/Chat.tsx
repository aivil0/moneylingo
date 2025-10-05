import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { VoiceCallInterface } from "@/components/VoiceCallInterface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import { Send, Phone, PhoneOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const Chat = () => {
  const location = useLocation();
  const {
    toast
  } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCount, setInputCount] = useState(0);
  const [isInCall, setIsInCall] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["Ask about your credit score…", "Type your question in any language…", "Need help with taxes?"];
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    // Rotate placeholders every 3 seconds
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([{
    id: 1,
    sender: "ai",
    text: "Hello! I'm here to help you understand financial concepts in your language. What would you like to know?",
    time: "10:30 AM"
  }]);
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
        duration: 6000
      });
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    // Mock AI response
    const aiMessage = {
      id: messages.length + 2,
      sender: "ai",
      text: "I understand your question. Let me explain that in simple terms...",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
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
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return <div className="min-h-screen flex flex-col bg-gradient-soft-bg">
      <Header />

      {/* Main Voice Call Area */}
      <main className="flex-1 relative overflow-hidden">
        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 z-10">
          <div className="max-w-5xl mx-auto">
            {/* Language Selector */}
            <div className="flex justify-end mb-6">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px] h-10 text-sm glass-card">
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

            {/* Hero Voice Call Section */}
            <div className="text-center space-y-6 sm:space-y-8 animate-fade-in-up">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-4">
                  <span className="block shimmer-text pb-2">Talk to Your Financial AI</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-6">
                  Get instant financial advice through natural conversation.
                </p>
              </div>

              {/* Large Voice Call Button */}
              <div className="flex flex-col items-center gap-6 pt-6 sm:pt-8">
                <Button 
                  size="icon" 
                  onClick={toggleCall} 
                  className={`h-32 w-32 sm:h-40 sm:w-40 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl ${
                    isInCall ? "bg-destructive hover:bg-destructive/90 glow-pulse" : "bg-gradient-glow text-white glow-pulse"
                  }`} 
                  aria-label={isInCall ? "End call" : "Start voice call"}
                >
                  {isInCall ? <PhoneOff className="h-16 w-16 sm:h-20 sm:w-20" /> : <Phone className="h-16 w-16 sm:h-20 sm:w-20" />}
                </Button>
                
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-semibold mb-2">
                    {isInCall ? "Talking to MoneyLingo..." : "Tap to start talking"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isInCall ? "We're listening and ready to help" : "Natural conversation in your language"}
                  </p>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <div className="glass-card px-4 py-2 rounded-full text-sm">
                  🎤 Voice Recognition
                </div>
                <div className="glass-card px-4 py-2 rounded-full text-sm">
                  🌍 30+ Languages
                </div>
                <div className="glass-card px-4 py-2 rounded-full text-sm">
                  ⚡ Instant Responses
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Chat Bar at Bottom */}
      <div className="relative py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 glass-card p-2 rounded-3xl shadow-xl">
              <Input 
                placeholder={placeholders[placeholderIndex]} 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                onKeyPress={handleKeyPress} 
                className="h-12 text-base rounded-3xl bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                aria-label="Message input" 
              />
              <Button 
                size="icon" 
                onClick={handleSend} 
                disabled={!message.trim()} 
                className="h-10 w-10 rounded-full bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-lg disabled:opacity-50 flex-shrink-0" 
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Or type your question • MoneyLingo can make mistakes
            </p>
          </div>
        </div>
      </div>

      {/* Voice Call Interface */}
      <VoiceCallInterface isActive={isInCall} onEnd={endCall} />
    </div>;
};
export default Chat;