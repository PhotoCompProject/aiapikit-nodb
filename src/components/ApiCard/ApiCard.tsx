import React, { useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { ApiProvider, PriceDetail, CustomField } from '../../types/api';
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Price Details</h3>
          <p className="text-sm text-gray-600 mt-1">{api.name} - {api.provider}</p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-8">
            {/* Price Details Section */}
            {api.priceDetails && api.priceDetails.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Price Details</h4>
                <div className="grid gap-4">
                  {api.priceDetails.map((detail: PriceDetail, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{detail.name}</span>
                          <span className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-600">
                            {typeof detail.value === 'boolean' ? 'boolean' : 
                             typeof detail.value === 'number' ? 'number' : 'text'}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-600">
                        {typeof detail.value === 'boolean' ? (
                          <span className={`${detail.value ? 'text-green-600' : 'text-red-600'}`}>
                            {detail.value ? 'Yes' : 'No'}
                          </span>
                        ) : (
                          <span>{detail.value.toString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Fields Section */}
            {api.customFields && api.customFields.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                <div className="grid gap-4">
                  {api.customFields.map((field: CustomField, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{field.name}</span>
                          <span className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-600">
                            {field.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-600">
                        {field.type === 'boolean' ? (
                          <span className={`${field.value === 'true' ? 'text-green-600' : 'text-red-600'}`}>
                            {field.value === 'true' ? 'Yes' : 'No'}
                          </span>
                        ) : (
                          <span>{field.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Close
          </button>
        </div>
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
          src={api.logo.value}
          alt={`${api.name} logo`}
          className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-0.5 border border-gray-100"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
            {api.featured && (
              <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-600">{api.provider}</p>
          <p className="text-xs text-gray-500 capitalize">{api.category.replace('-', ' ')}</p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{api.description}</p>

      <div>
        <PriceCalculator api={api} />
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <a
            href={api.documentationUrl}
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
