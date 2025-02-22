//
//
//
//

var script = {

    props: {
        human: {
            type: Boolean,
            required: false,
            default: false
        },
        typeInterval: {
            type: Number,
            required: false,
            default: 50
        },
        pauseInterval: {
            type: Number,
            required: false,
            default: 2000
        },
        words: {
            type: Array,
            required: true
        }
    },
    data: function data() {
        return {
            text: "",
            index: 0
        }
    },
    mounted: function mounted() {
        this.addLetter();
    },
    methods: {
        removeLetter: function removeLetter() {
            // this sets the text to itself but minus a letter
            this.text = this.text.slice(0, this.text.length - 1);
            if (this.text.length > 0) {
                // We still have text left
                setTimeout(this.removeLetter, this.typeInterval * 0.75);
            } else {
                // Nothing left!
                // go to the next word in the array
                // if the next word doesn't exist, we go back to the first
                this.index += 1;
                if (this.index >= this.words.length) {
                    this.index = 0;
                }

                //pause after the word is erased
                setTimeout(this.addLetter, this.pauseInterval * 0.3);
            }
        },
        addLetter: function addLetter() {
            var nextLetter = this.words[this.index][this.text.length];

            // Adds the next letter in a word
            this.text = this.text + nextLetter;
            if (this.text === this.words[this.index]) {
                // We're done with the word
                this.text = this.text + ".";
                setTimeout(this.removeLetter, this.pauseInterval);
            } else {
                // We're still typing
                var humanFactor = this.human ? Math.random() * this.typeInterval * 3 : 0;
                setTimeout(this.addLetter, this.typeInterval + humanFactor);
            }
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "typer" }, [
    _vm._v(_vm._s(_vm.text)),
    _c("span", { staticClass: "blinker" }, [_vm._v("|")])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-5a6dce6f_0", { source: "@keyframes blink-data-v-5a6dce6f {\n0% {\n    opacity: 0;\n}\n50% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n.typer .blinker[data-v-5a6dce6f] {\n  animation: blink-data-v-5a6dce6f infinite 500ms;\n}\n\n/*# sourceMappingURL=typist.vue.map */", map: {"version":3,"sources":["/Users/oussama/Documents/apps/vue-typist/src/typist.vue","typist.vue"],"names":[],"mappings":"AA8EA;AACA;IACA,UAAA;AAAA;AAEA;IACA,UAAA;AAAA;AAEA;IACA,UAAA;AAAA;AAAA;AAIA;EAEA,+CAAA;AAAA;;ACjFA,qCAAqC","file":"typist.vue","sourcesContent":["<template>\n    <span class=\"typer\">{{ text }}<span class=\"blinker\">|</span></span>\n</template>\n\n<script>\n    export default {\n\n        props: {\n            human: {\n                type: Boolean,\n                required: false,\n                default: false\n            },\n            typeInterval: {\n                type: Number,\n                required: false,\n                default: 50\n            },\n            pauseInterval: {\n                type: Number,\n                required: false,\n                default: 2000\n            },\n            words: {\n                type: Array,\n                required: true\n            }\n        },\n        data() {\n            return {\n                text: \"\",\n                index: 0\n            }\n        },\n        mounted() {\n            this.addLetter();\n        },\n        methods: {\n            removeLetter() {\n                // this sets the text to itself but minus a letter\n                this.text = this.text.slice(0, this.text.length - 1);\n                if (this.text.length > 0) {\n                    // We still have text left\n                    setTimeout(this.removeLetter, this.typeInterval * 0.75)\n                } else {\n                    // Nothing left!\n                    // go to the next word in the array\n                    // if the next word doesn't exist, we go back to the first\n                    this.index += 1;\n                    if (this.index >= this.words.length) {\n                        this.index = 0;\n                    }\n\n                    //pause after the word is erased\n                    setTimeout(this.addLetter, this.pauseInterval * 0.3);\n                }\n            },\n            addLetter() {\n                const nextLetter = this.words[this.index][this.text.length];\n\n                // Adds the next letter in a word\n                this.text = this.text + nextLetter;\n                if (this.text === this.words[this.index]) {\n                    // We're done with the word\n                    this.text = this.text + \".\";\n                    setTimeout(this.removeLetter, this.pauseInterval);\n                } else {\n                    // We're still typing\n                    const humanFactor = this.human ? Math.random() * this.typeInterval * 3 : 0;\n                    setTimeout(this.addLetter, this.typeInterval + humanFactor);\n                }\n            }\n        }\n    }\n</script>\n\n<style lang=\"scss\" scoped>\n\n    @keyframes blink {\n        0% {\n            opacity: 0;\n        }\n        50% {\n            opacity: 1;\n        }\n        100% {\n            opacity: 0;\n        }\n    }\n\n    .typer {\n        .blinker {\n            animation: blink infinite 500ms;\n        }\n    }\n</style>\n","@keyframes blink {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n.typer .blinker {\n  animation: blink infinite 500ms; }\n\n/*# sourceMappingURL=typist.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-5a6dce6f";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var typist = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

export default typist;
