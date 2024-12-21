import React, { useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { ApiProvider } from '../../types/api';
import { PriceCalculator } from './PriceCalculator';
import { styles } from '../../styles/theme';

interface ApiCardProps {
  api: ApiProvider;
}

interface PriceInfoDialogProps {
  api: ApiProvider;
  onClose: () => void;
}

const PriceInfoDialog: React.FC<PriceInfoDialogProps> = ({ api, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Price Details</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">Base Price</h4>
            <p className="text-gray-600">${api.basePrice} per {api.inputMetric.type}</p>
          </div>
          {api.pricePerUnit.input && (
            <div>
              <h4 className="font-semibold text-gray-800">Input Price</h4>
              <p className="text-gray-600">${api.pricePerUnit.input} per {api.inputMetric.type}</p>
            </div>
          )}
          {api.pricePerUnit.output && (
            <div>
              <h4 className="font-semibold text-gray-800">Output Price</h4>
              <p className="text-gray-600">${api.pricePerUnit.output} per {api.inputMetric.type}</p>
            </div>
          )}
          {api.pricePerUnit.operation && (
            <div>
              <h4 className="font-semibold text-gray-800">Operation Price</h4>
              <p className="text-gray-600">${api.pricePerUnit.operation} per operation</p>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const ApiCard: React.FC<ApiCardProps> = ({ api }) => {
  const [showPriceInfo, setShowPriceInfo] = useState(false);

  return (
    <div className={`${styles.card.base} ${styles.card.hover}`}>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={api.logo}
          alt={`${api.name} logo`}
          className="w-12 h-12 rounded-lg object-cover bg-gray-50 p-0.5 border border-gray-100"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
          <p className="text-sm font-medium text-gray-600">{api.provider}</p>
          <p className="text-xs text-gray-500 capitalize">{api.category.replace('-', ' ')}</p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{api.description}</p>

      <div>
        <PriceCalculator api={api} />
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <a
            href={api.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors text-sm font-medium"
          >
            <span>Documentation</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            onClick={() => setShowPriceInfo(true)}
            className="text-gray-400 hover:text-gray-600 transition-colors group relative"
            title="View price details"
          >
            <Info className="h-5 w-5" />
            <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              View price details
            </span>
          </button>
        </div>
      </div>

      {showPriceInfo && (
        <PriceInfoDialog api={api} onClose={() => setShowPriceInfo(false)} />
      )}
    </div>
  );
};
