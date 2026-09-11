import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const base = 'public/All-images';
const folders = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

let totalBefore = 0, totalAfter = 0, count = 0;

for (const folder of folders) {
  const dir = path.join(base, folder);
  const files = fs.readdirSync(dir).filter(f => /\.jpe?g$/i.test(f));
  console.log(`\n[${folder}] ${files.length} files`);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    totalBefore += stat.size;
    try {
      const tmp = full + '.tmp.jpg';
      await sharp(full)
        .rotate()
        .resize({ width: 1280, withoutEnlargement: true })
        .jpeg({ quality: 70, mozjpeg: true })
        .toFile(tmp);
      const after = fs.statSync(tmp).size;
      fs.renameSync(tmp, full);
      totalAfter += after;
      count++;
      if (count % 50 === 0) console.log(`  ${count} done... before ${(totalBefore/1024/1024).toFixed(1)}MB after ${(totalAfter/1024/1024).toFixed(1)}MB`);
    } catch (e) {
      console.error(`  failed ${file}:`, e.message);
    }
  }
}

console.log(`\nDone: ${count} files`);
console.log(`Before: ${(totalBefore/1024/1024).toFixed(1)} MB`);
console.log(`After: ${(totalAfter/1024/1024).toFixed(1)} MB`);
console.log(`Saved: ${((1 - totalAfter/totalBefore)*100).toFixed(1)}%`);
