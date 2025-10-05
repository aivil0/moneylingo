import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Mic, Send, Paperclip, Volume2 } from "lucide-react";

const Chat = () => {
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

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8 flex flex-col max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Financial Assistant</h1>
            <p className="text-muted-foreground">Ask questions in your language, get clear answers</p>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px]" aria-label="Select chat language">
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
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col mb-4 overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm mb-2">{msg.text}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs opacity-70">{msg.time}</p>
                    {msg.sender === "ai" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2"
                        aria-label="Play audio"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-background">
            <div className="flex items-end gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="flex-shrink-0"
                aria-label="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </Button>

              <div className="flex-1">
                <Input
                  placeholder="Type your question or use voice..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="resize-none"
                  aria-label="Message input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {message.length}/1000 characters
                </p>
              </div>

              <Button
                size="icon"
                variant="outline"
                className="flex-shrink-0"
                aria-label="Voice input"
              >
                <Mic className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                onClick={handleSend}
                disabled={!message.trim()}
                className="flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Suggested Questions */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "What is a credit score?",
              "How do I file taxes?",
              "What is APR?",
              "Explain mortgage rates",
            ].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => setMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </main>
      </div>
    </AuthGuard>
  );
};

export default Chat;
