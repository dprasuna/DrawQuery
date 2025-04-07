// src/components/GuideSidebar.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface GuideSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const GuideSidebar = ({
  activeSection,
  onSectionChange
}: GuideSidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  const sections = [
    { id: 'getting-started', title: 'Getting Started', },
    { id: 'creating-tables', title: 'Creating Tables', },
    { id: 'working-with-columns', title: 'Working with Columns', },
    { id: 'creating-relationships', title: 'Creating Relationships',},
    { id: 'generating-sql', title: 'Generating SQL' },
    { id: 'tips-and-best-practices', title: 'Tips and Best Practices',}
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    // Smooth scroll to section
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className={cn(
      "h-full border-r bg-white dark:bg-zinc-800 transition-all duration-300 flex flex-col",
      expanded ? "w-64" : "w-20"
    )}>
      <div className="p-4 border-b flex justify-between items-center">
        {expanded ? (
          <h3 className="font-semibold">User Guide</h3>
        ) : (
          <div className="w-6" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="h-8 w-8"
        >
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "w-full text-left p-2 rounded-md transition-colors flex items-center",
                  activeSection === section.id
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 font-medium"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700",
                  expanded ? "gap-3" : "flex-col justify-center h-14 gap-1"
                )}
              >
                {expanded && (
                  <span className="flex-1 text-sm">{section.title}</span>
                )}
                {!expanded && (
                  <span className="text-xs text-center">
                    {section.title.split(' ')[0]}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
