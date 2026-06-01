import { useState } from 'react';
import { Layers, Search, RotateCcw, Info, Hash, ChevronRight, X } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../lib/api';

const RangeSearch = () => {
  const [range, setRange] = useState({ start: '', end: '' });
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const findArmstrongs = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    
    const start = parseInt(range.start);
    const end = parseInt(range.end);

    try {
      if (end < start) {
        throw new Error('End range must be greater than or equal to start range.');
      }
      if (end - start > 10000000) {
        throw new Error('Range is too large. Please limit your search to 10,000,000 numbers at a time.');
      }

      const data = await api.findArmstrongInRange(start, end);
      const found = data.armstrong_numbers || [];
      setResults({
        found,
        count: data.count ?? found.length,
        range: `${data.min ?? start} - ${data.max ?? end}`
      });
    } catch (err) {
      setResults(null);
      setError(err.message || 'Unable to search this range.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setRange({ start: '', end: '' });
    setResults(null);
  };

  return (
    <DashboardLayout title="Range Search Tool">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Bulk Discovery Tool</h2>
                <p className="text-xs text-[var(--text-muted)]">Identify all Armstrong numbers within a specific numerical range</p>
              </div>
            </div>

            <form onSubmit={findArmstrongs} className="space-y-6">
              {error && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Start Range</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                      <Hash className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1"
                      className="input-premium pl-11 py-3"
                      value={range.start}
                      onChange={(e) => setRange({...range, start: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">End Range</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                      <Hash className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1000"
                      className="input-premium pl-11 py-3"
                      value={range.end}
                      onChange={(e) => setRange({...range, end: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="flex-1 btn-primary py-4 flex items-center justify-center space-x-2"
                >
                  {isSearching ? (
                    <span className="flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Processing Range...</span>
                    </span>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Run Search Protocol</span>
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={handleClear}
                  className="btn-outline px-6 py-4 flex items-center justify-center space-x-2 bg-white"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results Grid */}
          {results && (
            <div className="card-premium overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Discovery Results</h3>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">Range: {results.range}</p>
                </div>
                <div className="bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full text-xs font-bold">
                  {results.count} Found
                </div>
              </div>
              <div className="p-6">
                {results.count > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {results.found.map((num, i) => (
                      <div key={i} className="p-3 bg-white border border-[var(--border)] rounded text-center font-bold text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer">
                        {num}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-400 mb-4">
                      <Search className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-secondary)]">No Armstrong numbers identified in this range.</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Try expanding your search parameters.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card-premium p-6 bg-[var(--primary)] text-white border-none shadow-lg shadow-[var(--primary)]/20">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-5 h-5 text-[var(--primary-light)]" />
              <h4 className="text-sm font-bold">Search Protocol</h4>
            </div>
            <p className="text-xs text-[var(--primary-light)] leading-relaxed mb-6 opacity-80">
              For optimal performance, searches are currently limited to a range of 10,000,000 numbers at a time.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Time Complexity</p>
                <p className="text-sm font-mono font-bold">O(n * d)</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Accuracy Status</p>
                <p className="text-sm font-semibold">100% Verified</p>
              </div>
            </div>
          </div>

          <div className="card-premium p-6">
            <h4 className="text-xs font-bold text-[var(--text-primary)] mb-6">Discovery Records</h4>
            <div className="space-y-4">
              {[
                { range: '1 - 100', found: '9 Found' },
                { range: '100 - 1000', found: '4 Found' },
                { range: '1000 - 10000', found: '3 Found' }
              ].map((record, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-[var(--border)] rounded-full group-hover:bg-[var(--primary)] transition-colors"></div>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">{record.range}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{record.found}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 btn-secondary py-2 text-xs">
              Clear Records History
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RangeSearch;
