import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building Noavaran Panjereh Sepahan for GitHub Pages...');

// 1. Clean output and next cache
if (fs.existsSync('.next')) {
  fs.rmSync('.next', { recursive: true, force: true });
}
if (fs.existsSync('out')) {
  fs.rmSync('out', { recursive: true, force: true });
}

// 2. Set environment variables
const env = {
  ...process.env,
  EXPORT_STATIC: 'true',
  NEXT_PUBLIC_BASE_PATH: '/noavaran-panjereh-sepahan',
};

// 3. Run next build
console.log('📦 Executing Next.js static export with basePath: /noavaran-panjereh-sepahan ...');
execSync('npx next build', {
  stdio: 'inherit',
  env,
});

// 4. Ensure .nojekyll
fs.writeFileSync(path.join('out', '.nojekyll'), '# Disable Jekyll for GitHub Pages\n');

// 5. Post-process HTML files in out to ensure all root-relative asset paths are prefixed
console.log('🔍 Post-processing exported files for GitHub Pages subpath compatibility...');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace href="/..." and src="/..." for root assets if not already prefixed
      const assetPatterns = [
        /(href|src)=["']\/images\//g,
        /(href|src)=["']\/projects\//g,
        /(href|src)=["']\/favicon\.ico["']/g,
        /(href|src)=["']\/apple-icon\.png["']/g,
        /(href|src)=["']\/apple-touch-icon\.png["']/g,
        /(href|src)=["']\/icon\.png["']/g,
        /(href|src)=["']\/icon\.svg["']/g,
        /(href|src)=["']\/logo\.png["']/g,
        /(href|src)=["']\/logo\.svg["']/g,
      ];

      for (const pattern of assetPatterns) {
        if (pattern.test(content)) {
          content = content.replace(pattern, (match, attr) => {
            const quote = match.charAt(match.length - (match.endsWith("'") || match.endsWith('"') ? 1 : match.indexOf('/') > 0 ? 0 : 1));
            const isFullMatch = match.endsWith('"') || match.endsWith("'");
            if (isFullMatch) {
              const filename = match.slice(attr.length + 2, -1);
              return `${attr}="/noavaran-panjereh-sepahan${filename}"`;
            }
            return `${attr}="/noavaran-panjereh-sepahan/${match.split('/')[1]}/`;
          });
          modified = true;
        }
      }

      // Exact replacements for preload links
      const preloadReplacements = [
        ['href="/images/', 'href="/noavaran-panjereh-sepahan/images/'],
        ['href="/projects/', 'href="/noavaran-panjereh-sepahan/projects/'],
        ['src="/images/', 'src="/noavaran-panjereh-sepahan/images/'],
        ['src="/projects/', 'src="/noavaran-panjereh-sepahan/projects/'],
        ['href="/favicon.ico"', 'href="/noavaran-panjereh-sepahan/favicon.ico"'],
        ['href="/apple-icon.png"', 'href="/noavaran-panjereh-sepahan/apple-icon.png"'],
        ['href="/icon.svg"', 'href="/noavaran-panjereh-sepahan/icon.svg"'],
        ['href="/llms.txt"', 'href="/noavaran-panjereh-sepahan/llms.txt"'],
      ];

      for (const [from, to] of preloadReplacements) {
        if (content.includes(from)) {
          content = content.replaceAll(from, to);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

processDir('out');

console.log('✅ GitHub Pages build complete in out/ directory!');
