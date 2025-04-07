import { useEffect, useState } from "react";


type Theme = 'light' | 'dark';

export function useTheme(){
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark').matches;

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (systemPrefersDark) {
            setTheme('dark')
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev == 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme}
}
