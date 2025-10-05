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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Gradients - Same as homepage */}
      <div className="absolute inset-0 bg-gradient-main pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-clouds pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      
      {/* Header with gradient accent */}
      <header className="relative z-20 border-b border-border/40 bg-background/60 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover-lift group">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-hero bg-clip-text text-transparent">MoneyLingo</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[130px] h-10 text-sm border-border/50 hover:border-primary/50 transition-colors">
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
            
            <Button size="sm" variant="outline" asChild className="hover-lift">
              <Link to="/dashboard">
                <Menu className="h-4 w-4 mr-2" />
                Menu
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
        {/* Auth Alert with gradient styling */}
        {!isAuthenticated && (
          <div className="max-w-3xl mx-auto w-full px-4 pt-4">
            <Alert className="border-2 border-primary/40 bg-gradient-card shadow-lg animate-scale-in hover-lift">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary-foreground" />
              </div>
              <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:justify-between ml-2">
                <div>
                  <p className="font-semibold text-foreground mb-1">Sign in to unlock AI chat</p>
                  <p className="text-sm text-muted-foreground">Get personalized financial guidance in your language</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild className="bg-gradient-primary hover-lift shadow-lg">
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild className="hover-lift">
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
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-block px-4 py-2 bg-gradient-primary text-primary-foreground rounded-full text-sm font-semibold mb-6 animate-pulse-slow shadow-lg">
                  AI-Powered Financial Assistant
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 pb-2">
                  How can I help you today?
                </h1>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Ask me anything about credit, taxes, mortgages, or financial planning in your language
                </p>
                
                {/* Suggested Questions with gradient cards */}
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {[
                    { q: "What is a credit score?", icon: "📊", desc: "Learn the basics" },
                    { q: "How do I file taxes?", icon: "📝", desc: "Step-by-step guide" },
                    { q: "What is APR?", icon: "💰", desc: "Understand rates" },
                    { q: "Explain mortgage rates", icon: "🏠", desc: "Home financing" },
                  ].map((suggestion, index) => (
                    <button
                      key={suggestion.q}
                      className="group text-left p-5 rounded-2xl border-2 border-border/50 bg-gradient-card hover:border-primary/50 transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed shadow-lg animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => isAuthenticated && setMessage(suggestion.q)}
                      disabled={!isAuthenticated}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl group-hover:scale-110 transition-transform">{suggestion.icon}</div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {suggestion.q}
                          </p>
                          <p className="text-xs text-muted-foreground">{suggestion.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
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

        {/* Input Area - Fixed at Bottom with gradient styling */}
        <div className="border-t-2 border-border/40 bg-gradient-card/80 backdrop-blur-md shadow-2xl">
          <div className="max-w-3xl mx-auto w-full px-4 py-5">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder={isAuthenticated ? "Message MoneyLingo..." : "Sign in to start chatting..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-28 h-14 text-base rounded-2xl bg-background/80 border-2 border-border/50 focus:border-primary/50 shadow-lg transition-all"
                  aria-label="Message input"
                  disabled={!isAuthenticated}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full hover:bg-primary/10 hover-lift"
                    aria-label="Voice input"
                    disabled={!isAuthenticated}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!message.trim() || !isAuthenticated}
                    className="h-9 w-9 rounded-full bg-gradient-primary hover-lift shadow-lg"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center flex items-center justify-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              MoneyLingo can make mistakes. Always verify important financial information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
