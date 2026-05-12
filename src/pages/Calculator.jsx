import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, RotateCcw, HelpCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Calculator = () => {
  const [number, setNumber] = useState('153');
  const [result, setResult] = useState({
    checked: true,
    num: 153,
    isArmstrong: true,
    digits: 3,
    breakdown: '1³ + 5³ + 3³ = 1 + 125 + 27 = 153'
  });

  const checkArmstrong = (num) => {
    const n = String(num);
    const len = n.length;
    const digits = n.split('').map(Number);
    const sum = digits.reduce((acc, d) => acc + Math.pow(d, len), 0);
    return {
      isArmstrong: sum === Number(num),
      digits: len,
      sum: sum
    };
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const val = parseInt(number);
    if (isNaN(val)) return;

    const res = checkArmstrong(val);
    const nStr = String(val);
    const breakdown = nStr.split('').map(d => `${d}^${nStr.length}`).join(' + ') + 
                      ' = ' + 
                      nStr.split('').map(d => Math.pow(parseInt(d), nStr.length)).join(' + ') + 
                      ' = ' + 
                      res.sum;

    setResult({
      checked: true,
      num: val,
      isArmstrong: res.isArmstrong,
      digits: res.digits,
      breakdown: breakdown
    });

    // Save to history (simulated)
    const user = JSON.parse(localStorage.getItem('user')) || { username: 'alexander' };
    const attempts = JSON.parse(localStorage.getItem(`attempts_${user.username}`) || '[]');
    attempts.unshift({
      id: Date.now(),
      type: 'CHECK',
      value: val,
      result: res.isArmstrong ? 'Armstrong' : 'Not Armstrong',
      timestamp: new Date().toLocaleString(),
      status: res.isArmstrong ? 'positive' : 'negative'
    });
    localStorage.setItem(`attempts_${user.username}`, JSON.stringify(attempts.slice(0, 50)));
  };

  const handleClear = () => {
    setNumber('');
    setResult({ checked: false });
  };

  return (
    <DashboardLayout title="Calculator">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Numerical Verification Tool</h2>
          <p className="text-gray-500 max-w-3xl leading-relaxed text-sm">
            An Armstrong number (or narcissistic number) is a number that is the sum of its own digits each raised to the power of the number of digits. Enter a positive integer below to verify its mathematical property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Verification Input Card */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-10">
            <div className="flex items-center space-x-3 mb-8 text-gray-400">
              <div className="w-6 h-6 border-2 border-current rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verification Input</span>
            </div>

            <form onSubmit={handleCheck} className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Enter your number</label>
                <input
                  type="text"
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-lg p-6 text-3xl font-bold text-blue-950 focus:ring-1 focus:ring-blue-900 outline-none transition-all"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                />
                <p className="mt-4 flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <HelpCircle className="w-3 h-3 mr-1.5" /> Supports positive integers up to 10 digits
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-950 text-white px-10 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-colors shadow-md"
                >
                  Check Number
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 font-bold text-xs uppercase tracking-widest px-10 py-4 hover:text-gray-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Mystery Card */}
          <div className="bg-blue-950 rounded-xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800" 
              alt="Numbers" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-2xl font-bold text-white mb-3">The 153 Mystery</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed">
                Did you know that 153 is the smallest three-digit Armstrong number? It was historically significant in various mathematical and religious texts.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Result Section */}
        {result.checked && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 space-y-12 mb-8">
            <div className="flex items-center space-x-6">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-lg ${
                result.isArmstrong ? 'bg-blue-900 text-white' : 'bg-red-900 text-white'
              }`}>
                <Check className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Verification Result</p>
                <h3 className="text-4xl font-bold text-blue-950">
                  {result.num} <span className="font-normal italic text-gray-400">is {result.isArmstrong ? 'an' : 'not an'}</span> Armstrong Number
                </h3>
              </div>
            </div>

            {/* Mathematical Breakdown */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-gray-800">
                <span className="text-lg font-bold">ƒx</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Mathematical Breakdown</span>
              </div>
              <div className="bg-blue-50/50 rounded-xl p-16 text-center border border-blue-50 relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <p className="text-3xl font-bold text-blue-950 font-serif tracking-tight">
                    {String(result.num).split('').map((d, i, a) => (
                      <span key={i}>
                        {d}<sup className="text-xl ml-0.5">{a.length}</sup>
                        {i < a.length - 1 ? <span className="mx-4 text-blue-300">+</span> : <span className="mx-4 text-blue-300">=</span>}
                      </span>
                    ))}
                    {result.num}
                  </p>
                  
                  <div className="w-1/2 h-[1px] bg-gray-200 mx-auto"></div>
                  
                  <div className="space-y-4 text-gray-500 font-medium">
                    <p className="text-sm">
                      ({String(result.num).split('').map((d, i, a) => (
                        <span key={i}>
                          {Array(a.length).fill(d).join(' × ')}
                          {i < a.length - 1 ? <span className="mx-3 text-gray-300">) + (</span> : ')'}
                        </span>
                      ))})
                    </p>
                    <p className="text-sm">
                      {String(result.num).split('').map((d, i, a) => (
                        <span key={i}>
                          {Math.pow(parseInt(d), a.length)}
                          {i < a.length - 1 ? <span className="mx-3 text-gray-300">+</span> : <span className="mx-3 text-gray-300">=</span>}
                        </span>
                      ))}
                      {result.num}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-8 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Sequence Rank</p>
                <h4 className="text-2xl font-bold text-blue-950 mb-2">4th</h4>
                <p className="text-xs text-gray-500 leading-relaxed">The 4th number in the sequence of narcissistic numbers.</p>
              </div>
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-8 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Base-10 Identity</p>
                <h4 className="text-2xl font-bold text-blue-950 mb-2">Decimal</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Validation performed in standard base-10 arithmetic.</p>
              </div>
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-8 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Power Factor</p>
                <h4 className="text-2xl font-bold text-blue-950 mb-2">n = {result.digits}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Digits raised to the power of the total digit count.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Calculator;
