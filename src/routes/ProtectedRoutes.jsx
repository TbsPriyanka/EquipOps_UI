import ProtectedLayout from '@/utils/layouts/ProtectedLayout';
import Setting from '@/views/Setting';
import Profile from '@/views/Profile';
import Interviews from '@/views/Interviews';
import Interviewers from '@/views/Interviewers';
import InterviewInfo from '@/views/Interviews/Details';
import EditInterview from '@/views/Interviews/EditInterview';
import CandidateInfo from '@/views/Interviews/Details/Candidate';
import ChangePassword from '@/views/Profile/ChangePassword';
import Dashboard from '@/views/Dashboard';
import InterviewCall from '@/views/InterviewCall';
import PrivateGuard from '@/utils/guards/PrivateGuard';
import Organization from '@/views/Organization';
import InterviewerVoiceList from '@/views/Interviewers/InterviewerVoiceList';
import CreateInterviewer from '@/views/Interviewers/CreateInterviewer';
import UserManagement from '@/views/UserManagement';
import UserForm from '@/views/UserManagement/UserForm';
import Language from '@/views/Language';

const ProtectedRoutes = [
    {
        path: '/',
        element: (
            <PrivateGuard>
                <ProtectedLayout />
            </PrivateGuard>
        ),
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'interviews',
                children: [
                    { path: '', element: <Interviews /> },
                    {
                        path: 'detail',
                        element: <InterviewInfo />
                    },
                    {
                        path: 'candidate',
                        element: <CandidateInfo />
                    },
                    {
                        path: 'edit',
                        element: <EditInterview />
                    }
                ]
            },
            {
                path: 'interviewers',
                children: [
                    {
                        path: '',
                        element: <Interviewers />
                    },
                    {
                        path: 'create',
                        element: <CreateInterviewer />
                    },
                    {
                        path: 'edit/:id',
                        element: <CreateInterviewer />
                    },
                    {
                        path: 'voices',
                        element: <InterviewerVoiceList />
                    }
                ]
            },
            {
                path: 'setting',
                element: <Setting />
            },
            {
                path: 'profile',
                children: [
                    { path: '', element: <Profile /> },
                    { path: 'change-password', element: <ChangePassword /> }
                ]
            },
            {
                path: 'organization',
                children: [{ path: '', element: <Organization /> }]
            },
            {
                path: 'user-management',
                children: [
                    { path: '', element: <UserManagement /> },
                    { path: 'create', element: <UserForm /> }
                ]
            },
            {
                path: 'language',
                children: [{ path: '', element: <Language /> }]
            }
        ]
    },
    { path: 'call/:token?', element: <InterviewCall /> }
];
export default ProtectedRoutes;
