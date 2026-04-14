const fs = require('fs');
let code = fs.readFileSync('src/app/layout.tsx', 'utf8');
if (!code.includes('faviconUrl')) {
  code = code.replace(/const siteName = settings\?\.siteName \|\| ["']Our Website["'];/, `const siteName = settings?.siteName || "Our Website";\n  const faviconUrl = settings?.faviconUrl || "/favicon.ico";`);
  
  if (code.includes('icons: {')) {
    code = code.replace(/icons: \{[\s\S]*?\},/, `icons: {\n    icon: faviconUrl,\n    shortcut: faviconUrl,\n    apple: faviconUrl,\n  },`);
  } else {
    code = code.replace(/title: \{\n\s*default: siteName,/, `icons: {\n    icon: faviconUrl,\n    shortcut: faviconUrl,\n    apple: faviconUrl,\n  },\n  title: {\n    default: siteName,`);
  }
  
  fs.writeFileSync('src/app/layout.tsx', code);
  console.log('Favicon dynamically linked from Settings');
}
