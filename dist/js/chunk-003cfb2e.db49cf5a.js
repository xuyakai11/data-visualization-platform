(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-003cfb2e"],{5322:function(t,e,a){},"547e":function(t,e,a){"use strict";var i=a("5789"),n=a.n(i);n.a},5789:function(t,e,a){},"674a":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-spin",{attrs:{spinning:t.spinning,delayTime:"500"}},[a("header",[a("div",{staticClass:"header-left"},[t.titleNameEdit?a("a-input",{ref:"titleName",staticStyle:{width:"200px"},attrs:{value:t.titleName},on:{change:function(e){return t.titleNameEditFun(e.target.value)}}}):[t._v(t._s(t.titleName))],t.titleNameEdit?a("div",{staticClass:"header-icon"},[a("a-icon",{attrs:{type:"check"},on:{click:t.saveEditTitleName}}),a("a-icon",{attrs:{type:"close"},on:{click:t.cancelEditTitleName}})],1):a("div",{staticClass:"header-icon"},[a("a-icon",{attrs:{type:"edit"},on:{click:t.editTitleName}})],1)],2),a("div",{staticClass:"header-right"},[a("a-tag",{attrs:{color:"#108ee9"}},[a("a-icon",{attrs:{type:"plus"}}),t._v("添加组件")],1),a("a-tag",[a("a-icon",{attrs:{type:"setting"}})],1),a("a-tag",{attrs:{color:"#87d068"}},[t._v("完成")])],1)]),a("section",[a("div",{staticClass:"dashboardView"},[a("div",{staticClass:"layout-container"},[a("div",{staticClass:"gutter-example"},[a("a-row",{attrs:{gutter:8}},t._l(12,function(t,e){return a("a-col",{key:e,staticClass:"gutter-row",attrs:{span:2}},[a("div",{staticClass:"gutter-box"})])}),1)],1)])])])])],1)},n=[],c=a("d4ec"),s=a("bee2"),l=a("99de"),r=a("7e84"),u=a("262e"),o=(a("cadf"),a("551c"),a("097d"),a("9ab4")),d=a("60a3"),m=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(l["a"])(this,Object(r["a"])(e).apply(this,arguments)),t.spinning=!0,t.titleName="报表名称",t.titleNameEdit=!1,t.cancelTitleNameFlag="",t}return Object(u["a"])(e,t),Object(s["a"])(e,[{key:"created",value:function(){}},{key:"mounted",value:function(){var t=this;setTimeout(function(){t.spinning=!1},1e3)}},{key:"titleNameEditFun",value:function(t){this.titleName=t}},{key:"editTitleName",value:function(){this.titleNameEdit=!0,this.cancelTitleNameFlag=this.titleName}},{key:"saveEditTitleName",value:function(){this.titleNameEdit=!1}},{key:"cancelEditTitleName",value:function(){this.titleNameEdit=!1,this.titleName=this.cancelTitleNameFlag}}]),e}(d["d"]);m=o["a"]([d["a"]],m);var v=m,h=v,f=(a("547e"),a("895a"),a("2877")),N=Object(f["a"])(h,i,n,!1,null,"7f423120",null);e["default"]=N.exports},"895a":function(t,e,a){"use strict";var i=a("5322"),n=a.n(i);n.a}}]);