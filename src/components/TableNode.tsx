import { Handle, Position, NodeProps } from 'reactflow';
import { TableNode as TableNodeType, useSchemaStore, Column } from '../store/schema-store';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Trash2, Plus, GripHorizontal } from 'lucide-react';
import { AddColumnDialog } from './AddColumnDialog';

interface TableNodeProps extends NodeProps {
  data: TableNodeType['data'];
}

export const TableNode: React.FC<TableNodeProps> = ({ id, data }) => {
  const { removeTable, removeColumn } = useSchemaStore();

  const handleRemoveTable = () => {
    removeTable(id);
  };

  const handleRemoveColumn = (columnId: string) => {
    removeColumn(id, columnId);
  };

  return (
    <div className="relative min-w-[280px]">
      {/* Source handle (where connections start) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-3 h-3 bg-blue-500/80 border-2 border-white dark:border-zinc-900 right-[-7px]"
      />

      {/* Target handle (where connections end) */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-3 h-3 bg-blue-500/80 border-2 border-white dark:border-zinc-900 left-[-7px]"
      />

      <Card className="border border-zinc-300 dark:border-zinc-700 shadow-lg overflow-hidden bg-white dark:bg-zinc-800">
        <CardHeader className="py-3 px-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <GripHorizontal className="h-4 w-4 text-zinc-400 cursor-grab" />
            <CardTitle className="text-base font-medium text-zinc-900 dark:text-zinc-100">{data.name}</CardTitle>
          </div>
          <div className="flex space-x-1">
            <AddColumnDialog tableId={id} />
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
              onClick={handleRemoveTable}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-xs bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="py-2 px-3 border-b border-r border-zinc-200 dark:border-zinc-700 text-left font-medium text-zinc-600 dark:text-zinc-400">Column</th>
                  <th className="py-2 px-3 border-b border-r border-zinc-200 dark:border-zinc-700 text-left font-medium text-zinc-600 dark:text-zinc-400">Type</th>
                  <th className="py-2 px-3 border-b border-zinc-200 dark:border-zinc-700 text-left font-medium text-zinc-600 dark:text-zinc-400">Constraints</th>
                  <th className="py-2 px-1 border-b border-zinc-200 dark:border-zinc-700 w-8"></th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {data.columns.map((column) => (
                  <tr key={column.id} className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-2 px-3 border-r border-zinc-200 dark:border-zinc-700 font-medium text-zinc-900 dark:text-zinc-300">
                      {column.name}
                    </td>
                    <td className="py-2 px-3 border-r border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                      {column.type.toUpperCase()}
                      {column.length ? `(${column.length})` : ''}
                    </td>
                    <td className="py-2 px-3 text-zinc-600 dark:text-zinc-400">
                      <div className="flex flex-wrap gap-1">
                        {column.primaryKey && (
                          <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-[10px] font-medium">PK</span>
                        )}
                        {column.unique && !column.primaryKey && (
                          <span className="px-1.5 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-[10px] font-medium">UQ</span>
                        )}
                        {!column.nullable && !column.primaryKey && (
                          <span className="px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded text-[10px] font-medium">NN</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-1 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 rounded-sm hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
                        onClick={() => handleRemoveColumn(column.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {data.columns.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-3 px-3 text-center text-zinc-500 dark:text-zinc-400 italic">
                      No columns defined
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
