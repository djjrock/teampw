import React, { useState, useCallback } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, Upload, FileText, AlertCircle, Download, Check } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface CSVImportModalProps {
  onClose: () => void;
}

const sampleCSV = `name,username,password,url,category,notes
"Company Gmail","admin@company.com","securepass123","https://gmail.com","Email","Main company email"
"AWS Console","devops@company.com","awspass456","https://aws.amazon.com","Servers","Production AWS account"`;

export const CSVImportModal: React.FC<CSVImportModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<string[][]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const rows = text.split('\n').map(row => row.split(','));
      setPreview(rows.slice(0, 3)); // Show first 3 rows
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setImporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-800" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Import Passwords</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">CSV File Format</h3>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={downloadTemplate}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-600 whitespace-pre">
                name,username,password,url,category,notes
              </code>
            </div>
          </div>

          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-sm text-gray-600">Drop your CSV file here</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Drag & drop your CSV file here, or click to select
                </p>
                <p className="text-xs text-gray-500">
                  Only .csv files are supported
                </p>
              </div>
            )}
          </div>

          {file && preview.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Preview</h3>
              <div className="bg-gray-50 rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      {preview[0].map((header, i) => (
                        <th 
                          key={i}
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {header.replace(/["']/g, '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {preview.slice(1).map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td 
                            key={j}
                            className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap"
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Before You Import</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ensure your CSV follows the template format exactly</li>
                <li>All passwords will be encrypted before storage</li>
                <li>Duplicate entries will be skipped</li>
                <li>Maximum 1000 passwords per import</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || importing}
              className="bg-[#101827] hover:bg-gray-800"
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
      </Card>
    </div>
  );
};