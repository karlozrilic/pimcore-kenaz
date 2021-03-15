/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/***/ (() => {

$.fn.exists = function () {
  return this.length !== 0;
};

$(function () {
  var homePage = $('#home-page');
  var categoryPage = $('#category-page');
  var postPage = $('#post-page');
  var articleSliderConfig = {
    slide: '.artcle',
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('#article-slider-prev'),
    nextArrow: $('#article-slider-next')
  };
  $('.btn-close').on('click', function () {
    $(".alert").alert('close');
  });

  if (homePage.exists()) {
    $('.article-slider').slick(articleSliderConfig);
    $('.news-carousel-slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: $('#news-carousel-prev'),
      nextArrow: $('#news-carousel-next')
    });
    $('.editorials-slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('#editorials-prev'),
      nextArrow: $('#editorials-next')
    });
    $('.local-news-slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('#local-news-prev'),
      nextArrow: $('#local-news-next')
    });
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      prevArrow: $('#bottom-image-slider-prev'),
      nextArrow: $('#bottom-image-slider-next'),
      slide: '.slider-img'
    });
    $('.slider-nav').slick({
      infinite: false,
      slidesToShow: 7,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      arrows: false,
      autoplay: false,
      focusOnSelect: true
    });
  }

  if (categoryPage.exists()) {
    $('.article-slider').slick(articleSliderConfig);
  }

  if (categoryPage.exists() || postPage.exists()) {
    setInterval(function () {
      var testemonials = $('.video-testemonial');
      $(testemonials).eq(0).animate({
        top: "400px"
      }, {
        duration: 1000,
        queue: false,
        progress: function progress(animation, _progress, remainingMs) {
          if (remainingMs <= 200) {
            $(testemonials).each(function (index, element) {
              $(element).removeClass("z-ind-".concat(index + 1)).addClass("z-ind-".concat(index == 0 ? 3 : index));
            });
          }

          if (remainingMs <= 800) {
            $(testemonials).each(function (index, element) {
              $(element).removeClass("tab-".concat(index + 1)).addClass("tab-".concat(index == 0 ? 3 : index));
            });
          }
        },
        done: function done() {
          $(this).animate({
            top: "20px"
          }, {
            duration: 1000,
            done: function done() {
              $(testemonials).each(function (index, element) {
                $(element).removeAttr("style");
              });
            }
          });
          $(testemonials).eq(0).insertAfter($(testemonials).last());
        }
      });
      $(testemonials).eq(1).animate({
        top: "0px"
      }, {
        duration: 1000,
        queue: false,
        done: function done() {
          $(this).removeAttr("style");
        }
      });
    }, 5000);
    var modals = $(".video-testemonial-modal");
    var modalsClose = $(".modal-close");
    var openModals = $(".video-play-button");
    var videos = $(".modal-video");
    openModals.each(function (index, element) {
      $(element).on("click", function () {
        $(modals[index]).css("display", "block");
        $(modals[index]).removeClass("out");
        videos[index].play();
      });
    });
    modalsClose.each(function (index, element) {
      $(element).on("click", function () {
        $(modals[index]).addClass("out");
        videos[index].pause();
        videos[index].currentTime = 0;
      });
    });
    $(window).on("click", function (event) {
      modals.each(function (index, element) {
        if (event.target == element) {
          $(element).addClass("out");
          videos[index].pause();
          videos[index].currentTime = 0;
        }
      });
    });
  }
});

/***/ }),

/***/ "./resources/scss/main.scss":
/*!**********************************!*\
  !*** ./resources/scss/main.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/static/js/main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./resources/js/main.js"],
/******/ 			["./resources/scss/main.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkpimcore"] = self["webpackChunkpimcore"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;