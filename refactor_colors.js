import fs from 'fs';
import path from 'path';

const colorMapping = {
  // Backgrounds
  'bg-[#0B0F19]': 'bg-base',
  'from-[#0B0F19]': 'from-base',
  'via-[#0B0F19]': 'via-base',
  'to-[#0B0F19]': 'to-base',

  'bg-[#131B2F]': 'bg-surface',
  'from-[#131B2F]': 'from-surface',
  'via-[#131B2F]': 'via-surface',
  'to-[#131B2F]': 'to-surface',

  // Borders
  'border-[#1e293b]': 'border-divider',
  'border-[#0B0F19]': 'border-base',
  'divide-[#1e293b]': 'divide-divider',

  // Hovers
  'hover:bg-[#1e293b]': 'hover:bg-surface-hover',
  'hover:border-[#1e293b]': 'hover:border-divider-hover',

  // Background hover explicitly
  'bg-[#1e293b]': 'bg-surface-hover',

  // Text
  'text-white': 'text-primary',
  'text-slate-100': 'text-primary',
  'text-slate-300': 'text-secondary',
  'text-slate-400': 'text-muted',
};

// Also replace hardcoded values inside class names for specific cases if needed
// But literal replacements of the whole words are safer.

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace exact whole words using regex
      for (const [oldClass, newClass] of Object.entries(colorMapping)) {
        // We use split/join on spaces/quotes to ensure we're replacing full classes
        // But simpler: just replace all occurrences of `oldClass`
        // Ensure oldClass is not followed by a dash (like bg-[#0B0F19]/50)
        // Wait, if it's bg-[#0B0F19]/50, the replacement should be bg-base/50
        const regexStr = oldClass.replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '(?![a-zA-Z0-9_-])';
        const regex = new RegExp(regexStr, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, newClass);
          modified = true;
        }
      }

      // Handle the /XX opacity variations, e.g., bg-[#0B0F19]/50 -> bg-base/50
      // Already handled by the regex if we just replace the base part, wait.
      // If we replace `bg-[#0B0F19]` with `bg-base`, then `bg-[#0B0F19]/50` -> `bg-base/50`!
      // This is perfectly correct for Tailwind V4.

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
console.log('Done!');
