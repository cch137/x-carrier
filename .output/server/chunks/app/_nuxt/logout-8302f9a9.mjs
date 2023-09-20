import { a as useAuth, c as useTitle, g as appName } from './app-0c3f4cab.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { n as navigateTo } from '../server.mjs';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import './index-6a088328.mjs';
import '@unhead/shared';
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
import 'vue-router';
import 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "logout",
  __ssrInlineRender: true,
  setup(__props) {
    const { logout } = useAuth();
    useTitle(`Log Out - ${appName}`);
    logout().finally(() => {
      navigateTo("/");
    });
    return (_ctx, _push, _parent, _attrs) => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/logout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=logout-8302f9a9.mjs.map
