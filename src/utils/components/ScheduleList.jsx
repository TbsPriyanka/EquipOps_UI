export const ScheduleList = () => {
    const schedules = [
        { time: '1:00 PM', role: 'Software Developer', applicants: 120, color: 'bg-indigo-100 text-indigo-700' },
        { time: '2:30 PM', role: 'Software Developer', applicants: 75, color: 'bg-blue-100 text-blue-700' },
        { time: '4:00 PM', role: 'Sales Manager', applicants: 76, color: 'bg-green-100 text-green-700' },
        { time: '5:30 PM', role: 'Sales Manager', applicants: 60, color: 'bg-pink-100 text-pink-700' }
    ];

    return (
        <div className="fl-card flex-col rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">Schedule</h3>
                <span className="text-xs text-gray-400">Today</span>
            </div>

            <div className="space-y-3">
                {schedules.map((s, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:shadow-md transition ${s.color}`}
                    >
                        <div>
                            <h4 className="text-sm font-semibold">{s.role}</h4>
                            <p className="text-xs">{s.applicants} Applicants</p>
                        </div>
                        <span className="text-xs font-medium">{s.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
