import { useState } from "react";
import { Box, Menu } from "lucide-react";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 dxp-gradient rounded-lg flex items-center justify-center">
              <Box className="text-white w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">React Components</h1>
              <p className="text-xs text-gray-500">DXP React Components Asset</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("components")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Components
            </button>
            <button
              onClick={() => scrollToSection("playground")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Playground
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-2">
              <button
                onClick={() => scrollToSection("components")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Components
              </button>
              <button
                onClick={() => scrollToSection("playground")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Playground
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
