(function(t){function e(e){for(var o,i,r=e[0],c=e[1],l=e[2],u=0,m=[];u<r.length;u++)i=r[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&m.push(n[i][0]),n[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);d&&d(e);while(m.length)m.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],o=!0,i=1;i<a.length;i++){var c=a[i];0!==n[c]&&(o=!1)}o&&(s.splice(e--,1),t=r(r.s=a[0]))}return t}var o={},n={app:0},s=[];function i(t){return r.p+"js/"+({about:"about"}[t]||t)+"."+{about:"18cd9286"}[t]+".js"}function r(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.e=function(t){var e=[],a=n[t];if(0!==a)if(a)e.push(a[2]);else{var o=new Promise((function(e,o){a=n[t]=[e,o]}));e.push(a[2]=o);var s,c=document.createElement("script");c.charset="utf-8",c.timeout=120,r.nc&&c.setAttribute("nonce",r.nc),c.src=i(t);var l=new Error;s=function(e){c.onerror=c.onload=null,clearTimeout(u);var a=n[t];if(0!==a){if(a){var o=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",l.name="ChunkLoadError",l.type=o,l.request=s,a[1](l)}n[t]=void 0}};var u=setTimeout((function(){s({type:"timeout",target:c})}),12e4);c.onerror=c.onload=s,document.head.appendChild(c)}return Promise.all(e)},r.m=t,r.c=o,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(a,o,function(e){return t[e]}.bind(null,o));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/vue-lm-stats/",r.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var d=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0931":function(t,e,a){"use strict";a("5e09")},4678:function(t,e,a){var o={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=s(t);return a(e)}function s(t){if(!a.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}n.keys=function(){return Object.keys(o)},n.resolve=s,t.exports=n,n.id="4678"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var o=a("2b0e"),n=(a("d3b7"),a("bc3a")),s=a.n(n),i={},r=s.a.create(i);r.interceptors.request.use((function(t){return t}),(function(t){return Promise.reject(t)})),r.interceptors.response.use((function(t){return t}),(function(t){return Promise.reject(t)})),Plugin.install=function(t,e){t.axios=r,window.axios=r,console.log("options",e),Object.defineProperties(t.prototype,{axios:{get:function(){return r}},$axios:{get:function(){return r}}})},o["a"].use(Plugin);Plugin;o["a"].use(a("84b5"));var c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[o("div",{staticClass:"d-flex align-center"},[o("v-img",{staticClass:"shrink mt-1 hidden-sm-and-down",attrs:{alt:"Vuetify Name",contain:"","min-width":"100",src:a("8faf"),width:"100"}})],1),o("v-spacer"),o("v-menu",{attrs:{"overflow-y-scroll":"",left:"",top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[o("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",n,!1),a),[o("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[o("v-list",{staticStyle:{"overflow-y":"auto","max-height":"100vh"},attrs:{nav:"",dense:"",subheader:"","one-line":""}},[o("v-subheader",[t._v("Regionen")]),o("v-list-item-group",{attrs:{color:"primary"},model:{value:t.activeRegion,callback:function(e){t.activeRegion=e},expression:"activeRegion"}},[t._l(t.regions,(function(e,a){return[o("v-list-item",{key:"item-"+a,attrs:{value:e,"active-class":"teal--text text--darken-4"},on:{click:function(a){return t.setActive(e)}}},[[o("v-list-item-avatar",[o("v-icon",{staticClass:"grey lighten-1",attrs:{dark:""}},[t._v(" mdi-map-marker ")])],1),o("v-list-item-content",[o("v-list-item-title",[t._v(t._s(e.title)+" "),o("v-chip",[t._v(t._s(e.locations))])],1)],1),o("v-list-item-action")]],2)]}))],2)],1)],1),o("v-btn",{attrs:{href:"https://www.leerstandsmelder.de",target:"_blank",text:""}},[o("span",{staticClass:"mr-2"},[t._v("LM plattform")]),o("v-icon",[t._v("mdi-open-in-new")])],1)],1),o("v-main",[o("router-view")],1)],1)},l=[],u=a("5530"),d=a("2f62"),m={name:"App",data:function(){return{sideNav:!1,appName:"LM Stats",activeRegion:null}},watch:{activeRegion:function(t,e){var a=this;t!=e&&(console.log("watch activeRegion",t,e),t.uuid!=this.regionId&&this.$store.dispatch("region/set",t).then((function(){console.log("resolve region/set",a.regionId)})))}},computed:Object(u["a"])(Object(u["a"])({},Object(d["b"])("region",["regionId","regionData"])),Object(d["b"])("regions",["regions","active"])),mounted:function(){this.init()},created:function(){},methods:{init:function(){this.$store.dispatch("regions/load"),this.$store.dispatch("region/load"),this.activeRegion=this.$store.state.regionData},setActive:function(t){console.log("setActive",t),this.$store.dispatch("regions/setActive",t)}}},p=m,f=a("2877"),g=a("6544"),v=a.n(g),b=a("7496"),h=a("40dc"),j=a("8336"),y=a("cc20"),_=a("132d"),k=a("adda"),w=a("8860"),O=a("da13"),L=a("1800"),D=a("8270"),x=a("5d23"),I=a("1baa"),S=a("f6c4"),V=a("e449"),C=a("2fa4"),A=a("e0c7"),z=Object(f["a"])(p,c,l,!1,null,null,null),E=z.exports;v()(z,{VApp:b["a"],VAppBar:h["a"],VBtn:j["a"],VChip:y["a"],VIcon:_["a"],VImg:k["a"],VList:w["a"],VListItem:O["a"],VListItemAction:L["a"],VListItemAvatar:D["a"],VListItemContent:x["a"],VListItemGroup:I["a"],VListItemTitle:x["c"],VMain:S["a"],VMenu:V["a"],VSpacer:C["a"],VSubheader:A["a"]});var P=a("9483");Object(P["a"])("".concat("/vue-lm-stats/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});a("3ca3"),a("ddb0");var $=a("8c4f"),M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"pa-2"},[a("v-row",[a("v-col",[a("v-card",{staticClass:"pl-10 pr-10 pb-10 pt-5 elevation-5"},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("h2",[t._v(t._s(t.regionData.title))]),a("v-list",[a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-map-marker")])],1),a("v-list-item-subtitle",[t._v(t._s(t.locations.length))])],1),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-map-marker")])],1),a("v-list-item-subtitle",[t._v(t._s(t.regionData.lonlat[1])+" x "+t._s(t.regionData.lonlat[0]))])],1),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-map-marker")])],1),a("v-list-item-subtitle",[t._v(t._s(t.regionData.zoom))])],1),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-map-marker")])],1),a("v-list-item-subtitle",[a("v-switch",{model:{value:t.mapOptions.show_markers,callback:function(e){t.$set(t.mapOptions,"show_markers",e)},expression:"mapOptions.show_markers"}})],1)],1)],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("l-map",{staticStyle:{"min-height":"500px"},attrs:{zoom:t.regionData.zoom,minZoom:2,center:[t.regionData.lonlat[1],t.regionData.lonlat[0]]}},[a("l-tile-layer",{attrs:{url:"https://{s}.tile.osm.org/{z}/{x}/{y}.png"}}),t.mapOptions.show_markers?a("div",t._l(this.locations,(function(t,e){return a("l-circle-marker",{key:"marker-"+e,attrs:{"lat-lng":[t.lonlat[1],t.lonlat[0]],id:e,options:{title:"marker-"+e,id:e}}},[a("l-popup",{attrs:{content:t.title,options:{permanent:"true",direction:"top"}}})],1)})),1):t._e(),a("Vue2LeafletHeatmap",{attrs:{"lat-lng":t.latlngs,radius:30,"min-opacity":.75,"max-zoom":10,blur:60}})],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}})],1)],1)],1)],1),a("v-row",[a("v-col",[a("v-card",{staticClass:"pl-10 pr-10 pb-10 pt-5 elevation-5"},[a("h2",[t._v("Statistics")]),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[a("v-text-field",t._g({attrs:{label:"Start date","prepend-icon":"mdi-calendar-account",readonly:""},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}},o))]}}]),model:{value:t.menuStartDate,callback:function(e){t.menuStartDate=e},expression:"menuStartDate"}},[a("v-date-picker",{on:{input:function(e){t.menuStartDate=!1}},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[a("v-text-field",t._g({attrs:{label:"End date","prepend-icon":"mdi-calendar-account",readonly:""},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}},o))]}}]),model:{value:t.menuEndDate,callback:function(e){t.menuEndDate=e},expression:"menuEndDate"}},[a("v-date-picker",{on:{input:function(e){t.menuEndDate=!1}},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-btn",{attrs:{color:"success",left:"",large:""},on:{click:function(e){return t.fetch()}}},[a("v-icon",[t._v("mdi-reload")]),t._v("Reload ")],1)],1)],1)],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-card",{staticClass:"pl-10 pr-10 pb-10 pt-5 elevation-5"},[a("v-card",{staticClass:"pt-5 elevation-10",attrs:{color:"white"}},[a("chartist",{attrs:{ratio:"ct-major-second",type:"Bar",data:t.groupedType,options:t.chartTypeOptions}})],1),a("v-card-text",[a("h4",[t._v("LM by type")])]),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-download")])],1),a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-information")])],1)],1)],1)],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-card",{staticClass:"pl-10 pr-10 pb-10 pt-5 elevation-5"},[a("v-card",{staticClass:"pt-5 elevation-10",attrs:{color:"white"}},[a("chartist",{attrs:{ratio:"ct-major-second",type:"Bar",data:t.groupedDate,options:t.chartTypeOptions}})],1),a("v-card-text",[a("h4",[t._v("Locations created on date")])]),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-download")])],1),a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-information")])],1)],1)],1)],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-card",{staticClass:"pl-10 pr-10 pb-10 pt-5 elevation-5"},[a("v-card",{staticClass:"pt-5 elevation-10",attrs:{color:"white"}},[a("chartist",{attrs:{ratio:"ct-major-second",type:"Pie",data:t.groupedUser,options:t.chartStatusOptions}})],1),a("v-card-text",[a("h4",[t._v("Locations by user")])]),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-download")])],1),a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-information")])],1)],1)],1)],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-card",{staticClass:"pl-10 pr-10 pb-10 pt-5 elevation-5"},[a("v-card",{staticClass:"pt-5 elevation-10",attrs:{color:"white"}},[a("chartist",{attrs:{data:t.groupedOwner,options:t.chartUserOptions,ratio:"ct-major-second",type:"Bar"}})],1),a("v-card-text",[a("h4",[t._v("Locations by owner")])]),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-download")])],1),a("v-btn",{attrs:{icon:"",small:"",to:{name:"form",params:{id:"stats_type"}}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-information")])],1)],1)],1)],1)],1)],1)},T=[],B=a("1da1"),N=(a("96cf"),a("d81d"),a("a15b"),a("c1df")),R=a.n(N),F=a("2ef0"),q=a.n(F),Y={groupByField:function(t,e){var a=q.a.chain(e).groupBy(t).mapValues((function(t){return q.a.map(t,"name")})).value(),o=q.a.map(a,(function(t,e){return t.length})),n=q.a.map(a,(function(t,e){return e}));return{labels:n,series:o}}},U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{display:"none"}},[t.ready?t._t("default"):t._e()],2)},Z=[],J=(a("a9e3"),a("ef62")),H=a("e11e"),G=(a("a662"),window.L),X={latLng:{type:Array,default:function(){return[]},custom:!1},minOpacity:{type:Number,custom:!0,default:.05},maxZoom:{type:Number,custom:!0,default:18},radius:{type:Number,custom:!0,default:25},blur:{type:Number,custom:!0,default:15},max:{type:Number,custom:!0,default:1},visible:{type:Boolean,custom:!0,default:!0}},W={name:"LHeatmap",props:X,data:function(){return{ready:!1}},mounted:function(){var t={};this.minOpacity&&(t.minOpacity=this.minOpacity),this.maxZoom&&(t.maxZoom=this.maxZoom),this.radius&&(t.radius=this.radius),this.blur&&(t.blur=this.blur),this.max&&(t.max=this.max),this.mapObject=G.heatLayer(this.latLng,t),H["DomEvent"].on(this.mapObject,this.$listeners),Object(J["b"])(this,this.mapObject,X),this.ready=!0,this.parentContainer=Object(J["a"])(this.$parent),this.parentContainer.addLayer(this,!this.visible)},beforeDestroy:function(){this.parentContainer.removeLayer(this)},methods:{setMinOpacity:function(t){this.mapObject.setOptions({minOpacity:t})},setMaxZoom:function(t){this.mapObject.setOptions({maxZoom:t})},setRadius:function(t){this.mapObject.setOptions({radius:t})},setBlur:function(t){this.mapObject.setOptions({blur:t})},setMax:function(t){this.mapObject.setOptions({max:t})},setVisible:function(t,e){t!==e&&(t?this.parentContainer.addLayer(this):this.parentContainer.removeLayer(this))},addLatLng:function(t){this.mapObject.addLatLng(t)}}},K=W,Q=Object(f["a"])(K,U,Z,!1,null,null,null),tt=Q.exports,et=function(t){return R()(t.created,"YYYY-MM-DD").format("YYYY")},at={name:"chart",computed:Object(u["a"])(Object(u["a"])(Object(u["a"])(Object(u["a"])({},Object(d["b"])("region",["regionId","regionData"])),Object(d["b"])("regions",["regions","active"])),Object(d["b"])("locations",["locations","activeLocations"])),{},{groupedType:function(){return Y.groupByField("buildingType",this.locations)},groupedDate:function(){return Y.groupByField(et,this.locations)},groupedUser:function(){return Y.groupByField("user.nickname",this.locations)},groupedOwner:function(){return Y.groupByField("owner",this.locations)},latlngs:function(){return console.log("recaclulate locations",this.locations),this.locations?this.locations.map((function(t){return[t.lonlat[1],t.lonlat[0],.1]})):[]}}),components:{Vue2LeafletHeatmap:tt},data:function(){return{chartData:{series:[]},chartOptions:{lineSmooth:!1},chartTypeOptions:{},chartStatusOptions:{},chartUserOptions:{},menuStartDate:!1,menuEndDate:!1,startDate:"",endDate:"",circle:{radius:14,color:"transparent",fillcolor:"rgba(242, 71, 38, 1)",fillopacity:.85},mapOptions:{zoom:10,min_zoom:2,show_markers:!1}}},created:function(){console.log("stat movies .chartData",this.chartData),this.fetch()},methods:{isLoggedIn:function(){return this.$store.getters["auth/isLoggedIn"]},isLoading:function(){return this.$store.getters["loader/loading"]},fetch:function(){var t=this;return Object(B["a"])(regeneratorRuntime.mark((function e(){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=[],t.startDate&&a.push('"startDate" : "'+t.startDate+'"'),t.endDate&&a.push('"endDate" : "'+t.endDate+'"'),o=a.join(","),""!=o&&(o=","+o),t.chartTypeOptions={distributeSeries:!0,axisY:{type:t.$chartist.AutoScaleAxis,onlyInteger:!0,low:0}},t.chartOptions={axisX:{type:t.$chartist.FixedScaleAxis,divisor:10,labelInterpolationFnc:function(t){return console.log("interpol",t),R()(t).format("MMM D")}},axisY:{type:t.$chartist.AutoScaleAxis,onlyInteger:!0,low:0},fullWidth:!0,lineSmooth:t.$chartist.Interpolation.none({fillHoles:!0})},t.chartUserOptions={distributeSeries:!0,horizontalBars:!0,axisX:{labelInterpolationFnc:t.$chartist.noop},axisY:{offset:140}};case 8:case"end":return e.stop()}}),e)})))()},handleMapClick:function(t){if(console.log("onclick"),console.log(t.target.options.id),console.log(t.target.options.title),t.target.options.title){for(var e=0;e<this.data.layer.places.length;e++)this.$set(this.data.layer.places[e],"state",!1);console.log("Clicked place: "+this.data.layer.places[t.target.options.id].title),console.log("Clicked place ID: "+this.data.layer.places[t.target.options.id].id),this.data.layer.places[t.target.options.id].state=!this.data.layer.places[t.target.options.id].state}}}},ot=at,nt=(a("0931"),a("b0af")),st=a("99d9"),it=a("62ad"),rt=a("a523"),ct=a("2e4b"),lt=a("ce7e"),ut=a("34c3"),dt=a("0fd9"),mt=a("b73d"),pt=a("8654"),ft=Object(f["a"])(ot,M,T,!1,null,"30ac3136",null),gt=ft.exports;v()(ft,{VBtn:j["a"],VCard:nt["a"],VCardActions:st["a"],VCardText:st["b"],VCol:it["a"],VContainer:rt["a"],VDatePicker:ct["a"],VDivider:lt["a"],VIcon:_["a"],VList:w["a"],VListItem:O["a"],VListItemIcon:ut["a"],VListItemSubtitle:x["b"],VMenu:V["a"],VRow:dt["a"],VSwitch:mt["a"],VTextField:pt["a"]}),o["a"].use($["a"]);var vt=[{path:"/",name:"Home",component:gt},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))}}],bt=new $["a"]({mode:"history",base:"/vue-lm-stats/",routes:vt}),ht=bt,jt=(a("99af"),"https://api.leerstandsmelder.de"),yt="".concat(jt);console.log("api",yt);var _t=s.a.create({baseURL:yt}),kt=_t,wt="https://api.leerstandsmelder.de",Ot={namespaced:!0,state:{status:"",regionId:localStorage.getItem("regionId")||"",regionData:localStorage.getItem("regionData")||"",region:{}},mutations:{region_request:function(t){t.status="loading"},region_register:function(t,e){t.status="registering",t.regionId=e},region_success:function(t,e){console.log("region_success",e.regionId),console.log("region_success",e.regionData),t.status="loaded",t.regionId=e.regionId,t.regionData=e.regionData},region_error:function(t){t.status="error"},region_logout:function(t){t.status="",t.regionId="",t.regionData=""},loadLocalregionId:function(t){localStorage.getItem("regionId")&&(t.regionId=localStorage.getItem("regionId"),t.status="restore")}},actions:{load:function(t){var e=t.dispatch,a=t.commit,o=t.state;console.log("load region action",o.regionId),a("loadLocalregionId"),e("set",{uuid:o.regionId})},set:function(t,e){var a=this,o=t.dispatch,n=t.commit;console.log("set region action",e);var s="".concat(wt,"/regions/").concat(e.uuid);return new Promise((function(t,e){n("region_request"),kt({url:s,method:"GET"}).then((function(e){console.log("set region resp",e),a.state.regionId=e.data.uuid,a.state.regionData=e.data,a.state.region=e,console.log("setregion",e.data),localStorage.setItem("regionId",e.data.uuid),n("region_success",{regionId:e.data.uuid,regionData:e.data}),o("locations/load",null,{root:!0}),t(e)})).catch((function(t){n("region_error"),localStorage.removeItem("regionId"),e(t)}))}))}},getters:{regionStatus:function(t){return t.status},getregionData:function(t){return t.regionData},getregionId:function(t){return t.regionId},getregion:function(t){return t.region}}},Lt=(a("e9c4"),"https://api.leerstandsmelder.de"),Dt={namespaced:!0,state:{status:"",regions:{},active:null},mutations:{regions_request:function(t){t.status="loading"},regions_register:function(t,e){t.status="registering",t.regions=e},regions_success:function(t,e){console.log("regions_success",e.regions),t.status="loaded",t.regions=e.regions},regions_error:function(t){t.status="error"},regions_logout:function(t){t.status="",t.regions=""},loadLocalRegions:function(t){localStorage.getItem("regions")&&(t.regions=localStorage.getItem("regions"),t.status="restore")},loadLocalActive:function(t){localStorage.getItem("active")?(t.active=JSON.parse(localStorage.getItem("active")),console.log("loadLocalActive: state.active",t.active)):console.log("state.active",t.active)}},actions:{load:function(t){var e=t.dispatch,a=t.commit,o=t.state;console.log("load regions action",o.regions),a("loadLocalRegions"),a("loadLocalActive"),e("set")},setActive:function(t,e){var a=t.commit;return new Promise((function(t){console.log("setActive",e),localStorage.setItem("active",JSON.stringify(e)),t(a("loadLocalActive"))}))},set:function(t,e){var a=this,o=t.commit;console.log("set regions action",e);var n="".concat(Lt,"/regions/");return new Promise((function(t,e){o("regions_request"),kt({url:n,method:"GET"}).then((function(e){console.log("set regions resp",e),a.state.regions=e.data.results,localStorage.setItem("regions",e.data.results),o("regions_success",{regions:e.data.results}),t(e)})).catch((function(t){console.log("regions_error catch",t.response),o("regions_error"),localStorage.removeItem("regions"),e(t)}))}))}},getters:{regionsStatus:function(t){return t.status},getRegions:function(t){return t.regions},getActive:function(t){return t.active}}},xt="https://api.leerstandsmelder.de",It={namespaced:!0,state:{status:"",locations:{},activeLocation:null},mutations:{locations_request:function(t){t.status="loading"},locations_register:function(t,e){t.status="registering",t.locations=e},locations_success:function(t,e){console.log("locations_success",e.locations),t.status="loaded",t.locations=e.locations},locations_grouped:function(t,e){},locations_error:function(t){t.status="error"},locations_logout:function(t){t.status="",t.locations=""},loadLocalLocations:function(t){localStorage.getItem("locations")&&(t.locations=localStorage.getItem("locations"),t.status="restore")},loadLocalActiveLocation:function(t){localStorage.getItem("activeLocation")?(t.activeLocation=JSON.parse(localStorage.getItem("activeLocation")),console.log("loadLocalActiveLocation: state.activeLocation",t.activeLocation)):console.log("state.activeLocation",t.activeLocation)}},actions:{load:function(t){var e=t.dispatch,a=t.commit,o=t.state;console.log("load locations action",o.locations),a("loadLocalLocations"),a("loadLocalActiveLocation"),e("set")},setActive:function(t,e){var a=t.commit;return new Promise((function(t){console.log("setActive",e),localStorage.setItem("activeLocation",JSON.stringify(e)),t(a("loadLocalActiveLocation"))}))},set:function(t,e){var a=this,o=t.commit;console.log("set locations action",e);var n="".concat(xt,"/regions/").concat(this.state.regionId,"/locations/");return new Promise((function(t,e){o("locations_request"),kt({url:n,method:"GET"}).then((function(e){console.log("set locations resp",e),a.state.locations=e.data.results,localStorage.setItem("locations",e.data.results),o("locations_success",{locations:e.data.results}),t(e)})).catch((function(t){console.log("locations_error catch",t.response),o("locations_error"),localStorage.removeItem("locations"),e(t)}))}))}},getters:{locationsStatus:function(t){return t.status},getLocations:function(t){return t.locations},getActive:function(t){return t.activeLocation}}};o["a"].use(d["a"]);var St=new d["a"].Store({state:{},mutations:{},actions:{},modules:{region:Ot,regions:Dt,locations:It}}),Vt=(a("5363"),a("f309")),Ct=a("fcf4");o["a"].use(Vt["a"]);var At=new Vt["a"]({icons:{iconfont:"mdi"},theme:{dark:!1,themes:{light:{primary:"#ED1C24",secondary:Ct["a"].orange.lighten4,accent:Ct["a"].orange.base,error:"#D32F2F",info:"#2196F3",success:"#5ED5BA",warning:"#ED1C24"},dark:{primary:"#ED1C24",secondary:Ct["a"].orange.lighten4,accent:Ct["a"].orange.base}}},options:{customProperties:!0}}),zt=a("2699"),Et=a("a40a"),Pt=a("4e2b"),$t=a("ea97"),Mt=a("31dc"),Tt=a("f60f");a("6cc5");o["a"].component("l-map",zt["a"]),o["a"].component("l-tile-layer",Et["a"]),o["a"].component("l-marker",Pt["a"]),o["a"].component("l-circle-marker",$t["a"]),o["a"].component("l-tooltip",Mt["a"]),o["a"].component("l-popup",Tt["a"]),o["a"].config.productionTip=!1,new o["a"]({router:ht,store:St,vuetify:At,render:function(t){return t(E)}}).$mount("#app")},"5e09":function(t,e,a){},"8faf":function(t,e,a){t.exports=a.p+"img/logo_cropped_alt.b0381302.png"}});
//# sourceMappingURL=app.ee3069fc.js.map