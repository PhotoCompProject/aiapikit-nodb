import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/Button';

interface FormHeaderProps {
  title: string;
  backText: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  backText,
  onBack,
  rightElement
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to {backText}
        </button>
        <div className="text-xl font-semibold text-gray-900">{title}</div>
      </div>
      {rightElement}
    </div>
  );
};
