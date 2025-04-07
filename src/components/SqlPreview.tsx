import { useEffect, useState } from 'react';
import { generateSchemaSQL } from '../lib/sql-generator';
import { useSchemaStore, TableNode } from '../store/schema-store';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Check, Copy, Code, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export const SqlPreview = () => {
  const { nodes, edges } = useSchemaStore();
  const [sql, setSql] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const generatedSQL = generateSchemaSQL(nodes, edges);
    setSql(generatedSQL || '-- No tables defined yet. Add some tables to generate SQL.');
  }, [nodes, edges]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sql).then(() => {
      setCopied(true);
      toast({
        description: 'SQL copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadSQL = () => {
    const blob = new Blob([sql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'schema.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-b-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">Generated SQL</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleCopyToClipboard}
              variant="ghost"
              size="sm"
              className="h-8 text-xs flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </Button>
            <Button
              onClick={handleDownloadSQL}
              variant="ghost"
              size="sm"
              className="h-8 text-xs flex items-center gap-1"
            >
              <Download size={14} />
              Download
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-900/50">
        <pre className="text-xs font-mono whitespace-pre-wrap p-4 rounded-md bg-white dark:bg-zinc-900 shadow-sm h-full overflow-auto">
          <code className="text-zinc-800 dark:text-zinc-200">{sql}</code>
        </pre>
      </div>
    </div>
  );
};
