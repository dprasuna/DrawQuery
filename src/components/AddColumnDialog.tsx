import { useState } from 'react';
import { useSchemaStore, Column, ColumnType } from '../store/schema-store';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Plus, CheckSquare } from 'lucide-react';

interface AddColumnDialogProps {
  tableId: string;
}

export const AddColumnDialog: React.FC<AddColumnDialogProps> = ({ tableId }) => {
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState<ColumnType>('varchar');
  const [length, setLength] = useState<number | undefined>(255);
  const [isPrimaryKey, setIsPrimaryKey] = useState(false);
  const [isUnique, setIsUnique] = useState(false);
  const [isNullable, setIsNullable] = useState(true);
  const [defaultValue, setDefaultValue] = useState<string | undefined>(undefined);

  const { addColumn } = useSchemaStore();

  const handleAddColumn = () => {
    if (columnName.trim()) {
      const newColumn: Column = {
        id: `column-${Date.now()}`,
        name: columnName.trim(),
        type: columnType,
        length: length,
        primaryKey: isPrimaryKey,
        unique: isUnique,
        nullable: isNullable,
        defaultValue: defaultValue,
      };

      addColumn(tableId, newColumn);
      resetForm();
      setOpen(false);
    }
  };

  const resetForm = () => {
    setColumnName('');
    setColumnType('varchar');
    setLength(255);
    setIsPrimaryKey(false);
    setIsUnique(false);
    setIsNullable(true);
    setDefaultValue(undefined);
  };

  const showLengthField = columnType === 'varchar';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Column</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="columnName" className="text-sm font-medium">
                Column Name
              </label>
              <Input
                id="columnName"
                placeholder="Enter column name..."
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="columnType" className="text-sm font-medium">
                Data Type
              </label>
              <select
                id="columnType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={columnType}
                onChange={(e) => setColumnType(e.target.value as ColumnType)}
              >
                <option value="varchar">VARCHAR</option>
                <option value="text">TEXT</option>
                <option value="integer">INTEGER</option>
                <option value="float">FLOAT</option>
                <option value="boolean">BOOLEAN</option>
                <option value="date">DATE</option>
                <option value="datetime">DATETIME</option>
                <option value="time">TIME</option>
                <option value="uuid">UUID</option>
                <option value="json">JSON</option>
                <option value="bigint">BIGINT</option>
              </select>
            </div>

            {showLengthField && (
              <div className="space-y-2">
                <label htmlFor="length" className="text-sm font-medium">
                  Length
                </label>
                <Input
                  id="length"
                  type="number"
                  placeholder="255"
                  value={length || ''}
                  onChange={(e) => setLength(e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>
            )}

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-medium">Constraints</h3>

              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPrimaryKey"
                    checked={isPrimaryKey}
                    onChange={(e) => {
                      setIsPrimaryKey(e.target.checked);
                      if (e.target.checked) {
                        setIsNullable(false);
                      }
                    }}
                    className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPrimaryKey" className="text-sm text-zinc-700 dark:text-zinc-300">
                    Primary Key
                  </label>
                </div>

                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isUnique"
                    checked={isUnique}
                    onChange={(e) => setIsUnique(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isUnique" className="text-sm text-zinc-700 dark:text-zinc-300">
                    Unique
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isNullable"
                  checked={isNullable}
                  onChange={(e) => setIsNullable(e.target.checked)}
                  disabled={isPrimaryKey}
                  className="h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                />
                <label
                  htmlFor="isNullable"
                  className={`text-sm ${isPrimaryKey ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}`}
                >
                  Nullable
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="defaultValue" className="text-sm font-medium">
                Default Value (optional)
              </label>
              <Input
                id="defaultValue"
                placeholder="Default value..."
                value={defaultValue || ''}
                onChange={(e) => setDefaultValue(e.target.value || undefined)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            resetForm();
            setOpen(false);
          }}>
            Cancel
          </Button>
          <Button onClick={handleAddColumn} disabled={!columnName.trim()}>
            Add Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
