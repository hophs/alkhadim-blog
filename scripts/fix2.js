const fs = require('fs');
let text16 = fs.readFileSync('prisma/schema.prisma');
let text8 = text16.toString('ascii').replace(/[^\x00-\x7F]/g, '');
fs.writeFileSync('prisma/schema.prisma.temp', text8, 'utf8');
