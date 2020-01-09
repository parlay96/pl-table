module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/util");

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/dom");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/mixins/emitter");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/debounce");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/mixins/locale");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/resize-event");

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/vue-popper");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/shared");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/merge");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("resize-observer-polyfill");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("plxy-grid");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/locale");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/clickoutside");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "pl-table/lib/utils/resize-event"
var resize_event_ = __webpack_require__(8);

// EXTERNAL MODULE: external "pl-table/lib/utils/scrollbar-width"
var scrollbar_width_ = __webpack_require__(18);
var scrollbar_width_default = /*#__PURE__*/__webpack_require__.n(scrollbar_width_);

// EXTERNAL MODULE: external "pl-table/lib/utils/util"
var util_ = __webpack_require__(0);

// EXTERNAL MODULE: external "pl-table/lib/utils/dom"
var dom_ = __webpack_require__(3);

// CONCATENATED MODULE: ./packages/scrollbar/src/util.js
var BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

function renderThumbStyle(_ref) {
  var move = _ref.move,
      size = _ref.size,
      bar = _ref.bar;

  var style = {};
  var translate = 'translate' + bar.axis + '(' + move + '%)';

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;

  return style;
};
// CONCATENATED MODULE: ./packages/scrollbar/src/bar.js



/* istanbul ignore next */
/* harmony default export */ var src_bar = ({
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },

  computed: {
    bar: function bar() {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
    },
    wrap: function wrap() {
      return this.$parent.wrap;
    }
  },

  render: function render(h) {
    var size = this.size,
        move = this.move,
        bar = this.bar;


    return h(
      'div',
      {
        'class': ['el-scrollbar__bar', 'is-' + bar.key],
        on: {
          'mousedown': this.clickTrackHandler
        }
      },
      [h('div', {
        ref: 'thumb',
        'class': 'el-scrollbar__thumb',
        on: {
          'mousedown': this.clickThumbHandler
        },

        style: renderThumbStyle({ size: size, move: move, bar: bar }) })]
    );
  },


  methods: {
    clickThumbHandler: function clickThumbHandler(e) {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      this.startDrag(e);
      this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    },
    clickTrackHandler: function clickTrackHandler(e) {
      var offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      var thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
      var thumbPositionPercentage = (offset - thumbHalf) * 100 / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    },
    startDrag: function startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      Object(dom_["on"])(document, 'mousemove', this.mouseMoveDocumentHandler);
      Object(dom_["on"])(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = function () {
        return false;
      };
    },
    mouseMoveDocumentHandler: function mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      var prevPage = this[this.bar.axis];

      if (!prevPage) return;

      var offset = (this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1;
      var thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
      var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    },
    mouseUpDocumentHandler: function mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      Object(dom_["off"])(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  },

  destroyed: function destroyed() {
    Object(dom_["off"])(document, 'mouseup', this.mouseUpDocumentHandler);
  }
});
// CONCATENATED MODULE: ./packages/scrollbar/src/main.js
// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js






/* istanbul ignore next */
/* harmony default export */ var main = ({
  name: 'ElScrollbar',

  components: { Bar: src_bar },

  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  },

  data: function data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
  },


  computed: {
    wrap: function wrap() {
      return this.$refs.wrap;
    }
  },

  render: function render(h) {
    var gutter = scrollbar_width_default()();
    var style = this.wrapStyle;

    if (gutter) {
      var gutterWith = '-' + gutter + 'px';
      var gutterStyle = 'margin-bottom: ' + gutterWith + '; margin-right: ' + gutterWith + ';';

      if (Array.isArray(this.wrapStyle)) {
        style = Object(util_["toObject"])(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    var view = h(this.tag, {
      class: ['el-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);
    var wrap = h(
      'div',
      {
        ref: 'wrap',
        style: style,
        on: {
          'scroll': this.handleScroll
        },

        'class': [this.wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default'] },
      [[view]]
    );
    var nodes = void 0;

    if (!this.native) {
      nodes = [wrap, h(src_bar, {
        attrs: {
          move: this.moveX,
          size: this.sizeWidth }
      }), h(src_bar, {
        attrs: {
          vertical: true,
          move: this.moveY,
          size: this.sizeHeight }
      })];
    } else {
      nodes = [h(
        'div',
        {
          ref: 'wrap',
          'class': [this.wrapClass, 'el-scrollbar__wrap'],
          style: style },
        [[view]]
      )];
    }
    return h('div', { class: 'el-scrollbar' }, nodes);
  },


  methods: {
    handleScroll: function handleScroll() {
      var wrap = this.wrap;

      this.moveY = wrap.scrollTop * 100 / wrap.clientHeight;
      this.moveX = wrap.scrollLeft * 100 / wrap.clientWidth;
    },
    update: function update() {
      var heightPercentage = void 0,
          widthPercentage = void 0;
      var wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;

      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';
    }
  },

  mounted: function mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && Object(resize_event_["addResizeListener"])(this.$refs.resize, this.update);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.native) return;
    !this.noresize && Object(resize_event_["removeResizeListener"])(this.$refs.resize, this.update);
  }
});
// CONCATENATED MODULE: ./packages/scrollbar/index.js


/* istanbul ignore next */
main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var scrollbar = __webpack_exports__["a"] = (main);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/scrollbar-width");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("vuedraggable");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/mixins/focus");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/mixins/migrating");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("pl-table/lib/utils/scroll-into-view");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/pagination/src/pager.vue?vue&type=template&id=7274f267&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "el-pager", on: { click: _vm.onPagerClick } },
    [
      _vm.pageCount > 0
        ? _c(
            "li",
            {
              staticClass: "number",
              class: { active: _vm.currentPage === 1, disabled: _vm.disabled }
            },
            [_vm._v("1")]
          )
        : _vm._e(),
      _vm.showPrevMore
        ? _c("li", {
            staticClass: "el-icon more btn-quickprev",
            class: [_vm.quickprevIconClass, { disabled: _vm.disabled }],
            on: {
              mouseenter: function($event) {
                _vm.onMouseenter("left")
              },
              mouseleave: function($event) {
                _vm.quickprevIconClass = "el-icon-more"
              }
            }
          })
        : _vm._e(),
      _vm._l(_vm.pagers, function(pager) {
        return _c(
          "li",
          {
            key: pager,
            staticClass: "number",
            class: { active: _vm.currentPage === pager, disabled: _vm.disabled }
          },
          [_vm._v(_vm._s(pager))]
        )
      }),
      _vm.showNextMore
        ? _c("li", {
            staticClass: "el-icon more btn-quicknext",
            class: [_vm.quicknextIconClass, { disabled: _vm.disabled }],
            on: {
              mouseenter: function($event) {
                _vm.onMouseenter("right")
              },
              mouseleave: function($event) {
                _vm.quicknextIconClass = "el-icon-more"
              }
            }
          })
        : _vm._e(),
      _vm.pageCount > 1
        ? _c(
            "li",
            {
              staticClass: "number",
              class: {
                active: _vm.currentPage === _vm.pageCount,
                disabled: _vm.disabled
              }
            },
            [_vm._v(_vm._s(_vm.pageCount))]
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/pagination/src/pager.vue?vue&type=template&id=7274f267&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/pagination/src/pager.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var pagervue_type_script_lang_js_ = ({
  name: 'ElPager',

  props: {
    currentPage: Number,

    pageCount: Number,

    pagerCount: Number,

    disabled: Boolean
  },

  watch: {
    showPrevMore: function showPrevMore(val) {
      if (!val) this.quickprevIconClass = 'el-icon-more';
    },
    showNextMore: function showNextMore(val) {
      if (!val) this.quicknextIconClass = 'el-icon-more';
    }
  },

  methods: {
    onPagerClick: function onPagerClick(event) {
      var target = event.target;
      if (target.tagName === 'UL' || this.disabled) {
        return;
      }

      var newPage = Number(event.target.textContent);
      var pageCount = this.pageCount;
      var currentPage = this.currentPage;
      var pagerCountOffset = this.pagerCount - 2;

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + pagerCountOffset;
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage);
      }
    },
    onMouseenter: function onMouseenter(direction) {
      if (this.disabled) return;
      if (direction === 'left') {
        this.quickprevIconClass = 'el-icon-d-arrow-left';
      } else {
        this.quicknextIconClass = 'el-icon-d-arrow-right';
      }
    }
  },

  computed: {
    pagers: function pagers() {
      var pagerCount = this.pagerCount;
      var halfPagerCount = (pagerCount - 1) / 2;

      var currentPage = Number(this.currentPage);
      var pageCount = Number(this.pageCount);

      var showPrevMore = false;
      var showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }

      var array = [];

      if (showPrevMore && !showNextMore) {
        var startPage = pageCount - (pagerCount - 2);
        for (var i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (var _i = 2; _i < pagerCount; _i++) {
          array.push(_i);
        }
      } else if (showPrevMore && showNextMore) {
        var offset = Math.floor(pagerCount / 2) - 1;
        for (var _i2 = currentPage - offset; _i2 <= currentPage + offset; _i2++) {
          array.push(_i2);
        }
      } else {
        for (var _i3 = 2; _i3 < pageCount; _i3++) {
          array.push(_i3);
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;

      return array;
    }
  },

  data: function data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'el-icon-more',
      quickprevIconClass: 'el-icon-more'
    };
  }
});
// CONCATENATED MODULE: ./packages/pagination/src/pager.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_pagervue_type_script_lang_js_ = (pagervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./packages/pagination/src/pager.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_pagervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/pagination/src/pager.vue"
/* harmony default export */ var pager = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select.vue?vue&type=template&id=0e4aade6&
var selectvue_type_template_id_0e4aade6_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "clickoutside",
          rawName: "v-clickoutside",
          value: _vm.handleClose,
          expression: "handleClose"
        }
      ],
      staticClass: "el-select",
      class: [_vm.selectSize ? "el-select--" + _vm.selectSize : ""],
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.toggleMenu($event)
        }
      }
    },
    [
      _vm.multiple
        ? _c(
            "div",
            {
              ref: "tags",
              staticClass: "el-select__tags",
              style: { "max-width": _vm.inputWidth - 32 + "px", width: "100%" }
            },
            [
              _vm.collapseTags && _vm.selected.length
                ? _c(
                    "span",
                    [
                      _c(
                        "el-tag",
                        {
                          attrs: {
                            closable: !_vm.selectDisabled,
                            size: _vm.collapseTagSize,
                            hit: _vm.selected[0].hitState,
                            type: "info",
                            "disable-transitions": ""
                          },
                          on: {
                            close: function($event) {
                              _vm.deleteTag($event, _vm.selected[0])
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "el-select__tags-text" }, [
                            _vm._v(_vm._s(_vm.selected[0].currentLabel))
                          ])
                        ]
                      ),
                      _vm.selected.length > 1
                        ? _c(
                            "el-tag",
                            {
                              attrs: {
                                closable: false,
                                size: _vm.collapseTagSize,
                                type: "info",
                                "disable-transitions": ""
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "el-select__tags-text" },
                                [_vm._v("+ " + _vm._s(_vm.selected.length - 1))]
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                : _vm._e(),
              !_vm.collapseTags
                ? _c(
                    "transition-group",
                    { on: { "after-leave": _vm.resetInputHeight } },
                    _vm._l(_vm.selected, function(item) {
                      return _c(
                        "el-tag",
                        {
                          key: _vm.getValueKey(item),
                          attrs: {
                            closable: !_vm.selectDisabled,
                            size: _vm.collapseTagSize,
                            hit: item.hitState,
                            type: "info",
                            "disable-transitions": ""
                          },
                          on: {
                            close: function($event) {
                              _vm.deleteTag($event, item)
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "el-select__tags-text" }, [
                            _vm._v(_vm._s(item.currentLabel))
                          ])
                        ]
                      )
                    }),
                    1
                  )
                : _vm._e(),
              _vm.filterable
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.query,
                        expression: "query"
                      }
                    ],
                    ref: "input",
                    staticClass: "el-select__input",
                    class: [_vm.selectSize ? "is-" + _vm.selectSize : ""],
                    style: {
                      "flex-grow": "1",
                      width: _vm.inputLength / (_vm.inputWidth - 32) + "%",
                      "max-width": _vm.inputWidth - 42 + "px"
                    },
                    attrs: {
                      type: "text",
                      disabled: _vm.selectDisabled,
                      autocomplete: _vm.autoComplete || _vm.autocomplete
                    },
                    domProps: { value: _vm.query },
                    on: {
                      focus: _vm.handleFocus,
                      blur: function($event) {
                        _vm.softFocus = false
                      },
                      keyup: _vm.managePlaceholder,
                      keydown: [
                        _vm.resetInputState,
                        function($event) {
                          if (
                            !("button" in $event) &&
                            _vm._k($event.keyCode, "down", 40, $event.key, [
                              "Down",
                              "ArrowDown"
                            ])
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          _vm.navigateOptions("next")
                        },
                        function($event) {
                          if (
                            !("button" in $event) &&
                            _vm._k($event.keyCode, "up", 38, $event.key, [
                              "Up",
                              "ArrowUp"
                            ])
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          _vm.navigateOptions("prev")
                        },
                        function($event) {
                          if (
                            !("button" in $event) &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.selectOption($event)
                        },
                        function($event) {
                          if (
                            !("button" in $event) &&
                            _vm._k($event.keyCode, "esc", 27, $event.key, [
                              "Esc",
                              "Escape"
                            ])
                          ) {
                            return null
                          }
                          $event.stopPropagation()
                          $event.preventDefault()
                          _vm.visible = false
                        },
                        function($event) {
                          if (
                            !("button" in $event) &&
                            _vm._k(
                              $event.keyCode,
                              "delete",
                              [8, 46],
                              $event.key,
                              ["Backspace", "Delete", "Del"]
                            )
                          ) {
                            return null
                          }
                          return _vm.deletePrevTag($event)
                        },
                        function($event) {
                          if (
                            !("button" in $event) &&
                            _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                          ) {
                            return null
                          }
                          _vm.visible = false
                        }
                      ],
                      compositionstart: _vm.handleComposition,
                      compositionupdate: _vm.handleComposition,
                      compositionend: _vm.handleComposition,
                      input: [
                        function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.query = $event.target.value
                        },
                        _vm.debouncedQueryChange
                      ]
                    }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _c(
        "el-input",
        {
          ref: "reference",
          class: { "is-focus": _vm.visible },
          attrs: {
            type: "text",
            placeholder: _vm.currentPlaceholder,
            name: _vm.name,
            id: _vm.id,
            autocomplete: _vm.autoComplete || _vm.autocomplete,
            size: _vm.selectSize,
            disabled: _vm.selectDisabled,
            readonly: _vm.readonly,
            "validate-event": false,
            tabindex: _vm.multiple && _vm.filterable ? "-1" : null
          },
          on: { focus: _vm.handleFocus, blur: _vm.handleBlur },
          nativeOn: {
            keyup: function($event) {
              return _vm.debouncedOnInputChange($event)
            },
            keydown: [
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown"
                  ])
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                _vm.navigateOptions("next")
              },
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp"
                  ])
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                _vm.navigateOptions("prev")
              },
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.selectOption($event)
              },
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "esc", 27, $event.key, [
                    "Esc",
                    "Escape"
                  ])
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                _vm.visible = false
              },
              function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                ) {
                  return null
                }
                _vm.visible = false
              }
            ],
            paste: function($event) {
              return _vm.debouncedOnInputChange($event)
            },
            mouseenter: function($event) {
              _vm.inputHovering = true
            },
            mouseleave: function($event) {
              _vm.inputHovering = false
            }
          },
          model: {
            value: _vm.selectedLabel,
            callback: function($$v) {
              _vm.selectedLabel = $$v
            },
            expression: "selectedLabel"
          }
        },
        [
          _vm.$slots.prefix
            ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
            : _vm._e(),
          _c("template", { slot: "suffix" }, [
            _c("i", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.showClose,
                  expression: "!showClose"
                }
              ],
              class: [
                "el-select__caret",
                "el-input__icon",
                "el-icon-" + _vm.iconClass
              ]
            }),
            _vm.showClose
              ? _c("i", {
                  staticClass:
                    "el-select__caret el-input__icon el-icon-circle-close",
                  on: { click: _vm.handleClearClick }
                })
              : _vm._e()
          ])
        ],
        2
      ),
      _c(
        "transition",
        {
          attrs: { name: "el-zoom-in-top" },
          on: {
            "before-enter": _vm.handleMenuEnter,
            "after-leave": _vm.doDestroy
          }
        },
        [
          _c(
            "el-select-menu",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.visible && _vm.emptyText !== false,
                  expression: "visible && emptyText !== false"
                }
              ],
              ref: "popper",
              attrs: { "append-to-body": _vm.popperAppendToBody }
            },
            [
              _c(
                "el-scrollbar",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.options.length > 0 && !_vm.loading,
                      expression: "options.length > 0 && !loading"
                    }
                  ],
                  ref: "scrollbar",
                  class: {
                    "is-empty":
                      !_vm.allowCreate &&
                      _vm.query &&
                      _vm.filteredOptionsCount === 0
                  },
                  attrs: {
                    tag: "ul",
                    "wrap-class": "el-select-dropdown__wrap",
                    "view-class": "el-select-dropdown__list"
                  }
                },
                [
                  _vm.showNewOption
                    ? _c("el-option", {
                        attrs: { value: _vm.query, created: "" }
                      })
                    : _vm._e(),
                  _vm._t("default")
                ],
                2
              ),
              _vm.emptyText &&
              (!_vm.allowCreate ||
                _vm.loading ||
                (_vm.allowCreate && _vm.options.length === 0))
                ? [
                    _vm.$slots.empty
                      ? _vm._t("empty")
                      : _c("p", { staticClass: "el-select-dropdown__empty" }, [
                          _vm._v(
                            "\n          " +
                              _vm._s(_vm.emptyText) +
                              "\n        "
                          )
                        ])
                  ]
                : _vm._e()
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
}
var selectvue_type_template_id_0e4aade6_staticRenderFns = []
selectvue_type_template_id_0e4aade6_render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/select.vue?vue&type=template&id=0e4aade6&

