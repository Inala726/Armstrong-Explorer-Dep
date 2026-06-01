import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trophy, Lock, TrendingUp, Hash, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { api, getDisplayName, getStoredUser, updateStoredUser } from '../lib/api';

const formatDate = (value) => {
  if (!value) return 'Unknown';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};

const normalizeAttempt = (attempt) => {
  if (attempt.mode === 'range') {
    const count = attempt.count_found ?? attempt.armstrong_numbers_found?.length ?? 0;
    return {
      num: `${attempt.range_min} - ${attempt.range_max}`,
      result: `${count} Found`,
      date: formatDate(attempt.attempted_at),
      status: count > 0 ? 'positive' : 'negative',
    };
  }

  return {
    num: attempt.input_number,
    result: attempt.is_armstrong ? 'Armstrong' : 'Negative',
    date: formatDate(attempt.attempted_at),
    status: attempt.is_armstrong ? 'positive' : 'negative',
  };
};

const Dashboard = () => {
  const [user, setUser] = useState(getStoredUser());
  const [recentActivity, setRecentActivity] = useState([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [positiveAttempts, setPositiveAttempts] = useState(0);
  const [error, setError] = useState('');
  const userName = getDisplayName(user);
  const firstName = userName.split(' ')[0];

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profile, attemptsData] = await Promise.all([
          api.getProfile(),
          api.getAttempts(),
        ]);
        updateStoredUser(profile);
        setUser(profile);
        const attempts = attemptsData.attempts || [];
        setTotalAttempts(attemptsData.total_attempts ?? attempts.length);
        setPositiveAttempts(attempts.filter((attempt) => (
          attempt.mode === 'range'
            ? (attempt.count_found ?? attempt.armstrong_numbers_found?.length ?? 0) > 0
            : attempt.is_armstrong
        )).length);
        setRecentActivity(attempts.slice(0, 3).map(normalizeAttempt));
      } catch (err) {
        setError(err.message || 'Unable to load dashboard data.');
      }
    };

    loadDashboard();
  }, []);

  const successRate = totalAttempts > 0 ? Math.round((positiveAttempts / totalAttempts) * 100) : 0;

  const stats = [
    { label: 'Total Attempts', value: totalAttempts.toString(), trend: 'Saved in database', icon: Hash },
    { label: 'Success Rate', value: `${successRate}%`, trend: 'Based on recent activity', icon: TrendingUp },
    { label: 'Numbers Found', value: positiveAttempts.toString(), trend: 'Recent verified wins', icon: Trophy },
  ];

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="relative bg-[var(--primary)] rounded-xl p-8 lg:p-10 overflow-hidden text-white shadow-lg shadow-[var(--primary)]/10">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-3">Welcome back, {firstName}! 👋</h2>
            <p className="text-[var(--primary-light)] text-sm leading-relaxed mb-8 opacity-90">
              Ready to explore new numerical patterns? Check a single value, run a range search, and your attempts will be saved automatically.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/calculator" className="bg-white text-[var(--primary)] px-6 py-2.5 rounded font-bold text-sm hover:bg-gray-50 transition-all shadow-sm">
                Start New Calculation
              </Link>
              <Link to="/attempts" className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded font-bold text-sm hover:bg-white/20 transition-all">
                View History
              </Link>
            </div>
          </div>
          {/* Abstract decoration */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="card-premium p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</p>
                    <div className="p-2 bg-[var(--primary-light)] rounded-lg text-[var(--primary)]">
                      <stat.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-[var(--text-primary)] leading-none">{stat.value}</span>
                  </div>
                  <p className="text-[10px] font-semibold text-[var(--success)] mt-2 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {stat.trend}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activity Table */}
            <div className="card-premium overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b border-[var(--border)]">
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Recent Activity Preview</h3>
                  <p className="text-xs text-[var(--text-muted)]">A summary of your latest investigations</p>
                </div>
                <Link to="/attempts" className="text-[var(--primary)] text-xs font-bold hover:underline">View all</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-[var(--border)]">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Number</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Result</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Date</th>
                      <th className="px-6 py-3 text-right text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-[var(--text-primary)]">{activity.num}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            activity.status === 'positive' 
                              ? 'bg-[var(--primary-light)] text-[var(--primary)]' 
                              : 'bg-red-50 text-[var(--danger)]'
                          }`}>
                            {activity.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-[var(--text-muted)]">{activity.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center text-xs text-[var(--text-muted)]">
                          No recent activity yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="space-y-6">
            {/* Definition of the Day */}
            <div className="bg-[#172B4D] rounded-xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 mb-4">Definition of the Day</p>
                <h3 className="text-xl font-bold mb-3">Armstrong Number</h3>
                <p className="text-blue-100 text-xs leading-relaxed mb-6 opacity-80">
                  A number that is the sum of its own digits each raised to the power of the number of digits.
                </p>
                <div className="bg-white/10 rounded-lg p-4 font-mono text-[11px] text-blue-50 border border-white/10">
                  153 = 1³ + 5³ + 3³
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>

            {/* Academic Insights */}
            <div className="card-premium p-6">
              <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-6">Discovery Milestones</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[var(--success)]/10 rounded-lg flex items-center justify-center text-[var(--success)]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">3-Digit Specialist</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Found all 4 Armstrong numbers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 opacity-50">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">4-Digit Explorer</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Find 2 more to unlock</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 btn-secondary py-2 text-xs">
                View All Achievements
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
