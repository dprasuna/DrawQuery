import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { SchemaEditor } from "./components/SchemaEditor";
import { SqlPreview } from "./components/SqlPreview";
import { Toaster } from "./components/ui/toaster";
import { GuideContent } from "./components/GuideContent";
import { useTheme } from "./hooks/useTheme";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { ScrollArea } from "./components/ui/scroll-area";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

// If you are reading this comment Thanks for checking out my codebase
// In the era seeing code bases of vibe coders I really missed the messages
// which senior developers used to leave for other devs :)

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{" "}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen flex-col bg-zinc-50 dark:bg-zinc-900 ${theme}`}>
      {/* <header className="relative z-10 border-b border-gray-700 bg-[#07090C] backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="font-medium">DBize</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/app" className="text-sm font-medium text-gray-300 hover:text-white">
              Editor
            </Link>
            <Link to="/guide" className="text-sm font-medium text-gray-300 hover:text-white">
              Docs
            </Link>
            <Link to="/faq" className="text-sm font-medium text-gray-300 hover:text-white">
              FAQ's
            </Link>
          </nav>
          <div className="flex -ml-6">
            <div className="">
              <ThemeToggle />
            </div>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
            >
              Github
            </Link>
          </div>
        </div>
      </header> */}
      <Navbar />

      {/* <Tabs defaultValue="editor" className="flex flex-1 flex-col">
        <div className="border-b bg-white px-6 dark:bg-zinc-800">
          <TabsList className="h-12 bg-transparent">
            <TabsTrigger
              value="editor"
              className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-zinc-100"
            >
              Schema Editor
            </TabsTrigger>
            <TabsTrigger
              value="guide"
              className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-zinc-100"
            >
              User Guide
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="editor" className="mt-0 flex flex-1 overflow-hidden p-0">
          <div className="h-full flex-1">
            <SchemaEditor />
          </div>

          <ScrollArea className="min-w-84 max-w-86 h-[89.5vh] overflow-auto border-l bg-white shadow-md dark:bg-zinc-800">
            <SqlPreview />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="guide" className="mt-0 flex-1 overflow-auto p-6">
          <GuideContent />
        </TabsContent>
      </Tabs> */}
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full flex-1">
          <SchemaEditor />
        </div>

        <div className="w-84 h-full overflow-auto border-l bg-white shadow-md dark:bg-zinc-800">
          <SqlPreview />
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
