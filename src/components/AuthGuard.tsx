import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (mock check using localStorage)
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Not authenticated - show login prompt
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-subtle">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <CardDescription className="text-base">
              Please sign in to access this feature. Creating an account is free and takes just a moment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              size="lg" 
              className="w-full" 
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="w-full" 
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated - render children
  return <>{children}</>;
};
