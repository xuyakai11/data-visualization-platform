(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c420412"],{"16e0":function(e,t,a){},4800:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-card",{attrs:{title:"模型管理/字段管理",bordered:!1}}),a("div",{staticClass:"dataOrigin",attrs:{id:"components-form-demo-advanced-search"}},[a("a-form",{staticClass:"ant-advanced-search-from",attrs:{layout:"inline",form:e.form}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["fieldName"],expression:"['fieldName']"}],ref:"fieldName",attrs:{placeholder:"字段名称"}})],1),a("a-form-item",[a("a-button",{attrs:{type:"primary",loading:e.searchLoading},on:{click:e.handleSearch}},[e._v("搜索")])],1)],1),a("div",{staticClass:"operation"},[a("a-row",[a("a-col",{style:{textAling:"right"},attrs:{span:24}},[a("a-button",{attrs:{type:"primary",htmlType:"button",loading:e.addBtnLoading},on:{click:e.showModel}},[e._v("新增")])],1)],1)],1),a("div",{staticClass:"search-result-list"},[a("a-table",{attrs:{scroll:{x:!0},pagination:e.pagination,loading:e.loading,columns:e.columns,dataSource:e.data,bordered:"",rowSelection:{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange},rowKey:function(e){return e.id}},on:{change:e.onChange},scopedSlots:e._u([{key:"action",fn:function(t,i){return a("span",{},[a("a-button",{attrs:{type:"primary",size:"small",loading:e.editBtnLoading,"data-type":i.key},on:{click:function(t){return e.editFun(t,i)}}},[e._v("编辑")]),a("a-divider",{attrs:{type:"vertical"}}),a("a-button",{attrs:{type:"primary",size:"small",loading:e.delBtnLoading},on:{click:function(t){return e.deleteFun(t,i)}}},[e._v("删除")])],1)}}])})],1),a("a-modal",{attrs:{visible:e.visible,title:e.modelTitle,okText:"确认",cancelText:"取消"},on:{cancel:e.handleCancel,ok:e.handleCreate}},[a("a-form",{attrs:{form:e.modelForm}},[a("a-form-item",{attrs:{label:"字段名",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["field_name",{initialValue:e.editDataEcho.field_name,rules:[{required:!0,message:"请输入字段名"}]}],expression:"['field_name', { initialValue: editDataEcho.field_name, rules: [{ required: true, message: '请输入字段名' }]}]"}],ref:"field_name",attrs:{placeholder:"字段名"}})],1),a("a-form-item",{attrs:{label:"字段标题",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["field_title",{initialValue:e.editDataEcho.field_title,rules:[{required:!0,message:"请输入字段标题"}]}],expression:"['field_title', { initialValue: editDataEcho.field_title, rules: [{ required: true, message: '请输入字段标题' }]}]"}],ref:"field_title",attrs:{placeholder:"字段标题"}})],1),a("a-form-item",{attrs:{label:"字段类型",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["field_type",{initialValue:e.editDataEcho.field_type,rules:[{required:!0,message:"请选择字段类型"}]}],expression:"['field_type', { initialValue: editDataEcho.field_type, rules: [{ required: true, message: '请选择字段类型' }]}]"}],ref:"field_type",attrs:{placeholder:"字段类型"}},e._l(e.filedTypeData,function(t,i){return a("a-select-option",{key:i,attrs:{value:t.filed_type_value}},[e._v(e._s(t.field_type))])}),1)],1),a("a-form-item",{attrs:{label:"参数",labelCol:e.modelCol.label,wrapperCol:e.modelCol.wrapper}},[a("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["extra",{initialValue:e.editDataEcho.extra,rules:[{message:"请输入字段参数"}]}],expression:"['extra', { initialValue: editDataEcho.extra, rules: [{ message: '请输入字段参数' }]}]"}],ref:"extra",attrs:{placeholder:"参数"}})],1)],1)],1)],1)],1)},n=[],o=a("be94"),l=a("d4ec"),r=a("bee2"),d=a("99de"),s=a("7e84"),c=a("262e"),u=(a("cadf"),a("551c"),a("097d"),a("9ab4")),m=a("60a3"),f=function(e){function t(){var e;return Object(l["a"])(this,t),e=Object(d["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.loading=!0,e.searchLoading=!1,e.visible=!1,e.modelCol={label:{span:8},wrapper:{span:12}},e.columns=[{title:"编号",dataIndex:"id",key:""},{title:"字段",dataIndex:"field_title",key:""},{title:"名称",dataIndex:"field_name",key:""},{title:"数据类型",dataIndex:"field_type",key:""},{title:"操作",dataIndex:"",key:"",width:"30%",scopedSlots:{customRender:"action"}}],e.model_id="",e.modelTitle="新增字段",e.data=[],e.filedlId="",e.filedTypeData=[],e.editDataEcho={},e.editBtnLoading=!1,e.addBtnLoading=!1,e.delBtnLoading=!1,e.selectedRowKeys=[],e.pagination={current:1,pageSize:10,total:1},e}return Object(c["a"])(t,e),Object(r["a"])(t,[{key:"beforeCreate",value:function(){this.form=this.$form.createForm(this),this.modelForm=this.$form.createForm(this)}},{key:"mounted",value:function(){this.model_id=this.$route.query.model_id;var e={model_id:this.model_id,pageSize:10,nowpage:1};this.initDataFun(e),this.initFieldTypeFun()}},{key:"handleSearch",value:function(e){e.preventDefault();var t=this.$refs.fieldName.value||"",a={fieldName:t,model_id:this.model_id,pageSize:10,nowpage:1};this.initDataFun(a)}},{key:"initDataFun",value:function(e){var t=this;this.loading=!0,this.$post("/custom/Attribute/filedsList",e).then(function(e){if(2e3===e.state){var a=Object(o["a"])({},t.pagination);t.loading=!1,a.total=e.data.count,t.data=e.data.data,t.pagination=a}else t.loading=!1,t.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?t.$message.error("请求超时",3):t.$message.error("请求失败",3),t.loading=!1,t.data=[]})}},{key:"initFieldTypeFun",value:function(){var e=this;this.loading=!0,this.$get("/custom/Attribute/fieldType").then(function(t){2e3===t.state?e.filedTypeData=t.data:e.$message.error(t.message,3)}).catch(function(t){"ECONNABORTED"===t.code?e.$message.error("请求超时",3):e.$message.error("请求失败",3)})}},{key:"showModel",value:function(){this.visible=!this.visible,this.addBtnLoading=!0,this.modelTitle="新增字段"}},{key:"handleCancel",value:function(){this.visible=!1,this.addBtnLoading=!1,this.editBtnLoading=!1,this.editDataEcho={},this.modelForm.resetFields()}},{key:"handleCreate",value:function(e){var t=this;e.preventDefault(),this.modelForm.validateFields(function(e,a){if(!e){var i=a;i.model_id=t.model_id;var n="/custom/Attribute/updateField";t.filedlId?(i.id=t.filedlId,t.addEditModelFun(i,n)):t.addEditModelFun(i,n)}})}},{key:"editFun",value:function(e,t){this.visible=!0,this.modelTitle="编辑字段",this.filedlId=t.id,this.editBtnLoading=!0,this.editDataEcho=t}},{key:"addEditModelFun",value:function(e,t){var a=this;this.$post(t,e).then(function(e){if(2e3===e.state){a.filedlId="",a.editDataEcho={},a.modelForm.resetFields(),a.visible=!a.visible,a.addBtnLoading=!1,a.editBtnLoading=!1,a.$message.success(e.message,3);var t={model_id:a.model_id,nowpage:a.pagination.current,pageSize:a.pagination.pageSize};a.initDataFun(t)}else a.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?a.$message.error("请求超时",3):a.$message.error("请求失败",3)})}},{key:"onSelectChange",value:function(e){this.selectedRowKeys=e}},{key:"onChange",value:function(e){var t=Object(o["a"])({},this.pagination);t.current=e.current,this.pagination=t;var a={model_id:this.model_id,nowpage:e.current,pageSize:e.pageSize};this.initDataFun(a)}},{key:"deleteFun",value:function(e,t){e.preventDefault(),this.delBtnLoading=!this.delBtnLoading;var a={field_id:t.id};this.showConfirm("提示","确认要删除该字段么？",a)}},{key:"showConfirm",value:function(e,t,a){var i=this;this.$confirm({title:e,content:t,okType:"danger",okText:"确认",cancelText:"取消",onOk:function(){i.delFieldFun(a)},onCancel:function(){i.delBtnLoading=!i.delBtnLoading}})}},{key:"delFieldFun",value:function(e){var t=this;this.$get("custom/Attribute/del",e).then(function(e){if(2e3===e.state){var a={model_id:t.model_id,nowpage:t.pagination.current,pageSize:t.pagination.pageSize};t.initDataFun(a),t.$message.success(e.message,3),t.delBtnLoading=!t.delBtnLoading}else t.delBtnLoading=!t.delBtnLoading,t.$message.error(e.message,3)}).catch(function(e){"ECONNABORTED"===e.code?t.$message.error("请求超时",3):t.$message.error("删除失败",3),t.delBtnLoading=!t.delBtnLoading})}}]),t}(m["d"]);u["a"]([Object(m["c"])()],f.prototype,"msg",void 0),f=u["a"]([Object(m["a"])({components:{}})],f);var p=f,h=p,g=(a("7bdb"),a("2877")),v=Object(g["a"])(h,i,n,!1,null,"806f9248",null);t["default"]=v.exports},"7bdb":function(e,t,a){"use strict";var i=a("16e0"),n=a.n(i);n.a},be94:function(e,t,a){"use strict";function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),n.forEach(function(t){i(e,t,a[t])})}return e}a.d(t,"a",function(){return n})}}]);