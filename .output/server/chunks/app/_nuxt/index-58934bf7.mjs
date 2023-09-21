import { u as useFormSize, E as ElLoading, a as ElButton } from './el-button-de390d68.mjs';
import { defineComponent, computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, unref, withCtx, renderSlot, ref, watch, mergeProps, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { b as buildProps, u as useNamespace, w as withInstall, a as useAuth, c as useTitle, d as upload_default, r as refresh_default, e as delete_default, f as componentSizes, g as appName, _ as _export_sfc } from './app-0c3f4cab.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-afaf4e47.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import '@ctrl/tinycolor';
import '@vueuse/core';
import '@vue/shared';
import '../server.mjs';
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
import 'lodash-unified';
import './index-6a088328.mjs';

const textProps = buildProps({
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger", ""],
    default: ""
  },
  size: {
    type: String,
    values: componentSizes,
    default: ""
  },
  truncated: {
    type: Boolean
  },
  tag: {
    type: String,
    default: "span"
  }
});
const __default__ = /* @__PURE__ */ defineComponent({
  name: "ElText"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: textProps,
  setup(__props) {
    const props = __props;
    const textSize = useFormSize();
    const ns = useNamespace("text");
    const textKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(textSize.value),
      ns.is("truncated", props.truncated)
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(unref(textKls))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
var Text = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/text/src/text.vue"]]);
const ElText = withInstall(Text);
const isLoading = ref(false);
const fileList = ref([]);
let streamingIsStarted = false;
async function startStreaming() {
  if (streamingIsStarted)
    return;
  streamingIsStarted = true;
  const controller = new AbortController();
  const decoder = new TextDecoder();
  const readChunks = async () => {
    await reader.read().then(async ({ value, done }) => {
      if (done) {
        streamingIsStarted = false;
        startStreaming();
        return;
      }
      const decodedValue = decoder.decode(value);
      if (decodedValue) {
        _fetchFileList();
      }
      readChunks();
    });
  };
  const streamRes = await fetch("/api/drive/event", {
    method: "POST",
    body: "{}",
    signal: controller.signal
  });
  const reader = streamRes.body.getReader();
  readChunks();
}
async function _fetchFileList() {
  try {
    const res = await $fetch("/api/drive/list", { method: "POST" });
    fileList.value = res.data;
    startStreaming();
  } catch {
    fileList.value = [];
  }
}
async function fetchFileList() {
  isLoading.value = true;
  try {
    await _fetchFileList();
  } catch {
  }
  isLoading.value = false;
}
async function uploadFiles(files) {
  isLoading.value = true;
  try {
    const formData = new FormData();
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        formData.append(`${i}`, files[i]);
      }
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/drive/file");
    xhr.send(formData);
    xhr.upload.addEventListener("progress", (ev) => {
      console.log(ev.lengthComputable, ev.loaded, ev.total);
    });
  } catch {
  }
  isLoading.value = false;
}
async function deleteFile(fp) {
  isLoading.value = true;
  try {
    await $fetch("/api/drive/file", { method: "DELETE", body: { fp } });
  } catch {
  }
  isLoading.value = false;
}
function useDrive() {
  return {
    fileList,
    isLoading,
    _refresh: _fetchFileList,
    refresh: fetchFileList,
    uploadFiles,
    deleteFile
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoggedIn } = useAuth();
    const drive = useDrive();
    const { isLoading: isLoading2, fileList: fileList2 } = drive;
    async function loading(func, text = "Loading...") {
      const loading2 = ElLoading.service({ text });
      try {
        return await func();
      } finally {
        loading2.close();
      }
    }
    function fileInputEl() {
      return document.querySelector(".FileUpload");
    }
    watch(isLoggedIn, (value) => value ? loading(drive.refresh) : drive.fileList.value = []);
    useTitle(`${appName}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_text = ElText;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 flex-col flex-center" }, _attrs))}>`);
      if (unref(isLoggedIn)) {
        _push(`<div><div>`);
        _push(ssrRenderComponent(_component_el_button, {
          icon: unref(upload_default),
          onClick: ($event) => fileInputEl().click(),
          loading: unref(isLoading2)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Upload`);
            } else {
              return [
                createTextVNode("Upload")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button, {
          icon: unref(refresh_default),
          onClick: ($event) => loading(unref(drive).refresh),
          loading: unref(isLoading2)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Refresh`);
            } else {
              return [
                createTextVNode("Refresh")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<form style="${ssrRenderStyle({ "display": "none" })}"><input class="FileUpload" type="file" multiple></form></div><div class="FileList mt-8">`);
        if (unref(fileList2).length === 0) {
          _push(`<div><div class="text-center select-none">`);
          _push(ssrRenderComponent(_component_el_text, { type: "info" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`No files`);
              } else {
                return [
                  createTextVNode("No files")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(fileList2), (fp) => {
          _push(`<div class="FileItem flex justify-center items-center"><a class="flex-1"${ssrRenderAttr("href", `/api/drive/file/${fp}`)} target="_blank">`);
          _push(ssrRenderComponent(_component_el_text, { size: "large" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(fp)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(fp), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</a>`);
          _push(ssrRenderComponent(_component_el_button, {
            class: "FileItemDeleteBtn mx-1",
            icon: unref(delete_default),
            type: "danger",
            plain: "",
            loading: unref(isLoading2),
            onClick: ($event) => loading(() => unref(drive).deleteFile(fp))
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div><h1>Welcome to Drive!</h1><div class="mt-8 text-center">`);
        _push(ssrRenderComponent(_component_el_text, { size: "large" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`You are not logged in. `);
            } else {
              return [
                createTextVNode("You are not logged in. ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_text, { size: "large" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Please `);
            } else {
              return [
                createTextVNode("Please ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { href: "/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_button, {
                size: "small",
                class: "HomepageLoginButton mb-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Log In`);
                  } else {
                    return [
                      createTextVNode("Log In")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_button, {
                  size: "small",
                  class: "HomepageLoginButton mb-1"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Log In")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-58934bf7.mjs.map
