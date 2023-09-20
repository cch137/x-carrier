import url from 'url';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import chardet from 'chardet';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesDirPath = path.join(__dirname, './files');

function makeDir() {
  try {
    fs.mkdirSync(filesDirPath, { recursive: true });
  } catch {}
}

makeDir();

export default {
  fileList() {
    return fs.readdirSync(filesDirPath);
  },
  readFile(fp: string) {
    fp = path.join(filesDirPath, `./${fp}`);
    const exists = fs.existsSync(fp);
    const content = exists ? fs.readFileSync(fp) : Buffer.from('');
    const mimetype = exists ? mime.getType(fp) || 'application' : '';
    const encoding = mimetype.startsWith('text') ? chardet.detect(content) : undefined;
    return { exists, content, mimetype, encoding };
  }
}
