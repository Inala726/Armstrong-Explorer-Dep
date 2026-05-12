import { Mail, Phone, MapPin, Send } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Contact = () => {
  return (
    <DashboardLayout title="Contact Support">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Get in Touch</h2>
          <p className="text-gray-500 max-w-3xl leading-relaxed text-sm">
            Our academic support team is here to assist you with your numerical pattern explorations and technical inquiries. Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="bg-blue-900 p-4 rounded-lg text-white">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-950 mb-2">Email Support</h3>
              <p className="text-gray-500 text-sm mb-6">For general inquiries and detailed pattern documentation requests.</p>
              <p className="text-lg font-bold text-blue-900">info@armstrongexplorer.edu</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="bg-blue-100 p-4 rounded-lg text-blue-900">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-950 mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm mb-6">Direct line to our academic services department.</p>
              <p className="text-lg font-bold text-blue-900">+1 234 567 890</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 flex flex-col justify-center">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-blue-900 mb-6">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Campus Location</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                123 Mathematics Lane, Calculus City
              </p>
            </div>
            <div className="h-64 lg:h-auto relative group">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                alt="Campus" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-3 cursor-pointer hover:bg-white transition-colors">
                  <span className="text-blue-900">📍</span>
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">View on Campus Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Message Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-10">
            <h3 className="text-xl font-bold text-blue-950 mb-10">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-blue-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@university.edu"
                    className="w-full bg-white border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-blue-900 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Subject</label>
                <input
                  type="text"
                  placeholder="Pattern Validation Inquiry"
                  className="w-full bg-white border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-blue-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Message</label>
                <textarea
                  rows={5}
                  placeholder="Describe your mathematical inquiry..."
                  className="w-full bg-white border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-blue-900 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-950 text-white px-10 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-colors shadow-md flex items-center"
              >
                Dispatch Inquiry
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-900 rounded-xl p-10 text-white">
              <h4 className="text-xl font-bold mb-8 text-white">Calculus City HQ</h4>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-10">
                Our central hub for algorithmic discovery and numerical validation is located in the heart of the Academic District.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 font-mono text-[10px] space-y-4">
                <p className="text-blue-200/50 uppercase">// HQ Coordinates</p>
                <p>Latitude: 37.7749° N</p>
                <p>Longitude: 122.4194° W</p>
                <div className="pt-2">
                  <p className="text-blue-200/50 uppercase">// Local Time</p>
                  <p>09:00 AM — 05:00 PM (GMT-8)</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-10">
              <div className="text-gray-400 mb-6"><span className="text-2xl font-bold">🎓</span></div>
              <h4 className="text-sm font-bold text-blue-950 mb-2">Research Partnership</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Are you a university or research lab looking to collaborate on Armstrong number datasets? Contact our research coordinator directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
