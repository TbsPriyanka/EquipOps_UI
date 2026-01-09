export const ApplicantsTable = () => {
    const applicants = [
        { name: 'Emma Davis', type: 'Full-time', role: 'Software Engineer', date: 'Apr 15, 2025', status: 'Interviewing' },
        { name: 'Ryan Harris', type: 'Contract', role: 'HR Specialist', date: 'Apr 10, 2025', status: 'Shortlisted' },
        { name: 'Chloe Turner', type: 'Temporary', role: 'Sales Associate', date: 'Apr 18, 2025', status: 'Pending' },
        { name: 'Owen Mitchell', type: 'Full-time', role: 'Financial Analyst', date: 'Apr 22, 2025', status: 'Job Offer' },
        { name: 'Lily Foster', type: 'Part-time', role: 'Marketing Manager', date: 'Apr 20, 2025', status: 'Shortlisted' }
    ];

    const statusColor = {
        Interviewing: 'bg-yellow-100 text-yellow-800',
        Shortlisted: 'bg-green-100 text-green-800',
        Pending: 'bg-orange-100 text-orange-800',
        'Job Offer': 'bg-blue-100 text-blue-800'
    };

    return (
        <div className="rounded-2xl flex-col p-4 fl-card">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">Applicants List</h3>
                <div className="flex gap-2 text-sm text-gray-500">
                    <button className="hover:text-gray-800 font-medium">All</button>
                    <button className="hover:text-gray-800">Shortlisted</button>
                    <button className="hover:text-gray-800">Interviewing</button>
                    <button className="hover:text-gray-800">Job Offer</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-t border-gray-100">
                    <thead className="text-gray-500 bg-gray-200">
                        <tr>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Employment Type</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Interview Date</th>
                            <th className="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((a, i) => (
                            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="py-2 px-4 font-medium text-gray-800">{a.name}</td>
                                <td className="py-2 px-4 text-gray-600">{a.type}</td>
                                <td className="py-2 px-4 text-gray-600">{a.role}</td>
                                <td className="py-2 px-4 text-gray-600">{a.date}</td>
                                <td className="py-2 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[a.status]}`}>
                                        {a.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
