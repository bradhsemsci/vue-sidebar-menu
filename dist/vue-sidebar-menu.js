!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define(["vue"],t):"object"==typeof exports?exports["vue-sidebar-menu"]=t(require("vue")):e["vue-sidebar-menu"]=t(e.vue)}(this,(function(e){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=5)}([function(e,t,i){},function(e,t,i){var n=i(3);e.exports=d,e.exports.parse=s,e.exports.compile=function(e,t){return r(s(e,t))},e.exports.tokensToFunction=r,e.exports.tokensToRegExp=m;var o=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function s(e,t){for(var i,n=[],s=0,l=0,r="",u=t&&t.delimiter||"/";null!=(i=o.exec(e));){var c=i[0],m=i[1],d=i.index;if(r+=e.slice(l,d),l=d+c.length,m)r+=m[1];else{var p=e[l],f=i[2],v=i[3],b=i[4],g=i[5],w=i[6],_=i[7];r&&(n.push(r),r="");var C=null!=f&&null!=p&&p!==f,y="+"===w||"*"===w,I="?"===w||"*"===w,x=i[2]||u,S=b||g;n.push({name:v||s++,prefix:f||"",delimiter:x,optional:I,repeat:y,partial:C,asterisk:!!_,pattern:S?h(S):_?".*":"[^"+a(x)+"]+?"})}}return l<e.length&&(r+=e.substr(l)),r&&n.push(r),n}function l(e){return encodeURI(e).replace(/[\/?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}function r(e){for(var t=new Array(e.length),i=0;i<e.length;i++)"object"==typeof e[i]&&(t[i]=new RegExp("^(?:"+e[i].pattern+")$"));return function(i,o){for(var s="",r=i||{},a=(o||{}).pretty?l:encodeURIComponent,h=0;h<e.length;h++){var u=e[h];if("string"!=typeof u){var c,m=r[u.name];if(null==m){if(u.optional){u.partial&&(s+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(n(m)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(m)+"`");if(0===m.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var d=0;d<m.length;d++){if(c=a(m[d]),!t[h].test(c))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(c)+"`");s+=(0===d?u.prefix:u.delimiter)+c}}else{if(c=u.asterisk?encodeURI(m).replace(/[?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})):a(m),!t[h].test(c))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+c+'"');s+=u.prefix+c}}else s+=u}return s}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function h(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function u(e,t){return e.keys=t,e}function c(e){return e.sensitive?"":"i"}function m(e,t,i){n(t)||(i=t||i,t=[]);for(var o=(i=i||{}).strict,s=!1!==i.end,l="",r=0;r<e.length;r++){var h=e[r];if("string"==typeof h)l+=a(h);else{var m=a(h.prefix),d="(?:"+h.pattern+")";t.push(h),h.repeat&&(d+="(?:"+m+d+")*"),l+=d=h.optional?h.partial?m+"("+d+")?":"(?:"+m+"("+d+"))?":m+"("+d+")"}}var p=a(i.delimiter||"/"),f=l.slice(-p.length)===p;return o||(l=(f?l.slice(0,-p.length):l)+"(?:"+p+"(?=$))?"),l+=s?"$":o&&f?"":"(?="+p+"|$)",u(new RegExp("^"+l,c(i)),t)}function d(e,t,i){return n(t)||(i=t||i,t=[]),i=i||{},e instanceof RegExp?function(e,t){var i=e.source.match(/\((?!\?)/g);if(i)for(var n=0;n<i.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return u(e,t)}(e,t):n(e)?function(e,t,i){for(var n=[],o=0;o<e.length;o++)n.push(d(e[o],t,i).source);return u(new RegExp("(?:"+n.join("|")+")",c(i)),t)}(e,t,i):function(e,t,i){return m(s(e,i),t,i)}(e,t,i)}},function(t,i){t.exports=e},function(e,t){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},function(e,t,i){"use strict";var n=i(0);i.n(n).a},function(e,t,i){"use strict";i.r(t),i.d(t,"SidebarMenu",(function(){return w}));var n=i(1),o=i.n(n),s=i(2);function l(e,t,i,n,o,s,l,r){var a,h="function"==typeof e?e.options:e;if(t&&(h.render=t,h.staticRenderFns=i,h._compiled=!0),n&&(h.functional=!0),s&&(h._scopeId="data-v-"+s),l?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(l)},h._ssrRegister=a):o&&(a=r?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(h.functional){h._injectStyles=a;var u=h.render;h.render=function(e,t){return a.call(t),u(e,t)}}else{var c=h.beforeCreate;h.beforeCreate=c?[].concat(c,a):[a]}return{exports:e,options:h}}var r=l(new(i.n(s).a)({props:{pollInterval:{type:Number,default:300}},data:function(){return{urlPoller:void 0,hash:null,href:null,host:null,hostname:null,origin:null,pathname:null,port:null,protocol:null,search:null,listeners:[]}},created:function(){var e=this;this.pollInterval&&(this.urlPoller=setInterval((function(){e.href!==window.location.href&&e.locationChanged()}),this.pollInterval)),window.addEventListener("hashchange",this.locationChanged),this.locationChanged()},destroyed:function(){this.urlPoller&&clearInterval(this.urlPoller),window.removeEventListener("hashchange",this.locationChanged)},methods:{locationChanged:function(){this.hash=window.location.hash,this.href=window.location.href,this.host=window.location.host,this.hostname=window.location.hostname,this.origin=window.location.origin,this.pathname=window.location.pathname,this.port=window.location.port,this.protocol=window.location.protocol,this.search=window.location.search,this.listeners.forEach((function(e){return e()}))},addChangeListener:function(e){this.listeners.push(e)},removeChangeListener:function(e){var t=this.listeners.indexOf(e);-1!==t&&this.listeners.splice(t,1)}}}),void 0,void 0,!1,null,null,null);r.options.__file="LocationWatcher.vue";var a=r.exports,h={data:function(){return{itemShow:!1,itemHover:!1,location:null}},created:function(){a.addChangeListener(this.onLocationChanged),this.onLocationChanged()},destroyed:function(){a.removeChangeListener(this.onLocationChanged)},methods:{onLocationChanged:function(){this.location={href:a.href,pathname:a.pathname,hash:a.hash,search:a.search},this.initShowState()},isShowActive:function(e){var t=this;return this.activeShow===e||e.child&&e.child.some((function(e){return t.isShowActive(e)}))},isLinkActive:function(e){return this.matchRoute(e)||this.isChildActive(e.child)||this.isAliasActive(e)},isLinkExactActive:function(e){return this.matchExactRoute(e.href)},isChildActive:function(e){var t=this;return!!e&&e.some((function(e){return t.isLinkActive(e)}))},isAliasActive:function(e){if(e.alias){var t=this.useVueRouter?this.$route.fullPath:this.location.pathname+this.location.search+this.location.hash;return Array.isArray(e.alias)?e.alias.some((function(e){return o()(e).test(t)})):o()(e.alias).test(t)}return!1},matchRoute:function(e){var t=e.href,i=e.exactPath;if(!t)return!1;if(this.useVueRouter){var n=this.$router.resolve(t).route;return i?n.path===this.$route.path:this.matchExactRoute(t)}return i?t===this.location.pathname||t===this.location.pathname+"/":this.matchExactRoute(t)},matchExactRoute:function(e){return!!e&&(this.useVueRouter?this.$router.resolve(e).route.fullPath===this.$route.fullPath:e===this.location.pathname+this.location.search+this.location.hash||e===this.location.pathname+"/"+this.location.search+this.location.hash)},clickEvent:function(e){if(!this.item.disabled){if(this.emitItemClick(e,this.item,this),this.isPopout&&!this.isMobileItem){if(this.mobileItem&&this.mobileItem===this.item||this.emitSetMobileItem({item:this.item,itemEl:e.currentTarget.offsetParent}),this.hover||this.item.child)return;this.emitUnsetMobileItem(!0)}!this.item.child||this.item.href&&!this.exactActive||(this.showOneChild?this.activeShow===this.item?this.emitActiveShow(null):this.emitActiveShow(this.item):this.itemShow=!this.itemShow)}},initShowState:function(){!this.item.child||this.showChild||this.item.isPopout||(this.showOneChild?this.active?(this.emitActiveShow(this.item),this.itemShow=!0):this.item===this.activeShow&&(this.emitActiveShow(null),this.itemShow=!1):this.active&&(this.itemShow=!0))},mouseEnterEvent:function(e){e.stopPropagation(),this.item.disabled||(this.itemHover||this.isMobileItem||this.isMobileItemChild||this.mobileItem===this.item||this.emitUnsetMobileItem(),this.itemHover=!0,this.hover||!this.isPopout||this.isMobileItem||this.isMobileItemChild||this.emitSetMobileItem({item:this.item,itemEl:e.currentTarget}))},mouseLeaveEvent:function(e){e.stopPropagation(),this.itemHover=!1},emitSetMobileItem:function(e){var t=e.item,i=e.itemEl;this.$emit("set-mobile-item",{item:t,itemEl:i})},emitUnsetMobileItem:function(e){this.$emit("unset-mobile-item",e)}},computed:{useVueRouter:function(){return this.$router&&!this.disableVueRouter},isRouterLink:function(){return!0===(this.useVueRouter&&this.item&&void 0!==this.item.href&&!this.item.external)},isFirstLevel:function(){return 1===this.level},isPopout:function(){return this.isCollapsed&&this.isFirstLevel||this.item.isPopout&&!this.isMobileItemChild},show:function(){return!!this.item.child&&(!(!this.showChild&&!this.isMobileItem)||this.itemShow)},itemLinkClass:function(){return["vsm--link",this.isMobileItem?"":"vsm--link_level-"+this.level,{"vsm--link_mobile-item":this.isMobileItem},{"vsm--link_hover":this.hover},{"vsm--link_active":this.active},{"vsm--link_exact-active":this.exactActive},{"vsm--link_disabled":this.item.disabled},this.item.class]},itemClass:function(){return["vsm--item",{"vsm--item_open":this.show},this.isMobileItem?"":"vsm--item_level-"+this.level,{"vsm--item_mobile-item":this.isMobileItem},{"vsm--item_hover":this.hover},{"vsm--item_disabled":this.item.disabled},this.item.class]},isItemHidden:function(){return this.isCollapsed?!(!this.item.hidden||void 0!==this.item.hiddenOnCollapse)||!0===this.item.hiddenOnCollapse:!0===this.item.hidden},itemLinkHref:function(){return!this.item.href||this.item.disabled?null:this.item.href},hover:function(){return this.isPopout?this.item===this.mobileItem:this.itemHover},itemLinkTag:function(){return this.itemLinkHref?this.isRouterLink?"router-link":"a":"span"},active:function(){return this.isLinkActive(this.item)},exactActive:function(){return this.isLinkExactActive(this.item)}},watch:{item:function(e,t){this.emitItemUpdate(e,t)},activeShow:function(){this.itemShow=this.isShowActive(this.item)}},inject:["emitActiveShow","emitItemClick","emitItemUpdate"]},u={methods:{expandEnter:function(e){e.style.height=e.scrollHeight+"px"},expandAfterEnter:function(e){e.style.height="auto"},expandBeforeLeave:function(e){this.isPopout?e.style.display="none":e.style.height=e.scrollHeight+"px"}}},c=l({name:"SidebarMenuLink",props:{tag:{type:String,default:""},href:{type:[String,Object],default:""},disabled:{type:Boolean,default:!1},attributes:{type:Object,default:null}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.tag,e._b({tag:"component",attrs:{tabindex:e.disabled?-1:0,role:"link"},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.$parent.clickEvent(t)}}},"component",["router-link"===e.tag?{to:e.href}:{href:e.href},e.attributes],!1),[e._t("default")],2)}),[],!1,null,null,null);c.options.__file="SidebarMenuLink.vue";var m=c.exports,d=l({name:"SidebarMenuIcon",props:{icon:{type:[String,Object],default:""}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.icon.element?e.icon.element:"i",e._b({tag:"component",staticClass:"vsm--icon",class:"string"==typeof e.icon||e.icon instanceof String?e.icon:e.icon.class},"component",e.icon.attributes,!1),[e._v("\n  "+e._s(e.icon.text)+"\n")])}),[],!1,null,null,null);d.options.__file="SidebarMenuIcon.vue";var p=d.exports,f=l({name:"SidebarMenuBadge",props:{badge:{type:Object,default:function(){}}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.badge.element?e.badge.element:"span",e._b({tag:"component",staticClass:"vsm--badge",class:e.badge.class},"component",e.badge.attributes,!1),[e._v("\n  "+e._s(e.badge.text)+"\n")])}),[],!1,null,null,null);f.options.__file="SidebarMenuBadge.vue";var v=l({name:"SidebarMenuItem",components:{SidebarMenuLink:m,SidebarMenuIcon:p,SidebarMenuBadge:f.exports},mixins:[h,u],props:{item:{type:Object,required:!0},level:{type:Number,default:1},isCollapsed:{type:Boolean},isMobileItem:{type:Boolean,default:!1},isMobileItemChild:{type:Boolean,default:!1},mobileItem:{type:Object,default:null},activeShow:{type:Object,default:null},showChild:{type:Boolean,default:!1},showOneChild:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},disableHover:{type:Boolean,default:!1},mobileItemStyle:{type:Object,default:null},useLocationPolling:{type:Boolean,default:!1},disableVueRouter:{type:Boolean,default:!1}}},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.item.component&&!e.isItemHidden?i(e.item.component,e._b({tag:"component"},"component",e.item.props,!1)):e.item.header&&!e.isItemHidden?i("div",e._b({staticClass:"vsm--header",class:e.item.class},"div",e.item.attributes,!1),[e._v("\n  "+e._s(e.item.title)+"\n")]):e.isItemHidden?e._e():i("div",e._g({class:e.itemClass,on:{mouseout:e.mouseLeaveEvent}},e.disableHover&&e.isCollapsed?{click:e.mouseEnterEvent}:{mouseover:e.mouseEnterEvent}),[i("sidebar-menu-link",{class:e.itemLinkClass,attrs:{tag:e.itemLinkTag,href:e.itemLinkHref,disabled:e.item.disabled,attributes:e.item.attributes},nativeOn:{click:function(t){return e.clickEvent(t)}}},[e.item.icon&&!e.isMobileItem?i("sidebar-menu-icon",{attrs:{icon:e.item.icon}}):e._e(),e._v(" "),i("transition",{attrs:{name:"fade-animation",appear:e.isMobileItem}},[e.isCollapsed&&!e.isFirstLevel||!e.isCollapsed||e.isMobileItem?[i("span",{staticClass:"vsm--title"},[e._v(e._s(e.item.title))])]:e._e()],2),e._v(" "),e.isCollapsed&&!e.isFirstLevel||!e.isCollapsed||e.isMobileItem?[e.item.badge?i("sidebar-menu-badge",{attrs:{badge:e.item.badge}}):e._e(),e._v(" "),e.item.child?i("div",{staticClass:"vsm--arrow",class:[{"vsm--arrow_open":e.show},{"vsm--arrow_slot":e.$slots["dropdown-icon"]}]},[e._t("dropdown-icon")],2):e._e()]:e._e()],2),e._v(" "),e.item.child?[e.isCollapsed&&!e.isFirstLevel||!e.isCollapsed||e.isMobileItem?[i("transition",{attrs:{appear:e.isMobileItem,name:"expand"},on:{enter:e.expandEnter,afterEnter:e.expandAfterEnter,beforeLeave:e.expandBeforeLeave}},[e.show?i("div",{staticClass:"vsm--dropdown",class:e.isMobileItem&&"vsm--dropdown_mobile-item",style:e.isMobileItem&&e.mobileItemStyle.dropdown},[i("div",{staticClass:"vsm--list"},e._l(e.item.child,(function(t,n){return i("sidebar-menu-item",{key:n,attrs:{item:t,level:e.level+1,"active-show":e.activeShow,"show-one-child":e.showOneChild,"show-child":e.showChild,rtl:e.rtl,"is-collapsed":e.isCollapsed,"use-location-polling":e.useLocationPolling,"disable-vue-router":e.disableVueRouter,"is-mobile-item-child":e.isMobileItemChild||e.isMobileItem},on:{"set-mobile-item":e.emitSetMobileItem,"unset-mobile-item":e.emitUnsetMobileItem}},[e._t("dropdown-icon",null,{slot:"dropdown-icon"})],2)})),1)]):e._e()])]:e._e()]:e._e()],2)}),[],!1,null,null,null);v.options.__file="SidebarMenuItem.vue";var b={name:"SidebarMenu",components:{SidebarMenuItem:v.exports},mixins:[u],props:{menu:{type:Array,required:!0},collapsed:{type:Boolean,default:!1},width:{type:String,default:"350px"},widthCollapsed:{type:String,default:"50px"},showChild:{type:Boolean,default:!1},theme:{type:String,default:""},showOneChild:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},relative:{type:Boolean,default:!1},hideToggle:{type:Boolean,default:!1},disableHover:{type:Boolean,default:!1},useLocationPolling:{type:Boolean,default:!1},disableVueRouter:{type:Boolean,default:!1}},data:function(){return{isCollapsed:this.collapsed,mobileItem:null,mobileItemPos:0,mobileItemHeight:0,mobileItemTimeout:null,activeShow:null,parentHeight:0,parentWidth:0,parentOffsetTop:0,parentOffsetLeft:0}},computed:{sidebarWidth:function(){return this.isCollapsed?this.widthCollapsed:this.width},sidebarClass:function(){return[this.isCollapsed?"vsm_collapsed":"vsm_expanded",this.theme?"vsm_"+this.theme:"",this.rtl?"vsm_rtl":"",this.relative?"vsm_relative":""]},mobileItemStyle:function(){return{item:[{position:"absolute"},{top:this.mobileItemPos+"px"},this.rtl?{right:"0px"}:{left:"0px"},this.rtl?{"padding-right":this.sidebarWidth}:{"padding-left":this.sidebarWidth},this.rtl&&{direction:"rtl"},{width:window.innerWidth+"px"},this.isCollapsed?{"max-width":this.width}:{"max-width":"calc("+this.width+"*2 - "+this.widthCollapsed+")"}],dropdown:[{position:"absolute"},{top:this.mobileItemHeight+"px"},{width:window.innerWidth+"px"},{"max-width":"calc("+this.width+" - "+this.widthCollapsed+")"},{"max-height":this.parentHeight-(this.mobileItemPos+this.mobileItemHeight)-this.parentOffsetTop+"px"},{"overflow-y":"auto"}],background:[{position:"absolute"},{top:"0px"},{left:"0px"},{right:"0px"},{width:"100%"},{height:this.mobileItemHeight+"px"}]}}},watch:{collapsed:function(e){this.isCollapsed!==this.collapsed&&(this.isCollapsed=e,this.unsetMobileItem())}},methods:{onMouseLeave:function(){this.unsetMobileItem()},onToggleClick:function(){this.isCollapsed=!this.isCollapsed,this.unsetMobileItem(),this.$emit("toggle-collapse",this.isCollapsed)},onActiveShow:function(e){this.activeShow=e},onItemClick:function(e,t,i){this.$emit("item-click",e,t,i)},setMobileItem:function(e){var t=this,i=e.item,n=e.itemEl;if(this.mobileItem!==i){var o=this.$el.getBoundingClientRect().top,s=n.getBoundingClientRect().top,l=n.children[0],r=window.getComputedStyle(n),a=parseFloat(r.paddingTop),h=parseFloat(r.marginTop),u=l.offsetHeight,c=s-o+a+h;this.unsetMobileItem(),this.$nextTick((function(){t.initParentOffsets(),t.mobileItem=i,t.mobileItemPos=c,t.mobileItemHeight=u}))}},unsetMobileItem:function(e){var t=this;this.mobileItemTimeout&&clearTimeout(this.mobileItemTimeout),e?this.mobileItemTimeout=setTimeout((function(){t.mobileItem=null}),600):this.mobileItem=null},initParentOffsets:function(){var e=this.$el.getBoundingClientRect(),t=e.top,i=e.left,n=e.right,o=this.relative?this.$el.parentElement:document.documentElement;if(this.parentHeight=o.clientHeight,this.parentWidth=o.clientWidth,this.relative){var s=o.getBoundingClientRect(),l=s.top,r=s.left;this.parentOffsetTop=t-(l+o.clientTop),this.parentOffsetLeft=this.rtl?this.parentWidth-n+(r+o.clientLeft):i-(r+o.clientLeft)}else this.parentOffsetTop=t,this.parentOffsetLeft=this.rtl?this.parentWidth-n:i},onItemUpdate:function(e,t){t===this.mobileItem&&(this.mobileItem=e),t===this.activeShow&&(this.activeShow=e)}},provide:function(){return{emitActiveShow:this.onActiveShow,emitItemClick:this.onItemClick,emitItemUpdate:this.onItemUpdate}}},g=(i(4),l(b,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"v-sidebar-menu",class:e.sidebarClass,style:[{"max-width":e.sidebarWidth}],on:{mouseleave:e.onMouseLeave}},[e._t("header"),e._v(" "),i("div",{staticClass:"vsm--scroll-wrapper",style:e.isCollapsed&&[e.rtl?{"margin-left":"-17px"}:{"margin-right":"-17px"}]},[i("div",{staticClass:"vsm--list",style:e.isCollapsed&&{width:e.widthCollapsed}},e._l(e.menu,(function(t,n){return i("sidebar-menu-item",{key:n,attrs:{item:t,"is-collapsed":e.isCollapsed,"active-show":e.activeShow,"show-one-child":e.showOneChild,"show-child":e.showChild,rtl:e.rtl,"mobile-item":e.mobileItem,"disable-hover":e.disableHover,"use-location-polling":e.useLocationPolling,"disable-vue-router":e.disableVueRouter},on:{"set-mobile-item":e.setMobileItem,"unset-mobile-item":e.unsetMobileItem}},[e._t("dropdown-icon",null,{slot:"dropdown-icon"})],2)})),1),e._v(" "),e.mobileItem?i("div",{staticClass:"vsm--mobile-item",style:e.mobileItemStyle.item},[i("sidebar-menu-item",{attrs:{item:e.mobileItem,"is-mobile-item":!0,"mobile-item-style":e.mobileItemStyle,"is-collapsed":e.isCollapsed,"show-child":e.showChild,rtl:e.rtl,"use-location-polling":e.useLocationPolling,"disable-vue-router":e.disableVueRouter}},[e._t("dropdown-icon",null,{slot:"dropdown-icon"})],2),e._v(" "),i("transition",{attrs:{name:"slide-animation"}},[i("div",{staticClass:"vsm--mobile-bg",style:e.mobileItemStyle.background})])],1):e._e()]),e._v(" "),e._t("footer"),e._v(" "),e.hideToggle?e._e():i("button",{staticClass:"vsm--toggle-btn",class:{"vsm--toggle-btn_slot":e.$slots["toggle-icon"]},on:{click:e.onToggleClick}},[e._t("toggle-icon")],2)],2)}),[],!1,null,null,null));g.options.__file="SidebarMenu.vue";var w=g.exports;t.default={install:function(e){e.component("sidebar-menu",w)}}}])}));
//# sourceMappingURL=vue-sidebar-menu.js.map