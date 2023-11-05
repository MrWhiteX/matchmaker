"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/conversations";
exports.ids = ["pages/api/conversations"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next-auth/client":
/*!***********************************!*\
  !*** external "next-auth/client" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("next-auth/client");

/***/ }),

/***/ "(api)/./middlewares/onlyAuth.ts":
/*!*********************************!*\
  !*** ./middlewares/onlyAuth.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/client */ \"next-auth/client\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models */ \"(api)/./models/index.ts\");\n/* harmony import */ var types_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! types/enums */ \"(api)/./types/enums.ts\");\n\n\n\n\nconst onlyAuth = (handler, requiredRole) => {\n  return async (req, res) => {\n    const session = await (0,next_auth_client__WEBPACK_IMPORTED_MODULE_0__.getSession)({\n      req\n    });\n\n    if (!session) {\n      return res.status(401).json({\n        success: false,\n        message: \"Please log in to get access.\"\n      });\n    }\n\n    const userEmail = session?.user?.email ?? undefined;\n    const currentUser = await models__WEBPACK_IMPORTED_MODULE_1__.user.findUnique({\n      where: {\n        email: userEmail\n      }\n    });\n    req.currentUser = currentUser;\n\n    if (requiredRole) {\n      switch (requiredRole) {\n        case types_enums__WEBPACK_IMPORTED_MODULE_2__.UserRole.ADMIN:\n          if (currentUser?.role !== types_enums__WEBPACK_IMPORTED_MODULE_2__.UserRole.ADMIN) {\n            return res.status(403).json({\n              success: false,\n              message: \"Access denied. Admin role required.\"\n            });\n          }\n\n          break;\n\n        case types_enums__WEBPACK_IMPORTED_MODULE_2__.UserRole.MODERATOR:\n          if (![types_enums__WEBPACK_IMPORTED_MODULE_2__.UserRole.ADMIN, types_enums__WEBPACK_IMPORTED_MODULE_2__.UserRole.MODERATOR].includes(currentUser?.role)) {\n            return res.status(403).json({\n              success: false,\n              message: \"Access denied. Admin or Moderator role required.\"\n            });\n          }\n\n          break;\n\n        case types_enums__WEBPACK_IMPORTED_MODULE_2__.UserRole.USER:\n          if (!Object.values(types_enums__WEBPACK_IMPORTED_MODULE_2__.UserRole).includes(currentUser?.role)) {\n            return res.status(403).json({\n              success: false,\n              message: \"Access denied.\"\n            });\n          }\n\n          break;\n      }\n    }\n\n    return handler(req, res);\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onlyAuth);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9taWRkbGV3YXJlcy9vbmx5QXV0aC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFHQTs7QUFPQSxNQUFNRyxRQUFRLEdBQUcsQ0FBQ0MsT0FBRCxFQUFzQkMsWUFBdEIsS0FBaUQ7RUFDaEUsT0FBTyxPQUFPQyxHQUFQLEVBQTJDQyxHQUEzQyxLQUFvRTtJQUN6RSxNQUFNQyxPQUFPLEdBQUcsTUFBTVIsNERBQVUsQ0FBQztNQUFFTTtJQUFGLENBQUQsQ0FBaEM7O0lBRUEsSUFBSSxDQUFDRSxPQUFMLEVBQWM7TUFDWixPQUFPRCxHQUFHLENBQUNFLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtRQUMxQkMsT0FBTyxFQUFFLEtBRGlCO1FBRTFCQyxPQUFPLEVBQUU7TUFGaUIsQ0FBckIsQ0FBUDtJQUlEOztJQUVELE1BQU1DLFNBQVMsR0FBR0wsT0FBTyxFQUFFUCxJQUFULEVBQWVhLEtBQWYsSUFBd0JDLFNBQTFDO0lBQ0EsTUFBTUMsV0FBVyxHQUFHLE1BQU1mLG1EQUFBLENBQWdCO01BQ3hDaUIsS0FBSyxFQUFFO1FBQ0xKLEtBQUssRUFBRUQ7TUFERjtJQURpQyxDQUFoQixDQUExQjtJQU1BUCxHQUFHLENBQUNVLFdBQUosR0FDRUEsV0FERjs7SUFHQSxJQUFJWCxZQUFKLEVBQWtCO01BQ2hCLFFBQVFBLFlBQVI7UUFDRSxLQUFLSCx1REFBTDtVQUNFLElBQUljLFdBQVcsRUFBRUksSUFBYixLQUFzQmxCLHVEQUExQixFQUEwQztZQUN4QyxPQUFPSyxHQUFHLENBQUNFLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtjQUMxQkMsT0FBTyxFQUFFLEtBRGlCO2NBRTFCQyxPQUFPLEVBQUU7WUFGaUIsQ0FBckIsQ0FBUDtVQUlEOztVQUNEOztRQUNGLEtBQUtWLDJEQUFMO1VBQ0UsSUFDRSxDQUFDLENBQUNBLHVEQUFELEVBQWlCQSwyREFBakIsRUFBcUNvQixRQUFyQyxDQUNDTixXQUFXLEVBQUVJLElBRGQsQ0FESCxFQUlFO1lBQ0EsT0FBT2IsR0FBRyxDQUFDRSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7Y0FDMUJDLE9BQU8sRUFBRSxLQURpQjtjQUUxQkMsT0FBTyxFQUFFO1lBRmlCLENBQXJCLENBQVA7VUFJRDs7VUFDRDs7UUFDRixLQUFLVixzREFBTDtVQUNFLElBQ0UsQ0FBQ3NCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjdkIsaURBQWQsRUFBd0JvQixRQUF4QixDQUFpQ04sV0FBVyxFQUFFSSxJQUE5QyxDQURILEVBRUU7WUFDQSxPQUFPYixHQUFHLENBQUNFLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtjQUMxQkMsT0FBTyxFQUFFLEtBRGlCO2NBRTFCQyxPQUFPLEVBQUU7WUFGaUIsQ0FBckIsQ0FBUDtVQUlEOztVQUNEO01BOUJKO0lBZ0NEOztJQUVELE9BQU9SLE9BQU8sQ0FBQ0UsR0FBRCxFQUFNQyxHQUFOLENBQWQ7RUFDRCxDQXhERDtBQXlERCxDQTFERDs7QUE0REEsaUVBQWVKLFFBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NYWtlci8uL21pZGRsZXdhcmVzL29ubHlBdXRoLnRzP2I5M2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvY2xpZW50XCI7XG5pbXBvcnQgeyB1c2VyIH0gZnJvbSBcIm1vZGVsc1wiO1xuaW1wb3J0IHsgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCB7IE5leHRBcGlSZXF1ZXN0V2l0aEN1cnJlbnRVc2VyIH0gZnJvbSBcInR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gXCJ0eXBlcy9lbnVtc1wiO1xuXG50eXBlIEFwaUhhbmRsZXIgPSAoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3RXaXRoQ3VycmVudFVzZXIsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pID0+IFByb21pc2U8dm9pZD47XG5cbmNvbnN0IG9ubHlBdXRoID0gKGhhbmRsZXI6IEFwaUhhbmRsZXIsIHJlcXVpcmVkUm9sZTogVXNlclJvbGUpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXE6IE5leHRBcGlSZXF1ZXN0V2l0aEN1cnJlbnRVc2VyLCByZXM6IE5leHRBcGlSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKHsgcmVxIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJQbGVhc2UgbG9nIGluIHRvIGdldCBhY2Nlc3MuXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyRW1haWwgPSBzZXNzaW9uPy51c2VyPy5lbWFpbCA/PyB1bmRlZmluZWQ7XG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBhd2FpdCB1c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXEuY3VycmVudFVzZXIgPVxuICAgICAgY3VycmVudFVzZXIgYXMgTmV4dEFwaVJlcXVlc3RXaXRoQ3VycmVudFVzZXJbXCJjdXJyZW50VXNlclwiXTtcblxuICAgIGlmIChyZXF1aXJlZFJvbGUpIHtcbiAgICAgIHN3aXRjaCAocmVxdWlyZWRSb2xlKSB7XG4gICAgICAgIGNhc2UgVXNlclJvbGUuQURNSU46XG4gICAgICAgICAgaWYgKGN1cnJlbnRVc2VyPy5yb2xlICE9PSBVc2VyUm9sZS5BRE1JTikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQWNjZXNzIGRlbmllZC4gQWRtaW4gcm9sZSByZXF1aXJlZC5cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVc2VyUm9sZS5NT0RFUkFUT1I6XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIVtVc2VyUm9sZS5BRE1JTiwgVXNlclJvbGUuTU9ERVJBVE9SXS5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgY3VycmVudFVzZXI/LnJvbGUgYXMgVXNlclJvbGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIkFjY2VzcyBkZW5pZWQuIEFkbWluIG9yIE1vZGVyYXRvciByb2xlIHJlcXVpcmVkLlwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVzZXJSb2xlLlVTRVI6XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIU9iamVjdC52YWx1ZXMoVXNlclJvbGUpLmluY2x1ZGVzKGN1cnJlbnRVc2VyPy5yb2xlIGFzIFVzZXJSb2xlKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQWNjZXNzIGRlbmllZC5cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaGFuZGxlcihyZXEsIHJlcyk7XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBvbmx5QXV0aDtcbiJdLCJuYW1lcyI6WyJnZXRTZXNzaW9uIiwidXNlciIsIlVzZXJSb2xlIiwib25seUF1dGgiLCJoYW5kbGVyIiwicmVxdWlyZWRSb2xlIiwicmVxIiwicmVzIiwic2Vzc2lvbiIsInN0YXR1cyIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsInVzZXJFbWFpbCIsImVtYWlsIiwidW5kZWZpbmVkIiwiY3VycmVudFVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJBRE1JTiIsInJvbGUiLCJNT0RFUkFUT1IiLCJpbmNsdWRlcyIsIlVTRVIiLCJPYmplY3QiLCJ2YWx1ZXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./middlewares/onlyAuth.ts\n");

