// src/routes/GuidePage.tsx
import { useState } from "react";
import { GuideSidebar } from "../components/GuideSidebar";
import { GuideContent } from "../components/GuideContent";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import Navbar from "@/components/Navbar";

export default function GuidePage() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("getting-started");

  return (
    <div className={`flex h-screen bg-zinc-50 dark:bg-zinc-900 ${theme}`}>
      <GuideSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* <header className="border-b bg-white px-6 py-3 shadow-sm dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              DBize
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </header> */}

        <Navbar />

        <main className="flex-1 overflow-auto p-6">
          <GuideContent activeSection={activeSection} setActiveSection={setActiveSection} />
        </main>
      </div>
    </div>
  );
}
