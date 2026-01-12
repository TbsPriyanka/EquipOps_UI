import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getThemeMode } from '@/utils/Utils';

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getThemeMode());

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <ThemeContext value={{ toggleTheme, theme, setTheme }}>{children}</ThemeContext>;
};

ThemeProvider.propTypes = {
    children: PropTypes.node
};

export { ThemeContext, ThemeProvider };
