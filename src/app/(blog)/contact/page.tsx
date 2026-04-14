import { Mail, MessageSquare, Send } from "lucide-react";
import { prisma } from '@/lib/prisma';

export async function generateMetadata() {
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
  const siteName = settings?.siteName || 'Our Website';
  return {
    title: `Contact ${siteName}`,
    description: "Get in touch with us.",
  };
}

export default async function Page() {
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
  const siteName = settings?.siteName || 'Our Website';

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
             <div className="p-6 bg-gray-50 border border-gray-200 rounded text-center">
                 <h2 className="serif-headline text-xl mb-2">Contact {siteName}</h2>
                 <p className="text-gray-600 text-sm">Please reach out via our official email address below.</p>
             </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-gray-200 rounded-[0.25rem] p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-[#1a2b3c]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</h3>
                </div>
                <p className="text-sm text-gray-600">contact@{siteName?.toLowerCase().replace(/\s+/g,'')}.com</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-[#1a2b3c]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Feedback</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Have a suggestion for improving our coverage? Found an issue with an article? We'd love to hear from you.
                </p>
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
