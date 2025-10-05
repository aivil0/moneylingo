import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { MessageSquare, FileText, Shield, Globe, TrendingUp, Headphones } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat in Your Language",
      description: "Speak with our AI in your native language and get instant, culturally-aware financial advice.",
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Upload tax forms, credit statements, or financial documents for clear explanations.",
    },
    {
      icon: TrendingUp,
      title: "Personalized Plans",
      description: "Get customized credit building plans and financial strategies tailored to your goals.",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Available in English, Spanish, Chinese, Arabic, Hindi, French, and more.",
    },
    {
      icon: Headphones,
      title: "Voice Interaction",
      description: "Talk naturally with voice input and output for a seamless experience.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with industry-leading encryption and security measures.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Financial Literacy
              <span className="block text-primary mt-2">In Your Language</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Breaking down barriers in finance for immigrants and ESL speakers with AI-powered guidance that speaks your language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" asChild className="w-full sm:w-auto min-w-[200px]">
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto min-w-[200px]">
                <Link to="/chat">Try AI Chat</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything You Need to Understand Finance
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We simplify complex financial jargon into clear, culturally accessible definitions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
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

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands who are building financial confidence in their native language.
            </p>
            <Button size="lg" variant="secondary" asChild className="min-w-[200px]">
              <Link to="/signup">Start Your Journey</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
