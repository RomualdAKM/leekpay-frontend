const fs = require('fs');
const path = require('path');

const files = [
  'pages/payment-links/index.vue',
  'pages/sales-pages/index.vue',
  'pages/index.vue'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = content.replace(/^\s*v-motion-visibility="\{[^}]+\}"\s*$/gm, '');
    fs.writeFileSync(filePath, cleaned);
    console.log(`Cleaned ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
});

console.log('Done!');
