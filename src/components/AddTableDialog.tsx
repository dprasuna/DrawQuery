import { useState } from 'react';
import { useSchemaStore, TableData } from '../store/schema-store';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Plus, Table as TableIcon } from 'lucide-react';

export const AddTableDialog = () => {
  const [open, setOpen] = useState(false);
  const [tableName, setTableName] = useState('');
  const { addTable } = useSchemaStore();

  const handleAddTable = () => {
    if (tableName.trim()) {
      const newTable: TableData = {
        name: tableName.trim(),
        columns: [],
      };

      addTable(newTable);
      setTableName('');
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tableName.trim()) {
      handleAddTable();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow"
          variant="outline"
          size="sm"
        >
          <TableIcon className="h-4 w-4" />
          <span>Add Table</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tableName" className="text-sm font-medium">
                Table Name
              </label>
              <Input
                id="tableName"
                placeholder="Enter table name..."
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTable} disabled={!tableName.trim()}>
            Add Table
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
