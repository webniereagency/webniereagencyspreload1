import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg">
        <div className="text-9xl font-serif font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Button variant="gold" asChild><Link to="/"><Home className="w-4 h-4 mr-2" />Back to Home</Link></Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
