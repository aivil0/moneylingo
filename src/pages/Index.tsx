import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, FileText, Shield, Globe, TrendingUp, Headphones, Heart, Users, Target, Send, Mic, PiggyBank, CheckCircle2, CreditCard, Wallet, TrendingDown, Phone } from "lucide-react";
import { VoiceCallInterface } from "@/components/VoiceCallInterface";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  
  const placeholders = [
    "Ask about your credit score…",
    "Type your question in any language…",
    "Need help with taxes?",
    "How do I build credit?",
    "What's a good interest rate?",
  ];
  
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", greeting: "How can I help you today?" },
    { code: "es", name: "Español", flag: "🇪🇸", greeting: "¿Cómo puedo ayudarte hoy?" },
    { code: "zh", name: "中文", flag: "🇨🇳", greeting: "今天我能帮你什么？" },
    { code: "ar", name: "العربية", flag: "🇸🇦", greeting: "كيف يمكنني مساعدتك اليوم؟" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳", greeting: "आज मैं आपकी कैसे मदद कर सकता हूं?" },
    { code: "fr", name: "Français", flag: "🇫🇷", greeting: "Comment puis-je vous aider aujourd'hui?" },
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (isAuthenticated) {
      navigate('/chat', { state: { initialMessage: searchQuery } });
    } else {
      setShowAuthDialog(true);
    }
  };
  
  const handleVoiceInput = () => {
    toast({
      title: "Voice input",
      description: "Voice recognition feature coming soon!",
    });
  };
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowOnboarding(true);
    }
  };
  
  const onboardingSteps = [
    {
      title: "Welcome to MoneyLingo",
      description: "Your AI-powered financial literacy assistant in your native language.",
      icon: PiggyBank,
    },
    {
      title: "Upload & Analyze",
      description: "Upload your credit statements, tax forms, or any financial document for instant analysis.",
      icon: FileText,
    },
    {
      title: "Get Personalized Plans",
      description: "Receive customized financial strategies tailored to your goals and situation.",
      icon: Target,
    },
  ];
  
  const features = [{
    icon: CreditCard,
    title: "Credit Building",
    description: "Learn how to build and improve your credit score with personalized strategies."
  }, {
    icon: FileText,
    title: "Document Analysis",
    description: "Upload tax forms, credit statements, or financial documents for clear explanations."
  }, {
    icon: Wallet,
    title: "Budget Planning",
    description: "Create personalized budgets that work for your income and lifestyle."
  }, {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Available in English, Spanish, Chinese, Arabic, Hindi, French, and more."
  }, {
    icon: TrendingDown,
    title: "Debt Management",
    description: "Get strategies to reduce debt and manage payments effectively."
  }, {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your financial data is protected with industry-leading encryption and security measures."
  }];
  const values = [{
    icon: Heart,
    title: "Empathy First",
    description: "We understand the challenges immigrants and ESL speakers face in navigating complex financial systems."
  }, {
    icon: Users,
    title: "Cultural Inclusivity",
    description: "Financial advice that respects and incorporates diverse cultural perspectives and experiences."
  }, {
    icon: Target,
    title: "Clear Communication",
    description: "Breaking down complex financial jargon into simple, accessible language everyone can understand."
  }, {
    icon: Shield,
    title: "Trust & Security",
    description: "Your financial information is protected with the highest security standards in the industry."
  }];
  const currentLanguage = languages.find(l => l.name === selectedLanguage) || languages[0];
  
  return <div className="min-h-screen flex flex-col bg-gradient-soft-bg">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Floating mascot */}
        <div className="fixed bottom-24 right-8 z-50 bounce-gentle">
          <div className="relative group cursor-pointer" onClick={() => toast({ title: "MoneyLingo Assistant", description: "I'm here to help! Click Get Started to begin." })}>
            <PiggyBank className="h-16 w-16 text-primary drop-shadow-lg" />
            <div className="absolute -top-12 right-0 bg-card text-card-foreground px-3 py-1.5 rounded-lg shadow-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Need help? 👋
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-4">
              <span className="block shimmer-text pb-2">{currentLanguage.greeting}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-6">
              Get instant answers to your financial questions in your native language. Our AI assistant breaks down complex concepts into simple, culturally-aware guidance.
            </p>
            
            {/* Prominent Call Button */}
            <div className="pt-6 sm:pt-8 px-4">
              <div className="flex flex-col items-center gap-3 animate-fade-in-up">
                <Button
                  onClick={() => setIsCallActive(true)}
                  size="lg"
                  className="h-16 px-10 bg-gradient-glow text-white rounded-full hover:scale-105 transition-all duration-300 shadow-2xl glow-pulse text-lg font-semibold"
                >
                  <Phone className="h-6 w-6 mr-3 animate-pulse" />
                  Talk to AI Assistant Now
                </Button>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Headphones className="h-3.5 w-3.5" />
                  Instant voice guidance in your language
                </p>
              </div>
              
              {/* Language Selector - Moved Below Call Button */}
              <div className="flex justify-center gap-2 flex-wrap mt-8">
                {languages.slice(0, 6).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedLanguage === lang.name
                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                        : 'bg-background/60 backdrop-blur-sm border border-border/40 hover:border-primary/40 hover:scale-105'
                    }`}
                  >
                    <span className="mr-1.5">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center animate-fade-in">
                Available 24/7 in 20+ languages • No credit card required
              </p>
            </div>
            
            {/* Quick Action Cards */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12">
              <Link to="/chat" className="glass-card p-6 rounded-2xl hover-card-lift group">
                <MessageSquare className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-lg mb-2">AI Chat</h3>
                <p className="text-sm text-muted-foreground">Ask anything about finances</p>
              </Link>
              
              <Link to="/documents" className="glass-card p-6 rounded-2xl hover-card-lift group">
                <FileText className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-lg mb-2">Documents</h3>
                <p className="text-sm text-muted-foreground">Upload & analyze files</p>
              </Link>
              
              <button onClick={handleGetStarted} className="glass-card p-6 rounded-2xl hover-card-lift group glow-pulse">
                <Target className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-lg mb-2">Get Started</h3>
                <p className="text-sm text-muted-foreground">Create your plan</p>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 shimmer-text">
                Everything You Need to Succeed
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools to build your financial confidence and achieve your goals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => {
              const Icon = feature.icon;
              return <div key={feature.title} className="glass-card p-6 rounded-2xl hover-card-lift group animate-fade-in-up" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>;
            })}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center glass-card p-8 sm:p-12 rounded-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 shimmer-text">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are building financial confidence in their native language.
              </p>
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="bg-gradient-glow text-white px-8 py-6 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-2xl glow-pulse"
              >
                Get Started Free
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • Available in 20+ languages
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Voice Call Interface */}
      <VoiceCallInterface 
        isActive={isCallActive}
        onEnd={() => setIsCallActive(false)}
      />

      {/* Auth Required Dialog */}
      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent className="glass-card border-2 border-primary/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl shimmer-text pb-1">
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
      
      {/* Onboarding Dialog */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl shimmer-text text-center mb-4">
              {onboardingSteps[onboardingStep].title}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {onboardingSteps[onboardingStep].description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center my-8">
            {(() => {
              const IconComponent = onboardingSteps[onboardingStep].icon;
              return <IconComponent className="h-24 w-24 text-primary animate-float" />;
            })()}
          </div>
          
          <div className="flex justify-center gap-2 mb-6">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === onboardingStep ? 'bg-primary w-8' : 'bg-border'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            {onboardingStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setOnboardingStep(prev => prev - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            {onboardingStep < onboardingSteps.length - 1 ? (
              <Button
                onClick={() => setOnboardingStep(prev => prev + 1)}
                className="flex-1 bg-gradient-primary"
              >
                Next
              </Button>
            ) : (
              <Button
                asChild
                className="flex-1 bg-gradient-primary"
              >
                <Link to="/signup">Create Account</Link>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Index;