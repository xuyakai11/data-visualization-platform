(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-edf0e490"],{"54e6":function(e,a,t){},"5a33":function(e,a,t){"use strict";var r=t("54e6"),o=t.n(r);o.a},"67fe":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("a-card",{attrs:{title:"数据源管理",bordered:!1}}),t("div",{staticClass:"dataOrigin",attrs:{id:"components-form-demo-advanced-search"}},[t("a-form",{staticClass:"ant-advanced-search-from",attrs:{layout:"inline",form:e.form}},[t("a-form-item",[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["searchLinkName"],expression:"['searchLinkName']"}],ref:"searchLinkName",attrs:{placeholder:"链接名"}})],1),t("a-form-item",[t("a-button",{attrs:{type:"primary",loading:e.searchLoading},on:{click:e.handleSearch}},[e._v("搜索")])],1)],1),t("div",{staticClass:"operation"},[t("a-row",[t("a-col",{style:{textAling:"right"},attrs:{span:24}},[t("a-button",{attrs:{type:"primary",htmlType:"button",loading:e.addLoading},on:{click:e.showModel}},[e._v("新增")])],1)],1)],1),t("div",{staticClass:"search-result-list"},[t("a-table",{attrs:{scroll:{x:!0},columns:e.columns,dataSource:e.data,bordered:"",pagination:e.pagination,loading:e.loading,rowKey:function(e){return e.report_source_id}},on:{change:e.onChange},scopedSlots:e._u([{key:"action",fn:function(a,r){return t("span",{},[t("a-button",{attrs:{type:"primary",size:"small",loading:e.tabload},on:{click:function(a){return e.editFun(a,r)}}},[e._v("编辑")]),t("a-divider",{attrs:{type:"vertical"}}),t("a-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.go(a,r,"2")}}},[e._v("报表管理")]),t("a-divider",{attrs:{type:"vertical"}}),t("a-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.go(a,r,"3")}}},[e._v("模型管理")])],1)}}])})],1),t("a-modal",{attrs:{visible:e.visible,title:e.modelTitle,okText:"确认",cancelText:"取消",okButtonProps:{props:{disabled:e.modalBtn}}},on:{cancel:e.handleCancel,ok:e.handleCreate}},[t("a-form",{attrs:{id:"collectionForm",form:e.modelForm}},[t("a-form-item",{attrs:{label:"连接名",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["linkName",{initialValue:e.modelFormDatas.link_name,rules:[{required:!0,message:"请输入连接名"}]}],expression:"['linkName', { initialValue: modelFormDatas.link_name, rules: [{ required: true, message: '请输入连接名' }]}]"}],ref:"linkName",attrs:{placeholder:"连接名"}})],1),t("a-form-item",{attrs:{label:"数据库名",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dbName",{initialValue:e.modelFormDatas.db_name,rules:[{required:!0,message:"请输入数据库名"}]}],expression:"['dbName', { initialValue: modelFormDatas.db_name, rules: [{ required: true, message: '请输入数据库名' }]}]"}],ref:"dbName",attrs:{placeholder:"数据库名"}})],1),t("a-form-item",{attrs:{label:"数据库地址",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dbHost",{initialValue:e.modelFormDatas.db_host,rules:[{required:!0,message:"请输入数据库地址"}]}],expression:"['dbHost', { initialValue: modelFormDatas.db_host, rules: [{ required: true, message: '请输入数据库地址' }]}]"}],ref:"dbHost",attrs:{placeholder:"数据库地址"}})],1),t("a-form-item",{attrs:{label:"端口号",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dbPort",{initialValue:e.modelFormDatas.db_port,rules:[{required:!0,message:"请输入端口号"}]}],expression:"['dbPort', { initialValue: modelFormDatas.db_port, rules: [{ required: true, message: '请输入端口号' }]}]"}],ref:"dbPort",attrs:{placeholder:"端口号"}})],1),t("a-form-item",{attrs:{label:"数据库账号",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dbUser",{initialValue:e.modelFormDatas.db_user,rules:[{required:!0,message:"请输入数据库账号"}]}],expression:"['dbUser', { initialValue: modelFormDatas.db_user, rules: [{ required: true, message: '请输入数据库账号' }]}]"}],ref:"dbUser",attrs:{placeholder:"数据库账号"}})],1),t("a-form-item",{attrs:{label:"密码",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dbPassword",{initialValue:e.modelFormDatas.db_password,rules:[{required:!0,message:"请输入数据库密码"}]}],expression:"['dbPassword', { initialValue: modelFormDatas.db_password, rules: [{ required: true, message: '请输入数据库密码' }]}]"}],ref:"dbPassword",attrs:{type:"password",placeholder:"密码"}})],1),t("a-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{wrapperCol:{span:12,offset:8}}},[t("a-button",{attrs:{type:"primary"},on:{click:e.testLinkFun}},[e._v("测试链接")])],1)],1)],1)],1)],1)},o=[],i=t("be94"),n=t("d4ec"),s=t("bee2"),l=t("99de"),d=t("7e84"),m=t("262e"),u=t("9ab4"),c=t("60a3"),p=function(e){function a(){var e;return Object(n["a"])(this,a),e=Object(l["a"])(this,Object(d["a"])(a).apply(this,arguments)),e.addLoading=!1,e.searchLoading=!1,e.tabload=!1,e.loading=!0,e.visible=!1,e.modalBtn=!0,e.modelCol={label:{span:8},wrapper:{span:12}},e.columns=[{title:"链接名",dataIndex:"link_name",key:""},{title:"数据库地址",dataIndex:"db_host",key:""},{title:"账号名",dataIndex:"db_user",key:""},{title:"数据库名",dataIndex:"db_name",key:""},{title:"操作",dataIndex:"",key:"",width:"40%",scopedSlots:{customRender:"action"}}],e.data=[],e.modelTitle="新增数据源",e.modelFormDatas={},e.editBtnReportId="",e.pagination={current:1,pageSize:10,total:1},e}return Object(m["a"])(a,e),Object(s["a"])(a,[{key:"beforeCreate",value:function(){this.form=this.$form.createForm(this),this.modelForm=this.$form.createForm(this)}},{key:"mounted",value:function(){var e=this.$refs.searchLinkName.value||"",a={linkName:e,pageSize:10,nowpage:1};this.initDataFun(a)}},{key:"initDataFun",value:function(e){var a=this;this.$post("/custom/Datasmanage/getDataSourceList",e).then(function(e){if(2e3===e.state){var t=Object(i["a"])({},a.pagination);a.loading=!1,t.total=e.data.count,a.data=e.data.data,a.pagination=t}else a.loading=!1,a.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?a.$message.error("请求超时",3):a.$message.error("请求失败",3),a.loading=!1,a.data=[]})}},{key:"handleSearch",value:function(e){e.preventDefault();var a=this.$refs.searchLinkName.value||"",t={linkName:a,pageSize:10,nowpage:1};this.initDataFun(t)}},{key:"showModel",value:function(){this.modelTitle="新增数据源",this.visible=!0,this.addLoading=!0}},{key:"handleCancel",value:function(){this.visible=!1,this.modalBtn=!0,this.addLoading=!1,this.editBtnReportId="",this.modelFormDatas={},this.modelForm.resetFields()}},{key:"handleCreate",value:function(e){var a=this;e.preventDefault(),this.modelForm.validateFields(function(e,t){if(!e){var r=a.modelForm.getFieldsValue();a.editBtnReportId?(r.reportId=a.editBtnReportId,r.type="update",a.addEditFun(r)):(r.type="add",a.addEditFun(r))}})}},{key:"testLinkFun",value:function(e){var a=this;e.preventDefault(),this.modelForm.validateFields(function(e,t){if(!e){var r=a.modelForm.getFieldsValue(["dbHost","dbUser","dbPassword","dbPort","dbName"]);a.$post("custom/Datasmanage/testConnectDatas",r).then(function(e){2e3===e.state?(a.modalBtn=!1,a.$message.success(e.message,3)):a.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?a.$message.error("请求超时",3):a.$message.error("请求失败",3)})}})}},{key:"editFun",value:function(e,a){this.tabload=!0,this.modelTitle="编辑数据源",this.visible=!0,this.modelFormDatas=a,this.editBtnReportId=a.report_source_id,this.tabload=!1}},{key:"go",value:function(e,a,t){e.preventDefault();var r=a.report_source_id;"2"===t?window.open(window.location.origin+"/statementManagement?reportResourceId="+r):window.open(window.location.origin+"/modelManagement?reportId="+r)}},{key:"addEditFun",value:function(e){var a=this;this.$post("custom/Datasmanage/subDataSource",e).then(function(e){if(2e3===e.state){a.addLoading=!1,a.editBtnReportId="",a.modelFormDatas={},a.modelForm.resetFields(),a.visible=!a.visible,a.$message.success(e.message,3);var t=a.$refs.searchLinkName.value||"",r={linkName:t,nowpage:a.pagination.current,pageSize:a.pagination.pageSize};a.initDataFun(r)}else a.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?a.$message.error("请求超时",3):a.$message.error("请求失败",3)})}},{key:"onChange",value:function(e){var a=Object(i["a"])({},this.pagination);a.current=e.current,this.pagination=a;var t=this.$refs.searchLinkName.value||"",r={linkName:t,nowpage:e.current,pageSize:e.pageSize};this.initDataFun(r)}}]),a}(c["d"]);u["a"]([Object(c["c"])()],p.prototype,"msg",void 0),p=u["a"]([Object(c["a"])({components:{}})],p);var b=p,f=b,g=(t("5a33"),t("2877")),h=Object(g["a"])(f,r,o,!1,null,"55172fcc",null);a["default"]=h.exports},be94:function(e,a,t){"use strict";function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(a){r(e,a,t[a])})}return e}t.d(a,"a",function(){return o})}}]);