import { useState } from 'react';
import { MessageSquare, Star, Send, ThumbsUp } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setRating(0);
    }, 3000);
  };

  return (
    <DashboardLayout title="System Feedback">
      <div className="max-w-2xl mx-auto">
        <div className="card-premium p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--primary-light)] rounded-full text-[var(--primary)] mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">Help us improve</h3>
            <p className="text-sm text-[var(--text-muted)] mt-2">Your feedback helps us create a better academic experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center">
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Rate your experience</p>
              <div className="flex justify-center space-x-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                      rating >= num 
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-white' 
                        : 'bg-white border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)]'
                    }`}
                  >
                    <Star className={`w-6 h-6 ${rating >= num ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">What could be better?</label>
                <textarea 
                  className="input-premium h-40 resize-none p-4" 
                  placeholder="Share your thoughts on features, UI, or mathematical accuracy..."
                  required
                ></textarea>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-start space-x-3 border border-[var(--border)]">
                <ThumbsUp className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  By submitting this feedback, you agree to our research community guidelines. Your input will be used to improve the Explorer algorithms.
                </p>
              </div>

              <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center space-x-2 shadow-lg shadow-[var(--primary)]/20">
                {sent ? (
                  <span>Thank you for your feedback!</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
