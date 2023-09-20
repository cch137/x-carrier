import { d as defineNuxtRouteMiddleware } from '../server.mjs';
import 'vue';
import '../../nitro/node-server.mjs';
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
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue/server-renderer';

const onlyNoAuth = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
});

export { onlyNoAuth as default };
//# sourceMappingURL=onlyNoAuth-6b87219a.mjs.map
