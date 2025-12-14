import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useScrollToTop } from "@/hooks/useScrollToTop";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export const Layout = ({ children, showFooter = true }: LayoutProps) => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