// EXTERNAL MODULE: external "pl-table/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "pl-table/lib/mixins/focus"
var focus_ = __webpack_require__(20);
var focus_default = /*#__PURE__*/__webpack_require__.n(focus_);

// EXTERNAL MODULE: external "pl-table/lib/mixins/locale"
var locale_ = __webpack_require__(7);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/input/src/input.vue?vue&type=template&id=343dd774&
var inputvue_type_template_id_343dd774_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: [
        _vm.type === "textarea" ? "el-textarea" : "el-input",
        _vm.inputSize ? "el-input--" + _vm.inputSize : "",
        {
          "is-disabled": _vm.inputDisabled,
          "is-exceed": _vm.inputExceed,
          "el-input-group": _vm.$slots.prepend || _vm.$slots.append,
          "el-input-group--append": _vm.$slots.append,
          "el-input-group--prepend": _vm.$slots.prepend,
          "el-input--prefix": _vm.$slots.prefix || _vm.prefixIcon,
          "el-input--suffix":
            _vm.$slots.suffix ||
            _vm.suffixIcon ||
            _vm.clearable ||
            _vm.showPassword
        }
      ],
      on: {
        mouseenter: function($event) {
          _vm.hovering = true
        },
        mouseleave: function($event) {
          _vm.hovering = false
        }
      }
    },
    [
      _vm.type !== "textarea"
        ? [
            _vm.$slots.prepend
              ? _c(
                  "div",
                  { staticClass: "el-input-group__prepend" },
                  [_vm._t("prepend")],
                  2
                )
              : _vm._e(),
            _vm.type !== "textarea"
              ? _c(
                  "input",
                  _vm._b(
                    {
                      ref: "input",
                      staticClass: "el-input__inner",
                      attrs: {
                        tabindex: _vm.tabindex,
                        type: _vm.showPassword
                          ? _vm.passwordVisible
                            ? "text"
                            : "password"
                          : _vm.type,
                        disabled: _vm.inputDisabled,
                        readonly: _vm.readonly,
                        autocomplete: _vm.autoComplete || _vm.autocomplete,
                        "aria-label": _vm.label
                      },
                      on: {
                        compositionstart: _vm.handleCompositionStart,
                        compositionupdate: _vm.handleCompositionUpdate,
                        compositionend: _vm.handleCompositionEnd,
                        input: _vm.handleInput,
                        focus: _vm.handleFocus,
                        blur: _vm.handleBlur,
                        change: _vm.handleChange
                      }
                    },
                    "input",
                    _vm.$attrs,
                    false
                  )
                )
              : _vm._e(),
            _vm.$slots.prefix || _vm.prefixIcon
              ? _c(
                  "span",
                  { staticClass: "el-input__prefix" },
                  [
                    _vm._t("prefix"),
                    _vm.prefixIcon
                      ? _c("i", {
                          staticClass: "el-input__icon",
                          class: _vm.prefixIcon
                        })
                      : _vm._e()
                  ],
                  2
                )
              : _vm._e(),
            _vm.getSuffixVisible()
              ? _c("span", { staticClass: "el-input__suffix" }, [
                  _c(
                    "span",
                    { staticClass: "el-input__suffix-inner" },
                    [
                      !_vm.showClear ||
                      !_vm.showPwdVisible ||
                      !_vm.isWordLimitVisible
                        ? [
                            _vm._t("suffix"),
                            _vm.suffixIcon
                              ? _c("i", {
                                  staticClass: "el-input__icon",
                                  class: _vm.suffixIcon
                                })
                              : _vm._e()
                          ]
                        : _vm._e(),
                      _vm.showClear
                        ? _c("i", {
                            staticClass:
                              "el-input__icon el-icon-circle-close el-input__clear",
                            on: {
                              mousedown: function($event) {
                                $event.preventDefault()
                              },
                              click: _vm.clear
                            }
                          })
                        : _vm._e(),
                      _vm.showPwdVisible
                        ? _c("i", {
                            staticClass:
                              "el-input__icon el-icon-view el-input__clear",
                            on: { click: _vm.handlePasswordVisible }
                          })
                        : _vm._e(),
                      _vm.isWordLimitVisible
                        ? _c("span", { staticClass: "el-input__count" }, [
                            _c(
                              "span",
                              { staticClass: "el-input__count-inner" },
                              [
                                _vm._v(
                                  "\n            " +
                                    _vm._s(_vm.textLength) +
                                    "/" +
                                    _vm._s(_vm.upperLimit) +
                                    "\n          "
                                )
                              ]
                            )
                          ])
                        : _vm._e()
                    ],
                    2
                  ),
                  _vm.validateState
                    ? _c("i", {
                        staticClass: "el-input__icon",
                        class: ["el-input__validateIcon", _vm.validateIcon]
                      })
                    : _vm._e()
                ])
              : _vm._e(),
            _vm.$slots.append
              ? _c(
                  "div",
                  { staticClass: "el-input-group__append" },
                  [_vm._t("append")],
                  2
                )
              : _vm._e()
          ]
        : _c(
            "textarea",
            _vm._b(
              {
                ref: "textarea",
                staticClass: "el-textarea__inner",
                style: _vm.textareaStyle,
                attrs: {
                  tabindex: _vm.tabindex,
                  disabled: _vm.inputDisabled,
                  readonly: _vm.readonly,
                  autocomplete: _vm.autoComplete || _vm.autocomplete,
                  "aria-label": _vm.label
                },
                on: {
                  compositionstart: _vm.handleCompositionStart,
                  compositionupdate: _vm.handleCompositionUpdate,
                  compositionend: _vm.handleCompositionEnd,
                  input: _vm.handleInput,
                  focus: _vm.handleFocus,
                  blur: _vm.handleBlur,
                  change: _vm.handleChange
                }
              },
              "textarea",
              _vm.$attrs,
              false
            )
          ),
      _vm.isWordLimitVisible && _vm.type === "textarea"
        ? _c("span", { staticClass: "el-input__count" }, [
            _vm._v(_vm._s(_vm.textLength) + "/" + _vm._s(_vm.upperLimit))
          ])
        : _vm._e()
    ],
    2
  )
}
var inputvue_type_template_id_343dd774_staticRenderFns = []
inputvue_type_template_id_343dd774_render._withStripped = true


