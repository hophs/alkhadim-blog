const fs = require('fs');
const content = fs.readFileSync('src/app/(blog)/blog/[slug]/page.tsx', 'utf-8');
const p1 = content.split('<Mail className="w-10 h-10 mb-4" />')[0];
const target = content.substring(p1.lastIndexOf('<section className="bg-[#1a2b3c]'), content.length);
const p2 = content.split('Subscribe Now\n            </button>\n          </section>')[1];
const newContent = p1.substring(0, p1.lastIndexOf('<section className="bg-[#1a2b3c]')) + '<SidebarSubscribe />' + p2;
fs.writeFileSync('src/app/(blog)/blog/[slug]/page.tsx', newContent);
