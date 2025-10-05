import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, FileText, Shield, Globe, TrendingUp, Headphones, Heart, Users, Target, Send } from "lucide-react";
import { useState, useEffect } from "react";
const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (isAuthenticated) {
      // Navigate to chat with the message
      navigate('/chat', { state: { initialMessage: searchQuery } });
    } else {
      // Show login popup
      setShowAuthDialog(true);
    }
  };
  
  const features = [{
    icon: MessageSquare,
    title: "AI Chat in Your Language",
    description: "Speak with our AI in your native language and get instant, culturally-aware financial advice."
  }, {
    icon: FileText,
    title: "Document Analysis",
    description: "Upload tax forms, credit statements, or financial documents for clear explanations."
  }, {
    icon: TrendingUp,
    title: "Personalized Plans",
    description: "Get customized credit building plans and financial strategies tailored to your goals."
  }, {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Available in English, Spanish, Chinese, Arabic, Hindi, French, and more."
  }, {
    icon: Headphones,
    title: "Voice Interaction",
    description: "Talk naturally with voice input and output for a seamless experience."
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
  return <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-main pointer-events-none" />
        
        {/* Cloud-like soft shapes */}
        <div className="absolute inset-0 bg-gradient-clouds pointer-events-none" />
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none" />
        
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-40 z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight px-4">
              Chat With AI
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-2 sm:mt-3 pb-2">Financial Literacy In Your Language</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-6">
              Get instant answers to your financial questions in your native language. Our AI assistant breaks down complex concepts into simple, culturally-aware guidance.
            </p>
            
            {/* Hero Input Field */}
            <div className="pt-6 sm:pt-8 px-4 max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative group">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask about credit scores, taxes, mortgages, or any financial topic..."
                    className="h-16 sm:h-20 text-base sm:text-lg pl-6 pr-32 rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-sm shadow-2xl hover:border-primary/50 focus:border-primary transition-all"
                  />
                  <Button 
                    type="submit"
                    size="lg" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 sm:h-16 px-6 sm:px-8 bg-gradient-primary hover-lift shadow-xl"
                  >
                    <Send className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Ask Now</span>
                  </Button>
                </div>
              </form>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center">
                Available 24/7 in 20+ languages • No credit card required
              </p>
            </div>
            
            {/* Chat Feature Highlight */}
            <Link to="/chat" className="block mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-card rounded-xl sm:rounded-2xl border-2 border-primary/20 hover-lift hover:border-primary/40 max-w-3xl mx-4 sm:mx-auto cursor-pointer transition-all shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent text-center">Try Our AI Chat</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 text-center px-2">
                Available 24/7 in 20+ languages. Ask about credit scores, taxes, mortgages, banking, and more.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                <span className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">English</span>
                <span className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">Español</span>
                <span className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">中文</span>
                <span className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">العربية</span>
                <span className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">हिन्दी</span>
                <span className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">Français</span>
                <span className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">+14 more</span>
              </div>
            </Link>
            
            {/* Floating emoji decorations */}
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 text-2xl sm:text-3xl md:text-4xl opacity-60">
              <span className="animate-float">💬</span>
              <span className="animate-float" style={{
              animationDelay: '1s'
            }}>🤖</span>
              <span className="animate-float" style={{
              animationDelay: '2s'
            }}>🌍</span>
              <span className="animate-float" style={{
              animationDelay: '3s'
            }}>💡</span>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative bg-gradient-hero text-primary-foreground py-12 sm:py-16 md:py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 px-4">Our Mission</h2>
              <p className="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-10 md:mb-12 opacity-90 px-4 max-w-3xl mx-auto">
                We believe financial literacy should not be limited by language barriers or cultural unfamiliarity with the American financial system. Our mission is to empower immigrants and ESL speakers with the knowledge and tools they need to achieve financial success.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-4">
                <Card className="bg-primary-foreground text-foreground hover-lift animate-fade-in border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">The Problem</h3>
                    <p className="text-muted-foreground">
                      Millions of immigrants and ESL speakers struggle to understand financial documents, credit systems, and tax requirements in their non-native language. This creates barriers to financial security and opportunity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-primary-foreground text-foreground hover-lift animate-fade-in border-0 shadow-2xl" style={{
                animationDelay: '0.2s'
              }}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                    <p className="text-muted-foreground">
                      AI-powered financial guidance in your native language, with culturally-aware explanations and personalized support that makes complex financial concepts accessible to everyone.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Additional Features To Support You
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Beyond our AI chat, we provide extra tools to help you master your finances.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => {
              const Icon = feature.icon;
              return <Card key={feature.title} className="group border-2 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-gradient-card animate-fade-in-up" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>;
            })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started in minutes with our simple three-step process.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                  <p className="text-muted-foreground">
                    Sign up in seconds and select your preferred language. Your data is encrypted and secure.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ask Questions or Upload Documents</h3>
                  <p className="text-muted-foreground">
                    Chat with our AI in your language or upload financial documents for instant analysis.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Personalized Guidance</h3>
                  <p className="text-muted-foreground">
                    Receive clear explanations and customized financial plans tailored to your situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="relative bg-muted/30 py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in">Making an Impact</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="animate-fade-in-up" style={{
                animationDelay: '0.1s'
              }}>
                  <p className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">10K+</p>
                  <p className="text-muted-foreground">Users Served</p>
                </div>
                <div className="animate-fade-in-up" style={{
                animationDelay: '0.2s'
              }}>
                  <p className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">25+</p>
                  <p className="text-muted-foreground">Languages Supported</p>
                </div>
                <div className="animate-fade-in-up" style={{
                animationDelay: '0.3s'
              }}>
                  <p className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">50K+</p>
                  <p className="text-muted-foreground">Documents Analyzed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-hero text-primary-foreground py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{
          animationDelay: '2s'
        }} />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands who are building financial confidence in their native language.
            </p>
            <Button size="lg" variant="secondary" asChild className="min-w-[200px] hover-lift shadow-2xl animate-scale-in">
              <Link to="/signup">Start Your Journey</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

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
    </div>;
};
export default Index;