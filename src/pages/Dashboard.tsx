import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, MessageSquare, Download, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, isAuthenticated, loading, error, signIn, signUp, signOut, clearError } = useAuth();
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle form submission
  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);

    try {
      if (isSignupMode) {
        const result = await signUp(formData.email, formData.password, formData.fullName);
        if (result.success) {
          toast({
            title: "Account created",
            description: "Please check your email to verify your account.",
          });
        } else if (result.error) {
          toast({
            title: "Sign up failed",
            description: result.error,
            variant: "destructive",
          });
        }
      } else {
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        } else if (result.error) {
          toast({
            title: "Sign in failed",
            description: result.error,
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      navigate("/");
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  // Toggle between sign in and sign up
  const toggleAuthMode = () => {
    setIsSignupMode(!isSignupMode);
    clearError();
  };

  // Show loading state
  if (loading && !isSubmitting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>{isSignupMode ? "Sign Up" : "Login"} | WebniereAgency Dashboard</title>
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="w-full max-w-md p-8 rounded-2xl bg-card border border-border"
          >
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(43,65%,52%)] to-[hsl(43,70%,65%)] flex items-center justify-center">
                  <span className="text-[hsl(0,0%,4%)] font-bold text-xl">W</span>
                </div>
                <span className="text-xl font-serif font-semibold">
                  Webniere<span className="text-primary">Agency</span>
                </span>
              </Link>
              <h1 className="text-2xl font-serif font-bold mb-2">
                {isSignupMode ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isSignupMode ? "Sign up for your client dashboard" : "Sign in to your client dashboard"}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignupMode && (
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="John Doe" 
                    required 
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <Button 
                variant="gold" 
                className="w-full" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (isSignupMode ? "Creating Account..." : "Signing In...") 
                  : (isSignupMode ? "Create Account" : "Sign In")
                }
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignupMode ? "Already have an account?" : "Don't have an account?"}{" "}
              <button 
                onClick={toggleAuthMode} 
                className="text-primary hover:underline"
                type="button"
              >
                {isSignupMode ? "Sign in" : "Sign up"}
              </button>
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  // Dashboard tabs
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "project", label: "Project Status", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "files", label: "Files", icon: Download },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | WebniereAgency</title>
      </Helmet>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border p-6 hidden md:block relative">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(43,65%,52%)] to-[hsl(43,70%,65%)] flex items-center justify-center">
              <span className="text-[hsl(0,0%,4%)] font-bold">W</span>
            </div>
            <span className="font-serif font-semibold">Dashboard</span>
          </Link>
          
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="absolute bottom-6 left-6 right-6">
            <button 
              onClick={handleSignOut} 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-serif font-bold">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <p className="text-muted-foreground text-sm">Project Status</p>
                <p className="text-2xl font-bold text-primary mt-2">In Progress</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <p className="text-muted-foreground text-sm">Estimated Delivery</p>
                <p className="text-2xl font-bold mt-2">Dec 15, 2024</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <p className="text-muted-foreground text-sm">Completion</p>
                <p className="text-2xl font-bold text-primary mt-2">65%</p>
              </div>
            </div>
          )}

          {/* Project Tab */}
          {activeTab === "project" && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Project Timeline</h3>
              <div className="space-y-4">
                {["Requirements gathered", "Design mockups approved", "Development in progress", "Testing & QA", "Launch"].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${i < 3 ? "bg-primary" : "bg-secondary"}`} />
                    <span className={i < 3 ? "text-foreground" : "text-muted-foreground"}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="space-y-4">
                {[
                  { from: "Sara", msg: "Hi! Just wanted to update you on the homepage design...", time: "2h ago" },
                  { from: "You", msg: "Looks great! Can we adjust the header color?", time: "1h ago" }
                ].map((m, i) => (
                  <div 
                    key={i} 
                    className={`p-4 rounded-lg ${m.from === "You" ? "bg-primary/10 ml-8" : "bg-secondary mr-8"}`}
                  >
                    <p className="text-sm">{m.msg}</p>
                    <p className="text-xs text-muted-foreground mt-2">{m.from} • {m.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === "files" && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="space-y-3">
                {["Invoice_001.pdf", "Brand_Guidelines.pdf", "Homepage_Mockup.fig"].map((f) => (
                  <div key={f} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <span className="text-sm">{f}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
