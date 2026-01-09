import PublicGuard from '@/utils/guards/PublicGuard';
import AuthLayout from '@/utils/layouts/AuthLayout';
import ForgotPassword from '@/views/Authentication/ForgotPassword';
import Login from '@/views/Authentication/Login';
import Registration from '@/views/Authentication/Registration';
import ResetPassword from '@/views/Authentication/ResetPassword';
import Vendor from '@/views/Vendor';

const AuthRoutes = {
    path: '/',
    element: (
        <PublicGuard>
            <AuthLayout />
        </PublicGuard>
    ),
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'registration',
            element: <Registration />
        },
        {
            path: 'forgot-password',
            element: <ForgotPassword />
        },
        {
            path: 'reset-password/:token',
            element: <ResetPassword />
        },
        {
            path: 'vendor',
            element: <Vendor />
        }
    ]
};
export default AuthRoutes;
