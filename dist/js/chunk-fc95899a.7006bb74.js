(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc95899a"],{"0bfb":function(e,t,n){"use strict";var a=n("cb7c");e.exports=function(){var e=a(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"11e9":function(e,t,n){var a=n("52a7"),i=n("4630"),o=n("6821"),r=n("6a99"),s=n("69a8"),c=n("c69a"),l=Object.getOwnPropertyDescriptor;t.f=n("9e1e")?l:function(e,t){if(e=o(e),t=r(t,!0),c)try{return l(e,t)}catch(n){}if(s(e,t))return i(!a.f.call(e,t),e[t])}},"28a5":function(e,t,n){n("214f")("split",2,function(e,t,a){"use strict";var i=n("aae3"),o=a,r=[].push,s="split",c="length",l="lastIndex";if("c"=="abbc"[s](/(b)*/)[1]||4!="test"[s](/(?:)/,-1)[c]||2!="ab"[s](/(?:ab)*/)[c]||4!="."[s](/(.?)(.?)/)[c]||"."[s](/()()/)[c]>1||""[s](/.?/)[c]){var d=void 0===/()??/.exec("")[1];a=function(e,t){var n=String(this);if(void 0===e&&0===t)return[];if(!i(e))return o.call(n,e,t);var a,s,u,f,g,p=[],b=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,m=void 0===t?4294967295:t>>>0,v=new RegExp(e.source,b+"g");d||(a=new RegExp("^"+v.source+"$(?!\\s)",b));while(s=v.exec(n)){if(u=s.index+s[0][c],u>h&&(p.push(n.slice(h,s.index)),!d&&s[c]>1&&s[0].replace(a,function(){for(g=1;g<arguments[c]-2;g++)void 0===arguments[g]&&(s[g]=void 0)}),s[c]>1&&s.index<n[c]&&r.apply(p,s.slice(1)),f=s[0][c],h=u,p[c]>=m))break;v[l]===s.index&&v[l]++}return h===n[c]?!f&&v.test("")||p.push(""):p.push(n.slice(h)),p[c]>m?p.slice(0,m):p}}else"0"[s](void 0,0)[c]&&(a=function(e,t){return void 0===e&&0===t?[]:o.call(this,e,t)});return[function(n,i){var o=e(this),r=void 0==n?void 0:n[t];return void 0!==r?r.call(n,o,i):a.call(String(o),n,i)},a]})},3846:function(e,t,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"386d":function(e,t,n){n("214f")("search",1,function(e,t,n){return[function(n){"use strict";var a=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a):new RegExp(n)[t](String(a))},n]})},"3b2b":function(e,t,n){var a=n("7726"),i=n("5dbc"),o=n("86cc").f,r=n("9093").f,s=n("aae3"),c=n("0bfb"),l=a.RegExp,d=l,u=l.prototype,f=/a/g,g=/a/g,p=new l(f)!==f;if(n("9e1e")&&(!p||n("79e5")(function(){return g[n("2b4c")("match")]=!1,l(f)!=f||l(g)==g||"/a/i"!=l(f,"i")}))){l=function(e,t){var n=this instanceof l,a=s(e),o=void 0===t;return!n&&a&&e.constructor===l&&o?e:i(p?new d(a&&!o?e.source:e,t):d((a=e instanceof l)?e.source:e,a&&o?c.call(e):t),n?this:u,l)};for(var b=function(e){e in l||o(l,e,{configurable:!0,get:function(){return d[e]},set:function(t){d[e]=t}})},h=r(d),m=0;h.length>m;)b(h[m++]);u.constructor=l,l.prototype=u,n("2aba")(a,"RegExp",l)}n("7a56")("RegExp")},4917:function(e,t,n){n("214f")("match",1,function(e,t,n){return[function(n){"use strict";var a=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a):new RegExp(n)[t](String(a))},n]})},"52a7":function(e,t){t.f={}.propertyIsEnumerable},"5dbc":function(e,t,n){var a=n("d3f4"),i=n("8b97").set;e.exports=function(e,t,n){var o,r=t.constructor;return r!==n&&"function"==typeof r&&(o=r.prototype)!==n.prototype&&a(o)&&i&&i(e,o),e}},"6b54":function(e,t,n){"use strict";n("3846");var a=n("cb7c"),i=n("0bfb"),o=n("9e1e"),r="toString",s=/./[r],c=function(e){n("2aba")(RegExp.prototype,r,e,!0)};n("79e5")(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?c(function(){var e=a(this);return"/".concat(e.source,"/","flags"in e?e.flags:!o&&e instanceof RegExp?i.call(e):void 0)}):s.name!=r&&c(function(){return s.call(this)})},"7b22":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a-card",{attrs:{title:"模型管理",bordered:!1}}),n("div",{staticClass:"dataOrigin",attrs:{id:"components-form-demo-advanced-search"}},[n("div",{staticClass:"operation"},[n("a-row",[n("a-col",{style:{textAling:"right"},attrs:{span:24}},[n("a-button",{attrs:{type:"primary",htmlType:"button",loading:e.startBtnLoading,disabled:!e.hasSelected},on:{click:function(t){return e.changeState("start")}}},[e._v("启用")]),n("a-button",{attrs:{type:"primary",htmlType:"button",loading:e.forbidenBtnLoading,disabled:!e.hasSelected},on:{click:function(t){return e.changeState("forbiden")}}},[e._v("禁用")]),n("a-button",{attrs:{type:"primary",htmlType:"button"},on:{click:e.showModel}},[e._v("生成")])],1)],1)],1),n("div",{staticClass:"search-result-list"},[n("a-table",{attrs:{bordered:"",scroll:{x:!0},pagination:e.pagination,loading:e.loading,columns:e.columns,dataSource:e.data,rowSelection:{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange}},on:{change:e.onChange},scopedSlots:e._u([{key:"action",fn:function(t,a){return n("span",{},[n("a-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.editFun(t,a)}}},[e._v("编辑")]),n("a-divider",{attrs:{type:"vertical"}}),n("a-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.go(t,a)}}},[e._v("字段管理")]),n("a-divider",{attrs:{type:"vertical"}}),n("a-button",{attrs:{type:"primary",size:"small",loading:e.delBtnLoading},on:{click:function(t){return e.deleteFun(t,a)}}},[e._v("删除")])],1)}}])})],1),n("a-modal",{attrs:{visible:e.visible,title:e.modelTitle,okText:"确认",cancelText:"取消"},on:{cancel:e.handleCancel,ok:e.handleCreate}},[n("a-form",{attrs:{id:"collectionForm",form:e.modelForm}},[n("a-form-item",{attrs:{label:"模型名称",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["title",{initialValue:e.editDataEcho.title,rules:[{required:!0,message:"请输入数据库地址"}]}],expression:"['title', { initialValue: editDataEcho.title, rules: [{ required: true, message: '请输入数据库地址' }]}]"}],ref:"title",attrs:{placeholder:"模型名称"}})],1),n("a-form-item",{attrs:{label:"数据表",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[n("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["table",{initialValue:e.editDataEcho.table,rules:[{required:!0,message:"请选择数据表"}]}],expression:"['table', { initialValue: editDataEcho.table, rules: [{ required: true, message: '请选择数据表' }]}]"}],attrs:{disabled:e.selectDisabled,placeholder:"数据表",showSearch:"",optionFilterProp:"children",filterOption:e.filterOption}},e._l(e.dbDataTabSelect,function(t,a){return n("a-select-option",{key:a,attrs:{value:t}},[e._v(e._s(t))])}),1)],1)],1)],1)],1)],1)},i=[],o=(n("6b54"),n("be94")),r=n("d4ec"),s=n("bee2"),c=n("99de"),l=n("7e84"),d=n("262e"),u=n("9ab4"),f=n("60a3"),g=n("4bb5"),p=n("ff1a"),b=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.loading=!0,e.visible=!1,e.modelTitle="生成模型",e.modelCol={label:{span:8},wrapper:{span:12}},e.columns=[{title:"编号",dataIndex:"key"},{title:"标识",dataIndex:"name"},{title:"名称",dataIndex:"title"},{title:"创建时间",dataIndex:"create_time"},{title:"状态",dataIndex:"status"},{title:"操作",dataIndex:"",width:"30%",scopedSlots:{customRender:"action"}}],e.data=[],e.selectedRowKeys=[],e.selectedRows=[],e.reportId="",e.dbDataTabSelect=[],e.selectDisabled=!1,e.modelId="",e.editDataEcho={},e.delBtnLoading=!1,e.forbidenBtnLoading=!1,e.startBtnLoading=!1,e.pagination={current:1,pageSize:10,total:1},e}return Object(d["a"])(t,e),Object(s["a"])(t,[{key:"beforeCreate",value:function(){this.modelForm=this.$form.createForm(this)}},{key:"mounted",value:function(){this.reportId=Object(p["b"])("reportId")||"";var e={report_source_id:this.reportId,pageSize:10,nowpage:1};this.initDataFun(e),this.initDbTabFun()}},{key:"initDataFun",value:function(e){var t=this;this.loading=!0,this.$post("/custom/Modelcon/modelList",e).then(function(e){if(2e3===e.state){var n=Object(o["a"])({},t.pagination);t.loading=!1,n.total=e.data.count,t.data=e.data.data,t.pagination=n}else t.loading=!1,t.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?t.$message.error("请求超时",3):t.$message.error("请求失败",3),t.loading=!1,t.data=[]})}},{key:"initDbTabFun",value:function(){var e=this;this.$get("/custom/Modelcon/getTables",{report_source_id:this.reportId}).then(function(t){2e3===t.state?e.dbDataTabSelect=t.data:e.$message.error(t.message,3)}).catch(function(t){"ECONNABORTED"===t.code?e.$message.error("请求超时",3):e.$message.error("数据表请求失败",3)})}},{key:"onSelectChange",value:function(e,t){this.selectedRowKeys=e,this.selectedRows=t}},{key:"onChange",value:function(e){var t=Object(o["a"])({},this.pagination);t.current=e.current,this.pagination=t;var n={report_source_id:this.reportId,nowpage:e.current,pageSize:e.pageSize};this.initDataFun(n)}},{key:"showModel",value:function(){this.modelTitle="生成模型",this.visible=!0}},{key:"handleCancel",value:function(){this.visible=!1,this.selectDisabled=!1,this.modelId="",this.editDataEcho={},this.modelForm.resetFields()}},{key:"handleCreate",value:function(e){var t=this;e.preventDefault(),this.modelForm.validateFields(function(e,n){if(!e){var a=n;if(t.modelId){a.model_id=t.modelId,delete a.table;var i="/custom/Modelcon/doEdit";t.addEditModelFun(a,i)}else{a.report_source_id=t.reportId;var o="/custom/Modelcon/generate";t.addEditModelFun(a,o)}}})}},{key:"addEditModelFun",value:function(e,t){var n=this;this.$get(t,e).then(function(e){if(2e3===e.state){n.modelId="",n.editDataEcho={},n.modelForm.resetFields(),n.visible=!n.visible,n.$message.success(e.message,3);var t={report_source_id:n.reportId,nowpage:n.pagination.current,pageSize:n.pagination.pageSize};n.initDataFun(t)}else n.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?n.$message.error("请求超时",3):n.$message.error("请求失败",3)})}},{key:"filterOption",value:function(e,t){return t.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0}},{key:"editFun",value:function(e,t){this.visible=!this.visible,this.modelTitle="编辑模型",this.modelId=t.id,this.editDataEcho=t,this.selectDisabled=!0}},{key:"go",value:function(e,t){e.preventDefault(),this.$router.push({path:"/fieldManagement",query:{model_id:t.id}})}},{key:"deleteFun",value:function(e,t){e.preventDefault(),this.delBtnLoading=!this.delBtnLoading;var n={model_id:t.id,type:"del"};this.showConfirm("提示","确认要删除该模型么？",n)}},{key:"changeState",value:function(e){var t={},n="";"forbiden"===e?(this.forbidenBtnLoading=!this.forbidenBtnLoading,n="确认要禁用该模型么？",t={model_id:this.selectedRowKeys.toString(),type:"forbiden"}):"start"===e&&(this.startBtnLoading=!this.startBtnLoading,n="确认要启用该模型么？",t={model_id:this.selectedRowKeys.toString(),type:"start"}),this.showConfirm("提示",n,t)}},{key:"showConfirm",value:function(e,t,n){var a=this;this.$confirm({title:e,content:t,okType:"danger",okText:"确认",cancelText:"取消",onOk:function(){a.changeStateFun(n)},onCancel:function(){"del"===n.type?a.delBtnLoading=!a.delBtnLoading:"start"===n.type?a.startBtnLoading=!a.startBtnLoading:"forbiden"===n.type&&(a.forbidenBtnLoading=!a.forbidenBtnLoading)}})}},{key:"changeStateFun",value:function(e){var t=this;this.$get("custom/Modelcon/ChangeStatus",e).then(function(n){if(2e3===n.state){var a={report_source_id:t.reportId,nowpage:t.pagination.current,pageSize:t.pagination.pageSize};t.initDataFun(a),t.$message.success(n.message,3),"del"===e.type?t.delBtnLoading=!t.delBtnLoading:"start"===e.type?t.startBtnLoading=!t.startBtnLoading:"forbiden"===e.type&&(t.forbidenBtnLoading=!t.forbidenBtnLoading)}else"del"===e.type?t.delBtnLoading=!t.delBtnLoading:"start"===e.type?t.startBtnLoading=!t.startBtnLoading:"forbiden"===e.type&&(t.forbidenBtnLoading=!t.forbidenBtnLoading),t.$message.error(n.message,3)}).catch(function(n){"del"===e.type?t.delBtnLoading=!t.delBtnLoading:"start"===e.type?t.startBtnLoading=!t.startBtnLoading:"forbiden"===e.type&&(t.forbidenBtnLoading=!t.forbidenBtnLoading),"ECONNABORTED"===n.code?t.$message.error("请求超时",3):t.$message.error("删除失败",3)})}},{key:"hasSelected",get:function(){return this.selectedRowKeys.length>0}}]),t}(f["d"]);u["a"]([g["a"]],b.prototype,"changeOpenKeys",void 0),b=u["a"]([Object(f["a"])({components:{}})],b);var h=b,m=h,v=(n("93b5"),n("2877")),y=Object(v["a"])(m,a,i,!1,null,"7760879b",null);t["default"]=y.exports},"8b97":function(e,t,n){var a=n("d3f4"),i=n("cb7c"),o=function(e,t){if(i(e),!a(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,a){try{a=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),a(e,[]),t=!(e instanceof Array)}catch(i){t=!0}return function(e,n){return o(e,n),t?e.__proto__=n:a(e,n),e}}({},!1):void 0),check:o}},9093:function(e,t,n){var a=n("ce10"),i=n("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return a(e,i)}},"93b5":function(e,t,n){"use strict";var a=n("a91a"),i=n.n(a);i.a},a91a:function(e,t,n){},aae3:function(e,t,n){var a=n("d3f4"),i=n("2d95"),o=n("2b4c")("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[o])?!!t:"RegExp"==i(e))}},ac6a:function(e,t,n){for(var a=n("cadf"),i=n("0d58"),o=n("2aba"),r=n("7726"),s=n("32e9"),c=n("84f2"),l=n("2b4c"),d=l("iterator"),u=l("toStringTag"),f=c.Array,g={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=i(g),b=0;b<p.length;b++){var h,m=p[b],v=g[m],y=r[m],S=y&&y.prototype;if(S&&(S[d]||s(S,d,f),S[u]||s(S,u,m),c[m]=f,v))for(h in a)S[h]||o(S,h,a[h],!0)}},be94:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){a(e,t,n[t])})}return e}n.d(t,"a",function(){return i})},ff1a:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"c",function(){return i}),n.d(t,"a",function(){return r}),n.d(t,"d",function(){return s});n("6b54"),n("386d"),n("4917"),n("3b2b"),n("ac6a"),n("28a5");var a=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?n[2]:null},i=function(e){var t={text:"",start:0,end:0};if(e.setSelectionRange)e.focus(),t.start=e.selectionStart,t.end=e.selectionEnd,t.text=t.start!==t.end?e.value.substring(t.start,t.end):"";else if(document.selection){e.focus();var n=0,a=document.selection.createRange(),i=document.body.createTextRange();for(i.moveToElementText(e),t.text=a.text,t.bookmark=a.getBookmark(),n=0;i.compareEndPoints("StartToStart",a)<0&&0!==a.moveStart("character",-1);n++)"/r"===e.value.charAt(n)&&n++;t.start=n,t.end=t.text.length+t.start}return t},o=function(e,t){var n;e.focus(),e.setSelectionRange?e.setSelectionRange(t.start,t.end):e.createtextRange&&(n=e.createTextRange(),e.value.length===t.start?(n.collapse(!1),n.select()):(n.moveToBookmark(t.bookmark),n.select()))},r=function(e,t,n){var a,i,r,s,c,l="";o(e,t),e.setSelectionRange?(a=e.value,i=a.substring(0,t.start)+n+a.substring(t.end),r=s=t.start+n.length,c=e.scrollTop,e.value=i,e.scrollTop!==c&&(e.scrollTop=c),e.setSelectionRange(r,s)):e.createTextRange&&(l.document.selection.createRange(),l.text=n,l.select())},s=function(e){var t=new Date,n=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];return"YYYY"===e?t.getFullYear().toString():"MM"===e?(t.getMonth()+1).toString():"DD"===e?t.getDate().toString():"dddd"===e?n[t.getDay()]:""}}}]);