import { useState } from 'react';
import { MessageSquare, Star, Send, ThumbsUp } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { api, getDisplayName, getStoredUser } from '../lib/api';

const Feedback = () => {
  const user = getStoredUser();
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: getDisplayName(user),
    email: user?.email || '',
    message: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await api.submitFeedback({
        name: formData.name,
        email: formData.email,
        message: `Rating: ${rating || 'Not rated'} / 5\n\n${formData.message}`,
      });
      setSent(true);
      setRating(0);
      setFormData({ ...formData, message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err.message || 'Unable to submit feedback.');
    } finally {
      setIsSubmitting(false);
    }
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
            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    className="input-premium"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    className="input-premium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">What could be better?</label>
                <textarea 
                  className="input-premium h-40 resize-none p-4" 
                  placeholder="Share your thoughts on features, UI, or mathematical accuracy..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-start space-x-3 border border-[var(--border)]">
                <ThumbsUp className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  By submitting this feedback, you agree to our research community guidelines. Your input will be used to improve the Explorer algorithms.
                </p>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-4 flex items-center justify-center space-x-2 shadow-lg shadow-[var(--primary)]/20 disabled:opacity-60">
                {sent ? (
                  <span>Thank you for your feedback!</span>
                ) : isSubmitting ? (
                  <span>Submitting...</span>
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