// CONCATENATED MODULE: ./packages/input/src/input.vue?vue&type=template&id=343dd774&

// EXTERNAL MODULE: external "pl-table/lib/mixins/migrating"
var migrating_ = __webpack_require__(21);
var migrating_default = /*#__PURE__*/__webpack_require__.n(migrating_);

// CONCATENATED MODULE: ./packages/input/src/calcTextareaHeight.js
var hiddenTextarea = void 0;

var HIDDEN_STYLE = '\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

function calculateNodeStyling(targetElement) {
  var style = window.getComputedStyle(targetElement);

  var boxSizing = style.getPropertyValue('box-sizing');

  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

  var contextStyle = CONTEXT_STYLE.map(function (name) {
    return name + ':' + style.getPropertyValue(name);
  }).join(';');

  return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
}

function calcTextareaHeight(targetElement) {
  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  var _calculateNodeStyling = calculateNodeStyling(targetElement),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      contextStyle = _calculateNodeStyling.contextStyle;

  hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  var height = hiddenTextarea.scrollHeight;
  var result = {};

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    var minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = minHeight + 'px';
  }
  if (maxRows !== null) {
    var maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = height + 'px';
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
};
// EXTERNAL MODULE: external "pl-table/lib/utils/merge"
var merge_ = __webpack_require__(12);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// EXTERNAL MODULE: external "pl-table/lib/utils/shared"
var shared_ = __webpack_require__(11);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/input/src/input.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var inputvue_type_script_lang_js_ = ({
  name: 'ElInput',

  componentName: 'ElInput',

  mixins: [emitter_default.a, migrating_default.a],

  inheritAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data: function data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    };
  },


  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator: function validator(val) {
         false && false;
        return true;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState: function validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon: function needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon: function validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle: function textareaStyle() {
      return merge_default()({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize: function inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled: function inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    nativeInputValue: function nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear: function showClear() {
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering);
    },
    showPwdVisible: function showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused);
    },
    isWordLimitVisible: function isWordLimitVisible() {
      return this.showWordLimit && this.$attrs.maxlength && (this.type === 'text' || this.type === 'textarea') && !this.inputDisabled && !this.readonly && !this.showPassword;
    },
    upperLimit: function upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength: function textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }

      return (this.value || '').length;
    },
    inputExceed: function inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    }
  },

  watch: {
    value: function value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [val]);
      }
    },

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue: function nativeInputValue() {
      this.setNativeInputValue();
    },

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    type: function type() {
      var _this = this;

      this.$nextTick(function () {
        _this.setNativeInputValue();
        _this.resizeTextarea();
        _this.updateIconOffset();
      });
    }
  },

  methods: {
    focus: function focus() {
      this.getInput().focus();
    },
    blur: function blur() {
      this.getInput().blur();
    },
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      };
    },
    handleBlur: function handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
      }
    },
    select: function select() {
      this.getInput().select();
    },
    resizeTextarea: function resizeTextarea() {
      if (this.$isServer) return;
      var autosize = this.autosize,
          type = this.type;

      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      var minRows = autosize.minRows;
      var maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    setNativeInputValue: function setNativeInputValue() {
      var input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus: function handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleCompositionStart: function handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionUpdate: function handleCompositionUpdate(event) {
      var text = event.target.value;
      var lastCharacter = text[text.length - 1] || '';
      this.isComposing = !Object(shared_["isKorean"])(lastCharacter);
    },
    handleCompositionEnd: function handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput: function handleInput(event) {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (this.isComposing) return;

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange: function handleChange(event) {
      this.$emit('change', event.target.value);
    },
    calcIconOffset: function calcIconOffset(place) {
      var elList = [].slice.call(this.$el.querySelectorAll('.el-input__' + place) || []);
      if (!elList.length) return;
      var el = null;
      for (var i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      var pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      };

      var pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = 'translateX(' + (place === 'suffix' ? '-' : '') + this.$el.querySelector('.el-input-group__' + pendant).offsetWidth + 'px)';
      } else {
        el.removeAttribute('style');
      }
    },
    updateIconOffset: function updateIconOffset() {
      this.calcIconOffset('prefix');
      this.calcIconOffset('suffix');
    },
    clear: function clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handlePasswordVisible: function handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    getInput: function getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible: function getSuffixVisible() {
      return this.$slots.suffix || this.suffixIcon || this.showClear || this.showPassword || this.isWordLimitVisible || this.validateState && this.needStatusIcon;
    }
  },

  created: function created() {
    this.$on('inputSelect', this.select);
  },
  mounted: function mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
  },
  updated: function updated() {
    this.$nextTick(this.updateIconOffset);
  }
});
// CONCATENATED MODULE: ./packages/input/src/input.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_inputvue_type_script_lang_js_ = (inputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/input/src/input.vue





/* normalize component */

var input_component = Object(componentNormalizer["a" /* default */])(
  src_inputvue_type_script_lang_js_,
  inputvue_type_template_id_343dd774_render,
  inputvue_type_template_id_343dd774_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var input_api; }
input_component.options.__file = "packages/input/src/input.vue"
/* harmony default export */ var src_input = (input_component.exports);
// CONCATENATED MODULE: ./packages/input/index.js


/* istanbul ignore next */
src_input.install = function (Vue) {
  Vue.component(src_input.name, src_input);
};

/* harmony default export */ var packages_input = (src_input);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select-dropdown.vue?vue&type=template&id=06828748&
var select_dropdownvue_type_template_id_06828748_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-select-dropdown el-popper",
      class: [{ "is-multiple": _vm.$parent.multiple }, _vm.popperClass],
      style: { minWidth: _vm.minWidth }
    },
    [_vm._t("default")],
    2
  )
}
var select_dropdownvue_type_template_id_06828748_staticRenderFns = []
select_dropdownvue_type_template_id_06828748_render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue?vue&type=template&id=06828748&

// EXTERNAL MODULE: external "pl-table/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(10);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select-dropdown.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//



/* harmony default export */ var select_dropdownvue_type_script_lang_js_ = ({
  name: 'ElSelectDropdown',

  componentName: 'ElSelectDropdown',

  mixins: [vue_popper_default.a],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default: function _default() {
        return {
          gpuAcceleration: false
        };
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      minWidth: ''
    };
  },


  computed: {
    popperClass: function popperClass() {
      return this.$parent.popperClass;
    }
  },

  watch: {
    '$parent.inputWidth': function $parentInputWidth() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', function () {
      if (_this.$parent.visible) _this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
  }
});
// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_dropdownvue_type_script_lang_js_ = (select_dropdownvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue





/* normalize component */

var select_dropdown_component = Object(componentNormalizer["a" /* default */])(
  src_select_dropdownvue_type_script_lang_js_,
  select_dropdownvue_type_template_id_06828748_render,
  select_dropdownvue_type_template_id_06828748_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var select_dropdown_api; }
select_dropdown_component.options.__file = "packages/select/src/select-dropdown.vue"
/* harmony default export */ var select_dropdown = (select_dropdown_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/option.vue?vue&type=template&id=7a44c642&
var optionvue_type_template_id_7a44c642_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.visible,
          expression: "visible"
        }
      ],
      staticClass: "el-select-dropdown__item",
      class: {
        selected: _vm.itemSelected,
        "is-disabled": _vm.disabled || _vm.groupDisabled || _vm.limitReached,
        hover: _vm.hover
      },
      on: {
        mouseenter: _vm.hoverItem,
        click: function($event) {
          $event.stopPropagation()
          return _vm.selectOptionClick($event)
        }
      }
    },
    [_vm._t("default", [_c("span", [_vm._v(_vm._s(_vm.currentLabel))])])],
    2
  )
}
var optionvue_type_template_id_7a44c642_staticRenderFns = []
optionvue_type_template_id_7a44c642_render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/option.vue?vue&type=template&id=7a44c642&

