import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MessageSquare, BookOpen, Video, Mail } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How does the AI understand my native language?",
      answer: "Our AI is trained on multiple languages and financial terminology across cultures. It can understand and respond accurately in over 25 languages, ensuring you get precise financial guidance in the language you're most comfortable with.",
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes! We use bank-level encryption (256-bit SSL) to protect all your documents and data. Your information is encrypted both in transit and at rest, and we never share your data with third parties. All staff undergo background checks and security training.",
    },
    {
      question: "What types of documents can I upload?",
      answer: "You can upload tax forms (W-2, 1040, etc.), credit card statements, bank statements, loan documents, and more. We support PDF, JPG, and PNG formats up to 10MB per file.",
    },
    {
      question: "How accurate is the AI's financial advice?",
      answer: "Our AI is trained on official financial regulations and best practices, but it's important to note that it provides educational guidance, not personalized financial advice. For specific financial decisions, we recommend consulting with a licensed financial advisor.",
    },
    {
      question: "Can I use voice input if I'm not comfortable typing?",
      answer: "Absolutely! Our platform supports voice input in multiple languages. Simply click the microphone icon in the chat interface and speak naturally. The AI will transcribe and respond to your question.",
    },
    {
      question: "How much does Babel Finance cost?",
      answer: "We offer a free tier with basic features including AI chat and document uploads. Premium plans start at $9.99/month and include unlimited AI sessions, priority support, and advanced analytics features.",
    },
    {
      question: "What languages are currently supported?",
      answer: "We currently support English, Spanish, Mandarin Chinese, Arabic, Hindi, French, Portuguese, Russian, Korean, Japanese, Vietnamese, Tagalog, and many more. We're constantly adding new languages based on user demand.",
    },
    {
      question: "Can the AI help me build my credit score?",
      answer: "Yes! The AI can provide personalized credit-building strategies, explain how credit scores work, help you understand your credit report, and suggest specific actions to improve your score based on your situation.",
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Browse articles and guides on financial topics",
      link: "#",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides in your language",
      link: "#",
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      link: "#",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help from our support team",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help?</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find answers to common questions or reach out to our support team
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                className="pl-12 h-14 text-lg"
                aria-label="Search help articles"
              />
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Help</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <Card key={resource.title} className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-center mb-12">
                Find answers to the most common questions about Babel Finance
              </p>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Still Need Help?</CardTitle>
                <CardDescription>
                  Our support team is here to help you in your language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" asChild>
                  <Link to="/chat">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chat with AI Assistant
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Support Team
                </Button>
                <p className="text-center text-sm text-muted-foreground pt-4">
                  Average response time: Less than 24 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
