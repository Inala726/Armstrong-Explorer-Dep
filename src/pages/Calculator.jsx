import { useState } from 'react';
import { Search, Info, RotateCcw, CheckCircle2, XCircle, ChevronRight, Calculator as CalcIcon } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Calculator = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const checkArmstrong = (e) => {
    e.preventDefault();
    if (!number) return;
    
    setIsCalculating(true);
    
    // Simulate complex calculation
    setTimeout(() => {
      const numStr = number.toString();
      const numDigits = numStr.length;
      let sum = 0;
      const breakdown = [];

      for (let i = 0; i < numDigits; i++) {
        const digit = parseInt(numStr[i]);
        const power = Math.pow(digit, numDigits);
        sum += power;
        breakdown.push({ digit, power, original: `${digit}^${numDigits}` });
      }

      const isArmstrong = sum === parseInt(number);
      setResult({
        isArmstrong,
        sum,
        breakdown,
        numDigits,
        originalNumber: number
      });
      setIsCalculating(false);
      
      // Save to local storage history
      const history = JSON.parse(localStorage.getItem('attempts') || '[]');
      history.unshift({
        num: number,
        result: isArmstrong ? 'Armstrong' : 'Negative',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: isArmstrong ? 'positive' : 'negative'
      });
      localStorage.setItem('attempts', JSON.stringify(history.slice(0, 20)));
    }, 600);
  };

  const handleReset = () => {
    setNumber('');
    setResult(null);
  };

  return (
    <DashboardLayout title="Armstrong Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calculator Tool */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                <CalcIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Numerical Verification Tool</h2>
                <p className="text-xs text-[var(--text-muted)]">Input a number to verify its narcissistic properties</p>
              </div>
            </div>

            <form onSubmit={checkArmstrong} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Input Number</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                      <Hash className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 153, 370, 407"
                      className="input-premium pl-11 text-lg font-semibold py-4"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isCalculating}
                    className="btn-primary px-8 py-4 flex items-center justify-center space-x-2 sm:w-auto w-full"
                  >
                    {isCalculating ? (
                      <span className="flex items-center space-x-2">
                        <RotateCcw className="w-4 h-4 animate-spin" />
                        <span>Analyzing...</span>
                      </span>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Check Number</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Result Display */}
          {result && (
            <div className={`card-premium overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={`p-8 ${result.isArmstrong ? 'bg-[var(--success)]/5' : 'bg-[var(--danger)]/5'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${result.isArmstrong ? 'bg-[var(--success)] text-white' : 'bg-[var(--danger)] text-white'}`}>
                      {result.isArmstrong ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${result.isArmstrong ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                        {result.isArmstrong ? 'Verification Confirmed' : 'Verification Failed'}
                      </h3>
                      <p className="text-sm font-bold text-[var(--text-secondary)] mt-1">
                        {result.isArmstrong ? 'It is an Armstrong Number' : 'Not an Armstrong Number'}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleReset} className="btn-outline px-4 py-2 text-xs flex items-center justify-center space-x-2 bg-white">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Another</span>
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6 border-b border-[var(--border)] pb-2">Mathematical Breakdown</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-[var(--border)]">
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Digits</p>
                      <p className="text-xl font-bold text-[var(--text-primary)]">{result.numDigits}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-[var(--border)] sm:col-span-3">
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">The Power Sum Calculation</p>
                      <p className="text-base font-mono font-bold text-[var(--text-primary)]">
                        Σ = {result.breakdown.map((b, i) => (
                          <span key={i}>
                            {i > 0 && ' + '}
                            ({b.original})
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center p-6 bg-gray-50 rounded-xl border border-dashed border-[var(--border)]">
                  <div className="text-center sm:text-right flex-1">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Calculated Sum</p>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">{result.sum}</p>
                  </div>
                  <div className="px-8 py-4 sm:py-0 text-2xl font-bold text-[var(--text-muted)]">
                    {result.sum === parseInt(result.originalNumber) ? '=' : '≠'}
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Original Number</p>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">{result.originalNumber}</p>
                  </div>
                </div>

                <div className="bg-[var(--primary-light)]/30 p-4 rounded-lg flex items-start space-x-3">
                  <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[var(--primary)] leading-relaxed italic">
                    "Since the calculated sum {result.sum === parseInt(result.originalNumber) ? 'matches' : 'does not match'} the original number, its Armstrong property is {result.isArmstrong ? 'mathematically confirmed' : 'invalidated'}."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="card-premium p-6">
            <h4 className="text-xs font-bold text-[var(--text-primary)] mb-4">Academic Insight</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-[var(--border)]">
                <p className="text-xs font-semibold text-[var(--text-secondary)] leading-relaxed">
                  Armstrong numbers are also known as Narcissistic numbers, Pluperfect digital invariants, or Perfect digital invariants.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  'Numbers are calculated based on the total digit count (n).',
                  'Each digit is raised to the power of n.',
                  'Sum of these powers must equal the original number.'
                ].map((text, i) => (
                  <li key={i} className="flex items-start space-x-2 text-[11px] text-[var(--text-muted)]">
                    <ChevronRight className="w-3 h-3 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-premium p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-4">Common Examples</h4>
              <div className="space-y-3">
                {[
                  { num: '153', calc: '1³+5³+3³' },
                  { num: '370', calc: '3³+7³+0³' },
                  { num: '371', calc: '3³+7³+1³' },
                  { num: '407', calc: '4³+0³+7³' },
                  { num: '1634', calc: '1⁴+6⁴+3⁴+4⁴' },
                ].map((ex, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors group cursor-pointer" onClick={() => setNumber(ex.num)}>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{ex.num}</span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] group-hover:text-[var(--primary)]">{ex.calc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Hash = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9"></line>
    <line x1="4" y1="15" x2="20" y2="15"></line>
    <line x1="10" y1="3" x2="8" y2="21"></line>
    <line x1="16" y1="3" x2="14" y2="21"></line>
  </svg>
);

export default Calculator;
