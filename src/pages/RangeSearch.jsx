import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, RotateCcw, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const RangeSearch = () => {
  const [min, setMin] = useState('100');
  const [max, setMax] = useState('500');
  const [results, setResults] = useState([
    { num: 153, breakdown: '1³ + 5³ + 3³ = 153', note: 'The first 3-digit Armstrong number.' },
    { num: 370, breakdown: '3³ + 7³ + 0³ = 370', note: 'Contains a zero property.' },
    { num: 371, breakdown: '3³ + 7³ + 1³ = 371', note: 'Successive to 370 property.' },
    { num: 407, breakdown: '4³ + 0³ + 7³ = 407', note: 'Upper boundary of 3-digit range.' }
  ]);

  const isArmstrong = (num) => {
    const n = String(num);
    const len = n.length;
    return n.split('').reduce((acc, d) => acc + Math.pow(Number(d), len), 0) === Number(num);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    if (isNaN(minVal) || isNaN(maxVal)) return;

    const armstrongs = [];
    for (let i = minVal; i <= maxVal; i++) {
      if (isArmstrong(i)) {
        const nStr = String(i);
        armstrongs.push({
          num: i,
          breakdown: nStr.split('').map(d => `${d}<sup>${nStr.length}</sup>`).join(' + ') + ` = ${i}`,
          note: i === 153 ? 'The first 3-digit Armstrong number.' : ''
        });
      }
    }
    setResults(armstrongs);

    // Save to history (simulated)
    const user = JSON.parse(localStorage.getItem('user')) || { username: 'alexander' };
    const attempts = JSON.parse(localStorage.getItem(`attempts_${user.username}`) || '[]');
    attempts.unshift({
      id: Date.now(),
      type: 'RANGE',
      value: `${minVal} — ${maxVal}`,
      result: `${armstrongs.length} Numbers Found`,
      timestamp: new Date().toLocaleString(),
      status: armstrongs.length > 0 ? 'positive' : 'negative'
    });
    localStorage.setItem(`attempts_${user.username}`, JSON.stringify(attempts.slice(0, 50)));
  };

  const handleReset = () => {
    setMin('');
    setMax('');
    setResults([]);
  };

  return (
    <DashboardLayout title="Find in Range">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Find in Range</h2>
          <p className="text-gray-500 max-w-3xl leading-relaxed text-sm">
            Discover narcissistic numbers within a specific numerical boundary. Armstrong numbers are those whose sum of their own digits each raised to the power of the number of digits equals the number itself.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Parameters Card */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-8 h-fit">
            <h3 className="text-xl font-bold text-blue-950 mb-8">Range Parameters</h3>
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Min Value</label>
                <input
                  type="text"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-4 font-bold text-blue-950 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-black"
                  value={min}
                  onChange={(e) => setMin(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Max Value</label>
                <input
                  type="text"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-4 font-bold text-blue-950 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-black"
                  value={max}
                  onChange={(e) => setMax(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  className="w-full bg-blue-950 text-white py-4 px-6 rounded font-bold text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center leading-tight text-center"
                >
                  <Search className="w-3.5 h-3.5 mr-2 shrink-0" />
                  <span>Find Armstrong Numbers</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full border border-gray-200 text-blue-950 py-4 px-6 rounded font-bold text-[11px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center leading-tight text-center"
                >
                  Reset Fields
                </button>
              </div>
            </form>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Search Results</p>
                <h3 className="text-2xl font-bold text-blue-950">Range: {min || '0'} — {max || '0'}</h3>
              </div>
              <div className="text-right">
                <span className="text-5xl font-bold text-blue-950 leading-none">{results.length}</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Numbers Found</p>
              </div>
            </div>

            <div className="flex-1 p-10 bg-gray-50/30 overflow-y-auto max-h-[600px] scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((res, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative group hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Identified Integer</p>
                        <span className="text-4xl font-bold text-blue-950">{res.num}</span>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="bg-blue-950/5 p-5 rounded-xl mb-4 font-mono text-xs text-blue-900 border border-blue-900/5 group-hover:bg-blue-900 group-hover:text-white transition-all duration-500" dangerouslySetInnerHTML={{ __html: res.breakdown }}>
                    </div>
                    {res.note && (
                      <p className="text-[10px] font-bold text-blue-900/40 italic uppercase tracking-tight flex items-center">
                        <span className="w-4 h-[1px] bg-blue-900/20 mr-2"></span>
                        {res.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              {results.length > 0 && (
                <div className="mt-12 text-center relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <span className="relative bg-white px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                    End of results for specified range.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-10 shadow-sm">
            <h4 className="text-xl font-bold text-blue-950 mb-6">How it works</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              To find Armstrong numbers in a range, the explorer iterates through each integer $n$ and checks if:
            </p>
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-6 font-mono text-sm text-blue-900 mb-8">
              n = Σ(digit_i)^k
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Where $k$ is the number of digits in $n$. Our algorithm uses an optimized digit-extraction method to ensure high performance even across large ranges.
            </p>
          </div>

          <div className="lg:col-span-2 bg-blue-900 rounded-xl p-10 text-white flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Academic Insight</h4>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                Armstrong numbers are a subset of the Perfect Digital Invariants (PDI). While they are recreational in number theory, they serve as excellent benchmarks for computational complexity exercises.
              </p>
            </div>
            <Link to="/api" className="text-xs font-bold uppercase tracking-widest flex items-center hover:underline">
              Read the API Documentation <span className="ml-2 text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RangeSearch;
