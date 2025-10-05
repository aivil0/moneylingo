import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { 
  MessageSquare, FileText, Shield, Globe2, TrendingUp, 
  Headphones, Send, Mic, Sparkles, CreditCard, BookOpen, 
  Home, DollarSign, PiggyBank 
} from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const placeholders = [
    "Ask about your credit score...",
    "Type your question in any language...",
    "Need help with taxes?",
    "How do mortgages work?",
    "Explain credit card interest...",
  ];

  // Rotating placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate('/chat', { state: { initialMessage: searchQuery } });
  };

  const questionCards = [
    { icon: CreditCard, text: "What is a credit score?", color: "from-emerald-500 to-teal-500" },
    { icon: FileText, text: "How do I file taxes?", color: "from-blue-500 to-cyan-500" },
    { icon: DollarSign, text: "What is APR?", color: "from-violet-500 to-purple-500" },
    { icon: Home, text: "Explain mortgage rates", color: "from-amber-500 to-orange-500" },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat in Your Language",
      description: "Speak with our AI in your native language and get instant, culturally-aware financial advice.",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Upload tax forms, credit statements, or financial documents for clear explanations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Personalized Plans",
      description: "Get customized credit building plans and financial strategies tailored to your goals.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Globe2,
      title: "Multi-Language Support",
      description: "Available in English, Spanish, Chinese, Arabic, Hindi, French, and more.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Headphones,
      title: "Voice Interaction",
      description: "Talk naturally with voice input and output for a seamless experience.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with industry-leading encryption and security measures.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F8FBFA] to-[#E8F8F5]">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Subtle animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>

        {/* Hero Section */}
        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
            {/* Animated Hero Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="relative inline-block">
                  <span className="bg-gradient-hero bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Financial Literacy
                  </span>
                </span>
                <span className="block mt-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  In Your Language
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get instant answers to your financial questions in your native language. Our AI assistant breaks down complex concepts into simple, culturally-aware guidance.
              </p>
            </div>

            {/* Hero Search Box with Floating Design */}
            <div className="pt-8 max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="relative group">
                <div className="glass-card rounded-3xl p-2 hover:shadow-2xl transition-all duration-300">
                  <div className="relative flex items-center gap-2">
                    <Input
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsTyping(e.target.value.length > 0);
                      }}
                      placeholder={placeholders[placeholderIndex]}
                      className="h-16 text-lg pl-6 pr-32 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 transition-all"
                    />
                    <div className="flex items-center gap-2 pr-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-12 w-12 rounded-full hover:bg-teal-50 transition-colors group/mic"
                        onClick={() => navigate('/chat')}
                      >
                        <Mic className="h-5 w-5 text-teal-600 group-hover/mic:scale-110 transition-transform" />
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="h-12 px-6 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full group/send"
                      >
                        <Send className="h-5 w-5 mr-2 group-hover/send:translate-x-1 transition-transform" />
                        <span className="font-semibold">Ask Now</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Available 24/7 in 20+ languages • No credit card required
              </p>
            </div>

            {/* Quick Question Cards */}
            <div className="pt-8">
              <p className="text-sm font-medium text-gray-600 mb-4">Try asking about:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {questionCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.text}
                      onClick={() => {
                        setSearchQuery(card.text);
                        setTimeout(() => handleSearch({ preventDefault: () => {} } as any), 100);
                      }}
                      className="group glass-card rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 leading-snug">{card.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Pills */}
            <div className="pt-4">
              <div className="flex flex-wrap justify-center gap-2">
                {["🇺🇸 English", "🇪🇸 Español", "🇨🇳 中文", "🇸🇦 العربية", "🇮🇳 हिन्दी", "🇫🇷 Français"].map((lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:bg-white/80 transition-all cursor-pointer"
                  >
                    {lang}
                  </span>
                ))}
                <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-sm font-medium text-white shadow-md">
                  +14 more
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful tools designed to make financial literacy accessible to everyone
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-12 text-center relative overflow-hidden animate-fade-in-up">
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <PiggyBank className="h-16 w-16 mx-auto mb-6 text-teal-600 animate-bounce-gentle" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Ready to Master Your Finances?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of immigrants and ESL speakers who've achieved financial confidence with MoneyLingo
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full text-lg font-semibold glow-pulse"
                  >
                    <Link to="/signup">
                      Get Started Free
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 border-2 border-gray-300 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 rounded-full text-lg font-semibold"
                  >
                    <Link to="/chat">
                      Try AI Chat
                      <MessageSquare className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  ✓ No credit card required  ✓ Free forever  ✓ Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="relative py-12 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-5 w-5 text-teal-600" />
                <span className="font-medium">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe2 className="h-5 w-5 text-teal-600" />
                <span className="font-medium">20+ Languages</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Sparkles className="h-5 w-5 text-teal-600" />
                <span className="font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="h-5 w-5 text-teal-600" />
                <span className="font-medium">Free Resources</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
