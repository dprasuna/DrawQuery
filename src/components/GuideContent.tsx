// src/components/GuideContent.tsx
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface GuideContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const GuideContent = ({ activeSection, setActiveSection }: GuideContentProps) => {
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -50% 0px' // Adjusts when sections become active
      }
    );

    // Observe all registered sections
    Object.values(sectionRefs.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);


  const registerSection = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="container mx-auto space-y-8 pb-8">
      {/* Getting Started Section */}
      <section
        id="getting-started"
        ref={registerSection('getting-started')}
        className={cn(
          "scroll-mt-24 transition-opacity duration-200",
          activeSection === 'getting-started' ? 'opacity-100' : 'opacity-90'
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-700 dark:text-zinc-300">
              Welcome to DBize, a visual database schema designer that helps you create and manage
              database schemas through an intuitive interface.
            </p>
            <div className="space-y-2">
              <h3 className="font-medium text-zinc-800 dark:text-zinc-200">Main Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                <li>Drag-and-drop table creation</li>
                <li>Column definition with various data types</li>
                <li>Visual relationship creation</li>
                <li>Real-time SQL generation</li>
                <li>Dark/light mode support</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Creating Tables Section */}
      <section
        id="creating-tables"
        ref={registerSection('creating-tables')}
        className={cn(
          "scroll-mt-24 transition-opacity duration-200",
          activeSection === 'creating-tables' ? 'opacity-100' : 'opacity-90'
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Creating Tables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-700 dark:text-zinc-300">
              Tables are the foundation of your database schema. Here's how to create them:
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-zinc-800 dark:text-zinc-200">Steps:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                <li>Click the "Add Table" button in the toolbar</li>
                <li>Enter a name for your table</li>
                <li>Click "Add Table" to create it</li>
                <li>Drag the table to position it on the canvas</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Working with Columns Section */}
      <section
        id="working-with-columns"
        ref={registerSection('working-with-columns')}
        className={cn(
          "scroll-mt-24 transition-opacity duration-200",
          activeSection === 'working-with-columns' ? 'opacity-100' : 'opacity-90'
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Working with Columns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-zinc-800 dark:text-zinc-200">Adding Columns:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                <li>Click the "+" button in a table header</li>
                <li>Fill in the column details:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Column name</li>
                    <li>Data type (VARCHAR, INTEGER, etc.)</li>
                    <li>Constraints (Primary Key, Unique, Nullable)</li>
                    <li>Default value (optional)</li>
                  </ul>
                </li>
                <li>Click "Add Column" to confirm</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Creating Relationships Section */}
      <section
        id="creating-relationships"
        ref={registerSection('creating-relationships')}
        className={cn(
          "scroll-mt-24 transition-opacity duration-200",
          activeSection === 'creating-relationships' ? 'opacity-100' : 'opacity-90'
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Creating Relationships</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-700 dark:text-zinc-300">
              Define how tables relate to each other by creating foreign key relationships.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-zinc-800 dark:text-zinc-200">How to create:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                <li>Click and drag from the right handle of a source table</li>
                <li>Drop the connection on the left handle of a target table</li>
                <li>The relationship will appear as a connecting line</li>
                <li>Foreign key constraints are automatically generated in the SQL</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Generating SQL Section */}
      <section
        id="generating-sql"
        ref={registerSection('generating-sql')}
        className={cn(
          "scroll-mt-24 transition-opacity duration-200",
          activeSection === 'generating-sql' ? 'opacity-100' : 'opacity-90'
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Generating SQL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-700 dark:text-zinc-300">
              DBize automatically generates SQL based on your visual schema design.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-zinc-800 dark:text-zinc-200">Features:</h4>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                <li>Real-time SQL preview in the right panel</li>
                <li>Copy SQL to clipboard with one click</li>
                <li>Download SQL as a .sql file</li>
                <li>Includes CREATE TABLE statements and foreign key constraints</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tips and Best Practices Section */}
      <section
        id="tips-and-best-practices"
        ref={registerSection('tips-and-best-practices')}
        className={cn(
          "scroll-mt-24 transition-opacity duration-200",
          activeSection === 'tips-and-best-practices' ? 'opacity-100' : 'opacity-90'
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tips and Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-zinc-800 dark:text-zinc-200">Design Tips:</h4>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                <li>Use singular nouns for table names (e.g., "user" not "users")</li>
                <li>Every table should have a primary key</li>
                <li>Consider adding created_at and updated_at timestamps</li>
                <li>Use appropriate data types for columns</li>
                <li>Add indexes for frequently queried columns</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
