import { useState, useEffect } from 'react';
import { History, Search, Eye, Trash2, Filter, ChevronDown, Download } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../lib/api';

const formatDate = (value) => {
  if (!value) return 'Unknown';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
};

const normalizeAttempt = (attempt) => {
  if (attempt.mode === 'range') {
    const min = attempt.range_min;
    const max = attempt.range_max;
    const count = attempt.count_found ?? attempt.armstrong_numbers_found?.length ?? 0;

    return {
      ...attempt,
      displayNumber: `${min} - ${max}`,
      result: `${count} Found`,
      status: count > 0 ? 'positive' : 'negative',
      date: formatDate(attempt.attempted_at),
    };
  }

  return {
    ...attempt,
    displayNumber: attempt.input_number,
    result: attempt.is_armstrong ? 'Armstrong' : 'Negative',
    status: attempt.is_armstrong ? 'positive' : 'negative',
    date: formatDate(attempt.attempted_at),
  };
};

const Attempts = () => {
  const [attempts, setAttempts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const data = await api.getAttempts();
        setAttempts((data.attempts || []).map(normalizeAttempt));
      } catch (err) {
        setError(err.message || 'Unable to load investigation records.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAttempts();
  }, []);

  const handleExport = () => {
    const header = ['Mode', 'Input', 'Result', 'Date'];
    const rows = filteredAttempts.map((attempt) => [
      attempt.mode,
      attempt.displayNumber,
      attempt.result,
      attempt.date,
    ]);
    const csv = [header, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'armstrong-attempts.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredAttempts = attempts.filter(a => 
    a.displayNumber.toString().includes(searchTerm) ||
    a.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.mode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Investigation History">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by number or result..."
              className="input-premium pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none btn-outline py-2 text-xs flex items-center justify-center space-x-2 bg-white">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button onClick={handleExport} className="flex-1 sm:flex-none btn-outline py-2 text-xs flex items-center justify-center space-x-2 bg-white">
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* History Table */}
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Index</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Number Investigated</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Result</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Date of Entry</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-sm font-semibold text-[var(--text-muted)]">
                      Loading investigation records...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-sm font-semibold text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : filteredAttempts.length > 0 ? (
                  filteredAttempts.map((attempt, i) => (
                    <tr key={attempt.id || i} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 text-xs font-medium text-[var(--text-muted)]">#{attempts.length - i}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[var(--text-primary)]">{attempt.displayNumber}</span>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">{attempt.mode}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          attempt.status === 'positive' 
                            ? 'bg-[var(--primary-light)] text-[var(--primary)]' 
                            : 'bg-red-50 text-[var(--danger)]'
                        }`}>
                          {attempt.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-[var(--text-secondary)]">{attempt.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] rounded transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            disabled
                            title="Attempt deletion is not available in the API."
                            className="p-2 text-[var(--text-muted)] opacity-40 cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                          <History className="w-8 h-8" />
                        </div>
                        <p className="text-sm font-semibold text-[var(--text-secondary)]">No investigation records found.</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">Start by checking a number in the calculator tool.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredAttempts.length > 0 && (
            <div className="p-4 bg-gray-50/50 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[var(--text-muted)] font-medium">Showing {filteredAttempts.length} of {attempts.length} total entries</p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30" disabled>Previous</button>
                <div className="flex items-center space-x-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded bg-[var(--primary)] text-white text-xs font-bold">1</button>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30" disabled>Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attempts;
