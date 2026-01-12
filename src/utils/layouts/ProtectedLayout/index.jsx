import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { detectIsMobile } from 'src/utils/Utils';
// import { cn, detectIsMobile } from 'src/utils/Utils';

const ProtectedLayout = () => {
    const [open, setOpen] = useState(!detectIsMobile());
    const toggleSidebar = () => setOpen(!open);

    useEffect(() => {
        const update = () => {
            const result = !detectIsMobile();
            setOpen(result);
        };

        window.addEventListener('resize', update);
        window.addEventListener('orientationchange', update);

        update(); // sync on mount

        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('orientationchange', update);
        };
    }, []);

    return (
        <div className="relative flex h-dvh overflow-hidden">
            <Sidebar open={open} />

            <main
                className={cn(
                    'flex-1 flex flex-col w-full overflow-y-auto overscroll-y-auto',
                    'transition-normal duration-500 ease-in-out',
                    open ? 'md:ml-0' : 'md:-ml-60'
                )}
            >
                <Navbar toggleSidebar={toggleSidebar} />
                <section className="flex-1 flex flex-col p-4">
                    <Outlet />
                </section>
            </main>

            <div
                className={`absolute inset-0 bg-black/25 z-10 backdrop-blur-sm md:hidden ${!open ? 'hidden' : ''}`}
                onClick={() => toggleSidebar()}
            ></div>
        </div>
    );
};

export default ProtectedLayout;
