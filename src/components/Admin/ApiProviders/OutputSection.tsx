import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Output } from '../../../types/admin';

interface OutputSectionProps {
  outputs: Array<{ name: string; formula: string }>;
  categoryOutputs: Output[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, output: { name: string; formula: string }) => void;
}

export const OutputSection: React.FC<OutputSectionProps> = ({
  outputs,
  categoryOutputs,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Outputs</h3>
        <button
          type="button"
          onClick={onAdd}
          className="text-primary-400 hover:text-primary-300"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {outputs.map((output, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center space-x-4">
            <select
              value={output.name}
              onChange={(e) => onChange(index, { ...output, name: e.target.value })}
              className="flex-1 rounded-md bg-surface-800 border border-surface-600 text-white"
            >
              <option value="">Select Output</option>
              {categoryOutputs.map((catOutput) => (
                <option key={catOutput.name} value={catOutput.name}>
                  {catOutput.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-400 hover:text-red-300"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>

          <input
            type="text"
            value={output.formula}
            onChange={(e) => onChange(index, { ...output, formula: e.target.value })}
            placeholder="Enter calculation formula"
            className="w-full rounded-md bg-surface-800 border border-surface-600 text-white"
          />
        </div>
      ))}
    </div>
  );
};