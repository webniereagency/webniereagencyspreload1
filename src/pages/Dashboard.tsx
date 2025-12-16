import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, MessageSquare, Download, LogOut, User, Settings, Home, Star, Briefcase, Info, FileCheck, Instagram, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/useAuth";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle form submission with direct Supabase calls
  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isSignupMode) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        
        if (error) {
          setError(error.message);
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created",
            description: "Please check your email to verify your account.",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) {
          setError(error.message);
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
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
    setError(null);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show auth form if not authenticated
  if (!user) {
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

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-3"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                  }
                })
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

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
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <p className="text-muted-foreground text-sm">Project Status</p>
                  <p className="text-2xl font-bold text-primary mt-2">In Progress</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <p className="text-muted-foreground text-sm">Your Requested Launch Date</p>
                  <p className="text-2xl font-bold mt-2">To be confirmed</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <p className="text-muted-foreground text-sm">Completion</p>
                  <p className="text-2xl font-bold text-primary mt-2">65%</p>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-4">Quick Navigation</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Link to="/" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all">
                    <Home className="w-5 h-5" />
                    <span className="text-sm font-medium">Back to Home</span>
                  </Link>
                  <Link to="/#testimonials" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium">Leave a Review</span>
                  </Link>
                  <Link to="/portfolio" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-sm font-medium">View Portfolio</span>
                  </Link>
                  <Link to="/services" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium">View Services</span>
                  </Link>
                  <Link to="/about" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all">
                    <Info className="w-5 h-5" />
                    <span className="text-sm font-medium">About Us</span>
                  </Link>
                  <Link to="/terms-of-service" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all">
                    <FileCheck className="w-5 h-5" />
                    <span className="text-sm font-medium">Terms & Privacy</span>
                  </Link>
                </div>
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

          {/* Messages Tab - Now Social Contact Hub */}
          {activeTab === "messages" && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p className="text-muted-foreground text-sm mb-6">
                We don't use in-dashboard messaging yet. For the fastest response, reach us through our social channels:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <a
                  href="https://www.instagram.com/webniere/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all"
                >
                  <Instagram className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-xs text-muted-foreground">@webniere</p>
                  </div>
                </a>
                <a
                  href="https://web.facebook.com/webniere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all"
                >
                  <Facebook className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Facebook</p>
                    <p className="text-xs text-muted-foreground">Webniere</p>
                  </div>
                </a>
                <a
                  href="https://t.me/Revonyx1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 hover:text-primary transition-all"
                >
                  <Send className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Telegram</p>
                    <p className="text-xs text-muted-foreground">Direct message</p>
                  </div>
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                These are our primary communication channels for project updates and support.
              </p>
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
