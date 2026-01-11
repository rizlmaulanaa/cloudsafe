import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './Icons';

export const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Cek preferensi awal dari class HTML
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.remove('dark');
            setIsDark(false);
        } else {
            html.classList.add('dark');
            setIsDark(true);
        }
    };

    return (
        <button 
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:scale-110 hover:shadow-cyan-500/20 transition-all duration-300 group"
            aria-label="Ganti Tema"
            title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
        >
            {isDark ? (
                <SunIcon className="w-6 h-6 text-yellow-400 rotate-0 transition-transform duration-500 group-hover:rotate-90" />
            ) : (
                <MoonIcon className="w-6 h-6 text-slate-600 rotate-0 transition-transform duration-500 group-hover:-rotate-12" />
            )}
        </button>
    );
};