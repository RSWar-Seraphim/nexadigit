const fs = require('fs');
const path = require('path');

const TARGET_EXTENSIONS = ['.html', '.css', '.js', '.ts'];
const IMAGE_DIR = path.join(__dirname, 'src', 'assets');
const IMG_EXT_REGEX = /\.(png|jpg)/gi;

function getWebPImages() {
  const allFiles = fs.readdirSync(IMAGE_DIR);
  return new Set(allFiles.filter(f => f.endsWith('.webp')).map(f => f.replace('.webp', '')));
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function replaceImageReferences(file, webpImages) {
  const ext = path.extname(file);
  if (!TARGET_EXTENSIONS.includes(ext)) return;

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  content = content.replace(IMG_EXT_REGEX, (match, ext) => {
    const base = path.basename(match, `.${ext}`);
    if (webpImages.has(base)) {
      changed = true;
      return '.webp';
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✔️  Actualizado: ${file}`);
  }
}

const webpImages = getWebPImages();

walkDir(__dirname, file => replaceImageReferences(file, webpImages));

console.log('\n✅ ¡Referencias actualizadas donde fue posible!');
