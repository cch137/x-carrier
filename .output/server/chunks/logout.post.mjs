import { a as defineEventHandler } from './nitro/node-server.mjs';
import { serialize } from 'cookie';
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

const logout_post = defineEventHandler(async function(event) {
  const { req, res } = event.node;
  res.setHeader("Set-Cookie", serialize("token", "", {
    path: "/",
    httpOnly: true,
    sameSite: true,
    secure: true,
    expires: /* @__PURE__ */ new Date()
  }));
  return { isLoggedIn: false };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
