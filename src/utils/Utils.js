import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...input) {
    return twMerge(clsx(input));
}

export function getThemeMode() {
    const theme = localStorage.getItem('theme');
    return theme ?? 'light';
}

export function detectIsMobile() {
    if (typeof window === 'undefined') return false;

    const ua = navigator.userAgent;
    const uaTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const widthTest = window.innerWidth <= 768;

    return uaTest || widthTest;
}
