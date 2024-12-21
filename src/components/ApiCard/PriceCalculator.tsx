import React, { useState } from 'react';
import { ApiProvider } from '../../types/api';
import { useStore } from '../../store/useStore';
import { UsageSlider } from './Sliders/UsageSlider';
import { PriceToggle } from './PriceDisplay/PriceToggle';
import { formatDetailNumber } from '../../utils/numberFormat';

interface PriceCalculatorProps {
  api: ApiProvider;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ api }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const { 
    globalUsage,
    globalOutputUsage,
    usageOverrides,
    setUsageOverride,
    removeUsageOverride
  } = useStore();

  const override = usageOverrides[api.id];
  const inputUsage = override?.input ?? globalUsage ?? api.inputMetric.defaultValue;
  const outputUsage = override?.output ?? globalOutputUsage ?? api.inputMetric.outputDefaultValue ?? api.inputMetric.defaultValue;

  const isTextGeneration = api.category === 'text-generation';
  const isImageGeneration = api.category === 'image-generation';
  const isSpeechToText = api.category === 'speech-to-text';

  const calculatePrice = (usage: number, outputUsage?: number) => {
    if (api.pricePerUnit.operation) {
      return usage * api.pricePerUnit.operation;
    }
    
    if (api.pricePerUnit.input && api.pricePerUnit.output && outputUsage) {
      return (usage * api.pricePerUnit.input) + (outputUsage * api.pricePerUnit.output);
    }

    return 0;
  };

  const monthlyPrice = calculatePrice(inputUsage, isTextGeneration ? outputUsage : undefined);
  const yearlyPrice = monthlyPrice * 12;

  const handleInputChange = (value: number) => {
    if (value === (globalUsage ?? api.inputMetric.defaultValue)) {
      removeUsageOverride(api.id);
    } else {
      setUsageOverride(api.id, value, override?.output);
    }
  };

  const handleOutputChange = (value: number) => {
    if (!isTextGeneration) return;
    setUsageOverride(api.id, override?.input ?? inputUsage, value);
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-4">
          {usageOverrides[api.id] && (
            <button
              onClick={() => removeUsageOverride(api.id)}
              className="text-xs text-orange-500 hover:text-orange-600 font-medium"
            >
              Reset to Global
            </button>
          )}
        </div>

        <div className="flex gap-4">
          <UsageSlider
            label={isImageGeneration ? 'Images' : isTextGeneration ? 'Input Tokens' : 'Audio Minutes'}
            value={inputUsage}
            min={api.inputMetric.min}
            max={api.inputMetric.max}
            step={api.inputMetric.step}
            onChange={handleInputChange}
          />

          {isTextGeneration && (
            <UsageSlider
              label="Output Tokens"
              value={outputUsage}
              min={api.inputMetric.min}
              max={api.inputMetric.max}
              step={api.inputMetric.step}
              onChange={handleOutputChange}
            />
          )}
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200">
        <PriceToggle
          viewMode={viewMode}
          onToggle={setViewMode}
          monthlyPrice={monthlyPrice}
          yearlyPrice={yearlyPrice}
        />
        
        <div className="p-4 bg-white rounded-b-lg space-y-4">
          <div className="space-y-4">
            {/* Usage Count */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-600">
                {viewMode === 'monthly' ? 'Monthly' : 'Yearly'} {isTextGeneration ? 'Tokens' : api.inputMetric.type === 'images' ? 'Images' : 'Minutes'}
              </div>
              <div className="text-sm text-gray-900 font-medium text-right">
                {formatDetailNumber(viewMode === 'monthly' 
                  ? (isTextGeneration ? inputUsage + outputUsage : inputUsage)
                  : (isTextGeneration ? (inputUsage + outputUsage) * 12 : inputUsage * 12)
                )}
              </div>
            </div>

            {/* Cost per unit (only for non-text generation) */}
            {!isTextGeneration && (
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-600">
                  Cost per {api.inputMetric.type === 'images' ? 'Image' : 'Minute'}
                </div>
                <div className="text-sm text-gray-900 font-medium text-right">
                  ${api.pricePerUnit.operation}
                </div>
              </div>
            )}

            {/* Total Cost */}
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
              <div className="text-sm font-medium text-gray-900">Total Cost</div>
              <div className="text-sm font-medium text-gray-900 text-right">
                ${formatDetailNumber(viewMode === 'monthly' ? monthlyPrice : yearlyPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
