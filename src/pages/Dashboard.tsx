import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { MessageSquare, FileText, TrendingUp, Clock, CheckCircle2, Lock } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);
  const recentActivity = [
    { id: 1, type: "chat", title: "Asked about credit scores", time: "2 hours ago" },
    { id: 2, type: "document", title: "Uploaded tax return 2023", time: "1 day ago" },
    { id: 3, type: "plan", title: "Viewed credit building plan", time: "2 days ago" },
  ];

  const insights = [
    { title: "Credit Score Progress", value: "+15 points", change: "this month", positive: true },
    { title: "Documents Analyzed", value: "3", change: "total", positive: true },
    { title: "AI Sessions", value: "12", change: "this week", positive: true },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
      <div className="fixed top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10 animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            {isAuthenticated ? 'Welcome Back!' : 'Dashboard Preview'}
          </h1>
          <p className="text-muted-foreground">
            {isAuthenticated ? "Here's your financial literacy progress." : 'Sign in to track your financial journey.'}
          </p>
        </div>

        {/* Auth Alert */}
        {!isAuthenticated && (
          <Alert className="mb-6 border-primary/50 bg-primary/5">
            <Lock className="h-4 w-4 text-primary" />
            <AlertDescription className="flex items-center justify-between">
              <span>Create an account to access your personalized dashboard and track your progress.</span>
              <div className="flex gap-2 ml-4">
                <Button size="sm" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link to="/chat">
            <Card className="bg-gradient-card hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Start AI Chat</CardTitle>
                    <CardDescription>Ask financial questions</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/documents">
            <Card className="bg-gradient-card hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Upload Document</CardTitle>
                    <CardDescription>Analyze financial files</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Card className="bg-gradient-card hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">View Progress</CardTitle>
                  <CardDescription>Track your goals</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Insights */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Key metrics from your financial journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {insights.map((insight) => (
                    <div key={insight.title} className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">{insight.title}</p>
                      <p className="text-2xl font-bold text-primary">{insight.value}</p>
                      <p className="text-xs text-muted-foreground">{insight.change}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {activity.type === "chat" && <MessageSquare className="h-5 w-5 text-primary" />}
                        {activity.type === "document" && <FileText className="h-5 w-5 text-accent" />}
                        {activity.type === "plan" && <TrendingUp className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{activity.title}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Goals */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Current Goals</CardTitle>
                <CardDescription>Your active financial objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Build Credit Score</p>
                      <p className="text-sm text-muted-foreground">Target: 700+ by June 2024</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Understand Tax Forms</p>
                      <p className="text-sm text-muted-foreground">Complete guide walkthrough</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full hover-lift" disabled={!isAuthenticated}>Add New Goal</Button>
              </CardContent>
            </Card>

            {/* Help Resources */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Access resources and support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start hover-lift" asChild>
                  <Link to="/help">
                    Help Center
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start hover-lift" asChild>
                  <Link to="/chat">
                    Ask AI Assistant
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