/***/ }),

/***/ "(api)/./models/index.ts":
/*!*************************!*\
  !*** ./models/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"conversation\": () => (/* binding */ conversation),\n/* harmony export */   \"conversationMessage\": () => (/* binding */ conversationMessage),\n/* harmony export */   \"conversationUser\": () => (/* binding */ conversationUser),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"filter\": () => (/* binding */ filter),\n/* harmony export */   \"profileCheck\": () => (/* binding */ profileCheck),\n/* harmony export */   \"skill\": () => (/* binding */ skill),\n/* harmony export */   \"timezone\": () => (/* binding */ timezone),\n/* harmony export */   \"user\": () => (/* binding */ user)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\n\nif (false) {} else {\n  let globalWithPrisma = global;\n\n  if (!globalWithPrisma.prisma) {\n    globalWithPrisma.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n  }\n\n  prisma = globalWithPrisma.prisma;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\nconst {\n  conversation,\n  conversationUser,\n  conversationMessage,\n  user,\n  filter,\n  skill,\n  timezone,\n  profileCheck\n} = prisma;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBLElBQUlDLE1BQUo7O0FBRUEsSUFBSSxPQUF1QyxFQUEzQyxNQUVPO0VBQ0wsSUFBSUMsZ0JBQWdCLEdBQUdDLE1BQXZCOztFQUdBLElBQUksQ0FBQ0QsZ0JBQWdCLENBQUNELE1BQXRCLEVBQThCO0lBQzVCQyxnQkFBZ0IsQ0FBQ0QsTUFBakIsR0FBMEIsSUFBSUQsd0RBQUosRUFBMUI7RUFDRDs7RUFDREMsTUFBTSxHQUFHQyxnQkFBZ0IsQ0FBQ0QsTUFBMUI7QUFDRDs7QUFFRCxpRUFBZUEsTUFBZjtBQUVPLE1BQU07RUFDWEcsWUFEVztFQUVYQyxnQkFGVztFQUdYQyxtQkFIVztFQUlYQyxJQUpXO0VBS1hDLE1BTFc7RUFNWEMsS0FOVztFQU9YQyxRQVBXO0VBUVhDO0FBUlcsSUFTVFYsTUFURyIsInNvdXJjZXMiOlsid2VicGFjazovL01ha2VyLy4vbW9kZWxzL2luZGV4LnRzPzg2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmxldCBwcmlzbWE6IFByaXNtYUNsaWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xuICBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG59IGVsc2Uge1xuICBsZXQgZ2xvYmFsV2l0aFByaXNtYSA9IGdsb2JhbCBhcyB0eXBlb2YgZ2xvYmFsVGhpcyAmIHtcbiAgICBwcmlzbWE6IFByaXNtYUNsaWVudDtcbiAgfTtcbiAgaWYgKCFnbG9iYWxXaXRoUHJpc21hLnByaXNtYSkge1xuICAgIGdsb2JhbFdpdGhQcmlzbWEucHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuICB9XG4gIHByaXNtYSA9IGdsb2JhbFdpdGhQcmlzbWEucHJpc21hO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7XG5cbmV4cG9ydCBjb25zdCB7XG4gIGNvbnZlcnNhdGlvbixcbiAgY29udmVyc2F0aW9uVXNlcixcbiAgY29udmVyc2F0aW9uTWVzc2FnZSxcbiAgdXNlcixcbiAgZmlsdGVyLFxuICBza2lsbCxcbiAgdGltZXpvbmUsXG4gIHByb2ZpbGVDaGVjayxcbn0gPSBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsV2l0aFByaXNtYSIsImdsb2JhbCIsImNvbnZlcnNhdGlvbiIsImNvbnZlcnNhdGlvblVzZXIiLCJjb252ZXJzYXRpb25NZXNzYWdlIiwidXNlciIsImZpbHRlciIsInNraWxsIiwidGltZXpvbmUiLCJwcm9maWxlQ2hlY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./models/index.ts\n");

