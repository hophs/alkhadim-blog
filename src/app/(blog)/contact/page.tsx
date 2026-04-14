import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function generateMetadata() {
  const settings = await prisma.settings.findUnique({ where: { id: "default" } });
  const siteName = settings?.siteName || "Our Website";
  return {
    title: `Contact ${siteName}`,
    description: "Get in touch with us.",
  };
}

export default async function Page() {
  const settings = await prisma.settings.findUnique({ where: { id: "default" } });
  const siteName = settings?.siteName || "Our Website";
  const contactEmail = settings?.contactEmail || `contact@${siteName.toLowerCase().replace(/\s+/g, "")}.com`;
  const contactPhone = settings?.contactPhone;
  const contactAddress = settings?.contactAddress;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">Get in Touch</p>
          <h1 className="serif-headline text-2xl lg:text-3xl">Contact Us</h1>
        </div>
      </div>

      <div className="container-blog py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
             <div className="bg-white border border-gray-200 rounded-[0.25rem] p-6 lg:p-8">
                 <h2 className="serif-headline text-xl mb-6">Send us a message</h2>
                 <form className="space-y-5" action="">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
                            <input type="text" required className="w-full border border-gray-200 rounded-[0.25rem] p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                            <input type="email" required className="w-full border border-gray-200 rounded-[0.25rem] p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Subject</label>
                        <input type="text" required className="w-full border border-gray-200 rounded-[0.25rem] p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="How can we help?" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Message</label>
                        <textarea required rows={6} className="w-full border border-gray-200 rounded-[0.25rem] p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Write your message here..."></textarea>
                    </div>
                    <button type="submit" className="px-6 py-3 bg-[#1a2b3c] text-white text-sm font-medium rounded-[0.25rem] hover:bg-slate-800 transition-colors w-full sm:w-auto">
                        Send Message
                    </button>
                 </form>
             </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-gray-200 rounded-[0.25rem] p-6 space-y-8">
              <div>
                <h3 className="serif-headline text-lg mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-[#1a2b3c]" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</h4>
                    </div>
                    <p className="text-sm text-gray-700">
                      <a href={`mailto:${contactEmail}`} className="hover:text-blue-600 transition-colors">{contactEmail}</a>
                    </p>
                  </div>
                  
                  {contactPhone && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-[#1a2b3c]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</h4>
                      </div>
                      <p className="text-sm text-gray-700">
                        <a href={`tel:${contactPhone}`} className="hover:text-blue-600 transition-colors">{contactPhone}</a>
                      </p>
                    </div>
                  )}

                  {contactAddress && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#1a2b3c]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Office</h4>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{contactAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-[#f6f7f7] rounded-[0.25rem]">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Response Time</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We aim to respond to all inquiries within 48 hours. For urgent matters, please indicate so in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}