// EXTERNAL MODULE: external "pl-table/lib/utils/util"
var util_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/option.vue?vue&type=script&lang=js&
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var optionvue_type_script_lang_js_ = ({
  mixins: [emitter_default.a],

  name: 'ElOption',

  componentName: 'ElOption',

  inject: ['select'],

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    };
  },


  computed: {
    isObject: function isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel: function currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
    currentValue: function currentValue() {
      return this.value || this.label || '';
    },
    itemSelected: function itemSelected() {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        return this.contains(this.select.value, this.value);
      }
    },
    limitReached: function limitReached() {
      if (this.select.multiple) {
        return !this.itemSelected && (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0;
      } else {
        return false;
      }
    }
  },

  watch: {
    currentLabel: function currentLabel() {
      if (!this.created && !this.select.remote) this.dispatch('ElSelect', 'setSelected');
    },
    value: function value(val, oldVal) {
      var _select = this.select,
          remote = _select.remote,
          valueKey = _select.valueKey;

      if (!this.created && !remote) {
        if (valueKey && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && (typeof oldVal === 'undefined' ? 'undefined' : _typeof(oldVal)) === 'object' && val[valueKey] === oldVal[valueKey]) {
          return;
        }
        this.dispatch('ElSelect', 'setSelected');
      }
    }
  },

  methods: {
    isEqual: function isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        var valueKey = this.select.valueKey;
        return Object(util_["getValueByPath"])(a, valueKey) === Object(util_["getValueByPath"])(b, valueKey);
      }
    },
    contains: function contains() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var target = arguments[1];

      if (!this.isObject) {
        return arr && arr.indexOf(target) > -1;
      } else {
        var valueKey = this.select.valueKey;
        return arr && arr.some(function (item) {
          return Object(util_["getValueByPath"])(item, valueKey) === Object(util_["getValueByPath"])(target, valueKey);
        });
      }
    },
    handleGroupDisabled: function handleGroupDisabled(val) {
      this.groupDisabled = val;
    },
    hoverItem: function hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElSelect', 'handleOptionClick', [this, true]);
      }
    },
    queryChange: function queryChange(query) {
      this.visible = new RegExp(Object(util_["escapeRegexpString"])(query), 'i').test(this.currentLabel) || this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount--;
      }
    }
  },

  created: function created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
    this.select.filteredOptionsCount++;

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
  },
  beforeDestroy: function beforeDestroy() {
    var index = this.select.cachedOptions.indexOf(this);
    if (index > -1) {
      this.select.cachedOptions.splice(index, 1);
    }
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  }
});
// CONCATENATED MODULE: ./packages/select/src/option.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_optionvue_type_script_lang_js_ = (optionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/select/src/option.vue





/* normalize component */

var option_component = Object(componentNormalizer["a" /* default */])(
  src_optionvue_type_script_lang_js_,
  optionvue_type_template_id_7a44c642_render,
  optionvue_type_template_id_7a44c642_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var option_api; }
option_component.options.__file = "packages/select/src/option.vue"
/* harmony default export */ var src_option = (option_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tag/src/tag.vue?vue&type=script&lang=js&

/* harmony default export */ var tagvue_type_script_lang_js_ = ({
  name: 'ElTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator: function validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      }
    }
  },
  methods: {
    handleClose: function handleClose(event) {
      event.stopPropagation();
      this.$emit('close', event);
    },
    handleClick: function handleClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    tagSize: function tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  render: function render(h) {
    var type = this.type,
        tagSize = this.tagSize,
        hit = this.hit,
        effect = this.effect;

    var classes = ['el-tag', type ? 'el-tag--' + type : '', tagSize ? 'el-tag--' + tagSize : '', effect ? 'el-tag--' + effect : '', hit && 'is-hit'];
    var tagEl = h(
      'span',
      {
        'class': classes,
        style: { backgroundColor: this.color },
        on: {
          'click': this.handleClick
        }
      },
      [this.$slots.default, this.closable && h('i', { 'class': 'el-tag__close el-icon-close', on: {
          'click': this.handleClose
        }
      })]
    );

    return this.disableTransitions ? tagEl : h(
      'transition',
      {
        attrs: { name: 'el-zoom-in-center' }
      },
      [tagEl]
    );
  }
});
// CONCATENATED MODULE: ./packages/tag/src/tag.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tagvue_type_script_lang_js_ = (tagvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/tag/src/tag.vue
var tag_render, tag_staticRenderFns




/* normalize component */

var tag_component = Object(componentNormalizer["a" /* default */])(
  src_tagvue_type_script_lang_js_,
  tag_render,
  tag_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var tag_api; }
tag_component.options.__file = "packages/tag/src/tag.vue"
/* harmony default export */ var tag = (tag_component.exports);
// CONCATENATED MODULE: ./packages/tag/index.js


/* istanbul ignore next */
tag.install = function (Vue) {
  Vue.component(tag.name, tag);
};

/* harmony default export */ var packages_tag = (tag);
// EXTERNAL MODULE: ./packages/scrollbar/index.js + 3 modules
var scrollbar = __webpack_require__(17);

// EXTERNAL MODULE: external "throttle-debounce/debounce"
var debounce_ = __webpack_require__(6);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce_);

// EXTERNAL MODULE: external "pl-table/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(16);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: external "pl-table/lib/utils/resize-event"
var resize_event_ = __webpack_require__(8);

// EXTERNAL MODULE: external "pl-table/lib/locale"
var lib_locale_ = __webpack_require__(15);

// EXTERNAL MODULE: external "pl-table/lib/utils/scroll-into-view"
var scroll_into_view_ = __webpack_require__(22);
var scroll_into_view_default = /*#__PURE__*/__webpack_require__.n(scroll_into_view_);