/***/ }),

/***/ "(api)/./pages/api/conversations/index.ts":
/*!******************************************!*\
  !*** ./pages/api/conversations/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var middlewares_onlyAuth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! middlewares/onlyAuth */ \"(api)/./middlewares/onlyAuth.ts\");\n/* harmony import */ var services_conversations_getAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! services/conversations/getAll */ \"(api)/./services/conversations/getAll.ts\");\n/* harmony import */ var services_conversations_unreadCount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services/conversations/unreadCount */ \"(api)/./services/conversations/unreadCount.ts\");\n/* harmony import */ var types_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! types/enums */ \"(api)/./types/enums.ts\");\n\n\n\n\n\nconst conversationApi = async (req, res) => {\n  switch (req.method) {\n    case \"GET\":\n      {\n        try {\n          const conversations = await (0,services_conversations_getAll__WEBPACK_IMPORTED_MODULE_1__.getAll)({\n            userId: req.currentUser?.id\n          });\n          const unread = await (0,services_conversations_unreadCount__WEBPACK_IMPORTED_MODULE_2__.unreadCount)({\n            userId: req.currentUser?.id\n          });\n          res.status(200).json({\n            conversations,\n            unread\n          });\n        } catch (error) {\n          res.status(422).json({\n            conversations: [],\n            unread: 0,\n            error\n          });\n        }\n\n        break;\n      }\n\n    default:\n      res.status(400);\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,middlewares_onlyAuth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(conversationApi, types_enums__WEBPACK_IMPORTED_MODULE_3__.UserRole.USER));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY29udmVyc2F0aW9ucy9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBOztBQUdBLE1BQU1JLGVBQWUsR0FBRyxPQUN0QkMsR0FEc0IsRUFFdEJDLEdBRnNCLEtBR25CO0VBQ0gsUUFBUUQsR0FBRyxDQUFDRSxNQUFaO0lBQ0UsS0FBSyxLQUFMO01BQVk7UUFDVixJQUFJO1VBQ0YsTUFBTUMsYUFBYSxHQUFHLE1BQU1QLHFFQUFNLENBQUM7WUFBRVEsTUFBTSxFQUFFSixHQUFHLENBQUNLLFdBQUosRUFBaUJDO1VBQTNCLENBQUQsQ0FBbEM7VUFDQSxNQUFNQyxNQUFNLEdBQUcsTUFBTVYsK0VBQVcsQ0FBQztZQUFFTyxNQUFNLEVBQUVKLEdBQUcsQ0FBQ0ssV0FBSixFQUFpQkM7VUFBM0IsQ0FBRCxDQUFoQztVQUVBTCxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtZQUFFTixhQUFGO1lBQWlCSTtVQUFqQixDQUFyQjtRQUNELENBTEQsQ0FLRSxPQUFPRyxLQUFQLEVBQWM7VUFDZFQsR0FBRyxDQUFDTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7WUFBRU4sYUFBYSxFQUFFLEVBQWpCO1lBQXFCSSxNQUFNLEVBQUUsQ0FBN0I7WUFBZ0NHO1VBQWhDLENBQXJCO1FBQ0Q7O1FBQ0Q7TUFDRDs7SUFDRDtNQUNFVCxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYO0VBYko7QUFlRCxDQW5CRDs7QUFxQkEsaUVBQWViLGdFQUFRLENBQUNJLGVBQUQsRUFBa0JELHNEQUFsQixDQUF2QiIsInNvdXJjZXMiOlsid2VicGFjazovL01ha2VyLy4vcGFnZXMvYXBpL2NvbnZlcnNhdGlvbnMvaW5kZXgudHM/Nzg5ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb25seUF1dGggZnJvbSBcIm1pZGRsZXdhcmVzL29ubHlBdXRoXCI7XG5pbXBvcnQgeyBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IHsgZ2V0QWxsIH0gZnJvbSBcInNlcnZpY2VzL2NvbnZlcnNhdGlvbnMvZ2V0QWxsXCI7XG5pbXBvcnQgeyB1bnJlYWRDb3VudCB9IGZyb20gXCJzZXJ2aWNlcy9jb252ZXJzYXRpb25zL3VucmVhZENvdW50XCI7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gXCJ0eXBlcy9lbnVtc1wiO1xuaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3RXaXRoQ3VycmVudFVzZXIgfSBmcm9tIFwidHlwZXMvdHlwZXNcIjtcblxuY29uc3QgY29udmVyc2F0aW9uQXBpID0gYXN5bmMgKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0V2l0aEN1cnJlbnRVc2VyLFxuICByZXM6IE5leHRBcGlSZXNwb25zZVxuKSA9PiB7XG4gIHN3aXRjaCAocmVxLm1ldGhvZCkge1xuICAgIGNhc2UgXCJHRVRcIjoge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9ucyA9IGF3YWl0IGdldEFsbCh7IHVzZXJJZDogcmVxLmN1cnJlbnRVc2VyPy5pZCB9KTtcbiAgICAgICAgY29uc3QgdW5yZWFkID0gYXdhaXQgdW5yZWFkQ291bnQoeyB1c2VySWQ6IHJlcS5jdXJyZW50VXNlcj8uaWQgfSk7XG5cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBjb252ZXJzYXRpb25zLCB1bnJlYWQgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXMuc3RhdHVzKDQyMikuanNvbih7IGNvbnZlcnNhdGlvbnM6IFtdLCB1bnJlYWQ6IDAsIGVycm9yIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXMuc3RhdHVzKDQwMCk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9ubHlBdXRoKGNvbnZlcnNhdGlvbkFwaSwgVXNlclJvbGUuVVNFUik7XG4iXSwibmFtZXMiOlsib25seUF1dGgiLCJnZXRBbGwiLCJ1bnJlYWRDb3VudCIsIlVzZXJSb2xlIiwiY29udmVyc2F0aW9uQXBpIiwicmVxIiwicmVzIiwibWV0aG9kIiwiY29udmVyc2F0aW9ucyIsInVzZXJJZCIsImN1cnJlbnRVc2VyIiwiaWQiLCJ1bnJlYWQiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJVU0VSIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/conversations/index.ts\n");

