(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{335:function(t,e,r){t.exports=r.p+"img/grgr.c63d1a0.png"},336:function(t,e,r){"use strict";var o={name:"CactusFooter"},c=r(30),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("footer",[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[r("p",[t._v("\n            Copyright © 2022\n            "),r("a",{attrs:{href:"https://github.com/AleZadik/GreenGreet"}},[t._v("Green Greet")]),t._v("\n            MIT LICENSE.\n          ")])])])])])])}],!1,null,null,null);e.a=component.exports},337:function(t,e,r){"use strict";var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"logo",attrs:{href:"/"}},[e("h3",[e("img",{attrs:{src:r(335),alt:""}})])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{staticClass:"menu-trigger"},[r("span",[t._v("Menu")])])}],c={props:{active:{type:String,default:"browse"}},data:function(){return{address:tronWeb.defaultAddress.base58}},components:{},methods:{}},n=r(30),component=Object(n.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"header-area header-sticky"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-12"},[r("nav",{staticClass:"main-nav"},[t._m(0),t._v(" "),r("ul",{staticClass:"nav"},[r("li",[r("NuxtLink",{class:"browse"===t.active?"active":"",attrs:{to:"/browse"}},[t._v("Browse")])],1),t._v(" "),r("li",[r("NuxtLink",{class:"mint"===t.active?"active":"",attrs:{to:"/mint"}},[t._v("Mint")])],1),t._v(" "),r("li",[r("NuxtLink",{class:"users"===t.active?"active":"",attrs:{to:"/users"}},[t._v("All Users")])],1),t._v(" "),r("li",[r("NuxtLink",{class:"profile"===t.active?"active":"",attrs:{to:"/profile"}},[r("span",{attrs:{id:"connected"}},[t._v(t._s(t.address))]),t._v(" "),r("img",{staticStyle:{"background-color":"#000","border-radius":"50%",width:"30px",height:"30px"},attrs:{src:"https://robohash.org/"+t.address,alt:""}})])],1)]),t._v(" "),t._m(1)])])])])])}),o,!1,null,null,null);e.a=component.exports},338:function(t,e,r){var content=r(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("b40e0f2c",content,!0,{sourceMap:!1})},340:function(t,e,r){t.exports=r.p+"img/beach-cleanup-1.00bc691.png"},341:function(t,e,r){"use strict";r(338)},342:function(t,e,r){var o=r(32)(!1);o.push([t.i,".item[data-v-4c277aee]{box-shadow:0 10px 13px 0 rgba(0,0,0,.45)}.item[data-v-4c277aee]:hover{background-color:rgba(0,0,0,.5);color:#0ff;box-shadow:0 0 20px 1px rgba(45,255,196,.9)!important}.item:hover .nft-title[data-v-4c277aee]{color:#0ff}.item:hover img[data-v-4c277aee]{box-shadow:0 5px 10px 0 #004085}.item:hover .nft-subtitle[data-v-4c277aee],.item:hover .nft-subtitle[data-v-4c277aee]:hover{color:#fff}",""]),t.exports=o},344:function(t,e,r){"use strict";var o={name:"CactusProject",props:["project"],data:function(){return{actualProj:{meta:{file:""},stars:0}}},components:{},methods:{trim:function(){return this.project.meta.summary.substring(0,50)+"..."}},mounted:function(){this.actualProj=this.project,console.log(this.actualProj),this.stars=Math.round(this.actualProj.ESGSCORE/140)}},c=(r(341),r(30)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"nftwrappers col-lg-3 col-sm-6"},[o("nuxt-link",{attrs:{to:{name:"project",params:{project:t.actualProj}}}},[o("div",{staticClass:"item"},["~"==t.actualProj.meta.file.substring(0,1)?o("img",{staticClass:"nft-image",attrs:{src:r(340)}}):o("img",{staticClass:"nft-image",attrs:{src:"https://"+t.actualProj.meta.file+".ipfs.nftstorage.link/",alt:""}}),t._v(" "),o("h4",{staticClass:"nft-title"},[t._v("\n        "+t._s(t.actualProj.name)+"\n        "),o("br"),t._v(" "),o("span",{staticClass:"nft-subtitle",staticStyle:{"font-size":"70%"}},[t._v("\n          "+t._s(t.trim(t.actualProj.meta.summary))+"\n        ")])]),t._v(" "),o("br"),t._v(" "),o("ul",{staticClass:"mt-2"},[o("li",{staticClass:"nft-sus"},[t._v("\n          "+t._s("ESG: "+this.actualProj.ESGSCORE)+"\n          "),o("i",{staticClass:"fa fa-leaf",style:t.stars>0?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>1?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>2?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>3?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>4?"color: green;":"color: gray;"})]),t._v(" "),o("li",{staticClass:"nft-pop"},[o("i",{staticClass:"fa fa-fire",style:t.stars>1?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>3?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>3?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>3?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>4?"color: orangered;":"color: gray;"})]),t._v(" "),2==t.actualProj.status?o("li",{staticClass:"nft-goal"},[t._v("\n          "+t._s(t.actualProj.totalFunds/Math.pow(10,6))+"/"+t._s(t.actualProj.entirePrice/Math.pow(10,6))+"\n          "),o("i",{staticClass:"fa fa-bullseye",staticStyle:{color:"red"}})]):1==t.actualProj.status?o("li",{staticClass:"nft-goal"},[t._v("\n          100% Funded\n          "),o("i",{staticClass:"fa fa-bullseye",staticStyle:{color:"red"}})]):t._e()])])])],1)}),[],!1,null,"4c277aee",null);e.a=component.exports},348:function(t,e,r){var content=r(360);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("d56a4730",content,!0,{sourceMap:!1})},349:function(t,e,r){var content=r(362);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("aed097d0",content,!0,{sourceMap:!1})},359:function(t,e,r){"use strict";r(348)},360:function(t,e,r){var o=r(32)(!1);o.push([t.i,".row[data-v-4bd7d0a4]{margin-left:0;margin-right:0}",""]),t.exports=o},361:function(t,e,r){"use strict";r(349)},362:function(t,e,r){var o=r(32)(!1);o.push([t.i,".most-popular .item ul{float:none;margin:0}.category-buttons{display:flex;flex-direction:row;justify-content:space-between;margin:0 0 1rem}.category-buttons button{width:20%;background-color:#fff;color:#000;border:3px solid #fff;border-radius:20px;font-size:1.2rem;padding:.5rem;margin:1rem}.category-buttons button:hover{background-color:hsla(0,0%,100%,.1);color:#fff;border:3px solid #000}.category-buttons button:focus{outline:none}",""]),t.exports=o},387:function(t,e,r){"use strict";r.r(e);var o=r(10),c=(r(40),r(336)),n=r(337),l=r(344),f=r(129),d=r(101),v={data:function(){return{projects:[],loadingMsg:"Loading Project"}},components:{CactusNavbar:n.a,CactusProject:l.a,CactusFooter:c.a,LoadingOverlay:f.a},methods:{},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(d.f)(),setTimeout(Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.h)();case 2:return t.$store.commit("toggleLoading"),t.loadingMsg="Fetching all projects...",e.next=6,Object(d.d)();case 6:r=e.sent,t.$store.commit("toggleLoading"),t.projects=r,console.log("The total number of projects: "+r.length);case 10:case"end":return e.stop()}}),e)}))),50);case 2:case"end":return e.stop()}}),e)})))()},computed:{loading:function(){return this.$store.state.loading}}},m=(r(359),r(361),r(30)),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("CactusNavbar",{attrs:{active:"browse"}}),t._v(" "),r("LoadingOverlay",{attrs:{show:t.loading,loadingMsg:t.loadingMsg}}),t._v(" "),r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[r("div",{staticClass:"page-content"},[r("h1",{staticStyle:{color:"#0e0f19"}},[t._v("NFT list")]),t._v(" "),r("div",{staticClass:"most-popular"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[t._m(0),t._v(" "),r("div",{staticClass:"row",attrs:{id:"project-list"}},t._l(t.projects,(function(t){return r("CactusProject",{attrs:{project:t}})})),1)])])])])])])]),t._v(" "),r("CactusFooter")],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"heading-section"},[r("h4",[r("em",[t._v("Green Projects")]),t._v("\n                    Available\n                  ")])])}],!1,null,"4bd7d0a4",null);e.default=component.exports}}]);