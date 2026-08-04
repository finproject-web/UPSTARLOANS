const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const distDir = './dist';
const assetsDir = path.join(distDir, 'assets');

// Obfuscation options (optimized for large files)
const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.3,
  debugProtection: true,
  debugProtectionInterval: 0,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'mangled',
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: true,
  shuffleStringArray: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.5,
  transformObjectKeys: false,
  unicodeEscapeSequence: false
};

function obfuscateFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, obfuscationOptions);
  fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode(), 'utf8');
  console.log(`✅ Obfuscated: ${filePath}`);
}

console.log('=== Obfuscating production build ===');

try {
  if (!fs.existsSync(assetsDir)) {
    console.error('❌ dist/assets directory not found. Run npm run build first.');
    process.exit(1);
  }

  // Only obfuscate the main application bundles, not third-party libraries
  const files = fs.readdirSync(assetsDir);
  const mainBundle = files.find(f => f.startsWith('index-') && f.endsWith('.js') && !f.includes('.es-'));
  const esBundle = files.find(f => f.startsWith('index.es-') && f.endsWith('.js'));
  
  if (mainBundle) {
    obfuscateFile(path.join(assetsDir, mainBundle));
  }
  
  if (esBundle) {
    obfuscateFile(path.join(assetsDir, esBundle));
  }
  
  console.log('✅ Build obfuscation complete');
} catch (error) {
  console.error('❌ Error during obfuscation:', error);
  process.exit(1);
}