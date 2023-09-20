import { a as defineEventHandler, b as readMultipartFormData } from './nitro/node-server.mjs';
import { t as troll, S as SALT, P as PIN, r as random } from './troll.mjs';
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

const file_post = defineEventHandler(async function(event) {
  var _a;
  const { req, res } = event.node;
  try {
    const pin = troll.d(((_a = parse(req.headers.cookie || "")) == null ? void 0 : _a.token) || "", 2, SALT);
    if (pin != PIN) {
      return { error: "Not logged in.", data: false };
    }
  } catch {
  }
  const files = await readMultipartFormData(event);
  if (files !== void 0) {
    await Promise.all(files.map((file) => {
      return drive.writeFile(
        file.filename || `${random.base16(16)}.${(file.type || "").split("/").at(-1)}`,
        file.data
      );
    }));
  }
  return { data: true };
});

export { file_post as default };
//# sourceMappingURL=file.post.mjs.map
