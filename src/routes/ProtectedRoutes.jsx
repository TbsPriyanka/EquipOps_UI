import ProtectedLayout from 'src/utils/layouts/ProtectedLayout';
import Setting from 'src/views/Setting';
import Profile from 'src/views/Profile';
import Interviews from 'src/views/Interviews';
import Interviewers from 'src/views/Interviewers';
import InterviewInfo from 'src/views/Interviews/Details';
import EditInterview from 'src/views/Interviews/EditInterview';
import CandidateInfo from 'src/views/Interviews/Details/Candidate';
import ChangePassword from 'src/views/Profile/ChangePassword';
import Dashboard from 'src/views/Dashboard';
import InterviewCall from 'src/views/InterviewCall';
import PrivateGuard from 'src/utils/guards/PrivateGuard';
import Organization from '@/views/Organization';
import InterviewerVoiceList from 'src/views/Interviewers/InterviewerVoiceList';
import CreateInterviewer from 'src/views/Interviewers/CreateInterviewer';
import UserManagement from 'src/views/UserManagement';
import UserForm from 'src/views/UserManagement/UserForm';
import Language from 'src/views/Language';

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
