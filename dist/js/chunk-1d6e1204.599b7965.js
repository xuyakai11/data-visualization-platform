(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d6e1204"],{"4c33":function(e,t,a){"use strict";var n=a("ec0d"),o=a.n(n);o.a},be94:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},o=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),o.forEach(function(t){n(e,t,a[t])})}return e}a.d(t,"a",function(){return o})},cbc7:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-card",{attrs:{title:"仪表盘管理",bordered:!1}}),a("div",{staticClass:"instrumentPanelMake",attrs:{id:"components-form-demo-advanced-search"}},[a("a-form",{staticClass:"ant-advanced-search-from",attrs:{layout:"inline",form:e.form}},[a("a-form-item",{attrs:{span:24}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["boardName"],expression:"['boardName']"}],ref:"boardName",attrs:{placeholder:"仪表盘名称"}})],1),a("a-form-item",[a("a-button",{attrs:{type:"primary",loading:e.searchLoading},on:{click:e.handleSearch}},[e._v("搜索")])],1)],1),a("div",{staticClass:"operation"},[a("a-row",[a("a-col",{style:{textAling:"right"},attrs:{span:24}},[a("a-button",{attrs:{type:"primary",htmlType:"button"},on:{click:e.go}},[e._v("新增")])],1)],1)],1),a("div",{staticClass:"search-result-list"},[a("a-table",{attrs:{scroll:{x:!0},columns:e.columns,dataSource:e.data,bordered:"",pagination:e.pagination,loading:e.loading,rowKey:function(e){return e.board_id}},on:{change:e.onChange},scopedSlots:e._u([{key:"action",fn:function(t,n){return a("span",{},[a("a-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.go(t,n)}}},[e._v("编辑")]),a("a-divider",{attrs:{type:"vertical"}}),a("a-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.look(t,n)}}},[e._v("查看")]),a("a-divider",{attrs:{type:"vertical"}}),a("a-button",{attrs:{type:"primary",size:"small",loading:e.delBtnLoading},on:{click:function(t){return e.deleteFun(t,n)}}},[e._v("删除")])],1)}}])})],1)],1)],1)},o=[],i=a("be94"),r=a("d4ec"),c=a("bee2"),d=a("99de"),s=a("7e84"),l=a("262e"),u=a("9ab4"),g=a("60a3"),f=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(d["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.searchLoading=!1,e.loading=!0,e.columns=[{title:"仪表盘名称",dataIndex:"board_name"},{title:"数据源名称",dataIndex:"resource_name"},{title:"报表名称",dataIndex:"report_name"},{title:"操作",dataIndex:"",width:"40%",scopedSlots:{customRender:"action"}}],e.data=[],e.pagination={current:1,pageSize:10,total:1},e.delBtnLoading=!1,e}return Object(l["a"])(t,e),Object(c["a"])(t,[{key:"beforeCreate",value:function(){this.form=this.$form.createForm(this),this.modelForm=this.$form.createForm(this)}},{key:"mounted",value:function(){var e=this.$refs.boardName.value||"",t={boardName:e,pageSize:10,nowpage:1};this.initDataFun(t)}},{key:"initDataFun",value:function(e){var t=this;this.$post("/custom/BoardManage/getBoardList",e).then(function(e){if(2e3===e.state){var a=Object(i["a"])({},t.pagination);t.loading=!1,a.total=e.data.count,t.data=e.data.data,t.pagination=a}else t.loading=!1,t.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?t.$message.error("请求超时",3):t.$message.error("请求失败",3),t.loading=!1,t.data=[]})}},{key:"handleSearch",value:function(e){e.preventDefault();var t=this.$refs.boardName.value||"",a={boardName:t,pageSize:10,nowpage:1};this.initDataFun(a)}},{key:"go",value:function(e,t){e.preventDefault(),t?window.open(window.location.origin+"/config?viewType=edit&boardId="+t.board_id):window.open(window.location.origin+"/config?viewType=add")}},{key:"look",value:function(e,t){e.preventDefault();t&&t.report_id;window.open(window.location.origin+"/config?viewType=look&boardId="+t.board_id)}},{key:"onChange",value:function(e){var t=Object(i["a"])({},this.pagination);t.current=e.current,this.pagination=t;var a=this.$refs.boardName.value||"",n={boardName:a,nowpage:e.current,pageSize:e.pageSize};this.initDataFun(n)}},{key:"deleteFun",value:function(e,t){e.preventDefault(),this.delBtnLoading=!this.delBtnLoading;var a={board_id:t.board_id};this.showConfirm("提示","确认要删除该仪表盘么？",a)}},{key:"showConfirm",value:function(e,t,a){var n=this;this.$confirm({title:e,content:t,okType:"danger",okText:"确认",cancelText:"取消",onOk:function(){n.delFieldFun(a)},onCancel:function(){n.delBtnLoading=!n.delBtnLoading}})}},{key:"delFieldFun",value:function(e){var t=this;this.$post("/custom/BoardManage/delBoardInfo",e).then(function(e){if(2e3===e.state){var a=t.$refs.boardName.value||"",n={boardName:a,pageSize:10,nowpage:1};t.initDataFun(n),t.$message.success(e.message,3),t.delBtnLoading=!t.delBtnLoading}else t.delBtnLoading=!t.delBtnLoading,t.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?t.$message.error("请求超时",3):t.$message.error("删除失败",3),t.delBtnLoading=!t.delBtnLoading})}}]),t}(g["d"]);u["a"]([Object(g["c"])()],f.prototype,"msg",void 0),f=u["a"]([Object(g["a"])({components:{}})],f);var p=f,m=p,v=(a("4c33"),a("2877")),b=Object(v["a"])(m,n,o,!1,null,"657a7ae6",null);t["default"]=b.exports},ec0d:function(e,t,a){}}]);