// CONCATENATED MODULE: ./packages/select/src/navigation-mixin.js
/* harmony default export */ var navigation_mixin = ({
  data: function data() {
    return {
      hoverOption: -1
    };
  },


  computed: {
    optionsAllDisabled: function optionsAllDisabled() {
      return this.options.filter(function (option) {
        return option.visible;
      }).every(function (option) {
        return option.disabled;
      });
    }
  },

  watch: {
    hoverIndex: function hoverIndex(val) {
      var _this = this;

      if (typeof val === 'number' && val > -1) {
        this.hoverOption = this.options[val] || {};
      }
      this.options.forEach(function (option) {
        option.hover = _this.hoverOption === option;
      });
    }
  },

  methods: {
    navigateOptions: function navigateOptions(direction) {
      var _this2 = this;

      if (!this.visible) {
        this.visible = true;
        return;
      }
      if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
      if (!this.optionsAllDisabled) {
        if (direction === 'next') {
          this.hoverIndex++;
          if (this.hoverIndex === this.options.length) {
            this.hoverIndex = 0;
          }
        } else if (direction === 'prev') {
          this.hoverIndex--;
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.options.length - 1;
          }
        }
        var option = this.options[this.hoverIndex];
        if (option.disabled === true || option.groupDisabled === true || !option.visible) {
          this.navigateOptions(direction);
        }
        this.$nextTick(function () {
          return _this2.scrollToOption(_this2.hoverOption);
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


















/* harmony default export */ var selectvue_type_script_lang_js_ = ({
  mixins: [emitter_default.a, locale_default.a, focus_default()('reference'), navigation_mixin],

  name: 'ElSelect',

  componentName: 'ElSelect',

  inject: {
    elForm: {
      default: ''
    },

    elFormItem: {
      default: ''
    }
  },

  provide: function provide() {
    return {
      'select': this
    };
  },


  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    readonly: function readonly() {
      return !this.filterable || this.multiple || !Object(util_["isIE"])() && !Object(util_["isEdge"])() && !this.visible;
    },
    showClose: function showClose() {
      var hasValue = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== undefined && this.value !== null && this.value !== '';
      var criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
      return criteria;
    },
    iconClass: function iconClass() {
      return this.remote && this.filterable ? '' : this.visible ? 'arrow-up is-reverse' : 'arrow-up';
    },
    debounce: function debounce() {
      return this.remote ? 300 : 0;
    },
    emptyText: function emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('el.select.loading');
      } else {
        if (this.remote && this.query === '' && this.options.length === 0) return false;
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t('el.select.noData');
        }
      }
      return null;
    },
    showNewOption: function showNewOption() {
      var _this = this;

      var hasExistingOption = this.options.filter(function (option) {
        return !option.created;
      }).some(function (option) {
        return option.currentLabel === _this.query;
      });
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
    },
    selectSize: function selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    selectDisabled: function selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    collapseTagSize: function collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small';
    }
  },

  components: {
    ElInput: packages_input,
    ElSelectMenu: select_dropdown,
    ElOption: src_option,
    ElTag: packages_tag,
    ElScrollbar: scrollbar["a" /* default */]
  },

  directives: { Clickoutside: clickoutside_default.a },

  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator: function validator(val) {
         false && false;
        return true;
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: function _default() {
        return Object(lib_locale_["t"])('el.select.placeholder');
      }
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },


  watch: {
    selectDisabled: function selectDisabled() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.resetInputHeight();
      });
    },
    placeholder: function placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
    value: function value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if (val && val.length > 0 || this.$refs.input && this.query !== '') {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!Object(util_["valueEquals"])(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },
    visible: function visible(val) {
      var _this3 = this;

      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.resetHoverIndex();
        this.$nextTick(function () {
          if (_this3.$refs.input && _this3.$refs.input.value === '' && _this3.selected.length === 0) {
            _this3.currentPlaceholder = _this3.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate && this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast('ElOption', 'queryChange', '');
              this.broadcast('ElOptionGroup', 'queryChange');
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = '';
            }
          }
        }
      }
      this.$emit('visible-change', val);
    },
    options: function options() {
      var _this4 = this;

      if (this.$isServer) return;
      this.$nextTick(function () {
        _this4.broadcast('ElSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      var inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },

  methods: {
    handleComposition: function handleComposition(event) {
      var _this5 = this;

      var text = event.target.value;
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.$nextTick(function (_) {
          return _this5.handleQueryChange(text);
        });
      } else {
        var lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !Object(shared_["isKorean"])(lastCharacter);
      }
    },
    handleQueryChange: function handleQueryChange(val) {
      var _this6 = this;

      if (this.previousQuery === val || this.isOnComposition) return;
      if (this.previousQuery === null && (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(function () {
        if (_this6.visible) _this6.broadcast('ElSelectDropdown', 'updatePopper');
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        this.$nextTick(function () {
          var length = _this6.$refs.input.value.length * 15 + 20;
          _this6.inputLength = _this6.collapseTags ? Math.min(50, length) : length;
          _this6.managePlaceholder();
          _this6.resetInputHeight();
        });
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1;
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val);
        this.broadcast('ElOptionGroup', 'queryChange');
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('ElOption', 'queryChange', val);
        this.broadcast('ElOptionGroup', 'queryChange');
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    },
    scrollToOption: function scrollToOption(option) {
      var target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        var menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap');
        scroll_into_view_default()(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    handleMenuEnter: function handleMenuEnter() {
      var _this7 = this;

      this.$nextTick(function () {
        return _this7.scrollToOption(_this7.selected);
      });
    },
    emitChange: function emitChange(val) {
      if (!Object(util_["valueEquals"])(this.value, val)) {
        this.$emit('change', val);
      }
    },
    getOption: function getOption(value) {
      var option = void 0;
      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      var isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
      var isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

      for (var i = this.cachedOptions.length - 1; i >= 0; i--) {
        var cachedOption = this.cachedOptions[i];
        var isEqual = isObject ? Object(util_["getValueByPath"])(cachedOption.value, this.valueKey) === Object(util_["getValueByPath"])(value, this.valueKey) : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      var label = !isObject && !isNull && !isUndefined ? value : '';
      var newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },
    setSelected: function setSelected() {
      var _this8 = this;

      if (!this.multiple) {
        var option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      var result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach(function (value) {
          result.push(_this8.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(function () {
        _this8.resetInputHeight();
      });
    },
    handleFocus: function handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          this.visible = true;
          if (this.filterable) {
            this.menuVisibleOnFocus = true;
          }
        }
        this.$emit('focus', event);
      } else {
        this.softFocus = false;
      }
    },
    blur: function blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    handleBlur: function handleBlur(event) {
      var _this9 = this;

      setTimeout(function () {
        if (_this9.isSilentBlur) {
          _this9.isSilentBlur = false;
        } else {
          _this9.$emit('blur', event);
        }
      }, 50);
      this.softFocus = false;
    },
    handleClearClick: function handleClearClick(event) {
      this.deleteSelected(event);
    },
    doDestroy: function doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    handleClose: function handleClose() {
      this.visible = false;
    },
    toggleLastOptionHitState: function toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      var option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },
    deletePrevTag: function deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        var value = this.value.slice();
        value.pop();
        this.$emit('input', value);
        this.emitChange(value);
      }
    },
    managePlaceholder: function managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
      }
    },
    resetInputState: function resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },
    resetInputHeight: function resetInputHeight() {
      var _this10 = this;

      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(function () {
        if (!_this10.$refs.reference) return;
        var inputChildNodes = _this10.$refs.reference.$el.childNodes;
        var input = [].filter.call(inputChildNodes, function (item) {
          return item.tagName === 'INPUT';
        })[0];
        var tags = _this10.$refs.tags;
        var sizeInMap = _this10.initialInputHeight || 40;
        input.style.height = _this10.selected.length === 0 ? sizeInMap + 'px' : Math.max(tags ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0) : 0, sizeInMap) + 'px';
        if (_this10.visible && _this10.emptyText !== false) {
          _this10.broadcast('ElSelectDropdown', 'updatePopper');
        }
      });
    },
    resetHoverIndex: function resetHoverIndex() {
      var _this11 = this;

      setTimeout(function () {
        if (!_this11.multiple) {
          _this11.hoverIndex = _this11.options.indexOf(_this11.selected);
        } else {
          if (_this11.selected.length > 0) {
            _this11.hoverIndex = Math.min.apply(null, _this11.selected.map(function (item) {
              return _this11.options.indexOf(item);
            }));
          } else {
            _this11.hoverIndex = -1;
          }
        }
      }, 300);
    },
    handleOptionSelect: function handleOptionSelect(option, byClick) {
      var _this12 = this;

      if (this.multiple) {
        var value = (this.value || []).slice();
        var optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value);
        }
        this.$emit('input', value);
        this.emitChange(value);
        if (option.created) {
          this.query = '';
          this.handleQueryChange('');
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit('input', option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();
      if (this.visible) return;
      this.$nextTick(function () {
        _this12.scrollToOption(option);
      });
    },
    setSoftFocus: function setSoftFocus() {
      this.softFocus = true;
      var input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
      }
    },
    getValueIndex: function getValueIndex() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var value = arguments[1];

      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        var valueKey = this.valueKey;
        var index = -1;
        arr.some(function (item, i) {
          if (Object(util_["getValueByPath"])(item, valueKey) === Object(util_["getValueByPath"])(value, valueKey)) {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      }
    },
    toggleMenu: function toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },
    selectOption: function selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      } else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex]);
        }
      }
    },
    deleteSelected: function deleteSelected(event) {
      event.stopPropagation();
      var value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },
    deleteTag: function deleteTag(event, tag) {
      var index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        var value = this.value.slice();
        value.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('remove-tag', tag.value);
      }
      event.stopPropagation();
    },
    onInputChange: function onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },
    onOptionDestroy: function onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        this.options.splice(index, 1);
      }
    },
    resetInputWidth: function resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    handleResize: function handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
    checkDefaultFirstOption: function checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      var hasCreated = false;
      for (var i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (var _i = 0; _i !== this.options.length; ++_i) {
        var option = this.options[_i];
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = _i;
            break;
          }
        } else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = _i;
            break;
          }
        }
      }
    },
    getValueKey: function getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value;
      } else {
        return Object(util_["getValueByPath"])(item.value, this.valueKey);
      }
    }
  },

  created: function created() {
    var _this13 = this;

    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = debounce_default()(this.debounce, function () {
      _this13.onInputChange();
    });

    this.debouncedQueryChange = debounce_default()(this.debounce, function (e) {
      _this13.handleQueryChange(e.target.value);
    });

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
  },
  mounted: function mounted() {
    var _this14 = this;

    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }
    Object(resize_event_["addResizeListener"])(this.$el, this.handleResize);

    var reference = this.$refs.reference;
    if (reference && reference.$el) {
      var sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      var input = reference.$el.querySelector('input');
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(function () {
      if (reference && reference.$el) {
        _this14.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el && this.handleResize) Object(resize_event_["removeResizeListener"])(this.$el, this.handleResize);
  }
});
// CONCATENATED MODULE: ./packages/select/src/select.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_selectvue_type_script_lang_js_ = (selectvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/select/src/select.vue





/* normalize component */

var select_component = Object(componentNormalizer["a" /* default */])(
  src_selectvue_type_script_lang_js_,
  selectvue_type_template_id_0e4aade6_render,
  selectvue_type_template_id_0e4aade6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var select_api; }
select_component.options.__file = "packages/select/src/select.vue"
/* harmony default export */ var src_select = (select_component.exports);
// CONCATENATED MODULE: ./packages/select/index.js


/* istanbul ignore next */
src_select.install = function (Vue) {
  Vue.component(src_select.name, src_select);
};

/* harmony default export */ var packages_select = (src_select);
// CONCATENATED MODULE: ./packages/option/index.js


/* istanbul ignore next */
src_option.install = function (Vue) {
  Vue.component(src_option.name, src_option);
};

/* harmony default export */ var packages_option = (src_option);
// CONCATENATED MODULE: ./packages/pagination/src/pagination.js







