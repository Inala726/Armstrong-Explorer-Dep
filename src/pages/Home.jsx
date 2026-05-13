import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calculator, History, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-gradient-to-b from-[var(--primary)]/5 to-transparent rounded-[100%] blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[var(--primary-light)] px-4 py-2 rounded-full text-[var(--primary)] text-xs font-bold uppercase tracking-widest mb-8 border border-[var(--primary)]/10 animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
              </span>
              <span>Lehman Educational Services Presents</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-top-6 duration-1000">
              Master the Art of <span className="text-[var(--primary)]">Numerical Patterns</span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto opacity-0 animate-in fade-in fill-mode-forwards duration-1000 delay-300">
              A comprehensive step-by-step learning environment that simulates real-world implementation of mathematical concepts.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-in fade-in fill-mode-forwards duration-1000 delay-500">
              <Link to="/register" className="btn-primary px-10 py-4 text-base flex items-center space-x-3 w-full sm:w-auto justify-center">
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-outline px-10 py-4 text-base bg-white w-full sm:w-auto justify-center">
                Member Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Section (SRS Requirement: Informative Experience) */}
      <div className="py-24 bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 text-[var(--primary)]">
                <BookOpen className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest text-xs">Mathematical Foundations</span>
              </div>
              <h2 className="text-4xl font-bold text-[var(--text-primary)] leading-tight">
                What is an Armstrong Number?
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                An Armstrong number, also known as a <span className="font-bold text-[var(--text-primary)]">narcissistic number</span>, is a number that is equal to the sum of its own digits each raised to the power of the number of digits.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-8 border border-[var(--border)] space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">Analyze the Digits</h4>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Take any number, for example, 153. It has 3 digits.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">Raise to the Power of n</h4>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Raise each digit to the power of 3: 1³, 5³, and 3³.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">Verify Equality</h4>
                    <p className="text-sm text-[var(--text-muted)] mt-1">1 + 125 + 27 = 153. Since it matches, it is an Armstrong number.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.03] rounded-[40px] rotate-3 blur-sm"></div>
              <img 
                src="/armstrong_theory_illustration_1778627180910.png" 
                alt="Armstrong Number Theory Illustration" 
                className="relative z-10 w-full rounded-[32px] shadow-2xl border border-[var(--border)]"
              />
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-[var(--border)] z-20 hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[var(--success)]/10 rounded-full flex items-center justify-center text-[var(--success)]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Example Verification</p>
                    <p className="text-sm font-bold text-[var(--text-primary)]">153 is mathematically valid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid (SRS Requirements: User Input, Range, Calculator) */}
      <div className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.3em]">The eProject Environment</h3>
            <h2 className="text-4xl font-bold text-[var(--text-primary)]">Core Implementation Modules</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-8 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                <Calculator className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-4">Single Verification</h4>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
                Instantly check if any number is an Armstrong number with full mathematical proof and breakdown.
              </p>
              <Link to="/calculator" className="text-[var(--primary)] font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform">
                <span>Try Calculator</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-8 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-4">Range Discovery</h4>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
                Scan thousands of numbers to find every narcissistic instance within your specified academic parameters.
              </p>
              <Link to="/range" className="text-[var(--primary)] font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform">
                <span>Start Search</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-8 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                <History className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-4">Attempt Tracking</h4>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
                Every calculation is stored securely in your academic log, allowing you to review your progress and milestones.
              </p>
              <Link to="/attempts" className="text-[var(--primary)] font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform">
                <span>Review Log</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives Section (SRS Requirement: Objectives of the project) */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--primary)] rounded-[40px] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-xs font-bold text-[var(--primary-light)] uppercase tracking-[0.3em] mb-6">Educational Objective</h3>
                <h2 className="text-4xl font-bold mb-8 leading-tight">Revolutionizing the way students learn and implement concepts.</h2>
                <p className="text-blue-100/80 leading-relaxed mb-10 italic">
                  "Our eProject is a step-by-step learning environment that simulates the classroom and lab-based implementation into actual practice at your fingertips."
                </p>
                <div className="space-y-4">
                  {[
                    'Practice using a laddered approach',
                    'Build more robust applications',
                    'Learn implementation in a phased manner',
                    'Real-life scenario-based applications'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="flex items-start space-x-4 mb-8">
                  <Info className="w-6 h-6 text-blue-200 shrink-0" />
                  <p className="text-sm leading-relaxed text-blue-50 font-medium">
                    Mentoring is available through email support. Reach out to the eProjects Team for any academic doubts regarding the application.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1">Status</p>
                    <p className="text-sm font-bold">Synchronous eProject Active</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1">Environment</p>
                    <p className="text-sm font-bold">IT Education Excellence</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-[0.2em] mb-4">Armstrong Explorer © 2024</p>
          <p className="text-sm text-[var(--text-secondary)]">Developed for Lehman Educational Services Academic Curriculum</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
