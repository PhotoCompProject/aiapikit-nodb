import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { ApiOutput } from '../../types/admin';

interface OutputListProps {
  outputs: ApiOutput[];
  onEdit: (output: ApiOutput) => void;
  onDelete: (id: number) => void;
}

export const OutputList: React.FC<OutputListProps> = ({
  outputs,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      {outputs.map((output) => (
        <div
          key={output.id}
          className="flex items-center justify-between p-4 bg-surface-800/30 rounded-lg border border-surface-700/50"
        >
          <div>
            <h4 className="font-medium text-white">{output.name}</h4>
            <p className="text-sm text-gray-400">
              Formula: <code className="px-2 py-1 bg-surface-700/50 rounded">{output.calculationFormula}</code>
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(output)}
              className="p-1 text-gray-400 hover:text-white"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(output.id)}
              className="p-1 text-gray-400 hover:text-red-400"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};