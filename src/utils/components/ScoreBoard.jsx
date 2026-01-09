import { Doughnut } from 'react-chartjs-2';

const ScoreBoard = () => {
    const doughnutData = {
        labels: ['Engineering', 'Marketing', 'Sales', 'Customer Support', 'Finance', 'Human Resources'],
        datasets: [
            {
                data: [120, 110, 95, 85, 65, 50],
                backgroundColor: ['#B2C5FF', '#C5F5A4', '#E8F0FF', '#E0F7D4', '#F3F4FF', '#DDE3FF'],
                borderWidth: 0,
                cutout: '75%'
            }
        ]
    };

    const doughnutOptions = {
        plugins: {
            legend: { display: false }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    const totalApplications = doughnutData.datasets[0].data.reduce((a, b) => a + b, 0);

    return (
        <div className="rounded-2xl p-5 fl-card flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-800">Applications By Department</h2>
                <button className="flex items-center text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1">
                    <span className="mr-2">📅</span>Today
                </button>
            </div>

            <div className="flex flex-wrap gap-5 items-center justify-center sm:justify-evenly h-full">
                <div className="relative ">
                    <div className="w-[150px] h-[150px]">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">{totalApplications}</span>
                        <span className="text-xs font-medium text-gray-500">Total Applications</span>
                    </div>
                </div>

                <div className="w-full md:w-auto text-sm grid gap-2">
                    {doughnutData.labels.map((label, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[index] }}
                            ></span>
                            <span className="flex-1 text-gray-700 w-28">{label}</span>
                            <span className="font-semibold text-gray-800">{doughnutData.datasets[0].data[index]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
