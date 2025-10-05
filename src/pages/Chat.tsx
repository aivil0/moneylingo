import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect, useRef } from "react";
import { Mic, Send, Volume2, Lock, Menu, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
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

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-main pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-clouds pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none" />
      
      {/* Minimal Header */}
      <header className="relative z-20 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">MoneyLingo</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[120px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
            
            <Button size="sm" variant="ghost" asChild>
              <Link to="/dashboard">
                <Menu className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
        {/* Auth Alert */}
        {!isAuthenticated && (
          <div className="max-w-3xl mx-auto w-full px-4 pt-4">
            <Alert className="border-primary/50 bg-primary/5 animate-fade-in">
              <Lock className="h-4 w-4 text-primary" />
              <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:justify-between">
                <span className="text-sm">Sign in to chat with our AI assistant</span>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto w-full px-4 py-6">
            {messages.length === 1 && (
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 pb-2">
                  How can I help you today?
                </h1>
                <p className="text-muted-foreground mb-8">
                  Ask me anything about credit, taxes, mortgages, or financial planning
                </p>
                
                {/* Suggested Questions */}
                <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {[
                    { q: "What is a credit score?", icon: "📊" },
                    { q: "How do I file taxes?", icon: "📝" },
                    { q: "What is APR?", icon: "💰" },
                    { q: "Explain mortgage rates", icon: "🏠" },
                  ].map((suggestion) => (
                    <button
                      key={suggestion.q}
                      className="text-left p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/50 hover:border-primary/50 transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => isAuthenticated && setMessage(suggestion.q)}
                      disabled={!isAuthenticated}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{suggestion.icon}</span>
                        <span className="text-sm font-medium">{suggestion.q}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="space-y-6">
              {messages.map((msg, index) => (
                index > 0 && (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/80 text-foreground border border-border/50"
                      }`}
                    >
                      <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-between gap-2 mt-2">
                        <p className="text-xs opacity-60">{msg.time}</p>
                        {msg.sender === "ai" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 hover:bg-background/50"
                            aria-label="Play audio"
                          >
                            <Volume2 className="h-3 w-3" />
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

        {/* Input Area - Fixed at Bottom */}
        <div className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto w-full px-4 py-4">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder={isAuthenticated ? "Message MoneyLingo..." : "Sign in to start chatting..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-24 h-12 text-base rounded-full bg-background border-border/50"
                  aria-label="Message input"
                  disabled={!isAuthenticated}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    aria-label="Voice input"
                    disabled={!isAuthenticated}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!message.trim() || !isAuthenticated}
                    className="h-8 w-8 rounded-full"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              MoneyLingo can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
