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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoggedIn } = useAuth();
    const isLoading = ref(false);
    const fileList = ref([]);
    async function _fetchFileList() {
      try {
        const res = await $fetch("/api/drive/list", { method: "POST" });
        fileList.value = res.data;
      } catch {
      }
    }
    async function loadFileList() {
      isLoading.value = true;
      const loading = ElLoading.service({ text: "Loading..." });
      await _fetchFileList();
      isLoading.value = false;
      loading.close();
    }
    function fileUplaodEl() {
      return document.querySelector(".FileUpload");
    }
    async function deleteFile(fp) {
      isLoading.value = true;
      const loading = ElLoading.service({ text: "Loading..." });
      await $fetch("/api/drive/file", { method: "DELETE", body: { fp } });
      isLoading.value = false;
      loading.close();
    }
    watch(isLoggedIn, (value) => value ? loadFileList() : null);
    useTitle(`Home - ${appName}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_text = ElText;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 flex-col flex-center" }, _attrs))}>`);
      if (unref(isLoggedIn)) {
        _push(`<div><div>`);
        _push(ssrRenderComponent(_component_el_button, {
          icon: unref(upload_default),
          onClick: ($event) => fileUplaodEl().click(),
          loading: unref(isLoading)
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
          onClick: ($event) => loadFileList(),
          loading: unref(isLoading)
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
        if (unref(fileList).length === 0) {
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
        ssrRenderList(unref(fileList), (fp) => {
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
            loading: unref(isLoading),
            onClick: ($event) => deleteFile(fp)
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
//# sourceMappingURL=index-5cf5cca6.mjs.map
