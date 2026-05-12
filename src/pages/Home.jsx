import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Hash, Phone, MessageSquare, Shield, Layers, History, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-blue-600 font-bold tracking-widest text-xs uppercase">Mathematical Patterns</h3>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Discover <span className="italic font-serif text-blue-800">Armstrong</span><br />Numbers
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              An Armstrong number is a number that is the sum of its own digits each raised to the power of the number of digits. Explore the beauty of cubic and higher-order numerical symmetry.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <Link to="/register" className="bg-blue-900 text-white px-8 py-3 rounded font-bold text-sm hover:bg-blue-800 transition-colors">
                Start Exploration
              </Link>
              <Link to="/documentation" className="border border-blue-900 text-blue-900 px-8 py-3 rounded font-bold text-sm hover:bg-blue-50 transition-colors">
                View Documentation
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="bg-gray-900 rounded-lg aspect-square overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800" 
                alt="Mathematical pattern" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"></div>
            </div>
            {/* Formula Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-lg border border-gray-100 flex items-center space-x-4">
              <div className="text-2xl font-bold text-blue-900">Σ</div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">The Formula</p>
                <p className="font-mono font-bold text-gray-800">n = Σ(d_i)^k</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-blue-950 mb-10">Classic Examples</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 153 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left group">
              <div className="w-8 h-8 bg-blue-50 border border-blue-900/20 rounded flex items-center justify-center mb-6">
                <span className="text-blue-900 font-bold text-xs">1</span>
              </div>
              <h4 className="text-2xl font-bold text-blue-950 mb-4">153</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm text-blue-900 border border-gray-100">
                1³ + 5³ + 3³ = 153
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                A 3-digit Armstrong number where each digit is cubed.
              </p>
            </div>

            {/* Card 370 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left group">
              <div className="w-8 h-8 bg-blue-50 border border-blue-900/20 rounded flex items-center justify-center mb-6">
                <span className="text-blue-900 font-bold text-xs">3</span>
              </div>
              <h4 className="text-2xl font-bold text-blue-950 mb-4">370</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm text-blue-900 border border-gray-100">
                3³ + 7³ + 0³ = 370
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Another classic example where the sum equals the number.
              </p>
            </div>

            {/* Card 407 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left group">
              <div className="w-8 h-8 bg-blue-50 border border-blue-900/20 rounded flex items-center justify-center mb-6">
                <span className="text-blue-900 font-bold text-xs">4</span>
              </div>
              <h4 className="text-2xl font-bold text-blue-950 mb-4">407</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm text-blue-900 border border-gray-100">
                4³ + 0³ + 7³ = 407
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Perfect mathematical balance through digit powers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Master the Math Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-blue-950 mb-4">Master the Math</h2>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            Explore the unique properties of narcissistic numbers through our specialized, academic-grade research tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50/50 p-10 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-900 w-12 h-12 rounded flex items-center justify-center mb-8">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-xl font-bold text-blue-950 mb-4">Interactive Checking</h5>
            <p className="text-sm text-gray-500 leading-relaxed">
              Instantly verify if any number satisfies the Armstrong condition with our high-precision calculator.
            </p>
          </div>

          <div className="bg-gray-50/50 p-10 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-900 w-12 h-12 rounded flex items-center justify-center mb-8">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-xl font-bold text-blue-950 mb-4">Range Discovery</h5>
            <p className="text-sm text-gray-500 leading-relaxed">
              Scan entire numerical datasets to locate all Armstrong numbers within your custom ranges.
            </p>
          </div>

          <div className="bg-gray-50/50 p-10 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-900 w-12 h-12 rounded flex items-center justify-center mb-8">
              <History className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-xl font-bold text-blue-950 mb-4">Track Progress</h5>
            <p className="text-sm text-gray-500 leading-relaxed">
              Save your mathematical findings to your personal archive and export data for further academic study.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-blue-900 rounded-[2.5rem] p-16 text-center text-white shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to start your mathematical journey?</h2>
            <p className="text-blue-100/70 text-lg mb-12 max-w-2xl mx-auto">
              Join thousands of students and researchers exploring the beauty of numerical patterns today with our specialized research suite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="bg-white text-blue-950 px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                Get Started for Free
              </Link>
              <Link to="/contact" className="border border-white/20 bg-white/5 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-sm">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-t border-gray-100 pt-20">
            <div className="col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 border border-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="text-xl font-bold text-blue-950">Armstrong Explorer</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                An educational platform dedicated to the beauty of number theory and numerical patterns.
              </p>
            </div>
            
            <div className="space-y-6">
              <h6 className="font-bold text-blue-950 text-xs uppercase tracking-widest">Resources</h6>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/documentation" className="hover:text-blue-900 transition-colors">Documentation</Link></li>
                <li><Link to="/api" className="hover:text-blue-900 transition-colors">API Reference</Link></li>
                <li><Link to="/blog" className="hover:text-blue-900 transition-colors">Mathematics Blog</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h6 className="font-bold text-blue-950 text-xs uppercase tracking-widest">Account</h6>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/login" className="hover:text-blue-900 transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-blue-900 transition-colors">Sign Up</Link></li>
                <li><Link to="/settings" className="hover:text-blue-900 transition-colors">Profile Settings</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex space-x-4 pt-2">
                {/* Social placeholders as in image */}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <p>© 2024 Armstrong Explorer. Built for curiosity.</p>
            <div className="flex items-center space-x-8 mt-6 md:mt-0">
              <Link to="/privacy" className="hover:text-blue-900 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-900 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
