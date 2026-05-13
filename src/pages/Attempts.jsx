import { useState, useEffect } from 'react';
import { History, Search, Eye, Trash2, Filter, ChevronDown, Download } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Attempts = () => {
  const [attempts, setAttempts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('attempts') || '[]');
    // Mock data if history is empty
    if (history.length === 0) {
      const mockHistory = [
        { num: 153, result: 'Armstrong', date: 'Oct 24, 2024', status: 'positive' },
        { num: 370, result: 'Armstrong', date: 'Oct 22, 2024', status: 'positive' },
        { num: 94, result: 'Negative', date: 'Oct 21, 2024', status: 'negative' },
        { num: 407, result: 'Armstrong', date: 'Oct 19, 2024', status: 'positive' },
        { num: 25, result: 'Negative', date: 'Oct 18, 2024', status: 'negative' },
      ];
      setAttempts(mockHistory);
    } else {
      setAttempts(history);
    }
  }, []);

  const handleDelete = (index) => {
    const updated = attempts.filter((_, i) => i !== index);
    setAttempts(updated);
    localStorage.setItem('attempts', JSON.stringify(updated));
  };

  const filteredAttempts = attempts.filter(a => 
    a.num.toString().includes(searchTerm) || 
    a.result.toLowerCase().includes(searchTerm.toLowerCase())
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
            <button className="flex-1 sm:flex-none btn-outline py-2 text-xs flex items-center justify-center space-x-2 bg-white">
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
                {filteredAttempts.length > 0 ? (
                  filteredAttempts.map((attempt, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 text-xs font-medium text-[var(--text-muted)]">#{attempts.length - i}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[var(--text-primary)]">{attempt.num}</span>
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
                            onClick={() => handleDelete(i)}
                            className="p-2 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-red-50 rounded transition-all"
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
