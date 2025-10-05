import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useState } from "react";

const Welcome = () => {
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      {/* Minimal Header */}
      <header className="w-full py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <span className="text-2xl" aria-hidden="true">💰</span>
            <span>MoneyLingo</span>
          </div>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px]" aria-label="Select language">
              <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
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
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-5xl" aria-hidden="true">💰</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Welcome to MoneyLingo
            </h1>
            <p className="text-xl text-muted-foreground">
              Financial Literacy In Your Language
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Button size="lg" asChild className="w-full text-lg h-12">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full text-lg h-12">
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>

          {/* Learn More Link */}
          <div className="pt-4">
            <Link 
              to="/home" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Learn more about MoneyLingo
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MoneyLingo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Welcome;