/***/ }),

/***/ "(api)/./services/conversations/getAll.ts":
/*!******************************************!*\
  !*** ./services/conversations/getAll.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAll\": () => (/* binding */ getAll)\n/* harmony export */ });\n/* harmony import */ var models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! models */ \"(api)/./models/index.ts\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nconst getAll = ({\n  userId,\n  page = 0,\n  perPage = 7,\n  searchTerm\n}) => {\n  let filters = {};\n\n  if (searchTerm) {\n    filters = _objectSpread(_objectSpread({}, filters), {}, {\n      messages: {\n        some: {\n          content: {\n            contains: searchTerm,\n            mode: \"insensitive\"\n          }\n        }\n      }\n    });\n  }\n\n  return models__WEBPACK_IMPORTED_MODULE_0__.conversation.findMany({\n    where: _objectSpread({\n      users: {\n        some: {\n          userId\n        }\n      }\n    }, filters),\n    include: {\n      users: {\n        include: {\n          user: {\n            select: {\n              id: true,\n              email: true\n            }\n          }\n        }\n      },\n      messages: {\n        include: {\n          user: {\n            select: {\n              id: true,\n              email: true\n            }\n          }\n        }\n      }\n    },\n    orderBy: {\n      id: \"desc\"\n    },\n    skip: page * perPage,\n    take: perPage\n  }); // return conversation.findMany({\n  //   where: {\n  //     users: {\n  //       some: {\n  //         userId,\n  //       },\n  //     },\n  //     ...filters,\n  //   },\n  //   include: {\n  //     users: {\n  //       include: {\n  //         user: true,\n  //       },\n  //     },\n  //     messages: {\n  //       include: {\n  //         user: true,\n  //       },\n  //     },\n  //   },\n  //   orderBy: {\n  //     id: \"desc\",\n  //   },\n  //   skip: page * perPage,\n  //   take: perPage,\n  // });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zZXJ2aWNlcy9jb252ZXJzYXRpb25zL2dldEFsbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBU08sTUFBTUMsTUFBTSxHQUFHLENBQUM7RUFDckJDLE1BRHFCO0VBRXJCQyxJQUFJLEdBQUcsQ0FGYztFQUdyQkMsT0FBTyxHQUFHLENBSFc7RUFJckJDO0FBSnFCLENBQUQsS0FLUjtFQUNaLElBQUlDLE9BQU8sR0FBRyxFQUFkOztFQUNBLElBQUlELFVBQUosRUFBZ0I7SUFDZEMsT0FBTyxtQ0FDRkEsT0FERTtNQUVMQyxRQUFRLEVBQUU7UUFDUkMsSUFBSSxFQUFFO1VBQ0pDLE9BQU8sRUFBRTtZQUNQQyxRQUFRLEVBQUVMLFVBREg7WUFFUE0sSUFBSSxFQUFFO1VBRkM7UUFETDtNQURFO0lBRkwsRUFBUDtFQVdEOztFQUNELE9BQU9YLHlEQUFBLENBQXNCO0lBQzNCYSxLQUFLO01BQ0hDLEtBQUssRUFBRTtRQUNMTixJQUFJLEVBQUU7VUFDSk47UUFESTtNQUREO0lBREosR0FNQUksT0FOQSxDQURzQjtJQVMzQlMsT0FBTyxFQUFFO01BQ1BELEtBQUssRUFBRTtRQUNMQyxPQUFPLEVBQUU7VUFDUEMsSUFBSSxFQUFFO1lBQ0pDLE1BQU0sRUFBRTtjQUNOQyxFQUFFLEVBQUUsSUFERTtjQUVOQyxLQUFLLEVBQUU7WUFGRDtVQURKO1FBREM7TUFESixDQURBO01BV1BaLFFBQVEsRUFBRTtRQUNSUSxPQUFPLEVBQUU7VUFDUEMsSUFBSSxFQUFFO1lBQ0pDLE1BQU0sRUFBRTtjQUNOQyxFQUFFLEVBQUUsSUFERTtjQUVOQyxLQUFLLEVBQUU7WUFGRDtVQURKO1FBREM7TUFERDtJQVhILENBVGtCO0lBK0IzQkMsT0FBTyxFQUFFO01BQ1BGLEVBQUUsRUFBRTtJQURHLENBL0JrQjtJQWtDM0JHLElBQUksRUFBRWxCLElBQUksR0FBR0MsT0FsQ2M7SUFtQzNCa0IsSUFBSSxFQUFFbEI7RUFuQ3FCLENBQXRCLENBQVAsQ0FmWSxDQXFEWjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDRCxDQXJGTSIsInNvdXJjZXMiOlsid2VicGFjazovL01ha2VyLy4vc2VydmljZXMvY29udmVyc2F0aW9ucy9nZXRBbGwudHM/MThiYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb252ZXJzYXRpb24gfSBmcm9tIFwibW9kZWxzXCI7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICB1c2VySWQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcGFnZT86IG51bWJlcjtcbiAgcGVyUGFnZT86IG51bWJlcjtcbiAgc2VhcmNoVGVybT86IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0QWxsID0gKHtcbiAgdXNlcklkLFxuICBwYWdlID0gMCxcbiAgcGVyUGFnZSA9IDcsXG4gIHNlYXJjaFRlcm0sXG59OiBJUHJvcHMpID0+IHtcbiAgbGV0IGZpbHRlcnMgPSB7fTtcbiAgaWYgKHNlYXJjaFRlcm0pIHtcbiAgICBmaWx0ZXJzID0ge1xuICAgICAgLi4uZmlsdGVycyxcbiAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgIHNvbWU6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBjb250YWluczogc2VhcmNoVGVybSxcbiAgICAgICAgICAgIG1vZGU6IFwiaW5zZW5zaXRpdmVcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIHJldHVybiBjb252ZXJzYXRpb24uZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7XG4gICAgICB1c2Vyczoge1xuICAgICAgICBzb21lOiB7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIC4uLmZpbHRlcnMsXG4gICAgfSxcbiAgICBpbmNsdWRlOiB7XG4gICAgICB1c2Vyczoge1xuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlczoge1xuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBvcmRlckJ5OiB7XG4gICAgICBpZDogXCJkZXNjXCIsXG4gICAgfSxcbiAgICBza2lwOiBwYWdlICogcGVyUGFnZSxcbiAgICB0YWtlOiBwZXJQYWdlLFxuICB9KTtcblxuICAvLyByZXR1cm4gY29udmVyc2F0aW9uLmZpbmRNYW55KHtcbiAgLy8gICB3aGVyZToge1xuICAvLyAgICAgdXNlcnM6IHtcbiAgLy8gICAgICAgc29tZToge1xuICAvLyAgICAgICAgIHVzZXJJZCxcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgIH0sXG4gIC8vICAgICAuLi5maWx0ZXJzLFxuICAvLyAgIH0sXG4gIC8vICAgaW5jbHVkZToge1xuICAvLyAgICAgdXNlcnM6IHtcbiAgLy8gICAgICAgaW5jbHVkZToge1xuICAvLyAgICAgICAgIHVzZXI6IHRydWUsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICB9LFxuICAvLyAgICAgbWVzc2FnZXM6IHtcbiAgLy8gICAgICAgaW5jbHVkZToge1xuICAvLyAgICAgICAgIHVzZXI6IHRydWUsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICB9LFxuICAvLyAgIH0sXG4gIC8vICAgb3JkZXJCeToge1xuICAvLyAgICAgaWQ6IFwiZGVzY1wiLFxuICAvLyAgIH0sXG4gIC8vICAgc2tpcDogcGFnZSAqIHBlclBhZ2UsXG4gIC8vICAgdGFrZTogcGVyUGFnZSxcbiAgLy8gfSk7XG59O1xuIl0sIm5hbWVzIjpbImNvbnZlcnNhdGlvbiIsImdldEFsbCIsInVzZXJJZCIsInBhZ2UiLCJwZXJQYWdlIiwic2VhcmNoVGVybSIsImZpbHRlcnMiLCJtZXNzYWdlcyIsInNvbWUiLCJjb250ZW50IiwiY29udGFpbnMiLCJtb2RlIiwiZmluZE1hbnkiLCJ3aGVyZSIsInVzZXJzIiwiaW5jbHVkZSIsInVzZXIiLCJzZWxlY3QiLCJpZCIsImVtYWlsIiwib3JkZXJCeSIsInNraXAiLCJ0YWtlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./services/conversations/getAll.ts\n");

