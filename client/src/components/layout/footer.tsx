import { Box } from "lucide-react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 dxp-gradient rounded-lg flex items-center justify-center">
                <Box className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold">React Components</h3>
                <p className="text-sm text-gray-400">DXP React Components Asset</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Professional React components for enterprise applications.
            </p>
          </div>
          

        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 DXP React Components. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
