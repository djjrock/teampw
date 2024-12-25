import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/Button';
import { Upload, AlertCircle, Download, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Modal } from '../ui/Modal';

interface CSVImportModalProps {
  onClose: () => void;
}

const sampleCSV = `name,username,password,url,category,notes
"Company Gmail","admin@company.com","securepass123","https://gmail.com","Email","Main company email"
"GitHub","dev@company.com","gh_token123","https://github.com","Development","Company GitHub account"
"AWS Console","admin@company.com","aws_secret!","https://aws.amazon.com","Cloud","AWS root account"`;

export const CSVImportModal: React.FC<CSVImportModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string[][]>([]);
  const [importing, setImporting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split('\n').map(line => line.split(','));
      setPreview(lines.slice(0, 5)); // Show first 5 lines
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  const downloadTemplate = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    if (!file) return;
    setImporting(true);
    // Simulate import process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setImporting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Import Passwords"
      maxWidth="2xl"
      description="Import your passwords from a CSV file"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">CSV File Format</h3>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={downloadTemplate}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
          <div className="bg-gray-50 dark:bg-[#18181B] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre">
              name,username,password,url,category,notes
            </code>
          </div>
        </div>

        <div 
          {...getRootProps()} 
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive 
              ? "border-gray-400 bg-gray-50 dark:border-gray-600 dark:bg-[#27272A]" 
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">Drop your CSV file here</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drag & drop your CSV file here, or click to select
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Only .csv files are supported
              </p>
            </div>
          )}
        </div>

        {file && preview.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Preview</h3>
            <div className="bg-gray-50 dark:bg-[#18181B] rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    {preview[0].map((header, i) => (
                      <th 
                        key={i}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"
                      >
                        {header.replace(/["']/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {preview.slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td 
                          key={j}
                          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
                        >
                          {cell.replace(/["']/g, '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className={cn(
          "p-4 rounded-lg flex items-start gap-3",
          "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50"
        )}>
          <AlertCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium mb-1">Before You Import</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Ensure your CSV follows the template format exactly</li>
              <li>All passwords will be encrypted before storage</li>
              <li>Duplicate entries will be skipped</li>
              <li>Maximum 1000 passwords per import</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-800">
          <Button 
            variant="secondary" 
            onClick={onClose}
            className="bg-white dark:bg-[#27272A] text-gray-900 dark:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || importing}
            className="bg-[#18181B] hover:bg-[#27272A] dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90 text-white dark:text-[#18181B]"
          >
            {importing ? (
              <>
                <span className="animate-pulse">Importing...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Import Passwords
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};