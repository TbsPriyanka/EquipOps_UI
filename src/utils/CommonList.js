import { LuLayoutDashboard, LuBriefcase, LuBuilding2, LuUsers, LuUserCog, LuSettings, LuLanguages } from 'react-icons/lu';

export const CardBgColors = [
    'bg-teal-200/50',
    'bg-yellow-200/50',
    'bg-violet-200/50',
    'bg-pink-200/50',
    'bg-purple-200/50',
    'bg-rose-200/50'
];

export const InterviewersList = [
    { id: 1, first_name: 'Alice', last_name: 'Johnson', avatar: './female_avatar.png' },
    { id: 2, first_name: 'Charlie', last_name: 'Brown', avatar: './male_avatar3.png' },
    { id: 3, first_name: 'Diana', last_name: 'Prince', avatar: './female_avatar2.png' },
    { id: 4, first_name: 'Bob', last_name: 'Smith', avatar: './male_avatar.png' },
    { id: 5, first_name: 'Fiona', last_name: 'Gallagher', avatar: './female_avatar3.png' }
];

export const QuestionLevels = [
    { label: 'Low', value: 'low', classes: 'text-gray-700 bg-gray-100' },
    { label: 'Medium', value: 'medium', classes: 'text-gray-800 bg-gray-200' },
    { label: 'High', value: 'high', classes: 'text-black bg-gray-300' }
];

export const SideList = [
    { title: 'Dashboard', value: '/', Icon: LuLayoutDashboard },
    { title: 'Interviews', value: 'interviews', Icon: LuBriefcase },
    { title: 'Interviewers', value: 'interviewers', Icon: LuUsers },
    { title: 'Organization', value: 'organization', Icon: LuBuilding2 },
    { title: 'User Management', value: 'user-management', Icon: LuUserCog },
    { title: 'Language', value: 'language', Icon: LuLanguages },
    { title: 'Setting', value: 'setting', Icon: LuSettings },
    { title: 'Vendor', value: 'vendor', Icon: LuUserCog }
    // { title: 'Profile', value: 'profile', Icon: LuUser },
    // { title: 'Logout', value: 'login', Icon: LuLogOut }
];
