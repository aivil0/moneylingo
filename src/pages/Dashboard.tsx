import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { MessageSquare, FileText, TrendingUp, Clock, CheckCircle2, Lock, ExternalLink, BookOpen, Video, FileCheck } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const goalDetails = {
    "Build Credit Score": {
      title: "Build Credit Score",
      target: "Target: 700+ by June 2024",
      summary: "Building a strong credit score is essential for accessing better financial opportunities, including loans, mortgages, and credit cards with favorable terms.",
      steps: [
        "Pay all bills on time - payment history is 35% of your credit score",
        "Keep credit card balances below 30% of your limit",
        "Don't close old credit cards - length of credit history matters",
        "Only apply for new credit when necessary",
        "Monitor your credit report regularly for errors"
      ],
      resources: [
        { title: "Understanding Credit Scores Guide", type: "article", icon: BookOpen },
        { title: "Credit Building Video Tutorial", type: "video", icon: Video },
        { title: "Free Credit Report Access", type: "tool", icon: FileCheck }
      ]
    },
    "Understand Tax Forms": {
      title: "Understand Tax Forms",
      target: "Complete guide walkthrough",
      summary: "Understanding tax forms is crucial for filing your taxes correctly and taking advantage of all available deductions and credits.",
      steps: [
        "Learn about W-2 forms and how to read them",
        "Understand different types of 1099 forms",
        "Know which deductions you qualify for",
        "Learn about tax credits vs. tax deductions",
        "Understand filing status and its impact"
      ],
      resources: [
        { title: "Tax Forms Explained", type: "article", icon: BookOpen },
        { title: "Filing Taxes Step-by-Step", type: "video", icon: Video },
        { title: "Tax Calculator Tool", type: "tool", icon: FileCheck }
      ]
    }
  };
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
                    <Button
                      key={activity.id}
                      variant="ghost"
                      className="w-full h-auto p-4 justify-start hover-lift"
                      asChild
                    >
                      <Link to={activity.type === "chat" ? "/chat" : activity.type === "document" ? "/documents" : "/dashboard"}>
                        <div className="flex items-start gap-4 w-full">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {activity.type === "chat" && <MessageSquare className="h-5 w-5 text-primary" />}
                            {activity.type === "document" && <FileText className="h-5 w-5 text-accent" />}
                            {activity.type === "plan" && <TrendingUp className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="font-medium text-foreground truncate">{activity.title}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {activity.time}
                            </p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </Link>
                    </Button>
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
                <Button
                  variant="ghost"
                  className="w-full h-auto p-4 justify-start hover-lift border rounded-lg"
                  onClick={() => setSelectedGoal("Build Credit Score")}
                >
                  <div className="flex items-start gap-3 w-full">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 text-left">
                      <p className="font-medium mb-1">Build Credit Score</p>
                      <p className="text-sm text-muted-foreground">Target: 700+ by June 2024</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full h-auto p-4 justify-start hover-lift border rounded-lg"
                  onClick={() => setSelectedGoal("Understand Tax Forms")}
                >
                  <div className="flex items-start gap-3 w-full">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1 text-left">
                      <p className="font-medium mb-1">Understand Tax Forms</p>
                      <p className="text-sm text-muted-foreground">Complete guide walkthrough</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </Button>

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

      {/* Goal Details Dialog */}
      <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedGoal && goalDetails[selectedGoal as keyof typeof goalDetails] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
                  {goalDetails[selectedGoal as keyof typeof goalDetails].title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {goalDetails[selectedGoal as keyof typeof goalDetails].target}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Summary */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Overview</h3>
                  <p className="text-muted-foreground">
                    {goalDetails[selectedGoal as keyof typeof goalDetails].summary}
                  </p>
                </div>

                {/* Action Steps */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Action Steps</h3>
                  <div className="space-y-3">
                    {goalDetails[selectedGoal as keyof typeof goalDetails].steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Helpful Resources</h3>
                  <div className="space-y-2">
                    {goalDetails[selectedGoal as keyof typeof goalDetails].resources.map((resource, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start hover-lift"
                      >
                        <resource.icon className="h-4 w-4 text-primary mr-2" />
                        <span className="flex-1 text-left">{resource.title}</span>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                          {resource.type}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 hover-lift" asChild>
                    <Link to="/chat">Ask AI Assistant</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 hover-lift" onClick={() => setSelectedGoal(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
