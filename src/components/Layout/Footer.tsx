import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AiApiKit.com</h3>
            <p className="text-gray-600 text-sm">
              The ultimate tool for developers to find and compare AI APIs.
              Make informed decisions for your next project.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">API Updates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AiApiKit.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