/* harmony default export */ var pagination = ({
  name: 'ElPagination',

  props: {
    pageSize: {
      type: Number,
      default: 10
    },

    small: Boolean,

    total: Number,

    pageCount: Number,

    pagerCount: {
      type: Number,
      validator: function validator(value) {
        return (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
      },

      default: 7
    },

    currentPage: {
      type: Number,
      default: 1
    },

    layout: {
      default: 'prev, pager, next, jumper, ->, total'
    },

    pageSizes: {
      type: Array,
      default: function _default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },

    popperClass: String,

    prevText: String,

    nextText: String,

    background: Boolean,

    disabled: Boolean,

    hideOnSinglePage: Boolean
  },

  data: function data() {
    return {
      internalCurrentPage: 1,
      internalPageSize: 0,
      lastEmittedPage: -1,
      userChangePageSize: false
    };
  },
  render: function render(h) {
    var layout = this.layout;
    if (!layout) return null;
    if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1)) return null;

    var template = h('div', { 'class': ['el-pagination', {
        'is-background': this.background,
        'el-pagination--small': this.small
      }] });
    var TEMPLATE_MAP = {
      prev: h('prev'),
      jumper: h('jumper'),
      pager: h('pager', {
        attrs: { currentPage: this.internalCurrentPage, pageCount: this.internalPageCount, pagerCount: this.pagerCount, disabled: this.disabled },
        on: {
          'change': this.handleCurrentChange
        }
      }),
      next: h('next'),
      sizes: h('sizes', {
        attrs: { pageSizes: this.pageSizes }
      }),
      slot: h('slot', [this.$slots.default ? this.$slots.default : '']),
      total: h('total')
    };
    var components = layout.split(',').map(function (item) {
      return item.trim();
    });
    var rightWrapper = h('div', { 'class': 'el-pagination__rightwrapper' });
    var haveRightWrapper = false;

    template.children = template.children || [];
    rightWrapper.children = rightWrapper.children || [];
    components.forEach(function (compo) {
      if (compo === '->') {
        haveRightWrapper = true;
        return;
      }

      if (!haveRightWrapper) {
        template.children.push(TEMPLATE_MAP[compo]);
      } else {
        rightWrapper.children.push(TEMPLATE_MAP[compo]);
      }
    });

    if (haveRightWrapper) {
      template.children.unshift(rightWrapper);
    }

    return template;
  },


  components: {
    Prev: {
      render: function render(h) {
        return h(
          'button',
          {
            attrs: {
              type: 'button',

              disabled: this.$parent.disabled || this.$parent.internalCurrentPage <= 1
            },
            'class': 'btn-prev', on: {
              'click': this.$parent.prev
            }
          },
          [this.$parent.prevText ? h('span', [this.$parent.prevText]) : h('i', { 'class': 'el-icon el-icon-arrow-left' })]
        );
      }
    },

    Next: {
      render: function render(h) {
        return h(
          'button',
          {
            attrs: {
              type: 'button',

              disabled: this.$parent.disabled || this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0
            },
            'class': 'btn-next', on: {
              'click': this.$parent.next
            }
          },
          [this.$parent.nextText ? h('span', [this.$parent.nextText]) : h('i', { 'class': 'el-icon el-icon-arrow-right' })]
        );
      }
    },

    Sizes: {
      mixins: [locale_default.a],

      props: {
        pageSizes: Array
      },

      watch: {
        pageSizes: {
          immediate: true,
          handler: function handler(newVal, oldVal) {
            if (Object(util_["valueEquals"])(newVal, oldVal)) return;
            if (Array.isArray(newVal)) {
              this.$parent.internalPageSize = newVal.indexOf(this.$parent.pageSize) > -1 ? this.$parent.pageSize : this.pageSizes[0];
            }
          }
        }
      },

      render: function render(h) {
        var _this = this;

        return h(
          'span',
          { 'class': 'el-pagination__sizes' },
          [h(
            'el-select',
            {
              attrs: {
                value: this.$parent.internalPageSize,
                popperClass: this.$parent.popperClass || '',
                size: 'mini',

                disabled: this.$parent.disabled },
              on: {
                'input': this.handleChange
              }
            },
            [this.pageSizes.map(function (item) {
              return h('el-option', {
                attrs: {
                  value: item,
                  label: item + _this.t('el.pagination.pagesize') }
              });
            })]
          )]
        );
      },


      components: {
        ElSelect: packages_select,
        ElOption: packages_option
      },

      methods: {
        handleChange: function handleChange(val) {
          if (val !== this.$parent.internalPageSize) {
            this.$parent.internalPageSize = val = parseInt(val, 10);
            this.$parent.userChangePageSize = true;
            this.$parent.$emit('update:pageSize', val);
            this.$parent.$emit('size-change', val);
          }
        }
      }
    },

    Jumper: {
      mixins: [locale_default.a],

      components: { ElInput: packages_input },

      data: function data() {
        return {
          userInput: null
        };
      },


      watch: {
        '$parent.internalCurrentPage': function $parentInternalCurrentPage() {
          this.userInput = null;
        }
      },

      methods: {
        handleKeyup: function handleKeyup(_ref) {
          var keyCode = _ref.keyCode,
              target = _ref.target;

          // Chrome, Safari, Firefox triggers change event on Enter
          // Hack for IE: https://github.com/ElemeFE/element/issues/11710
          // Drop this method when we no longer supports IE
          if (keyCode === 13) {
            this.handleChange(target.value);
          }
        },
        handleInput: function handleInput(value) {
          this.userInput = value;
        },
        handleChange: function handleChange(value) {
          this.$parent.internalCurrentPage = this.$parent.getValidCurrentPage(value);
          this.$parent.emitChange();
          this.userInput = null;
        }
      },

      render: function render(h) {
        return h(
          'span',
          { 'class': 'el-pagination__jump' },
          [this.t('el.pagination.goto'), h('el-input', {
            'class': 'el-pagination__editor is-in-pagination',
            attrs: { min: 1,
              max: this.$parent.internalPageCount,
              value: this.userInput !== null ? this.userInput : this.$parent.internalCurrentPage,
              type: 'number',
              disabled: this.$parent.disabled
            },
            nativeOn: {
              'keyup': this.handleKeyup
            },
            on: {
              'input': this.handleInput,
              'change': this.handleChange
            }
          }), this.t('el.pagination.pageClassifier')]
        );
      }
    },

    Total: {
      mixins: [locale_default.a],

      render: function render(h) {
        return typeof this.$parent.total === 'number' ? h(
          'span',
          { 'class': 'el-pagination__total' },
          [this.t('el.pagination.total', { total: this.$parent.total })]
        ) : '';
      }
    },

    Pager: pager
  },

  methods: {
    handleCurrentChange: function handleCurrentChange(val) {
      this.internalCurrentPage = this.getValidCurrentPage(val);
      this.userChangePageSize = true;
      this.emitChange();
    },
    prev: function prev() {
      if (this.disabled) return;
      var newVal = this.internalCurrentPage - 1;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit('prev-click', this.internalCurrentPage);
      this.emitChange();
    },
    next: function next() {
      if (this.disabled) return;
      var newVal = this.internalCurrentPage + 1;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit('next-click', this.internalCurrentPage);
      this.emitChange();
    },
    getValidCurrentPage: function getValidCurrentPage(value) {
      value = parseInt(value, 10);

      var havePageCount = typeof this.internalPageCount === 'number';

      var resetValue = void 0;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    },
    emitChange: function emitChange() {
      var _this2 = this;

      this.$nextTick(function () {
        if (_this2.internalCurrentPage !== _this2.lastEmittedPage || _this2.userChangePageSize) {
          _this2.$emit('current-change', _this2.internalCurrentPage);
          _this2.lastEmittedPage = _this2.internalCurrentPage;
          _this2.userChangePageSize = false;
        }
      });
    }
  },

  computed: {
    internalPageCount: function internalPageCount() {
      if (typeof this.total === 'number') {
        return Math.max(1, Math.ceil(this.total / this.internalPageSize));
      } else if (typeof this.pageCount === 'number') {
        return Math.max(1, this.pageCount);
      }
      return null;
    }
  },

  watch: {
    currentPage: {
      immediate: true,
      handler: function handler(val) {
        this.internalCurrentPage = this.getValidCurrentPage(val);
      }
    },

    pageSize: {
      immediate: true,
      handler: function handler(val) {
        this.internalPageSize = isNaN(val) ? 10 : val;
      }
    },

    internalCurrentPage: {
      immediate: true,
      handler: function handler(newVal) {
        this.$emit('update:currentPage', newVal);
        this.lastEmittedPage = -1;
      }
    },

    internalPageCount: function internalPageCount(newVal) {
      /* istanbul ignore if */
      var oldPage = this.internalCurrentPage;
      if (newVal > 0 && oldPage === 0) {
        this.internalCurrentPage = 1;
      } else if (oldPage > newVal) {
        this.internalCurrentPage = newVal === 0 ? 1 : newVal;
        this.userChangePageSize && this.emitChange();
      }
      this.userChangePageSize = false;
    }
  }
});
// CONCATENATED MODULE: ./packages/pagination/index.js


/* istanbul ignore next */
pagination.install = function (Vue) {
  Vue.component(pagination.name, pagination);
};

