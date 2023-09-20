import { a as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { t as troll, S as SALT, P as PIN } from './troll.mjs';
import { parse } from 'cookie';
import { d as drive } from './index.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'crypto-js/sha3.js';
import 'crypto-js/md5.js';
import 'url';
import 'mime';
import 'chardet';

const file_delete = defineEventHandler(async function(event) {
  var _a, _b;
  const { req, res } = event.node;
  try {
    const pin = troll.d(((_a = parse(req.headers.cookie || "")) == null ? void 0 : _a.token) || "", 2, SALT);
    if (pin != PIN) {
      return { error: "Not logged in.", data: false };
    }
  } catch {
  }
  const fp = (_b = await readBody(event)) == null ? void 0 : _b.fp;
  if (fp)
    await drive.deleteFile(fp);
  return { data: true };
});

export { file_delete as default };
//# sourceMappingURL=file.delete.mjs.map
