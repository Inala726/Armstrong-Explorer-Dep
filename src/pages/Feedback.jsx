import { useState } from 'react';
import { Star, Send, Shield, Info, MousePointer2, Database, Zap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Feedback = () => {
  const [rating, setRating] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <DashboardLayout title="Academic Feedback">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Insights Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10">
              <h2 className="text-2xl font-bold text-blue-950 mb-6">Share Your Insights</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-10">
                Your feedback helps us refine our numerical pattern analysis tools. As an academic community, we value your intellectual contributions to the Armstrong Explorer ecosystem.
              </p>
              
              <div className="pt-8 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Member Reference</p>
                <p className="text-lg font-bold text-blue-900 font-mono">ID: #AM-2024-8832</p>
              </div>
            </div>

            {/* Image Box */}
            <div className="relative rounded-xl overflow-hidden h-64 group shadow-sm border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" 
                alt="Workspace" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-blue-900 text-white px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest">
                  Pattern Excellence
                </span>
              </div>
            </div>
          </div>

          {/* Middle/Right Column: Feedback Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    disabled
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm text-gray-500 cursor-not-allowed"
                    value="Alexander Mathos"
                  />
                  <p className="mt-2 text-[10px] font-bold text-gray-400 italic tracking-tight">Verified Member Identity</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">Institutional Email</label>
                  <input
                    type="text"
                    disabled
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm text-gray-500 cursor-not-allowed"
                    value="alexander.mathos@university.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-6 uppercase tracking-wide">
                  How would you rate your recent experience with the Number Explorer?
                </label>
                <div className="flex space-x-4 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 transition-transform hover:scale-110 ${
                        star <= rating ? 'text-blue-900' : 'text-gray-200'
                      }`}
                    >
                      <Star className={`w-10 h-10 ${star <= rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center space-x-4">
                  <div className="bg-blue-900 p-1.5 rounded-full text-white shrink-0">
                    <Info className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-blue-900 opacity-80">
                    A {rating}/5 rating indicates {rating >= 4 ? 'high' : 'moderate'} satisfaction with current numerical logic.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-4 uppercase tracking-wide">Detailed Observations or Suggestions</label>
                <textarea
                  rows={8}
                  className="w-full bg-white border border-gray-200 rounded-lg p-6 text-sm text-blue-950 outline-none focus:border-blue-900 transition-colors resize-none placeholder:text-gray-300"
                  placeholder="Describe your experience with specific numerical ranges or any interface observations..."
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Shield className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Submission Protocol</span>
                </div>
                <button
                  type="submit"
                  className="bg-blue-950 text-white px-10 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-colors shadow-md flex items-center space-x-3"
                >
                  <span>Submit Feedback</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Feature Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-gray-100 p-10 flex items-center space-x-6 shadow-sm group hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-4 rounded-xl text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-900 transition-colors">
              <MousePointer2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-950 mb-1">Cognitive Flow</h4>
              <p className="text-[10px] text-gray-500 leading-tight">Improving the mental mapping of logic.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-10 flex items-center space-x-6 shadow-sm group hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-4 rounded-xl text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-900 transition-colors">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-950 mb-1">Data Accuracy</h4>
              <p className="text-[10px] text-gray-500 leading-tight">Verification of Armstrong computations.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-10 flex items-center space-x-6 shadow-sm group hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-4 rounded-xl text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-900 transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-950 mb-1">System Velocity</h4>
              <p className="text-[10px] text-gray-500 leading-tight">Optimizing large-range search speeds.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
