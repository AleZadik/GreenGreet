(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{335:function(t,e,r){t.exports=r.p+"img/grgr.c63d1a0.png"},336:function(t,e,r){"use strict";var o={name:"CactusFooter"},n=r(30),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("footer",[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[r("p",[t._v("\n            Copyright © 2022\n            "),r("a",{attrs:{href:"https://github.com/AleZadik/GreenGreet"}},[t._v("Green Greet")]),t._v("\n            MIT LICENSE.\n          ")])])])])])])}],!1,null,null,null);e.a=component.exports},337:function(t,e,r){"use strict";var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"logo",attrs:{href:"/"}},[e("h3",[e("img",{attrs:{src:r(335),alt:""}})])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{staticClass:"menu-trigger"},[r("span",[t._v("Menu")])])}],n={props:{active:{type:String,default:"browse"}},data:function(){return{address:tronWeb.defaultAddress.base58}},components:{},methods:{}},c=r(30),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"header-area header-sticky"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-12"},[r("nav",{staticClass:"main-nav"},[t._m(0),t._v(" "),r("ul",{staticClass:"nav"},[r("li",[r("NuxtLink",{class:"browse"===t.active?"active":"",attrs:{to:"/browse"}},[t._v("Browse")])],1),t._v(" "),r("li",[r("NuxtLink",{class:"mint"===t.active?"active":"",attrs:{to:"/mint"}},[t._v("Mint")])],1),t._v(" "),r("li",[r("NuxtLink",{class:"users"===t.active?"active":"",attrs:{to:"/users"}},[t._v("All Users")])],1),t._v(" "),r("li",[r("NuxtLink",{class:"profile"===t.active?"active":"",attrs:{to:"/profile"}},[r("span",{attrs:{id:"connected"}},[t._v(t._s(t.address))]),t._v(" "),r("img",{staticStyle:{"background-color":"#000","border-radius":"50%",width:"30px",height:"30px"},attrs:{src:"https://robohash.org/"+t.address,alt:""}})])],1)]),t._v(" "),t._m(1)])])])])])}),o,!1,null,null,null);e.a=component.exports},338:function(t,e,r){var content=r(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("b40e0f2c",content,!0,{sourceMap:!1})},339:function(t,e,r){t.exports=r.p+"img/patternCactus.37dbdaa.png"},340:function(t,e,r){t.exports=r.p+"img/beach-cleanup-1.00bc691.png"},341:function(t,e,r){"use strict";r(338)},342:function(t,e,r){var o=r(32)(!1);o.push([t.i,".item[data-v-4c277aee]{box-shadow:0 10px 13px 0 rgba(0,0,0,.45)}.item[data-v-4c277aee]:hover{background-color:rgba(0,0,0,.5);color:#0ff;box-shadow:0 0 20px 1px rgba(45,255,196,.9)!important}.item:hover .nft-title[data-v-4c277aee]{color:#0ff}.item:hover img[data-v-4c277aee]{box-shadow:0 5px 10px 0 #004085}.item:hover .nft-subtitle[data-v-4c277aee],.item:hover .nft-subtitle[data-v-4c277aee]:hover{color:#fff}",""]),t.exports=o},344:function(t,e,r){"use strict";var o={name:"CactusProject",props:["project"],data:function(){return{actualProj:{meta:{file:""},stars:0}}},components:{},methods:{trim:function(){return this.project.meta.summary.substring(0,50)+"..."}},mounted:function(){this.actualProj=this.project,console.log(this.actualProj),this.stars=Math.round(this.actualProj.ESGSCORE/140)}},n=(r(341),r(30)),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"nftwrappers col-lg-3 col-sm-6"},[o("nuxt-link",{attrs:{to:{name:"project",params:{project:t.actualProj}}}},[o("div",{staticClass:"item"},["~"==t.actualProj.meta.file.substring(0,1)?o("img",{staticClass:"nft-image",attrs:{src:r(340)}}):o("img",{staticClass:"nft-image",attrs:{src:"https://"+t.actualProj.meta.file+".ipfs.nftstorage.link/",alt:""}}),t._v(" "),o("h4",{staticClass:"nft-title"},[t._v("\n        "+t._s(t.actualProj.name)+"\n        "),o("br"),t._v(" "),o("span",{staticClass:"nft-subtitle",staticStyle:{"font-size":"70%"}},[t._v("\n          "+t._s(t.trim(t.actualProj.meta.summary))+"\n        ")])]),t._v(" "),o("br"),t._v(" "),o("ul",{staticClass:"mt-2"},[o("li",{staticClass:"nft-sus"},[t._v("\n          "+t._s("ESG: "+this.actualProj.ESGSCORE)+"\n          "),o("i",{staticClass:"fa fa-leaf",style:t.stars>0?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>1?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>2?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>3?"color: green;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-leaf",style:t.stars>4?"color: green;":"color: gray;"})]),t._v(" "),o("li",{staticClass:"nft-pop"},[o("i",{staticClass:"fa fa-fire",style:t.stars>1?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>3?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>3?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>3?"color: orangered;":"color: gray;"}),t._v(" "),o("i",{staticClass:"fa fa-fire",style:t.stars>4?"color: orangered;":"color: gray;"})]),t._v(" "),2==t.actualProj.status?o("li",{staticClass:"nft-goal"},[t._v("\n          "+t._s(t.actualProj.totalFunds/Math.pow(10,6))+"/"+t._s(t.actualProj.entirePrice/Math.pow(10,6))+"\n          "),o("i",{staticClass:"fa fa-bullseye",staticStyle:{color:"red"}})]):1==t.actualProj.status?o("li",{staticClass:"nft-goal"},[t._v("\n          100% Funded\n          "),o("i",{staticClass:"fa fa-bullseye",staticStyle:{color:"red"}})]):t._e()])])])],1)}),[],!1,null,"4c277aee",null);e.a=component.exports},356:function(t,e,r){var content=r(375);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("457d591b",content,!0,{sourceMap:!1})},357:function(t,e,r){var content=r(377);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("494230eb",content,!0,{sourceMap:!1})},374:function(t,e,r){"use strict";r(356)},375:function(t,e,r){var o=r(32)(!1);o.push([t.i,".item[data-v-42511ca0]{box-shadow:0 10px 13px 0 #000}.item[data-v-42511ca0]:hover{background-color:rgba(0,0,0,.5);color:#0ff;box-shadow:0 0 20px 1px rgba(45,255,196,.9)!important}.item:hover .nft-title[data-v-42511ca0]{color:#0ff}.item:hover .nft-subtitle[data-v-42511ca0],.item:hover .nft-subtitle[data-v-42511ca0]:hover{color:#fff}.nft-title[data-v-42511ca0]{word-wrap:anywhere;align-self:center;text-align:center}.item[data-v-42511ca0]{background-color:#0e0f19}",""]),t.exports=o},376:function(t,e,r){"use strict";r(357)},377:function(t,e,r){var o=r(32)(!1);o.push([t.i,".most-popular .item ul{float:none;margin:0}.category-buttons{display:flex;flex-direction:row;justify-content:space-between;margin:0 0 1rem}.category-buttons button{width:20%;background-color:#fff;color:#000;border:3px solid #fff;border-radius:20px;font-size:1.2rem;padding:.5rem;margin:1rem}.category-buttons button:hover{background-color:hsla(0,0%,100%,.1);color:#fff;border:3px solid #000}.category-buttons button:focus{outline:none}",""]),t.exports=o},385:function(t,e,r){"use strict";r.r(e);var o=r(10),n=(r(40),r(336)),c=r(337),l=r(344),f=r(339),d=r.n(f),v={name:"CactusUser",props:{user:{type:Object,default:function(){}}},data:function(){return{backgroundImagePath:d.a,address:tronWeb.defaultAddress.base58}},components:{},methods:{}},m=(r(374),r(30)),_=Object(m.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"nftwrappers col-lg-3 col-sm-6"},[r("NuxtLink",{attrs:{to:"/profile"}},[r("div",{staticClass:"item"},[r("li",{staticStyle:{"text-align":"left",color:"#ffd700"}},[r("span",{staticStyle:{color:"#ffd700","margin-top":"0"}},[t._v("👑 - #"+t._s(t.user.rank))])]),t._v(" "),r("div",{staticClass:"nft-image",style:{backgroundImage:"url("+t.backgroundImagePath+")",backgroundSize:"cover",borderRadius:"50px"}},[r("img",{style:"border-radius: 23px;",attrs:{src:"https://robohash.org/"+t.user.address,alt:""}})]),t._v(" "),r("h4",{staticClass:"nft-title"},[t._v("\n          "+t._s(t.user.address)+"\n        "),r("br")]),t._v(" "),r("br"),t._v(" "),r("ul",[r("li",{staticStyle:{"text-align":"left",color:"#309050"}},[r("span",{staticStyle:{color:"#309050"}},[t._v("Points: "+t._s(t.user.points)+" pts 🌳")])]),t._v(" "),r("li",{staticStyle:{"text-align":"left",color:"#309050"}},[r("span",{staticStyle:{color:"#309050"}},[t._v("Projects Acquired: "+t._s(t.user.projectsAcquired))])]),t._v(" "),r("li",{staticStyle:{"text-align":"left",color:"#309050"}},[r("span",{staticStyle:{color:"#309050"}},[t._v("Projects Written: "+t._s(t.user.projectsWritten))])]),t._v(" "),r("li",{staticStyle:{"text-align":"left",color:"#309050"}},[r("span",{staticStyle:{color:"#309050"}},[t._v("# Donations: "+t._s(t.user.donations))])]),t._v(" "),r("li",{staticStyle:{"text-align":"left",color:"#309050"}},[r("span",{staticStyle:{color:"#309050"}},[t._v("# Spent: "+t._s(t.user.spent)+" TRX")])])])])])],1)}),[],!1,null,"42511ca0",null).exports,h=r(101),C={data:function(){return{users:[{address:"TRGV1Leawq4jAcuFTmEA3rrpqis2BW83TV",points:1500,projectsAcquired:5,projectsWritten:1,donations:200,spent:1200,rank:1},{address:"TUS3ZvhS3WjkU2noKjxGyFhMajPuWrWuXy",points:1200,projectsAcquired:2,projectsWritten:0,donations:200,spent:800,rank:2}],address:tronWeb.defaultAddress.base58}},components:{CactusNavbar:c.a,CactusProject:l.a,CactusFooter:n.a,CactusUser:_},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,o,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(h.f)(),e.next=3,Object(h.h)();case 3:return e.next=5,Object(h.e)(t.address);case 5:r=e.sent,o=0,r.donations.forEach((function(t){o+=t.amount/1e6})),n={address:r.userAddress,points:r.points,projectsAcquired:r.purchases.length,projectsWritten:r.projects.length,donations:r.donations.length,spent:o,rank:3},t.users.push(n);case 10:case"end":return e.stop()}}),e)})))()},methods:{}},y=(r(376),Object(m.a)(C,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("CactusNavbar",{attrs:{active:"users"}}),t._v(" "),r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[r("div",{staticClass:"page-content"},[r("div",{staticClass:"most-popular"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[t._m(0),t._v(" "),r("div",{staticClass:"row",attrs:{id:"project-list"}},t._l(t.users,(function(t){return r("CactusUser",{attrs:{user:t}})})),1)])])])])])])]),t._v(" "),r("CactusFooter")],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"heading-section"},[r("h4",[r("em",[t._v("Green User")]),t._v("\n                    Scoreboard\n                  ")])])}],!1,null,null,null));e.default=y.exports}}]);