/* harmony default export */ var packages_pagination = __webpack_exports__["a"] = (pagination);

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports) {

module.exports = require("xe-utils");

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(4);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: external "xe-utils"
var external_xe_utils_ = __webpack_require__(29);

// EXTERNAL MODULE: external "plxy-grid"
var external_plxy_grid_ = __webpack_require__(14);
var external_plxy_grid_default = /*#__PURE__*/__webpack_require__.n(external_plxy_grid_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/plx-table-grid/src/plx-table-grid.vue?vue&type=template&id=d813f4b4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "tableBox", staticClass: "plTableBox" }, [
    _c(
      "div",
      {
        staticClass: "ant-table-scroll",
        style: { maxHeight: _vm.maxHeight + "px" }
      },
      [
        _c(
          "plx-grid",
          {
            ref: "singleTable",
            staticStyle: { width: "100%" },
            attrs: {
              data: _vm.isArrayFn(_vm.datas) ? _vm.datas : [],
              "show-footer": false,
              height: _vm.maxHeight,
              border: _vm.border,
              stripe: _vm.stripe,
              "row-key": _vm.rowKey,
              size: _vm.size,
              "show-header": _vm.showHeader,
              "show-overflow": _vm.showOverflow,
              "show-header-overflow": _vm.showHeaderOverflow,
              "highlight-current-row": _vm.highlightCurrentRow,
              "highlight-hover-row": _vm.highlightCurrentRow,
              "row-class-name": _vm.rowClassName,
              "cell-class-name": _vm.cellClassName,
              "header-row-class-name": _vm.headerRowClassName,
              "header-cell-class-name": _vm.headerCellClassName,
              "header-row-style": _vm.headerRowStyle,
              "header-cell-style": _vm.headerCellStyle,
              "row-style": _vm.rowStyle,
              "cell-style": _vm.cellStyle,
              "sort-config": {
                sortMethod: _vm.sortMethod,
                defaultSort: _vm.defaultSort
              },
              "span-method": _vm.arraySpanMethod
            },
            on: {
              "current-change": _vm.currentChange,
              "select-change": _vm.plSelect,
              "resizable-change": _vm.headerDragend,
              "cell-mouseenter": _vm.cellMouseEnter,
              "cell-mouseleave": _vm.cellMouseLeave,
              "cell-click": _vm.cellClick,
              "cell-dblclick": _vm.cellDblclick,
              "cell-context-menu": _vm.rowContextmenu,
              "header-cell-context-menu": _vm.headerContextmenu,
              "radio-change": _vm.radioChange,
              "header-cell-click": _vm.headerClick,
              "select-all": _vm.selectAll,
              "filter-change": _vm.filterChange,
              "sort-change": _vm.sortChange,
              scroll: _vm.tableBodyScroll
            }
          },
          [
            _c(
              "template",
              { slot: "empty" },
              [_vm._t("empty", [_vm._v(_vm._s(_vm.emptyText))])],
              2
            ),
            _vm._t("default")
          ],
          2
        )
      ],
      1
    ),
    _vm.paginationShow
      ? _c(
          "div",
          { ref: "myPagination", staticClass: "myPagination" },
          [
            _c("el-pagination", {
              attrs: {
                "current-page": _vm.newcurrentPage,
                "pager-count": _vm.pagerCount,
                "page-sizes": _vm.pageSizes,
                "page-size": _vm.newPageSize,
                layout: _vm.paginationLayout,
                total: _vm.ptTotal
              },
              on: {
                "size-change": _vm.handleSizeChange,
                "current-change": _vm.handleCurrentChange
              }
            })
          ],
          1
        )
      : _vm._e(),
    _c("div", { ref: "plDialog", staticClass: "plDialog" }, [
      _vm.plDialogFals
        ? _c("div", { staticStyle: { width: "100%", height: "100%" } }, [
            _c("div", { staticClass: "table-cus-header" }, [
              _vm._v(_vm._s(_vm.fieldTitle))
            ]),
            _c(
              "div",
              { staticClass: "checkListBox" },
              [
                _c(
                  "draggable",
                  {
                    attrs: { tag: "ul", options: { disabled: !_vm.fieldSort } },
                    model: {
                      value: _vm.newDialogData,
                      callback: function($$v) {
                        _vm.newDialogData = $$v
                      },
                      expression: "newDialogData"
                    }
                  },
                  _vm._l(_vm.newDialogData, function(item, index) {
                    return _c(
                      "li",
                      { key: index },
                      [
                        _c(
                          "el-checkbox",
                          {
                            attrs: { disabled: item.disabled },
                            model: {
                              value: item.state,
                              callback: function($$v) {
                                _vm.$set(item, "state", $$v)
                              },
                              expression: "item.state"
                            }
                          },
                          [_vm._v(_vm._s(item.name))]
                        ),
                        _vm.showAmend
                          ? _c("i", {
                              staticClass: "iconfont",
                              class: [_vm.amendBtnIcon || "el-icon-edit"],
                              on: {
                                click: function($event) {
                                  _vm.amendField(item, index)
                                }
                              }
                            })
                          : _vm._e()
                      ],
                      1
                    )
                  }),
                  0
                )
              ],
              1
            ),
            _c(
              "div",
              { staticClass: "table-cus-footer" },
              [
                _c(
                  "el-button",
                  {
                    on: {
                      click: function($event) {
                        _vm.closeModal()
                      }
                    }
                  },
                  [_vm._v("取消")]
                ),
                _c(
                  "el-button",
                  {
                    attrs: { type: "primary" },
                    on: { click: _vm.confirmField }
                  },
                  [_vm._v("确定")]
                ),
                _c(
                  "el-button",
                  { attrs: { type: "warning" }, on: { click: _vm.reset } },
                  [_vm._v("重置")]
                )
              ],
              1
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/plx-table-grid/src/plx-table-grid.vue?vue&type=template&id=d813f4b4&

// EXTERNAL MODULE: external "resize-observer-polyfill"
var external_resize_observer_polyfill_ = __webpack_require__(13);
var external_resize_observer_polyfill_default = /*#__PURE__*/__webpack_require__.n(external_resize_observer_polyfill_);

// EXTERNAL MODULE: external "vuedraggable"
var external_vuedraggable_ = __webpack_require__(19);
var external_vuedraggable_default = /*#__PURE__*/__webpack_require__.n(external_vuedraggable_);

// EXTERNAL MODULE: ./packages/pagination/index.js + 35 modules
var pagination = __webpack_require__(23);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/plx-table-grid/src/plx-table-grid.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var plx_table_gridvue_type_script_lang_js_ = ({
    name: 'PlxTableGrid',
    components: { draggable: external_vuedraggable_default.a, ElPagination: pagination["a" /* default */] },
    props: {
        showOverflow: { type: Boolean, default: true },
        showHeaderOverflow: { type: Boolean, default: true },
        heightChange: { default: true, type: Boolean }, // 是否开启表格高度随数据多少而变化，如数据少的时候，想把分页放在底部（永远处于底部）
        datas: { type: Array, default: function _default() {
                return [];
            } }, // 表格数据
        sortMethod: Function,
        dialogData: { type: Array, default: function _default() {
                return [];
            } }, // 选择显示字段数组
        defaultSort: Object, // 默认的排序列的 prop 和顺序
        stripe: { default: false, type: Boolean }, // 是否为斑马纹
        size: { default: '', type: String }, // Table 的尺寸
        showHeader: { default: true, type: Boolean }, // 是否显示表头
        emptyText: { default: '暂无数据', type: String }, // 空数据时显示的文本内容
        border: { default: true, type: Boolean }, // 是否显示纵向边框
        paginationShow: { default: true, type: Boolean }, // 是否需要分页器 默认是true
        showSummary: { default: false, type: Boolean }, // 是否需要合计
        ptTotal: { default: 0, type: Number }, // 总条数
        pagerCount: { default: 5, type: Number }, // 页码按钮的数量，当总页数超过该值时会折叠
        pageSize: { default: 10, type: Number }, // 每页条数
        currentPage: { default: 1, type: Number }, // 当前页
        pageSizes: { default: function _default() {
                return [10, 20, 30, 50];
            }, type: Array }, // 每页显示个数选择器的选项设置
        paginationLayout: { default: 'total, sizes, prev, pager, next, jumper', type: String }, // 分页组件布局，子组件名用逗号分隔
        fieldSort: { default: true, type: Boolean }, // 字段排序
        rowKey: Boolean, // 支持树类型的数据。此时，必须要指定 row-key (注意，当开启useVirtual时，无效)
        highlightCurrentRow: { default: true, type: Boolean }, // 是否要高亮当前行
        showAmend: { default: false, type: Boolean }, // 是否显示修改字段名按钮(侧滑框)
        amendBtnIcon: { default: '', type: String }, // 修改字段按钮的图标(侧滑框)
        fieldTitle: { default: '选择显示字段', type: String }, // 弹框的标题(侧滑框)
        spanMethod: Function, // 合并行或列的计算方法
        rowClassName: [String, Function], // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
        rowStyle: [Object, Function], // 行的 style 的回调方法
        cellClassName: [String, Function], // 行单元格的 className 的回调方法
        cellStyle: [Object, Function], // 行单元格的 style 的回调方法
        headerRowClassName: [String, Function], // 表头行的 className 的回调方法
        headerRowStyle: [Object, Function], // 表头行的 style 的回调方法
        headerCellClassName: [String, Function], // 表头单元格的 className 的回调方法
        headerCellStyle: [Object, Function], // 表头单元格的 style 的回调方法
        noDataHeight: { default: 60, typeof: [String, Number] } // 没数据空布局的高度,当你是自定义无数据布局，请给出你的无数据布局的高度
    },
    data: function data() {
        return {
            _times: '', // 弹框定时器
            plDialogFals: false, // 侧滑弹框是否开启
            newDialogData: [], // 新自定义字段的数据
            maxHeight: '0', // 表格最大高度
            aBox: '', // 蒙层节点
            newPageSize: '', // 每页条数
            newcurrentPage: '' // 当前页
        };
    },
    created: function created() {
        this.newPageSize = this.pageSize;
        this.newcurrentPage = this.currentPage;
    },
    mounted: function mounted() {
        var _this = this;

        // 监听外侧盒子宽高度变化
        this.$nextTick(function () {
            var dom = document.querySelector('.plx-table--body-wrapper');
            if (dom) {
                var ro2 = new external_resize_observer_polyfill_default.a(function (entries, observer) {
                    for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var entry = _ref;

                        if (_this.heightChange) {
                            _this.setHeight(dom);
                        }
                    }
                });
                ro2.observe(dom);
            }
        });
    },

    methods: {
        // 判断数组
        isArrayFn: function isArrayFn(value) {
            if (typeof Array.isArray === 'function') {
                return Array.isArray(value);
            } else {
                return Object.prototype.toString.call(value) === '[object Array]';
            }
        },

        // 利用数组中的filter方法数组去重
        removal: function removal(data) {
            if (this.isArrayFn(data)) {
                return data.filter(function (element, index, self) {
                    return self.indexOf(element) === index;
                });
            } else {
                throw new Error('需要的是数组');
            }
        },

        // 数组对象去重的方法
        removalDataObj: function removalDataObj(arr, key) {
            if (this.isArrayFn(arr)) {
                var result = [];
                var obj = {};
                for (var i = 0; i < arr.length; i++) {
                    if (!obj[arr[i].row[key]]) {
                        result.push(arr[i]);
                        obj[arr[i].row[key]] = true;
                    }
                }
                return result;
            } else {
                throw new Error('需要的是数组');
            }
        },

        // 分页器的事件
        handleSizeChange: function handleSizeChange(val) {
            this.newPageSize = val;
            this.$emit('handlePageSize', { size: this.newPageSize, page: this.newcurrentPage });
        },
        handleCurrentChange: function handleCurrentChange(val) {
            this.newcurrentPage = val;
            this.$emit('handlePageSize', { size: this.newPageSize, page: this.newcurrentPage });
        },

        // 打开自定义字段框
        plDialogOpens: function plDialogOpens() {
            var _this2 = this;

            this._times = null;
            this.$refs.plDialog.style.width = 300 + 'px';
            this._times = setTimeout(function () {
                _this2.plDialogFals = true;
            }, 100);
            // 创建节点（主要用来弹出menu窗口时，不让起点击外面）
            this.aBox = document.createElement('div');
            this.aBox.className = 'modal-backdrop';
            this.aBox.style.display = 'block';
            this.aBox.onclick = function () {
                _this2.closeModal();
            };
            document.body.appendChild(this.aBox);
        },

        // 关闭自定义字段框（取消选择）
        closeModal: function closeModal() {
            this.plDialogFals = false;
            clearTimeout(this._times);
            this.$refs.plDialog.style.width = 0 + 'px';
            this.aBox.style.display = 'none';
            this.clearNode();
            this.newDialogData = JSON.parse(JSON.stringify(this.dialogData));
        },

        // 确认按钮
        confirmField: function confirmField() {
            this.$emit('show-field', this.newDialogData);
            this.plDialogFals = false;
            clearTimeout(this._times);
            this.$refs.plDialog.style.width = 0 + 'px';
            this.aBox.style.display = 'none';
            this.clearNode();
        },

        // 重置按钮
        reset: function reset() {
            this.$emit('reset', this.newDialogData);
            this.plDialogFals = false;
            clearTimeout(this._times);
            this.$refs.plDialog.style.width = 0 + 'px';
            this.aBox.style.display = 'none';
            this.clearNode();
        },

        // 设置表格高度
        setHeight: function setHeight(dom) {
            if (this.$refs.tableBox) {
                // 自动更新表格高度，需要开启自适应数据
                if (dom && this.heightChange) {
                    var dom1 = document.querySelector('.plx-table--body');
                    // 内容部分是否超出
                    var tablebodyH = parseInt(dom.style.height) - dom1.clientHeight;
                    if (tablebodyH > 0) {
                        // // 滚动条样式高度
                        var scrollBarHeight = dom.offsetHeight - dom.clientHeight;
                        if (scrollBarHeight) {
                            this.maxHeight = this.maxHeight - tablebodyH + scrollBarHeight;
                        } else {
                            this.maxHeight = this.maxHeight - tablebodyH;
                        }
                        // 如果没数据 就加上提示的高度
                        if (this.datas.length === 0 || !this.isArrayFn(this.datas)) {
                            this.maxHeight = this.maxHeight + parseInt(this.noDataHeight, 10);
                        }
                        this.$emit('load-complete', this.$refs.singleTable);
                    }
                } else {
                    var myPagination = this.$refs.myPagination ? this.$refs.myPagination.offsetHeight : 0;
                    var tableBox = this.$refs.tableBox.offsetHeight;
                    this.maxHeight = tableBox - myPagination;
                    this.$emit('load-complete', this.$refs.singleTable);
                }
            }
        },

        // 修改字段名按钮事件
        amendField: function amendField(item, index) {
            this.$emit('amend-field', item, index);
        },

        // 删除节点
        clearNode: function clearNode() {
            // 删除节点
            var parent = this.aBox ? this.aBox.parentNode : '';
            parent && parent.removeChild(this.aBox);
            var doms = document.getElementsByClassName('modal-backdrop');
            if (doms.length > 0) {
                document.body.removeChild(doms[0]);
            }
            this.aBox = null;
        },


        // 表格方法

        // 合并行或列的计算方法
        arraySpanMethod: function arraySpanMethod(objs) {
            // 是否有条件开启合并列
            if (typeof this.spanMethod === 'function') {
                return this.spanMethod(objs);
            } else {
                return '';
            }
        },

        // 用于单选表格，设定某一行为选中行
        setCurrentRow: function setCurrentRow(row) {
            if (row) {
                this.$refs.singleTable.setCurrentRow(row);
            } else {
                this.$refs.singleTable.setCurrentRow();
            }
        },

        // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
        toggleRowSelection: function toggleRowSelection(rows) {
            if (rows && this.isArrayFn(rows)) {
                this.newtoggleRowSelections(rows);
            } else {
                console.error('数据格式需要一个数组');
            }
        },

        // 用于多选表格，切换某一行的选中状态
        newtoggleRowSelections: function newtoggleRowSelections(datas) {
            var _this3 = this;

            if (datas.length > 0 && this.$refs.singleTable) {
                datas.forEach(function (item) {
                    if (item.selected) {
                        _this3.$refs.singleTable.setCheckboxRow(item.row, item.selected);
                    } else if (item.selected === false) {
                        _this3.$refs.singleTable.setCheckboxRow(item.row, false);
                    } else if (item.selected === undefined) {
                        _this3.$refs.singleTable.setCheckboxRow(item.row, '');
                    }
                });
            }
        },

        // 用于多选表格，切换所有行的选中状态
        toggleAllSelection: function toggleAllSelection() {
            var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (this.$refs.singleTable) {
                this.$refs.singleTable.setAllCheckboxRow(checked);
            } else {
                console.error('toggleAllSelection方法为找到，可能表格未加载完毕');
            }
        },

        // 用于多选表格，清空用户的选择
        clearSelection: function clearSelection() {
            if (this.$refs.singleTable) {
                this.$refs.singleTable.clearCheckboxRow();
            } else {
                console.error('clearSelection方法为找到，可能表格未加载完毕');
            }
        },

        // 用于清空排序条件，数据会恢复成未排序的状态
        clearSort: function clearSort() {
            this.$refs.singleTable.clearSort();
        },

        // 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态
        clearFilter: function clearFilter(columnKey) {
            this.$refs.singleTable.clearFilter(columnKey);
        },

        // 手动对 Table 进行排序
        sort: function sort(prop, order) {
            this.$refs.singleTable.sort(prop, order);
        },

        // 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
        doLayout: function doLayout() {
            this.$refs.singleTable.recalculate();
        },


        // 表格事件

        // 表格滚动时会触发该事件
        tableBodyScroll: function tableBodyScroll(_ref2, event) {
            var type = _ref2.type,
                fixed = _ref2.fixed,
                scrollTop = _ref2.scrollTop,
                scrollLeft = _ref2.scrollLeft,
                isX = _ref2.isX,
                isY = _ref2.isY;

            var obj = { type: type, fixed: fixed, scrollTop: scrollTop, scrollLeft: scrollLeft, isX: isX, isY: isY
                // 当表格滚动暴露滚动事件
            };this.$emit('table-body-scroll', obj, event);
        },

        // 当用户手动勾选全选 Checkbox 时触发的事件	selection
        selectAll: function selectAll(_ref3) {
            var selection = _ref3.selection;

            this.$emit('select-all', selection);
            // 当选择项发生变化时会触发该事件
            this.$emit('selection-change', selection);
        },

        // 当用户手动勾选数据行的 Checkbox 时触发的事件
        plSelect: function plSelect(_ref4) {
            var selection = _ref4.selection,
                reserves = _ref4.reserves,
                checked = _ref4.checked,
                row = _ref4.row;

            this.$emit('select', selection, row);
            // 当选择项发生变化时会触发该事件
            this.$emit('selection-change', selection);
        },

        // 只对 type=radio 有效，当手动勾选并且值发生改变时触发的事件
        radioChange: function radioChange(_ref5, event) {
            var row = _ref5.row,
                rowIndex = _ref5.rowIndex,
                $rowIndex = _ref5.$rowIndex,
                column = _ref5.column,
                columnIndex = _ref5.columnIndex,
                $columnIndex = _ref5.$columnIndex,
                cell = _ref5.cell;

            this.$emit('radio-change', row, column);
        },

        // 当表格的排序条件发生变化的时候会触发该事件
        sortChange: function sortChange(_ref6) {
            var column = _ref6.column,
                property = _ref6.property,
                order = _ref6.order;

            var objs = { column: column, prop: property, order: order };
            this.$emit('sort-change', objs);
        },

        // 当表格的当前行发生变化的时候会触发该事件
        currentChange: function currentChange(_ref7, event) {
            var row = _ref7.row,
                rowIndex = _ref7.rowIndex,
                $rowIndex = _ref7.$rowIndex,
                column = _ref7.column,
                columnIndex = _ref7.columnIndex,
                $columnIndex = _ref7.$columnIndex,
                cell = _ref7.cell;

            this.$emit('current-change', row);
        },

        // 当表格的筛选条件发生变化的时候会触发该事件
        filterChange: function filterChange(_ref8) {
            var column = _ref8.column,
                property = _ref8.property,
                values = _ref8.values,
                datas = _ref8.datas,
                filters = _ref8.filters;

            this.$emit('filter-change', filters);
        },

        // 当单元格 hover 进入时会触发该事件
        cellMouseEnter: function cellMouseEnter(_ref9, event) {
            var row = _ref9.row,
                rowIndex = _ref9.rowIndex,
                $rowIndex = _ref9.$rowIndex,
                column = _ref9.column,
                columnIndex = _ref9.columnIndex,
                $columnIndex = _ref9.$columnIndex,
                cell = _ref9.cell;

            this.$emit('cell-mouse-enter', row, column, cell, event);
        },

        // 当单元格 hover 退出时会触发该事件
        cellMouseLeave: function cellMouseLeave(_ref10, event) {
            var row = _ref10.row,
                rowIndex = _ref10.rowIndex,
                $rowIndex = _ref10.$rowIndex,
                column = _ref10.column,
                columnIndex = _ref10.columnIndex,
                $columnIndex = _ref10.$columnIndex,
                cell = _ref10.cell;

            this.$emit('cell-mouse-leave', row, column, cell, event);
        },

        // 当某个单元格被点击时会触发该事件
        cellClick: function cellClick(_ref11, event) {
            var row = _ref11.row,
                rowIndex = _ref11.rowIndex,
                $rowIndex = _ref11.$rowIndex,
                column = _ref11.column,
                columnIndex = _ref11.columnIndex,
                $columnIndex = _ref11.$columnIndex,
                cell = _ref11.cell;

            this.$emit('cell-click', row, column, cell, event);
            // row-click	当某一行被点击时会触发该事件	row, event, column
            this.$emit('row-click', row, event, column);
        },

        // 当某个单元格被双击击时会触发该事件
        cellDblclick: function cellDblclick(_ref12, event) {
            var row = _ref12.row,
                rowIndex = _ref12.rowIndex,
                $rowIndex = _ref12.$rowIndex,
                column = _ref12.column,
                columnIndex = _ref12.columnIndex,
                $columnIndex = _ref12.$columnIndex,
                cell = _ref12.cell;

            this.$emit('cell-dblclick', row, column, cell, event);
            // 当某一行被双击时会触发该事件
            this.$emit('row-dblclick', row, column, event);
        },

        // 单元格被鼠标右键点击时触发该事件
        rowContextmenu: function rowContextmenu(_ref13, event) {
            var type = _ref13.type,
                row = _ref13.row,
                rowIndex = _ref13.rowIndex,
                column = _ref13.column,
                columnIndex = _ref13.columnIndex,
                cell = _ref13.cell;

            this.$emit('row-contextmenu', row, column, event);
        },

        // 当某一列的表头被点击时会触发该事件
        headerClick: function headerClick(_ref14, event) {
            var triggerResizable = _ref14.triggerResizable,
                triggerSort = _ref14.triggerSort,
                triggerFilter = _ref14.triggerFilter,
                $rowIndex = _ref14.$rowIndex,
                column = _ref14.column,
                columnIndex = _ref14.columnIndex,
                $columnIndex = _ref14.$columnIndex,
                cell = _ref14.cell;

            this.$emit('header-click', column, event);
        },

        // 当某一列的表头被鼠标右键点击时触发该事件	column, event
        headerContextmenu: function headerContextmenu(_ref15, event) {
            var type = _ref15.type,
                column = _ref15.column,
                columnIndex = _ref15.columnIndex,
                cell = _ref15.cell;

            this.$emit('header-contextmenu', column, event);
        },

        // 当拖动表头改变了列的宽度的时候会触发该事件(newWidth, oldWidth, column, event)
        headerDragend: function headerDragend(_ref16) {
            var $rowIndex = _ref16.$rowIndex,
                column = _ref16.column,
                columnIndex = _ref16.columnIndex,
                $columnIndex = _ref16.$columnIndex,
                fixed = _ref16.fixed,
                isHidden = _ref16.isHidden;

            var obj = { $rowIndex: $rowIndex, column: column, columnIndex: columnIndex, $columnIndex: $columnIndex, fixed: fixed, isHidden: isHidden };
            this.$emit('header-dragend', obj);
        }
    },
    watch: {
        datas: {
            immediate: true,
            handler: function handler(val) {
                var _this4 = this;

                if (!this.isArrayFn(val)) {
                    throw new Error('表格数据需要的是数组格式，请检查你的数据格式');
                }
                this.$nextTick(function () {
                    _this4.setHeight();
                });
            }
        },
        dialogData: {
            deep: true,
            immediate: true,
            handler: function handler(val) {
                this.newDialogData = JSON.parse(JSON.stringify(val));
            }
        },
        currentPage: function currentPage(val) {
            this.newcurrentPage = val;
        },
        pageSize: function pageSize(val) {
            this.newPageSize = val;
        }
    }
});
// CONCATENATED MODULE: ./packages/plx-table-grid/src/plx-table-grid.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_plx_table_gridvue_type_script_lang_js_ = (plx_table_gridvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./packages/plx-table-grid/src/plx-table-grid.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_plx_table_gridvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/plx-table-grid/src/plx-table-grid.vue"
/* harmony default export */ var plx_table_grid = (component.exports);
// CONCATENATED MODULE: ./packages/plx-table-grid/index.js



external_vue_default.a.use(external_plxy_grid_default.a);

plx_table_grid.install = function (Vue) {
  Vue.component(plx_table_grid.name, plx_table_grid);
};

/* harmony default export */ var packages_plx_table_grid = __webpack_exports__["default"] = (plx_table_grid);

/***/ })
/******/ ]);