/***/ }),

/***/ "(api)/./services/conversations/unreadCount.ts":
/*!***********************************************!*\
  !*** ./services/conversations/unreadCount.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"unreadCount\": () => (/* binding */ unreadCount)\n/* harmony export */ });\n/* harmony import */ var models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! models */ \"(api)/./models/index.ts\");\n\nconst unreadCount = ({\n  userId\n}) => models__WEBPACK_IMPORTED_MODULE_0__.conversationUser.count({\n  where: {\n    userId,\n    read: false\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zZXJ2aWNlcy9jb252ZXJzYXRpb25zL3VucmVhZENvdW50LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFNTyxNQUFNQyxXQUFXLEdBQUcsQ0FBQztFQUFFQztBQUFGLENBQUQsS0FDekJGLDBEQUFBLENBQXVCO0VBQ3JCSSxLQUFLLEVBQUU7SUFDTEYsTUFESztJQUVMRyxJQUFJLEVBQUU7RUFGRDtBQURjLENBQXZCLENBREsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NYWtlci8uL3NlcnZpY2VzL2NvbnZlcnNhdGlvbnMvdW5yZWFkQ291bnQudHM/NGZlZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb252ZXJzYXRpb25Vc2VyIH0gZnJvbSBcIm1vZGVsc1wiO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgdXNlcklkOiBudW1iZXIgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjb25zdCB1bnJlYWRDb3VudCA9ICh7IHVzZXJJZCB9OiBJUHJvcHMpID0+XG4gIGNvbnZlcnNhdGlvblVzZXIuY291bnQoe1xuICAgIHdoZXJlOiB7XG4gICAgICB1c2VySWQsXG4gICAgICByZWFkOiBmYWxzZSxcbiAgICB9LFxuICB9KTtcbiJdLCJuYW1lcyI6WyJjb252ZXJzYXRpb25Vc2VyIiwidW5yZWFkQ291bnQiLCJ1c2VySWQiLCJjb3VudCIsIndoZXJlIiwicmVhZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./services/conversations/unreadCount.ts\n");

/***/ }),

/***/ "(api)/./types/enums.ts":
/*!************************!*\
  !*** ./types/enums.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserRole\": () => (/* binding */ UserRole)\n/* harmony export */ });\nlet UserRole;\n\n(function (UserRole) {\n  UserRole[\"USER\"] = \"USER\";\n  UserRole[\"MODERATOR\"] = \"MODERATOR\";\n  UserRole[\"ADMIN\"] = \"ADMIN\";\n})(UserRole || (UserRole = {}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi90eXBlcy9lbnVtcy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBS0EsUUFBWjs7V0FBWUE7RUFBQUE7RUFBQUE7RUFBQUE7R0FBQUEsYUFBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NYWtlci8uL3R5cGVzL2VudW1zLnRzPzQ4MmUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gVXNlclJvbGUge1xuICBVU0VSID0gXCJVU0VSXCIsXG4gIE1PREVSQVRPUiA9IFwiTU9ERVJBVE9SXCIsXG4gIEFETUlOID0gXCJBRE1JTlwiLFxufVxuIl0sIm5hbWVzIjpbIlVzZXJSb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./types/enums.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/conversations/index.ts"));
module.exports = __webpack_exports__;

})();