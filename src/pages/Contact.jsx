import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <DashboardLayout title="Contact Us">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card-premium p-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Inquiry Submission</h3>
            <p className="text-sm text-[var(--text-muted)] mb-8">
              Students can use this form to reach out to the <span className="font-bold text-[var(--text-primary)]">eProjects Team</span> regarding technical doubts or project submissions.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Subject</label>
                  <input type="text" className="input-premium" placeholder="e.g. Project Submission" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Category</label>
                  <select className="input-premium">
                    <option>General Inquiry</option>
                    <option>eProject Technical Doubt</option>
                    <option>Submission Query</option>
                    <option>Account Issues</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Detailed Message</label>
                <textarea 
                  className="input-premium h-32 resize-none" 
                  placeholder="Describe your query in detail for the eProjects Team..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center space-x-2">
                {sent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Query Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-premium p-6">
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-6">Organization Details</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--primary)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">eProject Support</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">eprojects@lehman-edu.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--primary)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Academic Helpline</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">+1 (800) LEHMAN-EDU</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--primary)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Headquarters</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Lehman Educational Services<br/>Academic Square, Suite 400<br/>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#172B4D] rounded-xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <MessageSquare className="w-10 h-10 text-blue-400 mb-4 opacity-50" />
              <h4 className="text-base font-bold mb-2">Live Mentoring</h4>
              <p className="text-xs text-blue-200 mb-6 leading-relaxed">
                As per eProject protocol, synchronous mentoring is available through email and live juncture.
              </p>
              <button className="btn-secondary w-full py-2 text-xs">Start Session</button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
