import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Attempts = () => {
  const [attempts, setAttempts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'alexander' };

  useEffect(() => {
    const savedAttempts = JSON.parse(localStorage.getItem(`attempts_${user.username}`) || '[]');
    if (savedAttempts.length === 0) {
      // Sample data matching the design
      const samples = [
        { id: '0842', type: 'CHECK', value: '153', result: 'Armstrong', timestamp: 'Oct 24, 2024 · 14:22', status: 'positive' },
        { id: '0841', type: 'RANGE', value: '100 — 999', result: '4 Numbers Found', timestamp: 'Oct 24, 2024 · 11:05', status: 'positive' },
        { id: '0840', type: 'CHECK', value: '370', result: 'Armstrong', timestamp: 'Oct 23, 2024 · 16:45', status: 'positive' },
        { id: '0839', type: 'CHECK', value: '9474', result: 'Armstrong', timestamp: 'Oct 23, 2024 · 09:12', status: 'positive' },
        { id: '0838', type: 'CHECK', value: '121', result: 'Not Armstrong', timestamp: 'Oct 22, 2024 · 18:30', status: 'negative' },
      ];
      setAttempts(samples);
    } else {
      setAttempts(savedAttempts);
    }
  }, [user.username]);

  return (
    <DashboardLayout title="My Attempts">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Academic History</h2>
          <p className="text-gray-500 max-w-3xl leading-relaxed text-sm">
            A comprehensive log of your numerical explorations and pattern discoveries.
          </p>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-12">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-20">#</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-32">Type</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Input</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Result</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-[13px] text-gray-400 font-medium">{attempt.id}</td>
                  <td className="px-8 py-5">
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                      {attempt.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-blue-950 text-base">{attempt.value}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        attempt.status === 'positive' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`text-[13px] font-bold ${
                        attempt.status === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {attempt.result}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[13px] text-gray-500">{attempt.timestamp}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-blue-900 text-[13px] font-bold hover:underline">View Proof</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination (Visual only) */}
          <div className="p-8 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Showing 1 to 5 of 842 attempts</span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 hover:text-blue-900">‹ Prev</button>
              <button className="w-8 h-8 rounded bg-blue-950 text-white flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 hover:text-blue-900 flex items-center justify-center">2</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 hover:text-blue-900 flex items-center justify-center">3</button>
              <span>...</span>
              <button className="w-8 h-8 rounded hover:bg-gray-100 hover:text-blue-900 flex items-center justify-center">169</button>
              <button className="px-3 py-1 hover:text-blue-900">Next ›</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Proof Visualization */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-10">
            <div className="flex items-center space-x-3 mb-10">
              <div className="text-blue-900"><span className="text-xl font-bold">⌖</span></div>
              <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em]">Proof Visualization: 153</h4>
            </div>

            <div className="bg-gray-50/50 rounded-xl p-12 text-center border border-gray-100 mb-8">
              <p className="text-2xl font-bold text-blue-950 font-serif">
                1<sup>3</sup> + 5<sup>3</sup> + 3<sup>3</sup> <span className="mx-4 text-blue-300">=</span> 1 + 125 + 27 <span className="mx-4 text-blue-300">=</span> 153
              </p>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
              An Armstrong number (or narcissistic number) is a number that is the sum of its own digits each raised to the power of the number of digits. For 153, the number of digits is 3.
            </p>
          </div>

          {/* Total Discoveries Stat */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-8">
              <div className="w-8 h-8 border-2 border-blue-900 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Discoveries</p>
            <span className="text-6xl font-bold text-blue-950 mb-2 leading-none">124</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unique Patterns Found</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attempts;
