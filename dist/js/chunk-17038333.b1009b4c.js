(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17038333"],{"28a5":function(e,a,t){t("214f")("split",2,function(e,a,r){"use strict";var i=t("aae3"),o=r,n=[].push,s="split",c="length",l="lastIndex";if("c"=="abbc"[s](/(b)*/)[1]||4!="test"[s](/(?:)/,-1)[c]||2!="ab"[s](/(?:ab)*/)[c]||4!="."[s](/(.?)(.?)/)[c]||"."[s](/()()/)[c]>1||""[s](/.?/)[c]){var u=void 0===/()??/.exec("")[1];r=function(e,a){var t=String(this);if(void 0===e&&0===a)return[];if(!i(e))return o.call(t,e,a);var r,s,d,h,p,m=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),v=0,g=void 0===a?4294967295:a>>>0,y=new RegExp(e.source,f+"g");u||(r=new RegExp("^"+y.source+"$(?!\\s)",f));while(s=y.exec(t)){if(d=s.index+s[0][c],d>v&&(m.push(t.slice(v,s.index)),!u&&s[c]>1&&s[0].replace(r,function(){for(p=1;p<arguments[c]-2;p++)void 0===arguments[p]&&(s[p]=void 0)}),s[c]>1&&s.index<t[c]&&n.apply(m,s.slice(1)),h=s[0][c],v=d,m[c]>=g))break;y[l]===s.index&&y[l]++}return v===t[c]?!h&&y.test("")||m.push(""):m.push(t.slice(v)),m[c]>g?m.slice(0,g):m}}else"0"[s](void 0,0)[c]&&(r=function(e,a){return void 0===e&&0===a?[]:o.call(this,e,a)});return[function(t,i){var o=e(this),n=void 0==t?void 0:t[a];return void 0!==n?n.call(t,o,i):r.call(String(o),t,i)},r]})},"386d":function(e,a,t){t("214f")("search",1,function(e,a,t){return[function(t){"use strict";var r=e(this),i=void 0==t?void 0:t[a];return void 0!==i?i.call(t,r):new RegExp(t)[a](String(r))},t]})},"470f":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("a-card",{attrs:{title:e.reportName,bordered:!1}}),t("div",{staticClass:"reportTable",attrs:{id:"components-form-demo-advanced-search"}},[e.search.length?t("a-form",{staticClass:"ant-advanced-search-from",attrs:{layout:"inline",form:e.form},on:{submit:e.handleSearch}},[t("a-row",{attrs:{gutter:24}},e._l(e.search,function(a,r){return t("a-col",{key:r,attrs:{span:8}},[t("a-form-item",["string"===a.searchType?t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:[a.searchName,{rules:[{required:!1}]}],expression:"[item.searchName, { rules: [{ required: false}] }]"}],attrs:{placeholder:a.showTitle}}):e._e(),"num"===a.searchType?t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:[a.searchName,{rules:[{required:!1}]}],expression:"[item.searchName, { rules: [{ required: false}] }]"}],attrs:{placeholder:a.showTitle}}):e._e(),"select"===a.searchType?t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:[a.searchName,{rules:[{required:!1}]}],expression:"[item.searchName, { rules: [{ required: false}] }]"}],attrs:{showSearch:"",allowClear:"",filterOption:e.filterOption,placeholder:a.showTitle}},e._l(a.searchParam,function(a,r){return t("a-select-option",{key:r,attrs:{value:a.value}},[e._v(e._s(a.title))])}),1):e._e(),"checkbox"===a.searchType?t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:[a.searchName,{rules:[{required:!1}]}],expression:"[item.searchName, { rules: [{ required: false}] }]"}],attrs:{mode:"multiple",showSearch:"",allowClear:"",filterOption:e.filterOption,placeholder:a.showTitle}},e._l(a.searchParam,function(a,r){return t("a-select-option",{key:r,attrs:{value:a.value}},[e._v(e._s(a.title))])}),1):e._e(),"date"===a.searchType?t("a-range-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:[a.searchName,{rules:[{required:!1}]}],expression:"[item.searchName, { rules: [{ required: false}] }]"}],attrs:{placeholder:[a.showTitle+"开始",a.showTitle+"结束"],format:"YYYY-MM-DD"}}):e._e(),"datetime"===a.searchType?t("a-range-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:[a.searchName,{rules:[{required:!1}]}],expression:"[item.searchName, { rules: [{ required: false}] }]"}],attrs:{placeholder:[a.showTitle+"开始",a.showTitle+"结束"],showTime:{format:"HH:mm"},format:"YYYY-MM-DD HH:mm"}}):e._e()],1)],1)}),1),t("a-row",[t("a-col",{style:{textAlign:"right"},attrs:{span:24}},[t("a-button",{attrs:{type:"primary","html-type":"submit",loading:e.searchLoading}},[e._v("搜索")]),t("a-button",{style:{marginLeft:"8px"},on:{click:e.handleReset}},[e._v("重置")])],1)],1)],1):e._e(),t("div",{staticClass:"operation"},[t("a-row",[t("a-col",{style:{textAling:"right"},attrs:{span:24}},[t("a-button",{attrs:{type:"primary",htmlType:"button",loading:e.exportLoading},on:{click:function(a){return a.stopPropagation(),e.exportFile(a)}}},[e._v("导出")])],1)],1)],1),t("div",{staticClass:"search-result-list"},[t("a-table",{attrs:{scroll:{x:!0},columns:e.columns,dataSource:e.data,bordered:"",pagination:e.pagination,loading:e.loading,rowKey:function(e){return e.keyFlagId}},on:{change:e.onChangeTab}})],1)],1)],1)},i=[],o=(t("28a5"),t("be94")),n=(t("386d"),t("d4ec")),s=t("bee2"),c=t("99de"),l=t("7e84"),u=t("262e"),d=t("9ab4"),h=t("60a3"),p=function(e){function a(){var e;return Object(n["a"])(this,a),e=Object(c["a"])(this,Object(l["a"])(a).apply(this,arguments)),e.searchLoading=!1,e.loading=!0,e.modalBtn=!0,e.exportLoading=!1,e.reportName="报表详情",e.columns=[],e.data=[],e.search=[],e.reportId=0,e.pagination={current:1,pageSize:10,total:1},e.searchParam=[],e}return Object(u["a"])(a,e),Object(s["a"])(a,[{key:"beforeCreate",value:function(){this.form=this.$form.createForm(this)}},{key:"created",value:function(){this.reportId=this.$route.query.reportId||""}},{key:"mounted",value:function(){var e={reportId:this.reportId,searchParam:"",pageSize:10,nowpage:1};this.initDataFun(e)}},{key:"initDataFun",value:function(e){var a=this;this.loading=!0,this.$post("custom/Report/getReportDetail",e).then(function(e){if(2e3===e.state){a.loading=!1,a.columns=e.data.columns,a.data=e.data.data,a.search=e.data.search,a.data.map(function(e,a){e.keyFlagId=a});var t=Object(o["a"])({},a.pagination);t.total=e.data.count,a.pagination=t,a.reportName=e.data.reportName}else a.loading=!1,a.data=[],a.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?a.$message.error("请求超时",3):a.$message.error("请求失败",3),a.loading=!1,a.data=[]})}},{key:"filterOption",value:function(e,a){return a.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0}},{key:"handleReset",value:function(){this.searchParam=[],this.form.resetFields()}},{key:"handleSearch",value:function(e){var a=this;e.preventDefault(),this.searchParam=[],this.form.validateFields(function(e,t){a.search.map(function(e,r){var i=e.searchName.split(".")[0],o=e.searchName.split(".")[1],n="";if(e.searchName===i+"."+o){if(n=t[i][o]||"",t[i][o])if("datetime"===e.searchType){var s=t[i][o];n=s[0].format("YYYY-MM-DD HH:mm")+","+s[1].format("YYYY-MM-DD HH:mm")}else if("date"===e.searchType){var c=t[i][o];n=c[0].format("YYYY-MM-DD")+","+c[1].format("YYYY-MM-DD")}a.searchParam.push({logic:e.logic,name:e.searchName,search_type:e.searchType,search_param:n})}});var r=JSON.stringify(a.searchParam);if(!e){var i={reportId:a.reportId,searchParam:r,pageSize:10,nowpage:1};a.initDataFun(i)}})}},{key:"onChangeTab",value:function(e){var a=Object(o["a"])({},this.pagination);a.current=e.current,this.pagination=a;var t=JSON.stringify(this.searchParam)||"",r={reportId:this.reportId,searchParam:t,nowpage:e.current,pageSize:e.pageSize};this.initDataFun(r)}},{key:"exportFile",value:function(){var e=this.searchParam.length?JSON.stringify(this.searchParam):"";this.reportId;this.exportLoading=!0;var a=-1!==location.href.indexOf("test")?"http://test.report.pxjy.com":"http://report.staff.pxjy.com";window.open(a+"/custom/Report/exportReport?reportId="+this.reportId+"&searchParam="+e);var t=this;setTimeout(function(){t.exportLoading=!1},500)}}]),a}(h["d"]);p=d["a"]([Object(h["a"])({components:{}})],p);var m=p,f=m,v=(t("fa98"),t("2877")),g=Object(v["a"])(f,r,i,!1,null,null,null);a["default"]=g.exports},4851:function(e,a,t){},aae3:function(e,a,t){var r=t("d3f4"),i=t("2d95"),o=t("2b4c")("match");e.exports=function(e){var a;return r(e)&&(void 0!==(a=e[o])?!!a:"RegExp"==i(e))}},be94:function(e,a,t){"use strict";function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{},i=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.forEach(function(a){r(e,a,t[a])})}return e}t.d(a,"a",function(){return i})},fa98:function(e,a,t){"use strict";var r=t("4851"),i=t.n(r);i.a}}]);