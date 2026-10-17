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

// 3. Temporarily stash dynamic server routes during static HTML export
const stashes = [
  { src: path.join('app', 'api'), tmp: path.join('.api_gh_pages_tmp'), moved: false },
  { src: path.join('app', 'uploads'), tmp: path.join('.uploads_gh_pages_tmp'), moved: false },
  { src: path.join('app', 'sitemap.ts'), tmp: path.join('.sitemap_gh_pages_tmp.ts'), moved: false },
  { src: path.join('app', 'admin'), tmp: path.join('.admin_gh_pages_tmp'), moved: false },
];

for (const s of stashes) {
  if (fs.existsSync(s.src)) {
    try {
      fs.renameSync(s.src, s.tmp);
      s.moved = true;
    } catch (err) {
      console.warn(`⚠️ Could not move ${s.src}:`, err);
    }
  }
}

try {
  // 4. Run next build
  console.log('📦 Executing Next.js static export with basePath: /noavaran-panjereh-sepahan ...');
  execSync('npx next build', {
    stdio: 'inherit',
    env,
  });
} finally {
  // Restore server route directories
  for (const s of stashes) {
    if (s.moved && fs.existsSync(s.tmp)) {
      try {
        fs.renameSync(s.tmp, s.src);
        console.log(`✅ Restored ${s.src} directory`);
      } catch (err) {
        console.error(`❌ Failed to restore ${s.src} directory:`, err);
      }
    }
  }
}

// 5. Ensure .nojekyll
fs.writeFileSync(path.join('out', '.nojekyll'), '# Disable Jekyll for GitHub Pages\n');

// 6. Post-process HTML files in out to ensure all root-relative asset paths are prefixed
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
        /(href|src)=["']\/uploads\//g,
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
            return `${attr}="/noavaran-panjereh-sepahan/${match.slice(attr.length + 2)}`;
          });
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

if (fs.existsSync('out')) {
  processDir('out');
}

console.log('🎉 GitHub Pages export completed successfully in ./out');
