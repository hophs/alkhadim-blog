import { prisma } from "@/lib/prisma";

export async function generateMetadata() {
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
  const siteName = settings?.siteName || 'Our Website';
  return {
    title: `${name} | ${siteName}`,
    description: `${name} for ${siteName}`
  };
}

export default async function Page() {
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
  const siteName = settings?.siteName || 'Our Website';
  const siteDescription = settings?.siteDescription || 'Latest news, auto-generated and curated';
  const contactEmail = settings?.contactEmail || `contact@${siteName.toLowerCase().replace(/\s+/g, "")}.com`;
  
  return (
    <div className="animate-fade-in">
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">Legal</p>
          <h1 className="serif-headline text-2xl lg:text-3xl">${name}</h1>
        </div>
      </div>

      <div className="container-blog py-10 lg:py-14">
        <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-serif prose-headings:text-[#1a2b3c] prose-a:text-blue-600">
          <p className="lead">Welcome to {siteName}. This page outlines the ${name.toLowerCase()} that governs your use of our platform.</p>
          
          <h2>1. Introduction</h2>
          <p>{siteName} is committed to bringing you {siteDescription.toLowerCase()}. By accessing our website, you agree to these terms.</p>
          
          <h2>2. Content and Information</h2>
          <p>The content provided on {siteName} is for informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind about the completeness or accuracy of the materials published here.</p>
          
          <h2>3. Third-Party Links</h2>
          <p>Our platform may contain links to third-party websites or services that are not owned or controlled by {siteName}. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
          
          <h2>4. Contact Information</h2>
          <p>If you have any questions about this ${name}, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> <a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
            {settings?.contactPhone && <li><strong>Phone:</strong> {settings.contactPhone}</li>}
            {settings?.contactAddress && <li><strong>Address:</strong> {settings.contactAddress}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}