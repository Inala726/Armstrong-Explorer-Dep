import { Link } from 'react-router-dom';
import { Eye, Trophy, Lock } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'Alexander Mathos';
  const firstName = userName.split(' ')[0];

  const recentActivity = [
    { num: 153, result: 'Positive', date: 'Oct 24, 2024', status: 'positive' },
    { num: 370, result: 'Positive', date: 'Oct 22, 2024', status: 'positive' },
    { num: 94, result: 'Negative', date: 'Oct 21, 2024', status: 'negative' },
  ];

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Welcome Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-10 relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">Welcome back, {firstName}!</h2>
            <p className="text-gray-500 max-w-lg leading-relaxed mb-8">
              Ready to explore new numerical patterns? Your progress in narcissistic number theories is currently 15% higher than last month.
            </p>
            <div className="flex space-x-4">
              <Link to="/calculator" className="bg-blue-950 text-white px-8 py-3 rounded font-bold text-sm hover:bg-blue-900 transition-colors">
                Start New Calculation
              </Link>
              <Link to="/attempts" className="border border-blue-950 text-blue-950 px-8 py-3 rounded font-bold text-sm hover:bg-gray-50 transition-colors">
                View History
              </Link>
            </div>
          </div>
          {/* Decorative Background Letter */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end pr-10 opacity-[0.03] select-none pointer-events-none">
            <span className="text-[200px] font-bold text-blue-950 leading-none">Σ</span>
          </div>
        </div>

        {/* Definition of the Day */}
        <div className="bg-blue-900 rounded-xl p-8 text-white flex flex-col justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/60 mb-4">Definition of the Day</p>
            <h3 className="text-2xl font-bold mb-4 text-white">Armstrong Number</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 opacity-90">
              A number that is the sum of its own digits each raised to the power of the number of digits.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 font-mono text-[11px] text-blue-50 border border-white/5">
            153 = 1³ + 5³ + 3³
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Total Attempts</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-blue-950 leading-none tracking-tight">14</span>
            <span className="text-green-500 text-[10px] font-bold flex items-center italic">
              <span className="mr-0.5 text-[8px]">↗</span> +3 this week
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Last Result</p>
          <div className="flex items-center space-x-3">
            <span className="text-4xl font-bold text-blue-950 leading-none tracking-tight">153</span>
            <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Armstrong</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Success Rate</p>
          <div className="flex flex-col space-y-4">
            <span className="text-4xl font-bold text-blue-950 leading-none tracking-tight">85%</span>
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div className="bg-blue-900 h-1 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-gray-50">
            <h3 className="text-xl font-bold text-blue-950">Recent activity preview</h3>
            <Link to="/attempts" className="text-blue-800 text-xs font-bold hover:underline">View all history</Link>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Number Investigated</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Result</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivity.map((activity, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-blue-950">{activity.num}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      activity.status === 'positive' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {activity.result}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">{activity.date}</td>
                  <td className="px-8 py-6 text-blue-900 cursor-pointer hover:text-blue-700 transition-colors">
                    <Eye className="w-4 h-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* Calculation Breakdown */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm relative">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-blue-900"><span className="text-xl font-bold">⌖</span></div>
              <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em]">Calculation Breakdown</h4>
            </div>
            
            <div className="bg-blue-50/50 rounded-lg p-6 font-mono text-xs text-blue-900 leading-relaxed mb-6 border border-blue-50">
              <p className="font-bold mb-2">Analyzing: 153</p>
              <p>digits = 3</p>
              <p>Σ = (1³) + (5³) + (3³)</p>
              <p>Σ = 1 + 125 + 27</p>
              <p className="font-bold">Σ = 153</p>
            </div>
            
            <p className="text-xs italic text-gray-500 leading-relaxed pr-10">
              "Since the sum matches the original number, 153 is confirmed as an Armstrong Number."
            </p>

            <button className="absolute bottom-10 right-8 bg-blue-950 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-900 transition-colors">
              <span className="text-xl">+</span>
            </button>
          </div>

          {/* Discovery Milestones */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] mb-6">Discovery Milestones</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">3-Digit Specialist</p>
                  <p className="text-[10px] text-gray-500">Found all 4 Armstrong numbers</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 opacity-50">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">4-Digit Explorer</p>
                  <p className="text-[10px] text-gray-500">Find 2 more to unlock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
