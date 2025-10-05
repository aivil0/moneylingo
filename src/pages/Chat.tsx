import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState, useEffect, useRef } from "react";
import { Mic, Send, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

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
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

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
          <div className="w-full px-4 py-5">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Message MoneyLingo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-28 h-14 text-base rounded-2xl bg-background/80 border-2 border-border/50 focus:border-primary/50 shadow-lg transition-all"
                  aria-label="Message input"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full hover:bg-primary/10 hover-lift"
                    aria-label="Voice input"
                    onClick={() => !isAuthenticated && setShowAuthDialog(true)}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!message.trim()}
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

      {/* Auth Required Dialog */}
      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent className="bg-gradient-card border-2 border-primary/40">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent pb-1">
              Sign in required
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              You need to sign in to chat with our AI assistant and get personalized financial guidance in your language.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowAuthDialog(false)} className="hover-lift">
              Cancel
            </Button>
            <Button asChild className="bg-gradient-primary hover-lift shadow-lg">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild variant="secondary" className="hover-lift">
              <Link to="/signup">Create Account</Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Chat;
