import { createBrowserRouter, RouterProvider } from 'react-router';
import ProtectedRoutes from './ProtectedRoutes';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AuthRoutes from './AuthRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // 🚫 no retry on failure
            refetchOnWindowFocus: false, // optional
            refetchOnReconnect: false // optional
        }
    }
});
const AppRoutes = () => {
    const router = createBrowserRouter([...ProtectedRoutes, AuthRoutes]);
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
            <Toaster
                duration={5000}
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    duration: 5000
                }}
            />
        </QueryClientProvider>
    );
};

export default AppRoutes;
