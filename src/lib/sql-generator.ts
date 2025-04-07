import { Edge, Node } from 'reactflow';
import { TableData, TableNode, ColumnType } from '../store/schema-store';

// Helper function to generate SQL type for a column
const getSqlType = (type: ColumnType, length?: number): string => {
  switch (type) {
    case 'varchar':
      return `VARCHAR(${length || 255})`;
    case 'text':
      return 'TEXT';
    case 'integer':
      return 'INTEGER';
    case 'float':
      return 'FLOAT';
    case 'boolean':
      return 'BOOLEAN';
    case 'date':
      return 'DATE';
    case 'datetime':
      return 'DATETIME';
    case 'time':
      return 'TIME';
    case 'uuid':
      return 'UUID';
    case 'json':
      return 'JSON';
    case 'bigint':
      return 'BIGINT';
    default:
      return 'VARCHAR(255)';
  }
};

// Generate SQL for a single table
export const generateTableSQL = (table: TableData): string => {
  const { name, columns } = table;

  if (!columns.length) {
    return `CREATE TABLE ${name} (\n  id INTEGER PRIMARY KEY\n);\n`;
  }

  const columnDefinitions = columns.map((column) => {
    const { name, type, length, nullable, primaryKey, unique, defaultValue } = column;

    let definition = `  ${name} ${getSqlType(type, length)}`;

    if (primaryKey) {
      definition += ' PRIMARY KEY';
    }

    if (!nullable && !primaryKey) {
      definition += ' NOT NULL';
    }

    if (unique && !primaryKey) {
      definition += ' UNIQUE';
    }

    if (defaultValue !== undefined) {
      definition += ` DEFAULT ${defaultValue}`;
    }

    return definition;
  });

  // Check for primary key defined as a constraint
  const hasPrimaryKey = columns.some((column) => column.primaryKey);

  if (!hasPrimaryKey && columns.length > 0) {
    // Add id column as primary key
    columnDefinitions.unshift('  id INTEGER PRIMARY KEY');
  }

  return `CREATE TABLE ${name} (\n${columnDefinitions.join(',\n')}\n);\n`;
};

// Helper function to extract relationship information from edges
const getRelationships = (nodes: TableNode[], edges: Edge[]): { source: string; target: string; sourceTable: string; targetTable: string }[] => {
  return edges.map(edge => {
    const sourceNode = nodes.find(node => node.id === edge.source);
    const targetNode = nodes.find(node => node.id === edge.target);

    return {
      source: edge.source,
      target: edge.target,
      sourceTable: sourceNode?.data.name || '',
      targetTable: targetNode?.data.name || ''
    };
  }).filter(rel => rel.sourceTable && rel.targetTable);
};

// Generate foreign key constraints based on relationships
const generateForeignKeySQL = (relationships: { source: string; target: string; sourceTable: string; targetTable: string }[]): string => {
  return relationships.map(rel => {
    return `ALTER TABLE ${rel.sourceTable} ADD FOREIGN KEY (${rel.targetTable.toLowerCase()}_id) REFERENCES ${rel.targetTable}(id);\n`;
  }).join('');
};

// Generate complete SQL for the schema
export const generateSchemaSQL = (nodes: TableNode[], edges: Edge[]): string => {
  // Generate table creation SQL
  const tableSQL = nodes.map(node => generateTableSQL(node.data)).join('\n');

  // Generate relationship SQL (foreign keys)
  const relationships = getRelationships(nodes, edges);
  const relationshipSQL = generateForeignKeySQL(relationships);

  return tableSQL + '\n' + relationshipSQL;
};
