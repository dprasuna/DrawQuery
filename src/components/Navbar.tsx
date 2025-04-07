import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{" "}
        <span className="sr-only">Toggle Theme</span>
      </Button>
    );
  }
  return (
    <header className="relative z-10 border-b border-gray-700 bg-[#07090C] backdrop-blur-sm">
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
            <span className="font-medium">DrawQuery</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/app" className="text-sm font-medium text-gray-300 hover:text-white">
            Editor
          </Link>
          <Link to="/guide" className="text-sm font-medium text-gray-300 hover:text-white">
            Docs
          </Link>
          <Link to="https://x.com/prasunadash" className="text-sm font-medium text-gray-300 hover:text-white">
            Contact
          </Link>
        </nav>
        <div className="-ml-6 flex">
          <div className="">
            <ThemeToggle />
          </div>
          <Link
            to="https://github.com/dprasuna"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Github
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
