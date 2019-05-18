<template>
  <div>
    <a-spin :spinning="spinning" delayTime="500">
      <div class="lpc-step2-content">
        <!-- leftTree -->
        <left-menu @treeDblData="treeMsg" :dataSourceTree="dataSourceTree"></left-menu>
        <!-- middletab -->
        <div class="lpc-centerTab">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane key="1">
              <span slot="tab"><a-icon type="apple"/>报表设置</span>
              <div class="lpc-tab1-content">
                <div class="tab1-top">
                  <div class="tab1-top-header">
                    <h4>分组</h4>
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>删除所有分组</span>
                      </template>
                      <a-icon type="delete" @click.stop="deleteAllGroup('hang')"/>
                    </a-tooltip>
                  </div>
                  <div class="tab1-top-content">
                    <h4>组行</h4>
                    <a-select
                      showSearch
                      allowClear
                      placeholder="添加组行"
                      ref="handleChangeH"
                      style="width: 100%"
                      @change="handleChangeH"
                      v-if="!spinning"
                      :filterOption="filterOption"><!-- showSearch  -->
                      <!-- optionFilterProp:搜索时过滤对应的option属性，如设置为children表示对内嵌内容进行搜索 -->
                      <!-- <a-select-opt-group v-for="(source, index) in dataSourceTree" :key="index">
                        <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                        <a-select-option v-for="(child, i) in source.children" :key="i" :value="child.id" v-if="child.title" >{{ child.title }}</a-select-option>
                      </a-select-opt-group> -->
                      <a-select-option :disabled="list.children ? true : false" :value="list.id" v-for="(list, index) in treeListFilter" :key="index" :class="list.children ? 'disabled' : ''"><a-icon type="smile" theme="twoTone" v-if="list.children"/>{{list.title}}</a-select-option>
                    </a-select>
                    <div class="task-content">
                      <draggable class="hang" v-model="hangData" :options="dragOptions" @update="onEndHang"> <!-- :options="dragOptions" @end="onEndHang" @update="onUpdateHang" -->
                        <p class="task-item" type="inner" v-for="(item, i) in hangData" :key="'hang' + i" :title="item.text">
                          <span v-if="item.title.length > 15">{{item.title.substr(0, 15)}}...</span>
                          <span v-else>{{item.title}}</span>
                          <a-tooltip placement="right">
                            <template slot="title">
                              <span>删除</span>
                            </template>
                            <a-icon type="close" @click.stop="deleteGroupH(item, i)"/>
                          </a-tooltip>
                        </p>
                      </draggable>
                    </div>
                  </div>
                </div>
                <a-divider />
                <div class="tab1-bottom">
                  <div class="tab1-bottom-header">
                    <h4>列数</h4>
                    <a-dropdown :trigger="['click']">
                      <a class="ant-dropdown-link" href="#">
                        <a-icon type="down-square" />
                      </a>
                      <a-menu slot="overlay">
                        <!-- <a-menu-item key="0">
                          <a href="javascript:void(0)">添加存储器列</a>
                        </a-menu-item> -->
                        <a-menu-item key="1" :disabled="!hangData.length" @click="showFormulaModel"> <!-- 当组行为空时不能选 -->
                          <a href="javascript:void(0)">添加汇总公式</a>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3" @click="deleteAllGroup('lie')">删除所有列</a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  <a-select
                    allowClear
                    showSearch
                    placeholder="添加组列"
                    optionFilterProp="children"
                    style="width: 100%"
                    @change="handleChangeL"
                    v-if="!spinning"
                    :filterOption="filterOption">
                    <a-select-option :disabled="list.children ? true : false" :value="list.id" v-for="(list, index) in treeListFilter" :key="index" :class="list.children ? 'disabled' : ''"><a-icon type="smile" theme="twoTone" v-if="list.children"/>{{list.title}}</a-select-option>
                    <!-- <a-select-opt-group v-for="(source, index) in dataSourceTreeFilter" :key="index">
                      <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                      <a-select-option v-for="(child) in source.children" :key="child.id" :value="child.id" v-if="child.title">{{child.title}}</a-select-option>
                    </a-select-opt-group> -->
                  </a-select>
                  <div class="task-content">
                    <draggable class="lie" v-model="lieData" :options="dragOptions" @update="onEndLie"> <!--  :options="dragOptions" @end="onEndLie" @update="onUpdateLie" -->
                      <p class="task-item" type="inner" v-for="(item, i) in lieData" :key="'lie' + i">
                        <span v-if="item.title.length > 15">{{item.title.substr(0, 15)}}...</span>
                        <span v-else>{{item.title}}</span>
                        <a-tooltip placement="right">
                          <template slot="title">
                            <span>删除</span>
                          </template>
                          <a-icon type="close" @click.stop="deleteGroupL(item, i)"/>
                        </a-tooltip>
                      </p>
                    </draggable>
                  </div>
                </div>
                <a-divider />
                <div class="tab1-top">
                  <div class="tab1-top-header">
                    <h4>排序</h4>
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>删除所有排序</span>
                      </template>
                      <a-icon type="delete" @click.stop="deleteAllGroup('sort')"/>
                    </a-tooltip>
                  </div>
                  <div class="tab1-top-content">
                    <!-- <h4>组行</h4> -->
                    <a-select
                      showSearch
                      allowClear
                      placeholder="添加排序"
                      ref="handleChangeSort"
                      style="width: 100%"
                      @change="handleChangeSort"
                      v-if="!spinning"
                      :filterOption="filterOption"><!-- showSearch  -->
                      <a-select-option :disabled="list.children ? true : false" :value="list.id" v-for="(list, index) in treeListFilter" :key="index" :class="list.children ? 'disabled' : ''"><a-icon type="smile" theme="twoTone" v-if="list.children"/>{{list.title}}</a-select-option>
                    </a-select>
                    <div class="task-content">
                      <draggable class="sort" v-model="sortData" :options="dragOptions" @update="onEndSort"> <!-- :options="dragOptions" @end="onEndHang" @update="onUpdateHang" -->
                        <p class="task-item" type="inner" v-for="(item, i) in sortData" :key="'sort' + i" :title="item.text">
                          <span v-if="item.title.length > 15">{{item.title.substr(0, 15)}}...</span>
                          <span v-else>{{item.title}}</span>
                          <a-tooltip placement="right">
                            <template slot="title">
                              <span>删除</span>
                            </template>
                            <a-icon type="close" @click.stop="deleteGroupSort(item, i)"/>
                          </a-tooltip>
                        </p>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <span slot="tab"><a-icon type="android"/>筛选</span>
              <div class="lpc-tab2-content">
                <div class="tab2-top-header">
                  <h4>固定筛选器</h4>
                  <!-- <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" href="#">
                      <a-icon type="down-square" />
                    </a>
                    <a-menu slot="overlay">
                      <a-menu-item key="0">
                        <a href="javascript:void(0)">添加筛选逻辑</a>
                      </a-menu-item>
                      <a-menu-item key="1">
                        <a href="javascript:void(0)">添加交叉筛选器</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown> -->
                </div>
                <a-select
                  allowClear
                  showSearch
                  placeholder="添加固有筛选"
                  optionFilterProp="children"
                  style="width: 100%"
                  @change="handleChangeF"
                  v-if="!spinning"
                  :filterOption="filterOption">
                  <a-select-option :disabled="list.children ? true : false" :value="list.id" v-for="(list, index) in treeListFilter" :key="index" :class="list.children ? 'disabled' : ''"><a-icon type="smile" theme="twoTone" v-if="list.children"/>{{list.title}}</a-select-option>
                  <!-- <a-select-opt-group v-for="(source, index) in dataSourceTree" :key="index">
                    <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                    <a-select-option v-for="(child, i) in source.children" :key="i" :value="child.id">{{child.title}}</a-select-option>
                  </a-select-opt-group> -->
                </a-select>
                <div class="screening-content">
                  <draggable class="fixSearch" v-model="fixSearchData" :options="dragOptions" @update="onEndFixSearch">
                    <a-popover arrowPointAtCenter placement="right" @visibleChange="visibleChangeFun" title="编辑筛选器" trigger="click" v-model="item.popover" :visible="item.popover" v-for="(item, i) in fixSearchData" :key="'fixSearch' + i">
                      <div slot="content">
                        <p>{{item.title}}</p>
                        <div v-if="item.field_type == 'date'">
                          <a-form :form="dataForm">
                            <a-form-item label="时间范围">
                              <a-range-picker size="small" format="YYYY-MM-DD" v-decorator="['search_param', { initialValue: item.search_param, rules: [{ type: 'array', required: true, message: '请选择时间！' }]}]"/>
                            </a-form-item>
                          </a-form>
                        </div>
                        <div v-if="item.field_type == 'datetime'">
                          <a-form :form="datetimeForm">
                            <a-form-item label="时间范围">
                              <a-range-picker size="small" :showTime="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" v-decorator="['search_param', { initialValue: item.search_param, rules: [{ type: 'array', required: true, message: '请选择时间！' }]}]"/>
                            </a-form-item>
                          </a-form>
                        </div>
                        <div v-if="item.field_type == 'num'">
                          <a-form :form="numberForm">
                            <a-form-item label="运算符">
                              <a-select labelInValue v-decorator="['search_logic', { initialValue: item.search_logic, rules: [{ required: false }]}]">
                                <a-select-option value="=">等于</a-select-option>
                                <a-select-option value="!=">不等于</a-select-option>
                                <a-select-option value="<">小于</a-select-option>
                                <a-select-option value=">">大于</a-select-option>
                                <a-select-option value="<=">小于等于</a-select-option>
                                <a-select-option value=">=">大于等于</a-select-option>
                              </a-select>
                            </a-form-item>
                            <a-form-item >
                              <a-input v-decorator="['search_param', { initialValue: item.search_param, rules: [{ required: false, message: '请输入数字！' }]}]"/>
                            </a-form-item>
                          </a-form>
                        </div>
                        <div v-if="item.field_type == 'string'">
                          <a-form :form="stringForm">
                            <a-form-item label="运算符">
                              <a-select labelInValue v-decorator="['search_logic', { initialValue: item.search_logic, rules: [{ required: false }]}]">
                                <a-select-option value="=">等于</a-select-option>
                                <a-select-option value="!=">不等于</a-select-option>
                                <a-select-option value="like">包含</a-select-option>
                                <a-select-option value="not like">不包含</a-select-option>
                              </a-select>
                            </a-form-item>
                            <a-form-item >
                              <a-input v-decorator="['search_param', { initialValue: item.search_param, rules: [{ required: false, message: '请输入字符串！' }]}]"/>
                            </a-form-item>
                          </a-form>
                        </div>
                        <div v-if="item.field_type == 'select'"> <!-- 单选 -->
                          <a-form :form="selectForm">
                            <a-form-item label="运算符">
                              <a-select labelInValue style="width: 250px" v-decorator="['search_logic', { initialValue: item.search_logic, rules: [{ required: false }]}]">
                                <a-select-option value="=">等于</a-select-option>
                                <a-select-option value="!=">不等于</a-select-option>
                              </a-select>
                            </a-form-item>
                            <a-form-item label="值">
                              <a-select labelInValue style="width: 250px" v-decorator="['search_param', { initialValue: item.search_param, rules: [{ required: false, message: '请选择值！' }]}]"
                                showSearch
                                allowClear
                                :filterOption="filterOption">
                                <a-select-option value="0">同步中</a-select-option>
                                <a-select-option value="1">不同</a-select-option>
                                <a-select-option value="2">已审核</a-select-option>
                                <a-select-option value="3">未找到</a-select-option>
                                <a-select-option value="4">未启用</a-select-option>
                                <a-select-option value="5">未比较</a-select-option>
                                <a-select-option value="">无选择</a-select-option>
                              </a-select>
                            </a-form-item>
                          </a-form>
                        </div>
                        <div v-if="item.field_type == 'checkbox'"> <!-- 多选 -->
                          <a-form :form="checkboxForm">
                            <a-form-item label="运算符">
                              <a-select labelInValue style="width: 250px" v-decorator="['search_logic', { initialValue: item.search_logic, rules: [{ required: false }]}]">
                                <a-select-option value="in">等于</a-select-option>
                                <a-select-option value="not in">不等于</a-select-option>
                              </a-select>
                            </a-form-item>
                            <a-form-item label="值">
                              <a-select labelInValue mode="multiple" v-decorator="['search_param', { initialValue: item.search_param,  rules: [{ required: false, message: '请选择值！' }]}]"
                                showSearch
                                allowClear
                                style="width: 250px"
                                :filterOption="filterOption">
                                <a-select-option value="0">同步中</a-select-option>
                                <a-select-option value="1">不同</a-select-option>
                                <a-select-option value="2">已审核</a-select-option>
                                <a-select-option value="3">未找到</a-select-option>
                                <a-select-option value="4">未启用</a-select-option>
                                <a-select-option value="5">未比较</a-select-option>
                                <!-- <a-select-option value="">无选择</a-select-option> -->
                              </a-select>
                            </a-form-item>
                          </a-form>
                        </div>
                        <div class="content-footer">
                          <a-button size="small" @click="hidePopover(item, i, 'F')">取消</a-button>
                          <a-button size="small" type="primary" @click="enterPopover(item, 'F')">应用</a-button>
                        </div>
                      </div>
                      <div class="screening-item" :class="{ 'active_item': item.popover }">
                        <div class="lpc-fixed-text">
                          <p class="title">{{item.title}}</p>
                          <p class="text">{{item.extra}}</p>
                        </div>
                        <a-tooltip placement="right"> <!-- 判断固定项不显示删除按钮 -->
                          <template slot="title">
                            <span>删除</span>
                          </template>
                          <a-icon type="close" @click.stop="deleteSearch(i, 'F')"/>
                        </a-tooltip>
                      </div>
                    </a-popover>
                  </draggable>
                </div>
                <a-divider />
                <div class="tab2-top-header">
                  <h4>显示筛选器</h4>
                </div>
                <a-select
                  showSearch
                  allowClear
                  placeholder="添加显示筛选"
                  optionFilterProp="children"
                  style="width: 100%"
                  v-if="!spinning"
                  @change="handleChangeX"
                  :filterOption="filterOption">
                  <a-select-option :disabled="list.children ? true : false" :value="list.id" v-for="(list, index) in treeListFilter" :key="index" :class="list.children ? 'disabled' : ''"><a-icon type="smile" theme="twoTone" v-if="list.children"/>{{list.title}}</a-select-option>
                  <!-- <a-select-opt-group v-for="(source, index) in dataSourceTree" :key="index">
                    <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                    <a-select-option v-for="(child, i) in source.children" :key="i" :value="child.id">{{child.title}}</a-select-option>
                  </a-select-opt-group> -->
                </a-select>
                <div class="According-content">
                  <draggable class="showSearch" v-model="showSearchData" :options="dragOptions" @update="onEndShowSearch">
                    <p class="task-item" type="inner" v-for="(item, i) in showSearchData" :key="i">
                      <span v-if="item.title.length > 15">{{item.title.substr(0, 15)}}...</span>
                      <span v-else>{{item.title}}</span>
                      <a-tooltip placement="right">
                        <template slot="title">
                          <span>删除</span>
                        </template>
                        <a-icon type="close" @click.stop="deleteSearch(i, 'X')"/>
                      </a-tooltip>
                    </p>
                  </draggable>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        <!-- rightTable -->
        <div class="lpc-rightTable">
          <div class="table-header">
            <div class="table-header-left">
          <!-- <a-input ref="titleName" v-if="titleNameEdit" :value="titleName" @change="e => titleNameEditFun(e.target.value)" style="width: 200px;"/>
              <template v-else>{{titleName}}</template>
              <div v-if="!titleNameEdit" class="header-icon">
                <a-icon type="edit" @click="editTitleName"></a-icon>
              </div>
              <div v-else class="header-icon">
                <a-icon type="check" @click="saveEditTitleName"></a-icon>
                <a-icon type="close" @click="cancelEditTitleName"></a-icon>
              </div> -->
            </div>
            <div class="table-header-right">
              <!-- <a-button type="primary" :loading="saveLoading" @click="saveFun">保存</a-button> -->
              <a-button type="primary" class="runBtn" :loading="runLoading" @click="runFun">运行</a-button>
            </div>
          </div>
          <div style="padding: 10px" class="tabSearch" id="components-form-demo-advanced-search" v-if="search.length">
            <a-form layout='inline' class="ant-advanced-search-from" :form="form" @submit="handleSearch">
              <a-row :gutter="24">
                <a-col :span="8" v-for="(item, i) in search" :key="i">
                  <a-form-item>
                    <a-input
                      v-if="item.searchType === 'string'"
                      v-decorator="[item.searchName, { rules: [{ required: false}] }]"
                      :placeholder="item.showTitle" />
                    <a-input
                      v-if="item.searchType === 'num'"
                      v-decorator="[item.searchName, { rules: [{ required: false}] }]"
                      :placeholder="item.showTitle" />
                    <a-select
                      v-decorator="[item.searchName, { rules: [{ required: false}] }]"
                      v-if="item.searchType === 'select'"
                      showSearch
                      allowClear
                      :filterOption="filterOption"
                      :placeholder="item.showTitle">
                      <a-select-option v-for="(par, index) in item.searchParam" :key="index" :value="par.value">{{par.title}}</a-select-option>
                    </a-select>
                    <a-select
                      v-decorator="[item.searchName, { rules: [{ required: false}] }]"
                      v-if="item.searchType === 'checkbox'"
                      mode="multiple"
                      showSearch
                      allowClear
                      :filterOption="filterOption"
                      :placeholder="item.showTitle">
                      <a-select-option v-for="(par, index) in item.searchParam" :key="index" :value="par.value">{{par.title}}</a-select-option>
                    </a-select>
                    <a-range-picker
                      v-if="item.searchType === 'date'"
                      v-decorator="[item.searchName, { rules: [{ required: false}] }]"
                      :placeholder="[item.showTitle+'开始', item.showTitle+'结束']"
                      format="YYYY-MM-DD"/>
                    <a-range-picker
                      v-if="item.searchType === 'datetime'"
                      v-decorator="[item.searchName, { rules: [{ required: false}] }]"
                      :placeholder="[item.showTitle+'开始', item.showTitle+'结束']"
                      :showTime="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24" :style="{ textAlign: 'right' }">
                  <a-button type="primary" html-type="submit" :loading="searchLoading">搜索</a-button>
                  <a-button @click="handleReset" :style="{ marginLeft: '8px' }">重置</a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="table-content" ref="tableContent">
            <a-table v-if="columns.length > 0" :pagination="pagination" @change="onChangeTab" :loading="tableLoading" :columns="columns" :dataSource="data" bordered :scroll="screenWidth" :rowKey="record => record.keyFlagId"></a-table>
            <div v-else class="noneIcon">
              <div>
                <a-icon type="table"/>
                <p>暂无数据</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a-form class="lpc-form-footer">
        <a-form-item>
          <!-- <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button> -->
          <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
    
    <!-- 弹窗层 -->
    <a-modal
        :visible="showFormulaFlag"
        :title="showFormulaTitle"
        :confirmLoading="formulaCreateLoading"
        okText='确认'
        cancelText='取消'
        @cancel="formulaCancel"
        @ok="formulaCreate"
        class="formulaModal"
      >
        <div class="modalContent">
          <div class="modalLeftTab">
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="字段" key="1">
                <div class="leftMenu">
                  <div class="lpc-full">
                    <div class="header">
                      <a-input-search placeholder="搜索字段" @change="onChangeField" />
                    </div>
                    <div class="treeContent">
                      <a-tree
                        @expand="onExpandField"
                        :expandedKeys="expandedKeysField"
                        :autoExpandParent="autoExpandParentField"
                        :treeData="dataSourceTree"
                        @select="onselectTreeField"
                        ><!-- @select="selectTreeFun($event)" -->
                        <template slot="title" slot-scope="{title}">
                          <span v-if="title.indexOf(searchValueField) > -1">
                            {{title.substr(0, title.indexOf(searchValueField))}}
                            <span style="color: #f50">{{searchValueField}}</span>
                            {{title.substr(title.indexOf(searchValueField) + searchValueField.length)}}
                          </span>
                          <span v-else>{{title}}</span>
                        </template>
                      </a-tree>
                    </div>
                    <div class="footer">
                      <div>
                        <a-select style="width: 170px" v-model="fieldCalculate">
                          <a-select-option value="">无</a-select-option>
                          <a-select-option value="SUM">总和</a-select-option>
                          <a-select-option value="AVG">平均</a-select-option>
                          <a-select-option value="MIN">最小值</a-select-option>
                          <a-select-option value="MAX">最大值</a-select-option>
                        </a-select>
                        <a-button type="primary" :disabled="insertField" @click="insertFieldFun">插入 > </a-button>
                      </div>
                    </div>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane tab="函数" key="2">
                <a-spin :spinning="systeming" delayTime="500" size="small">
                  <div class="leftMenu">
                    <div class="lpc-full">
                      <div class="header">
                        <a-input-search placeholder="搜索函数" @change="onChangeFun" />
                      </div>
                      <div class="treeContent" :class="funcTree ? 'funcTree' : ''">
                        <a-tree
                          @expand="onExpandFun"
                          :expandedKeys="expandedKeysFun"
                          :autoExpandParent="autoExpandParentFun"
                          :treeData="funcTreeData"
                          @select="onSelectTreeFun"
                          ><!-- @select="selectTreeFun($event)" -->
                          <template slot="title" slot-scope="{title}">
                            <span v-if="title.indexOf(searchValueFun) > -1">
                              {{title.substr(0, title.indexOf(searchValueFun))}}
                              <span style="color: #f50">{{searchValueFun}}</span>
                              {{title.substr(title.indexOf(searchValueFun) + searchValueFun.length)}}
                            </span>
                            <span v-else>{{title}}</span>
                          </template>
                        </a-tree>
                      </div>
                      <div class="funcTreeMessage" v-show="funcTree">
                        <p :title="funData.func_sample" v-if="funData.func_sample" style="font-weight: 700">{{funData.func_sample}}</p>
                        <p :title="funData.func_desc" v-if="funData.func_desc.length > 60">{{funData.func_desc.substr(0, 60)}}...</p>
                        <p :title="funData.func_desc" v-else>{{funData.func_desc}}</p>
                      </div>
                      <div class="footer">
                        <div>
                          <a-button type="primary" style="margin-left: 191px" :disabled="insertFun" @click="insertFunFun">插入 > </a-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a-spin>
              </a-tab-pane>
            </a-tabs>
          </div>
          <div class="modalRightTab">
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="一般信息" key="1">
                <div class="message">
                  <a-form layout="vertical" :form="messageForm">
                    <a-form-item class="twoCol" label="列名称" :wrapper-col="{ span: 24 }">
                      <a-input name="col_title" v-decorator="['col_title', {rules: [{ required: true, message: '请输入列名称！' }]}]"/>
                    </a-form-item>
                    <a-form-item class="twoCol" label="描述" :wrapper-col="{ span: 24 }" style="margin-left: 20px">
                      <a-input name="col_desc" v-decorator="['col_desc', { initialValue: '', rules: [{ required: false }]}]"/>
                    </a-form-item>
                    <a-form-item label="公式" style="margin: 0; position: relative;">
                      <div class="editInsertButton">
                        <span @click.stop="symbolInsertFun('+')">+</span>
                        <span @click.stop="symbolInsertFun('-')">-</span>
                        <span @click.stop="symbolInsertFun('*')">*</span>
                        <span @click.stop="symbolInsertFun('/')">/</span>
                        <span @click.stop="symbolInsertFun('^')">^</span>
                        <span @click.stop="symbolInsertFun('(')">(</span>
                        <span @click.stop="symbolInsertFun(')')">)</span>
                      </div>
                      <a-textarea ref="formulaTextarea" placeholder="请在此键入公式。" :rows="10" @change="textareaChange($event)" v-decorator="['formula', { initialValue: formula, rules: [{ required: true, message: '请键入公式' }]}]"/>
                    </a-form-item>
                    <p class="errMsg" v-show="errMsgFlag"><a-icon type="warning" theme="twoTone" twoToneColor="#faad14"/>{{errMsg}}</p>
                    <div style="margin-bottom: 0">
                      <a-button v-show="grammarSuccess" @click.stop="checkGrammar" :loading="checkFormulaLoading">检查语法</a-button>
                      <p v-show="checkFormulaSuccess"><a-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> 有效</p>
                    </div>
                  </a-form>
                </div>
              </a-tab-pane>
              <a-tab-pane tab="格式" key="2">
                <div class="message">
                  <a-form layout="vertical" :form="formatForm">
                    <a-form-item class="twoCol" label="格式" :wrapper-col="{ span: 24 }">
                      <a-select name="col_format" v-decorator="['col_format', {initialValue: 'num', rules: [{ required: false }]}]">
                        <a-select-option value="num">数字</a-select-option>
                        <a-select-option value="percent">百分比</a-select-option>
                        <a-select-option value="common">普通</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item class="twoCol" label="小数点" :wrapper-col="{ span: 24 }" style="margin-left: 20px">
                      <a-select name="decimal_num" v-decorator="['decimal_num', {initialValue: '0', rules: [{ required: false }]}]">
                        <a-select-option :key="i" v-for="(list, i) in 19" :value="i">{{i}}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <!-- <a-form-item class="twoCol" label="此公式将在哪里应用?">
                      <a-radio-group v-model="radioValue">
                        <a-radio :value="0">所有汇总级别</a-radio>
                        <a-radio :value="1">仅限总合计</a-radio>
                        <a-radio :value="2">特定组</a-radio>
                      </a-radio-group>
                      <span v-if="radioValue === 2" style="margin-left: 20px">
                            <a-select name="specific" v-decorator="['specific', {initialValue: '0', rules: [{ required: false }]}]">
                              <a-select-option value="0">客户所有人</a-select-option>
                            </a-select>
                          </span>
                    </a-form-item> -->
                  </a-form>
                </div>
              </a-tab-pane>
            </a-tabs>
            <!-- <a-form :form="modalForm">
            </a-form> -->
          </div>
        </div>
    </a-modal>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import leftMenu from '@/components/report/step2LeftMenu.vue'
  import Draggable from 'vuedraggable'
  import formulaModal from '@/components/report/formulaModal.vue'
  import { getTextareaCursor, setTextareaCursor, addTextareaCursor, getQueryString } from '@/libs/util'
  import moment from 'moment'

  /* eslint-disable */
  interface subData { // 定义筛选提交类型
    reportId: number,
    tableId: number,
    fieldId: number,
    search_logic: string,
    search_type: number,
    search_name: string,
    search_param: string
  }
  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }
  interface searchParam {
    name: string,
    logic: string,
    search_param: string,
    search_type: string
  }
   /* eslint-disable */
  @Component({
    components: { leftMenu, Draggable }
  })
  export default class sterp2 extends Vue {
    @Prop() reportId: any // 从父组件接收reportId
    
    spinning:boolean = true // 整个页面加载动画
    systeming:boolean = true // 弹窗函数模块加载动画
    tableLoading:boolean = false // 表格加载动画
    searchLoading:boolean = false // 搜索按钮加载动画
    dataSourceTree:Array<object> = []
    loading: boolean = false
    saveLoading:boolean = false
    runLoading:boolean = false
    formulaCreateLoading = false // 添加公式列弹框确定按钮
    dragOptions: object = { // 拖拽组件相关配置
      sort: true, // 定义是否拖拽
      // group: 'task', // string or array分组用的，同一组的不同的list可以相互拖拽
      scroll: true, // 拖放可以引起区域滚动
      scrollSpeed: 2, // 滚动速度
      animation: 150, // 动画时间
      ghostClass: 'dragable-ghost', // 拖拽是产生的副本影子单元样式，用来模拟被拖拽元素的排序情况
      chosenClass: 'dragable-chose', // 选中拖拽目标时样式
      dragClass: 'dragable-drag' // 拖拽中样式
    }
    titleName:string = '报表名称'
    titleNameEdit:boolean = false // 配置报表名称修改
    cancelTitleNameFlag:string = '' // 用于取消还原修改
    editReportId:string = getQueryString('reportId') // 判断是否是编辑字段
    screenWidth: object = { x: 100, y: 400 }
    // tableWidth:number = 10
    // screenWidth:any = document.body.clientWidth
    
    showFormulaFlag:boolean = false // 控制添加公式列模态框
    showFormulaTitle:string = '编辑公式列'

    expandedKeysField:Array<any> = []
    searchValueField:string = ''
    autoExpandParentField:boolean = true
    
    dataSource:Array<object> = [
      {
        title: '话题',
        key: '122',
        scopedSlots: {title: 'title'},
        selectable: false, // 配置节点是否可选
        children: [{
          title: 'AntDesign',
          scopedSlots: {title: 'title'},
          key: '10000',
        }, {
          title: 'AntDesign UI',
          scopedSlots: {title: 'title'},
          key: '10600',
        }]
      }, {
        title: '问题',
        scopedSlots: {title: 'title'},
        key: '1',
        selectable: false, // 配置节点是否可选
        children: [{
          title: 'AntDesign UI 有多好',
          scopedSlots: {title: 'title'},
          key: '60100'
        }, {
          title: 'AntDesign 是啥',
          scopedSlots: {title: 'title'},
          key: '30010'
        }]
      }, {
        title: '文章',
        scopedSlots: {title: 'title'},
        key: '123',
        selectable: false, // 配置节点是否可选
        children: [{
          title: 'AntDesign 是一个设计语言',
          scopedSlots: {title: 'title'},
          key: '100000',
        }]
    }];
    expandedKeysFun:Array<any> = []
    searchValueFun:string = ''
    autoExpandParentFun:boolean = true
   
    insertFun:boolean = true // 函数插入按钮
    insertField:boolean = true // 字段插入按钮
    fieldData:any = {} // 存放字段选中
    funData:any = {
      func_desc: '',
      func_sample: '',
      func_type: 0,
      id: 0,
      title: ''
    } // 存放函数选中
    fieldCalculate:string = '' // 存放字段求值字段
    radioValue:number = 0 // 编辑公式列弹框 格式单选model
    formulaTextarea:string = '' // 编辑列公式弹框 公式内容

    treeList:Array<any> = [] // 存放将dataSourceTree处理成一层之后的数据
    
    hangData:Array<any> = [] // 行data
    lieData:Array<any> = [] // 列data
    sortData:Array<any> = [] // 排序data
    fixSearchData:Array<any> = [] // 固定筛选data
    showSearchData:Array<any> = [] // 显示筛选data

    screeningFlag:boolean = true // 固定筛选为true，显示筛选为false，用于visibleChange  Popover显示隐藏判断

    columns:Array<object> = [] // 表格表头数据
    data:Array<object> = [] // 表格数据
    search:Array<any> = [] // 表格搜索条件
    dataListFun:Array<object> = [] // 存放弹窗中函数项 处理后 数据
    funcTreeData:Array<object> = [] // 存放弹窗中函数树数据
    grammarSuccess:boolean = true // 检查语法是否通过，初始化true显示按钮
    errMsg:string = '语法错误提示。' // 检查语法错误提示
    errMsgFlag:boolean = false // 语法错误提示是否显示标识
    formula:string = '' // 公式内容
    funcTree:boolean = false // 控制是否显示 选中函数注释
    checkFormulaLoading:boolean = false // 检查语法btn loading
    checkFormulaSuccess:boolean = false // 检查语法不否验证成功
    pagination:pagination = { // 定义分页数据
      current: 1,
      pageSize: 10,
      total: 1
    }
    searchParam:Array<searchParam> = [] // 定义请求报表详情search参数
    reportParams:any = {}
    checkboxData: Array<any>= [ // chekcbox类型回显使用
      { 'key': 0, 'label': '同步中'},
      { 'key': 1, 'label': '不同'},
      { 'key': 2, 'label': '已审核'},
      { 'key': 3, 'label': '未找到'},
      { 'key': 4, 'label': '未启用'},
      { 'key': 5, 'label': '未比较'},
    ]

    moment () {}
    treeMsg (e:string):void { // 接收子组件的值 的方法
      console.log('父组件接收' + e)
      if (JSON.stringify(this.lieData).indexOf(e) === -1) {
        // this.fieldIdArrLie.push(e); // 将接收到的子组件传过来的值push到列数中
        this.treeList.map((v:any, i:number) => {
          if (v.id === e) {
            const url: string = 'custom/ReportManageDetail/addReportCols'
            const type:string = 'lie'
            this.addReportColsFun(url, v, type)
          }
        })
      } else {
        (this as any).$message.error('已有该选项', 3)
      }
    }
    beforeCreate () { // 挂载前创建ant form
      (this as any).dataForm = (this as any).$form.createForm(this); // 定义dataForm
      (this as any).datetimeForm = (this as any).$form.createForm(this); // 定义datetimeForm
      (this as any).numberForm = (this as any).$form.createForm(this); // 定义numberForm
      (this as any).stringForm = (this as any).$form.createForm(this); // 定义stringForm
      (this as any).selectForm = (this as any).$form.createForm(this); // 定义selectForm
      (this as any).checkboxForm = (this as any).$form.createForm(this); // 定义checkboxForm
      (this as any).modalForm = (this as any).$form.createForm(this); // 定义添加公式 弹窗modalForm
      (this as any).messageForm = (this as any).$form.createForm(this); // 定义添加公式 messageForm
      (this as any).formatForm = (this as any).$form.createForm(this); // 定义添加公式 formatForm
      (this as any).form = (this as any).$form.createForm(this); // 定义添加公式 form
    }
    get treeListFilter () { // 过滤出不为空的值
      return this.treeList.filter(list => list.title !== '')
    }
    created () {
      console.log(this.reportId);
      (this as any).$post('custom/ReportManageDetail/getAllFields', { reportId: this.reportId }).then((res: any) => { // 请求报表所有表的所有字段
        if (res.state === 2000) {
          this.dataSourceTree = res.data
          // this.dataSourceTree.text = res.data.title
          this.treeListFun(res.data) // 将其处理成一层数据，报表设置4个搜索下拉框会用到
          this.spinning = false
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('获取报表所有表的所有字段失败', 3) // 弹出错误message
        }
        this.spinning = false
      })
      if (this.editReportId) { // 判断是否是编辑
        (this as any).$post('custom/ReportManage/getReportDetailInfo', { reportId: this.editReportId }).then((res: any) => { // 请求报表所有表的所有字段
          if (res.state === 2000) {
            res.data.fields.map((v:any, i:number) => {
              this.lieData.push({ 'colId': v.colId, 'title': v.title, 'fieldId': v.fieldId })
            })
            res.data.group.map((v:any, i:number) => {
              this.hangData.push({ 'fieldId': v.fieldId, 'title': v.field_title, 'groupId': v.groupId })
            })
            res.data.sort.map((v:any, i:number) => {
              this.sortData.push({ 'fieldId': v.fieldId, 'title': v.field_title, 'sortId': v.sortId })
            })
            // this.fixSearchData = res.data.fixSearch
            // this.showSearchData = res.data.showSearch
            res.data.fixSearch.map((v:any, i:number) => { // 固定筛选
              let search_param:any // v.search_param.split(',')[0] v.search_param.split(',')[1]
              let extra:any = v.logic.label
              if (v.searchType === 'date' || v.searchType === 'datetime' ) {
                search_param = [moment(v.search_param.split(',')[0], 'YYYY-MM-DD'), moment(v.search_param.split(',')[1], 'YYYY-MM-DD')]
                extra += '  ' + v.search_param.split(',')[0] + ' ～ ' + v.search_param.split(',')[1]
              } else if (v.searchType === 'checkbox') {
                let searchParam = v.search_param.split(',')
                extra += '  '
                search_param = []
                for (let ind = 0; ind < searchParam.length; ind++) {
                  search_param.push(this.checkboxData[+searchParam[ind]])
                  extra += this.checkboxData[searchParam[ind]].label + '  '
                }
              } else if (v.searchType === 'select') {
                let searchParam = v.search_param.split(',')
                extra += '  '
                search_param = []
                for (let ind = 0; ind < searchParam.length; ind++) {
                  if (searchParam[ind]) {
                    search_param.push(this.checkboxData[+searchParam[ind]])
                    extra += this.checkboxData[searchParam[ind]].label + '  " "'
                  } else {
                    search_param = { 'key': '', 'label': '无选择'}
                  }
                }
              }else {
                search_param = v.search_param
                extra += '  ' + v.search_param
              }
              this.fixSearchData.push({ 
                'fieldId': v.fieldId,
                'search_logic': v.logic,
                'searchId': v.searchId,
                'field_type': v.searchType,
                'title': v.showTitle,
                'search_param': search_param,
                'extra': extra })
            })
            res.data.showSearch.map((v:any, i:number) => { // 显示筛选
              this.showSearchData.push({ 'fieldId': v.fieldId, 'title': v.showTitle, 'searchId': v.searchId })
            })
            console.log(this.hangData)
            this.getReportDetail(); // 请求table表格
            this.spinning = false
          } else {
            this.spinning = false;
            (this as any).$message.error(res.message, 3) // 弹出错误message
          }
        }).catch((err: any) => {
          console.log(err)
          if (err.code === 'ECONNABORTED') {
            (this as any).$message.error('请求超时', 3) // 弹出错误message
          } else {
            (this as any).$message.error('获取报表所有表的所有字段失败', 3) // 弹出错误message
          }
          this.spinning = false
        })
      }
    }
    getReportDetail(searchParam?:any) { // 获取报表table数据
      this.tableLoading = true
      if (!this.lieData.length) { // 当列为空时则不请求
        this.tableLoading = false
        return false
      }
      let searchPar:any
      if (searchParam) {
        searchPar = searchParam
      } else {
        searchPar = { reportId: this.reportId, pageSize: 10, nowpage: 1, searchParam: '' }
      }
      (this as any).$post('custom/Report/getReportDetail', searchPar).then((res: any) => { // 请求新增字段
        if (res.state === 2000) {
          this.data = res.data.data
          this.columns = res.data.columns
          this.search = res.data.search
          if (this.columns.length > 7) {
            this.screenWidth = { x: '150%', y: 400 }
          }
          this.data.map((v:any,i:number) => {
            v.keyFlagId = i
          })
          this.columns.map((v:any,i:number) => {
            v.width = v.title.length * 15
          })
          this.tableLoading = false
          const pagination = { ...this.pagination }
          pagination.total = res.data.count
          this.pagination = pagination
          // (this as any).$message.success(res.message, 3); // 弹出成功message
        } else {
          this.tableLoading = false
          this.data = [];
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('请求表格失败', 3) // 弹出错误message
        }
        this.tableLoading = false
      })
    }
    addReportColsFun (url:string, v:any, type:string) { // 增加报表表头列方法
      this.spinning = true;
      (this as any).$post(url, { reportId: this.reportId, fieldId: v.id }).then((res: any) => { // 请求新增字段
        if (res.state === 2000) {
          if (type === 'lie') {
            this.lieData.push({ 'fieldId': v.id, 'title': v.title, 'colId': res.data.colId })
          } else if (type === 'hang') {
            this.hangData.push({ 'fieldId': v.id, 'title': v.title, 'groupId': res.data.groupId })
          } else if (type === 'sort') {
            this.sortData.push({ 'fieldId': v.id, 'title': v.title, 'sortId': res.data.sortId })
          }
          this.getReportDetail() // 请求table表格
          this.spinning = false
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('新增字段失败', 3) // 弹出错误message
        }
        this.spinning = false
      })
    }
    treeListFun (data:any):void { // 将datasourceTree处理成一层
      for (let i = 0; i < data.length; i++) {
        const node:any = data[i]
        this.treeList.push(node)
        if (node.children) {
          (this as any).treeListFun(node.children)
        }
      }
    }
    nextStep ():void { // 提交
      let _this = this
      _this.loading = true
      setTimeout(() => {
        _this.loading = false
        _this.$emit('nextStep')
      }, 1000)
    }
    prevStep ():void { // 上一步
      this.$emit('prevStep')
    }
    /* 报表设置 start */
    handleChangeH (value:string):void { // 报表设置栏 组行 搜索框下拉选择方法
      if (!this.lieData.length) {
        (this as any).$message.error('请先添加列', 3) // 弹出成功message
      } else {
        if (value) {
          if (JSON.stringify(this.hangData).indexOf(value) === -1) {
            this.treeList.map((v:any, i:number) => {
              if (v.id === value) {
                const url:string = 'custom/ReportManageDetail/addGroupRow'
                const type:string = 'hang'
                this.addReportColsFun(url, v, type)
              }
            })
          }
        } else {
          (this as any).$message.error('已有该选项', 3)
        }
      }
    }
    handleChangeL (value:string):void { // 报表设置栏 列数 搜索框下拉选择方法
      if (value) {
        if (JSON.stringify(this.lieData).indexOf(value) === -1) {
          this.treeList.map((v:any, i:number) => {
            if (v.id === value) {
              const url: string = 'custom/ReportManageDetail/addReportCols'
              const type:string = 'lie'
              this.addReportColsFun(url, v, type)
            }
          })
        } else {
          (this as any).$message.error('已有该选项', 3)
        }
      }
    }
    handleChangeSort (value:string):void { // 报表设置栏 排序 搜索框下拉选择方法
      if (!this.lieData.length) {
        (this as any).$message.error('请先添加列', 3) // 弹出成功message
      } else {
        if (value) {
          if (JSON.stringify(this.sortData).indexOf(value) === -1) {
            this.treeList.map((v:any, i:number) => {
              if (v.id === value) {
                const url: string = 'custom/ReportManageDetail/addReportSort'
                const type:string = 'sort'
                this.addReportColsFun(url, v, type)
              }
            })
          }
        } else {
          (this as any).$message.error('已有该选项', 3)
        }
      }
    }
    deleteGroupH (item:any, index:number):void { // 删除组行方法
      let delRow:Array<any> = this.hangData.slice(index, index + 1) // 获取要删除的那个id
      const type:string = 'hang'
      const URL: string = 'custom/ReportManageDetail/delGroupRow'
      let param:any = { 'groupId': delRow[0].groupId }
      this.deleteGroupFun(URL, type, param, 'one', index) // 调用删除组行 列 方法
    }
    deleteGroupL (item:any, index:number):void { // 删除列数方法
      let delCol:Array<any> = this.lieData.slice(index, index + 1) // 获取要删除的那个id
      const type:string = 'lie'
      const URL: string = 'custom/ReportManageDetail/delReportCols'
      let param:any = { 'colId': delCol[0].colId }
      this.deleteGroupFun(URL, type, param, 'one',index) // 调用删除组行 列 方法
    }
    deleteGroupSort (item:any, index:number):void { // 删除排序方法
      let delSort:Array<any> = this.sortData.slice(index, index + 1) // 获取要删除的那个id
      const type:string = 'sort'
      const URL: string = 'custom/ReportManageDetail/delReportSort'
      let param:any = { 'sortId': delSort[0].sortId }
      this.deleteGroupFun(URL, type, param, 'one', index) // 调用删除组行 列 方法
    }
    deleteAllGroup (type:string):void { // 删除所有组行、组列、排序
      let url:string
      let param:any
      let all:string = 'all'
      if (type === 'hang') {
        url = 'custom/ReportManageDetail/delGroupRow'
        let groupId:Array<number> = []
        this.hangData.map((v:any, i:number) => {
          groupId.push(v.groupId)
        })
        param = { 'groupId': groupId.toString() }
        this.deleteGroupFun(url, type, param, all) // 调用删除组行 列 方法
      } else if (type === 'lie') {
        url = 'custom/ReportManageDetail/delReportCols'
        let colId:Array<number> = []
        this.lieData.map((v:any, i:number) => {
          colId.push(v.colId)
        })
        param = { 'colId': colId.toString() }
        this.deleteGroupFun(url, type, param, all) // 调用删除组行 列 方法
      } else if (type === 'sort') {
        url = 'custom/ReportManageDetail/delReportSort'
        let sortId:Array<number> = []
        this.sortData.map((v:any, i:number) => {
          sortId.push(v.sortId)
        })
        param = { sortId: sortId.toString() }
        this.deleteGroupFun(url, type, param, all) // 调用删除组行 列、排序 方法
      }
    }
    deleteGroupFun (URL:string, type:string, param:any, all:string, index?:number) { // 删除组行 列、排序 方法
      (this as any).$post(URL, param).then((res: any) => { // 请求报表所有表的所有字段
        if (res.state === 2000) {
          if (index !== undefined) { // 判断参数是否存在
            if (type === 'hang') {
              this.hangData.splice(index, 1)
            } else if (type === 'lie') {
              this.lieData.splice(index, 1)
            } else if (type === 'sort') {
              this.sortData.splice(index, 1)
            }
          }
          if (all === 'all') {
            if (type === 'hang') {
              this.hangData = []
            } else if (type === 'lie') {
              this.lieData = []
            } else if (type === 'sort') {
              this.sortData = []
            }
          }
          (this as any).$message.success('删除成功', 3)
          this.getReportDetail() // 请求table表格
        } else {
          (this as any).$message.error(res.message, 3) // 弹出message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('删除失败', 3) // 弹出错误message
        }
      })
    }
    /* 报表设置 end */

    /* 筛选 start */
    handleChangeF (value:any):void { // 固定筛选改变事件
      if (!this.lieData.length) {
        (this as any).$message.error('请先添加列', 3); // 弹出成功message
      } else {
        if (value) {
          if (JSON.stringify(this.fixSearchData).indexOf(value) === -1) {
            this.dataSourceTree.map((val:any, ind:number) => {
              val.children.map((v:any, i:number) => {
                if (v.id === value) {
                  let a:any = Object.assign({}, v)
                  a.popover = true
                  a.new = true // 用来判断是否是第一次
                  a.tableId = val.id
                  a.fieldId = value // 添加选中的fieldId
                  // console.log(v)
                  // a.field_type = 'checkbox'
                  if (a.field_type === 'checkbox') {
                    a.search_logic = { key: 'in', label: '等于' }
                    a.search_param = []
                  } else if (a.field_type === 'select') {
                    a.search_logic = { key: '=', label: '等于' }
                    a.search_param = {}
                  } else if (a.field_type === 'string' || a.field_type === 'num') {
                    a.search_logic = { key: '=', label: '等于' }
                    a.search_param = ''
                  } else if (a.field_type === 'datetime') {
                    a.search_param = []
                  } else if (a.field_type === 'date') {
                    a.search_param = []
                  }
                  this.fixSearchData.push(a) // push 选中的回显的信息
                  this.screeningFlag = true // 固定筛选为true，显示筛选为false，用于visibleChange  Popover显示隐藏判断
                }
              })
            })
          } else {
            (this as any).$message.error('已有该选项', 3)
          }
        }
      }
    }
    handleChangeX (value:any):void { // 显示筛选改变事件
      if (!this.lieData.length) {
        (this as any).$message.error('请先添加列', 3); // 弹出成功message
      } else {
        if (value) {
          if (JSON.stringify(this.showSearchData).indexOf(value) === -1) { // 判断是否存在
            this.dataSourceTree.map((val:any, ind:number) => {
              val.children.map((v:any, i:number) => {
                if (v.id === value) {
                  let a:any = Object.assign({}, v)
                  a.tableId = val.id // 父节点id
                  a.fieldId = value
                  this.xianshifilterFun(a) // 调用增加显示筛选器方法
                }
              })
            })
          } else {
            (this as any).$message.error('已有该选项', 3)
          }
        }
      }
    }
    xianshifilterFun (a:any) { // 显示筛选器新增方法
      this.spinning = true;
      (this as any).$post('custom/ReportManageDetail/addReportShowSearch', { reportId: this.reportId, tableId: a.tableId, fieldId: a.id }).then((res: any) => { // 请求新增字段
        if (res.state === 2000) {
          this.spinning = false
          this.showSearchData.push({ 'title': a.title, 'fieldId': a.fieldId, 'searchId': res.data.searchId })  // push 选中的回显的信息
          this.getReportDetail(); // 请求table表格
          (this as any).$message.success(res.message, 3) // 弹出成功message
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('请求新增显示筛选器失败', 3) // 弹出错误message
        }
        this.spinning = false;
      });
    }
    filterOption (input:any, option:any):any { // 搜索框输入搜索 过滤方法
      return option.componentOptions.children[1].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    deleteSearch (index: number, type:string):void { // 删除筛选器方法
      let searchId
      if (type === 'F') { // 配置固定与显示筛选 参数
        let delFix:Array<any> = this.fixSearchData.slice(index, index + 1)
        searchId = delFix[0].searchId
      } else if (type === 'X') {
        let delShow:Array<any> = this.showSearchData.slice(index, index + 1)
        searchId = delShow[0].searchId
      }
      this.delReportSearch(searchId, index, type)
    }
    hidePopover (e:any, index:number, type:string):void { // 取消关闭气泡框
      if (e.new) { // 判断是否是新增加的项
        this.fixSearchData.splice(index, 1)
      }
      e.popover = false
    }
    enterPopover (e:any, type:string):void { // 固定筛选确认应用关闭气泡框
      const that = this
      if (e.new) { // 如果是第一次点击
        e.new = false
      }
      if (type === 'F') { // 配置固定与显示筛选 要传给后台的参数
        e.search_type = 1
      } else if (type === 'X') {
        e.search_type = 2
      }
      if (e.field_type === 'date') { // 日期
        (this as any).dataForm.validateFields((err: any, values: any) => {
          const subData:subData = {
            reportId: this.reportId,
            tableId: e.tableId,
            fieldId: e.id,
            search_logic: 'between', // 时间类：固定传 between
            search_type: e.search_type,
            search_name: e.title,
            search_param: ''
          }
          if (values['search_param']) {
            if (!err) {
              console.log(values['search_param'])
              const rangeValue:any = values['search_param']
              /* const subData:any = {
                ...values,
                'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
              } */
              // console.log(subData)
              e.extra = rangeValue[0].format('YYYY-MM-DD') + ' ～' + rangeValue[1].format('YYYY-MM-DD')
              e.search_param = values.search_param
              e.popover = false
              subData.search_param = rangeValue[0].format('YYYY-MM-DD') + ',' + rangeValue[1].format('YYYY-MM-DD')
            }
          } else {
            e.extra = '所有时间'
            e.popover = false;
            (this as any).dataForm.resetFields() // 重置输入控件的值
          }
          this.subDataSearch(subData, e.field_type, e.extra, values.search_logic); // 调用增加报表筛选器接口
          (this as any).dataForm.resetFields() // 重置输入控件的值
        })
      } else if (e.field_type === 'datetime') { // 时间
        (this as any).datetimeForm.validateFields((err:any, values:any) => {
          if (!err) {
            const rangeValue:any = values['search_param']
            /* const subData:any = {
              ...values,
              'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
            } */
            e.extra = rangeValue[0].format('YYYY-MM-DD HH:mm') + ' ～' + rangeValue[1].format('YYYY-MM-DD HH:mm')
            e.search_param = values.search_param
            e.popover = false
            const subData:subData = {
              reportId: this.reportId,
              tableId: e.tableId,
              fieldId: e.id,
              search_logic: 'between', // 时间类：固定传 between
              search_type: e.search_type,
              search_name: e.title,
              search_param: rangeValue[0].format('YYYY-MM-DD HH:mm') + ',' + rangeValue[1].format('YYYY-MM-DD HH:mm')
            }
            this.subDataSearch(subData, e.field_type, e.extra, values.search_logic); // 调用增加报表筛选器接口
            (this as any).datetimeForm.resetFields() // 重置输入控件的值
          }
        })
      } else if (e.field_type === 'num') { // 数字
        (this as any).numberForm.validateFields((err: any, values: any) => {
            if (!err) {
              e.extra = values.search_logic.label + '  '
              e.extra += values.search_param ? values.search_param : '  " "'
              e.popover = false
              e.search_logic = values.search_logic
              e.search_param = values.search_param
              const subData:subData = {
                reportId: this.reportId,
                tableId: e.tableId,
                fieldId: e.id,
                search_logic: values.search_logic.key,
                search_type: e.search_type,
                search_name: e.title,
                search_param: values.search_param
              }
              this.subDataSearch(subData, e.field_type, e.extra, values.search_logic); // 调用增加报表筛选器接口
              (this as any).numberForm.resetFields() // 重置输入控件
            }
        })
      } else if (e.field_type === 'string') { // 字符串
        (this as any).stringForm.validateFields((err:any, values: any) => {
          if (!err) {
            e.extra = values.search_logic.label + '  '
            e.extra += values.search_param ? values.search_param : '  " "'
            e.search_logic = values.search_logic
            e.search_param = values.search_param
            e.popover = false
            const subData:subData = {
              reportId: this.reportId,
              tableId: e.tableId,
              fieldId: e.id,
              search_logic: values.search_logic.key,
              search_type: e.search_type,
              search_name: e.title,
              search_param: values.search_param
            };
            this.subDataSearch(subData, e.field_type, e.extra, values.search_logic); // 调用增加报表筛选器接口
            (this as any).stringForm.resetFields() // 重置输入控件
          }
        })
      } else if (e.field_type === 'select') { // 单选
        (this as any).selectForm.validateFields((err:any, values:any) => {
          if (!err) {
            e.extra = values.search_logic.label + '  '
            e.extra += values.search_param ? values.search_param.label : '  " "'
            e.popover = false
            e.search_logic = values.search_logic
            e.search_param = values.search_param
            const subData:subData = {
              reportId: this.reportId,
              tableId: e.tableId,
              fieldId: e.id,
              search_logic: values.search_logic.key,
              search_type: e.search_type,
              search_name: e.title,
              search_param: values.search_param.key
            }
            this.subDataSearch(subData, e.field_type, e.extra, values.search_logic); // 调用增加报表筛选器接口
            (this as any).selectForm.resetFields() // 重置输入控件
          }
        })
      } else if (e.field_type === 'checkbox') { // 复选框
        (this as any).checkboxForm.validateFields((err:any, values:any) => {
          if (!err) {
            let search_param:Array<string> = []
            let extra:Array<string> = []
            if(!values.search_param) {
              e.extra = values.search_logic.label + '  ' + '  " "'
            } else {
              values.search_param.forEach((val:any, i:number) => {
                // e.extra += val.label+','
                // search_param += val.key+','
                extra.push(val.label)
                search_param.push(val.key)
              })
              e.extra = values.search_logic.label + '  ' + extra.join()
            }
            e.popover = false
            e.search_logic = values.search_logic
            e.search_param = values.search_param
            console.log(values.search_param)
            const subData:subData = {
              reportId: this.reportId,
              tableId: e.tableId,
              fieldId: e.id,
              search_logic: values.search_logic.key,
              search_type: e.search_type,
              search_name: e.title,
              search_param: search_param.join()
            }
            this.subDataSearch(subData, e.field_type, e.extra, values.search_logic); // 调用增加报表筛选器接口
            (this as any).checkboxForm.resetFields() // 重置输入控件
          }
        })
      }
    }
    subDataSearch (subData:subData, field_type:string, extra:string, search_logic:any):void { // 固定筛选器确认提交方法 extra为footer显示的文本
      this.spinning = true;
      (this as any).$post('custom/ReportManageDetail/addReportSearch', subData).then((res: any) => { // 请求新增字段
        if (res.state === 2000) {
          this.spinning = false
          this.fixSearchData.splice(this.fixSearchData.length - 1, 1, { 
            'searchId': res.data.searchId, 
            'fieldId': subData.fieldId, 
            'field_type': field_type, 
            'title': subData.search_name,
            'search_logic': search_logic,
            'search_param': subData.search_param,
            'extra': extra 
          }) // 替换最后一个元素，（位置，个数，要插入的元素)
          this.getReportDetail(); // 请求table表格
          (this as any).$message.success(res.message, 3) // 弹出成功message
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('新增固定筛选器失败', 3) // 弹出错误message
        }
        this.spinning = false
      })
    }
    delReportSearch (searchId:any, index:number, type:string):void { // 筛选器删除请求方法
      this.spinning = true;
      (this as any).$post('custom/ReportManageDetail/delReportSearch', { searchId }).then((res: any) => { // 请求新增字段
        if (res.state === 2000) {
          this.spinning = false
          if (type === 'F') { // 配置固定与显示筛选 参数
            this.fixSearchData.splice(index, 1)
          } else if (type === 'X') {
            this.showSearchData.splice(index, 1)
          }
          this.getReportDetail(); // 请求table表格
          (this as any).$message.success(res.message, 3) // 弹出成功message
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('删除筛选器失败', 3) // 弹出错误message
        }
        this.spinning = false
      })
    }
    visibleChangeFun (visible:any):void { // popover 显示隐藏的回调
      if (this.screeningFlag) {
        let aTagFLast:any = this.fixSearchData[this.fixSearchData.length -1] // 获取固定筛选数组最后一个
        if (aTagFLast.new) { // 如果是第一次选中未点击确认按钮的情况下
          this.fixSearchData.pop()
        }
      } else {
        let aTagXLast:any = this.showSearchData[this.showSearchData.length -1] // 获取显示筛选数组最后一个
        if (aTagXLast.new) { // 如果是第一次选中未点击确认按钮的情况下
          this.showSearchData.pop()
        }
      }
    }
    /* 筛选 end */

    /* 报表设置 拖拽 strat */
    onEndHang (event:any):void { // 组行 拖拽排序发生变化时事件
      let ids:Array<number> = []
      this.hangData.map((v:any, i:number) => {
        ids.push(v.groupId)
      })
      this.draggableEndSubFun('group', ids.toString())
    }
    onEndLie (event:any):void { // 组列 拖拽排序发生变化时事件
      let ids:Array<number> = []
      this.lieData.map((v:any, i:number) => {
        ids.push(v.fieldId)
      })
      this.draggableEndSubFun('field', ids.toString())
    }
    onEndSort (event:any):void { // 排序 拖拽排序发生变化事件
      let ids:Array<number> = []
      this.sortData.map((v:any, i:number) => {
        ids.push(v.sortId)
      })
      this.draggableEndSubFun('sort', ids.toString())
    }
    onEndFixSearch (event:any):void { // 固定筛选器 拖拽排序发生变化事件
      let ids:Array<number> = []
      this.fixSearchData.map((v:any, i:number) => {
        ids.push(v.searchId)
      })
      this.draggableEndSubFun('fixSearch', ids.toString())
    }
    onEndShowSearch (event:any):void { // 显示筛选器 拖拽排序发生变化事件
      let ids:Array<number> = []
      this.showSearchData.map((v:any, i:number) => {
        ids.push(v.searchId)
      })
      this.draggableEndSubFun('showSearch', ids.toString())
    }
    draggableEndSubFun (type: string, ids:string):void {
      this.spinning = true;
      (this as any).$post('custom/ReportManageDetail/changeParamSort', { type, ids }).then((res: any) => { // 请求新增字段
        if (res.state === 2000) {
          this.getReportDetail(); // 请求table表格
          this.spinning = false;
          (this as any).$message.success(res.message, 3); // 弹出成功message
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('排序失败', 3) // 弹出错误message
        }
        this.spinning = false
      })
    }

    /* 报表设置 拖拽 end */

    /* 报表名称 修改方法 start */
    titleNameEditFun (e:string) { // 报表名称修改方法
      this.titleName = e // 将输入的赋值给其名称
    }
    editTitleName ():void { // 点击修改按钮方法
      this.titleNameEdit = true
      this.cancelTitleNameFlag = this.titleName // 获取titleName作为flag用于取消还原
    }
    saveEditTitleName ():void { // 保存修改
      this.titleNameEdit = false
    }
    cancelEditTitleName ():void { // 取消还原修改
      this.titleNameEdit = false
      this.titleName = this.cancelTitleNameFlag // 取消时将之前的titleName还原
    }
    /* 报表名称 修改方法 end */

    /* 添加汇总公式弹窗  start*/
    showFormulaModel ():void { // 添加汇总公式弹窗方法
      // this.generateList(this.dataSource) // 先处理数据
      this.showFormulaFlag = true;
      (this as any).$post('custom/Formula/getSystemFunc', null).then((res: any) => { // 请求新增字段
        if (res.state === 2000) {
          this.generateList(res.data)
          this.funcTreeData = res.data
          this.systeming = false;
          // (this as any).$message.success(res.message, 3); // 弹出成功message
        } else {
          this.systeming = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('删除筛选器失败', 3) // 弹出错误message
        }
        this.systeming = false
      })
    }
    formulaCreate ():void { // 模态框确认方法
      this.formulaCreateLoading = true // 打开动画
      let format:any = (this as any).formatForm.getFieldsValue(['col_format', 'decimal_num']);
      if (!format.col_format) {
         format = {col_format: 'num', decimal_num: '0'}; // 先设置一个默认的值
      }
      (this as any).messageForm.validateFields((err: any, values: any) => {
        if (!err) {
          let params:any = Object.assign({}, values, format)
          params.reportId = this.reportId;
          (this as any).$post('custom/reportManageDetail/addFormulaCols', params).then((res: any) => { // 请求新增字段
            this.formulaCreateLoading = false
            if (res.state === 2000) {
              this.getReportDetail(); // 调用请求表格方法
              (this as any).messageForm.resetFields(); // 重置输入控件
              (this as any).formatForm.resetFields(); // 重置输入控件
              this.showFormulaFlag = false
              this.lieData.push({ 'fieldId': res.data.colId, 'title': params.col_title, 'colId': res.data.colId })
            } else {
              (this as any).$message.error(res.message, 3) // 弹出错误message
            }
          }).catch((err: any) => {
            if (err.code === 'ECONNABORTED') {
              (this as any).$message.error('请求超时', 3) // 弹出错误message
            } else {
              (this as any).$message.error('添加公式列失败', 3) // 弹出错误message
            }
            this.formulaCreateLoading = false
          })
        } else {
          this.formulaCreateLoading = false
        }
      });
    }
    textareaChange (e:any):void { // textarea change事件
      console.log(e.target.value)
      this.formula = e.target.value
    }
    formulaCancel ():void { // 模态框取消关闭方法
      this.showFormulaFlag = !this.showFormulaFlag
      this.insertFun = true
      this.insertField = true
      this.funData = {
        func_desc: '',
        func_sample: '',
        func_type: 0,
        id: 0,
        title: ''
      }
      this.fieldData = {}
    }

    /* 模态框搜索树处理方法 start */
    generateList (data:any):void { // 将 函数项数据 处理成只有一个层级
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        this.dataListFun.push(node) // 函数
        if (node.children) {
          (this as any).generateList(node.children)
        }
      }
    }
    getParentKey (key:string, tree:any):void { // 计算返回要打开的tree的父节点 方法
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some((item:any) => item.id === key)) {
            parentKey = node.key
          } else if ((this as any).getParentKey(key, node.children)) {
            parentKey = (this as any).getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    }
    onExpandField (expandedKeys:any):void { // 触发展开/收起节点
      this.expandedKeysField = expandedKeys
      this.autoExpandParentField = false
    }
    onChangeField (e:any):void { // 编辑公式列弹窗 字段搜索方法
      const value = e.target.value
      const expandedKeysField = this.treeList.map((item:any) => { // 遍历 查询所有的节点
        if (item.title.indexOf(value) > -1) {
          return (this as any).getParentKey(item.key, this.dataSourceTree)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i) // 过滤出要打开的节点
      Object.assign(this, {
        expandedKeysField,
        searchValueField: value,
        autoExpandParentField: true
      })
    }

    onExpandFun (expandedKeys:any):void {
      this.expandedKeysFun = expandedKeys
      this.autoExpandParentFun = false
    }
    onChangeFun (e:any):void { // 函数项改变搜索事件
      const value = e.target.value
      const expandedKeysFun = this.dataListFun.map((item:any) => { // 遍历 查询所有的节点
        if (item.title.indexOf(value) > -1) {
          return (this as any).getParentKey(item.id, this.funcTreeData)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i) // 过滤出要打开的节点
      Object.assign(this, {
        expandedKeysFun,
        searchValueFun: value,
        autoExpandParentFun: true
      })
    }
    onselectTreeField (selectedKeys:any, info:any):void { // 字段选中
      this.fieldData = info.node.dataRef // 将选中的字段保存到fieldData中
      this.insertField = false
    }
    onSelectTreeFun (selectedKeys:any, info:any):void { // 函数选中
      this.funData = info.node.dataRef // 将选中的函数保存到funData中
      this.funcTree = true // 显示注释
      this.insertFun = false
    }
    /* end */

    insertFieldFun ():void { // 字段插入方法
      let textarea:any = (this as any).$refs.formulaTextarea.$el // 获取文本域元素
      let cursor:any = getTextareaCursor(textarea) // 先调用获取位置方法
      let text: string = this.fieldCalculate ? this.fieldCalculate + '(' + this.fieldData.formula + ') ' : this.fieldData.formula + ' '
      addTextareaCursor(textarea, cursor, text) // 调用插入文本方法
      this.formula = textarea.value
    }
    insertFunFun ():void { // 函数插入方法
      let textarea:any = (this as any).$refs.formulaTextarea.$el // 获取文本域元素
      let cursor:any = getTextareaCursor(textarea) // 先调用获取位置方法
      let text: string = this.funData.func_sample + ' '
      addTextareaCursor(textarea, cursor, text) // 调用插入文本方法
      this.formula = textarea.value
    }
    symbolInsertFun (symbol:string):void { // textarea符号插入方法
      let textarea:any = (this as any).$refs.formulaTextarea.$el // 获取文本域元素
      let cursor:any = getTextareaCursor(textarea) // 先调用获取位置方法
      let text: string = symbol
      addTextareaCursor(textarea, cursor, text) // 调用插入文本方法
      this.formula = textarea.value
    }
    // 监听formula 是因为如果其变化则显示验证公式按钮
    @Watch('formula', { deep: true, immediate: true }) formulaWatch (newVal:string, oldVal:string) {
      if (newVal !== oldVal) {
       this.grammarSuccess = true
       this.errMsgFlag = false
       this.checkFormulaSuccess = false
      }
    }
    checkGrammar ():void { // 模态框 检查语法方法
      console.log(this.formula)
      if (this.formula) {
        this.checkFormulaLoading = true;
        (this as any).$post('custom/Formula/checkFormula', { reportId: this.reportId, formula: this.formula }).then((res: any) => { // 请求新增字段
          if (res.state === 2000) {
            console.log(res);
            this.checkFormulaLoading = false // 加载动画
            this.grammarSuccess = false // 按钮
            this.checkFormulaSuccess = true // 成功提示
          } else {
            this.checkFormulaLoading = false; // 动画
            this.grammarSuccess = false // 按钮
            this.errMsg = res.message
            this.errMsgFlag = true  // 提示信息
          }
        }).catch((err: any) => {
          console.log(err);
          this.errMsg = '请求失败'
          this.errMsgFlag = true  // 提示信息
          this.checkFormulaLoading = false;
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        });
      }
    }
    /* 搜索条件 */
    handleReset ():void { // 重置方法
      this.searchParam = [];
      (this as any).form.resetFields()
    }
    handleSearch (e: any):void { // 搜索方法
      e.preventDefault();
      this.searchParam = [];
      (this as any).form.validateFields((err:any, values:any) => {
        this.search.map((v:any, i:number) => {
          let key:string = v.searchName.split('.')[0];
          let zhi:string = v.searchName.split('.')[1];
          let searchName:any = ''
          if (v.searchName === key + '.' + zhi) {
            searchName = values[key][zhi] || ''
            if (values[key][zhi]) {
              if (v.searchType === 'datetime') {
                  const rangeValue:any = values[key][zhi]
                  searchName = rangeValue[0].format('YYYY-MM-DD HH:mm') + ',' + rangeValue[1].format('YYYY-MM-DD HH:mm')
                } else if (v.searchType === 'date') {
                  const rangeValue:any = values[key][zhi]
                  searchName = rangeValue[0].format('YYYY-MM-DD') + ',' + rangeValue[1].format('YYYY-MM-DD')
                }
            }
            this.searchParam.push({ logic: v.logic, name: v.searchName, search_type: v.searchType, search_param: searchName })
          }
        })
        let searchParam:any = JSON.stringify(this.searchParam)
        if (!err) {
          let params:any = { reportId: this.reportId, searchParam: searchParam, pageSize: 10, nowpage: 1 }
          this.getReportDetail(params)
        }
     })
   }
    onChangeTab (pagination:any):void { // 表格切换页数
      const pager:any = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager
      let searchParam:any = JSON.stringify(this.searchParam) || ''
      let params:any = { reportId: this.reportId, searchParam: searchParam, nowpage: pagination.current, pageSize: pagination.pageSize }
      this.getReportDetail(params);
    }
    /* saveFun ():void { // 保存方法
      this.saveLoading = true
      let _this = this
      setTimeout(() => {
        _this.saveLoading = false
      }, 2000)
    } */
    runFun ():void { // 运行方法
      this.runLoading = true
      let _this = this
      setTimeout(() => {
        _this.runLoading = false;
         window.open(window.location.origin + '/reportTable?reportId=' + this.reportId) // _target 表示只打开一个，重复点击会回到第一个打开的窗口
        // (this as any).$router.push({ path: '/reportTable', query: { reportId: this.reportId }}) // 报表表格 
      }, 200)
    } 
 }
</script>

<style lang='less'>
.spin-content{
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.lpc-step2-content {
  display: flex;
  border: 1px solid #e8e8e8;
  .lpc-centerTab {
    width: 233px;
    border-right: 1px solid #e8e8e8;
    .ant-tabs .ant-tabs-bar {
      margin: 0;
    }
    .ant-tabs-nav-wrap {
      background-color: #f9f7f7;
      border-bottom: 1px solid #e8e8e8;
      height: 43px;
      line-height: 43px;
      margin-bottom: 0;
      .ant-tabs-tab {
        margin: 0;
        padding: 0 26px;
      }
    }
    .lpc-tab1-content {
      padding: .875rem 1rem;
      height: calc(64vh - 43px);
      overflow-y: scroll;
      .tab1-top {
        .tab1-top-header {
          margin-bottom: .5rem;
          line-height: 19px;
          display: flex;
          h4 {
            flex: 1;
            display: inline-block;
            color: #6b6d70;
            font-weight: 700;
            font-size: .8125rem;
          }
          i.anticon-delete {
            cursor: pointer;
            font-size: 14px;
            // margin-right: 10px;
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          i.anticon-delete:hover {
            color: #1890ff;
          }
        }
        .tab1-top-content {
          h4 {
            font-size: .6875rem;
            color: #6b6d70;
            text-transform: uppercase;
            display: flex;
            -o-box-align: center;
            align-items: center;
            margin-bottom: .25rem;
            line-height: 2;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
        }
      }
      .tab1-bottom {
        .tab1-bottom-header {
          margin-bottom: .5rem;
          line-height: 19px;
          display: flex;
          h4 {
            flex: 1;
            color: #6b6d70;
            font-weight: 700;
            font-size: .8125rem;
            text-transform: uppercase;
            -o-box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-bottom: .25rem;
            line-height: 2;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a.ant-dropdown-trigger {
            cursor: pointer;
            // margin-right: 10px;
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            :hover {
              color: #1890ff;
            }
            .anticon-down-square {
              font-size: 14px;
            }
          }
        }
      }
      .task-content{ // 公用拖拽模块样式
        .task-item {
          font-variant: tabular-nums;
          width: 100%;
          color: rgba(0, 0, 0, 0.65);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 5px 0;
          line-height: 22px;
          height: 22px;
          padding: 0 7px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          background: #fafafa;
          font-size: 12px;
          -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          opacity: 1;
          white-space: nowrap;
          cursor: move;
          .anticon-close {
            display: inline-block;
            float: right;
            margin-top: 5px;
            color: rgb(176, 173, 171);
            :hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .lpc-tab2-content {
      padding: .875rem 1rem;
      height: calc(64vh - 43px);
      overflow-y: scroll;
      .tab2-top-header {
        margin-bottom: .5rem;
        line-height: 19px;
        display: flex;
        h4 {
          flex: 1;
          color: #6b6d70;
          font-weight: 700;
          font-size: .8125rem;
          text-transform: uppercase;
          -o-box-align: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-bottom: .25rem;
          line-height: 2;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        a.ant-dropdown-trigger {
          cursor: pointer;
          font-size: .75rem;
          // margin-right: 10px;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          :hover {
            color: #1890ff;
          }
          .anticon-down-square {
            font-size: 14px;
          }
        }
      }
      .screening-content,.According-content {
        .screening-item,.According-item {
          background-color: #fbfbfb;
          padding: 0 7px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          margin: 3px 0;
          cursor: pointer;
          display: flex;
          .lpc-fixed-text {
            flex: 1;
            display: inline-block;
            .title {
              font-size: .75rem;
              text-overflow: ellipsis;
              overflow-x: hidden;
              color: #6b6d70;
              font-weight: 400;
            }
            .text {
              font-size: .8125rem;
              font-weight: 400;
              color: #16325c;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .anticon-close {
            line-height: 35px;
            color: rgb(176, 173, 171);
            :hover {
              cursor: pointer;
            }
          }
        }
        .active_item {
          border: 1px solid #40a9ff;
        }
        .task-item {
          font-variant: tabular-nums;
          width: 100%;
          color: rgba(0, 0, 0, 0.65);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 5px 0;
          line-height: 22px;
          height: 22px;
          padding: 0 7px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          background: #fafafa;
          font-size: 12px;
          -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          opacity: 1;
          white-space: nowrap;
          cursor: move;
          .anticon-close {
            display: inline-block;
            float: right;
            margin-top: 5px;
            color: rgb(176, 173, 171);
            :hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .lpc-rightTable {
    width: 100%;
    overflow-x: scroll;
    .table-header {
      height: 43px;
      line-height: 43px;
      background-color: #f9f7f7;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      .table-header-left {
        display: inline-block;
        flex: 1;
        .header-icon {
          display: inline-block;
          margin-left: 10px;
          font-size: 15px;
          .anticon-edit {
            color: #1dd9e2c7;
            cursor: pointer;
          }
          .anticon-check {
            color: #3fb54b;
            cursor: pointer;
            margin-right: 5px;
          }
          .anticon-close {
            color: #e84545;
            cursor: pointer;
          }
        }
      }
      .table-header-right {
        display: inline-block;
        margin-right: 20px;
        .runBtn {
          margin-left: 10px;
          background-color: #1dd9e2c7;
          border: #1dd9e2c7
        }
      }
    }
    #components-form-demo-advanced-search {
      background-color: #fbfbfb;
      .ant-form-item {
        display: flex;
        .ant-form-item-control-wrapper {
          flex: 1;
          .ant-calendar-picker {
            width: 100%;
          }
        }
      }
    }
    .table-content {
      height: calc(64vh - 43px);
      table tr {
        th {
          text-align: center;
        }
      }
      .noneIcon {
        width: 100%;
        height: 100%;
        display:flex;
        justify-content:center;
        align-items:center; /* 水平垂直居中 */
        i {
          color: #ddd;
          font-size: 8rem;
        }
        p {
          text-align: center;
          font-size: 15px;
          color: #bfbfbf;
        }
      }
    }
  }
}
.lpc-form-footer { // 底部按钮样式
  text-align: center;
  .ant-form-item {
    margin: 12px 0;
  }
}
.ant-popover { // 筛选器弹框样式
  .ant-popover-inner-content {
    .ant-form-item {
      margin-bottom: 12px;
    }
    .content-footer {
      text-align: right;
      .ant-btn-primary {
        margin-left: 10px;
      }
    }
  }
}
.formulaModal { // 编辑公式列模态框样式
  width: 950px!important;
  .ant-modal-body {
    padding: 0!important;
    .modalContent {
      display: flex;
      .modalLeftTab {
        display: inline-block;
        width: 300px;
        flex: 0 0 300px;
        background-color: #f9f9fa;
        padding: 0 1rem;
        border-right: 1px solid #d9dbdd;
        .ant-tabs-nav-wrap {
          border-bottom: 1px solid #e8e8e8;
          height: 45px;
          margin-bottom: 0;
          .ant-tabs-tab-active {
            color: rgb(8, 7, 7);
          }
        }
        .ant-tabs-tabpane {
          padding: 0 5px;
        }
      }
      .modalRightTab {
        display: inline-block;
        flex: 1;
        padding: 0 1rem;
        .ant-tabs-nav-wrap {
          border-bottom: 1px solid #e8e8e8;
          height: 45px;
          margin-bottom: 0;
          .ant-tabs-tab-active {
            color: rgb(8, 7, 7);
          }
        }
        .ant-tabs-tabpane {
          padding: 0 5px;
        }
        .message {
          .ant-form-vertical {
            .twoCol {
              display: inline-block;
              width: 48%;
              .ant-radio-wrapper {
                height: 30px;
                line-height: 30px;
                display: block;
              }
            }
            .editInsertButton {
              position: absolute;
              left: 0;
              z-index: 999;
              display: flex;
              width: 100%;
              align-items: center;
              padding: .5rem;
              background-color: #f6f9fb;
              border-top-right-radius: .25rem;
              border-top-left-radius: .25rem;
              border-bottom: 1px solid #d9dbdd;
              span {
                color: #16325c;
                font-weight: 700;
                font-size: .8125rem;
                line-height: 2.125rem;
                padding: 0 .825rem;
                margin-right: .5rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                vertical-align: middle;
                border: 1px solid rgb(221, 219, 218);
                transition: border .15s linear;
                border-radius: .25rem;
                border-color: rgb(221, 219, 218);
                background-color: rgb(255, 255, 255);
                user-select: none;
                display: inline-block;
                background: transparent;
                background-clip: border-box;
                &:hover {
                  background-color: #e7eaef;
                  cursor: pointer;
                }
              }
            }
            textarea {
              height: 265px;
              padding-top: 45px;
              resize: none;
            }
            p.errMsg {
              height: 25px;
              line-height: 25px;
              white-space: nowrap;
              font-size: 12px;
              color: rgb(62, 62, 60);
            }
          }
        }
      }
      .leftMenu {
        .header {
          .ant-input-search {
            width: 265px;
          }
        }
        .treeContent { // 模态框中tree内容样式
          // height: calc(64vh - 22.6875rem);
          height: 360px;
          width: 265px;
          overflow: scroll;
          background-color: #fff;
          border: 1px solid #d9dbdd;
          border-radius: .25rem;
          margin: .625rem 0 .75rem;
          padding: 0 .5rem;
        }
        .funcTree {
          height: 260px;
          margin: .625rem 0 0;
        }
        .funcTreeMessage {
          height: 100px;
          padding: 10px 0;
          font-size: 12px;
          p:first-child {
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis; 
            margin: 5px 0;
            color: black;
          }
          p:last-child {
            height:60px;
            width: 100%;
            color: #6b6d70;
            overflow:hidden;
          }
        }
        .footer {
          margin: 10px 0;
          button {
            margin-left: 21px;
          }
        }
      }
    }
  }
}
.ant-select-dropdown .ant-select-dropdown-content li {
  padding: 5px 12px 5px 22px;
  font-size: 12px;
  &.disabled {
    color: rgb(0, 0, 0);
    padding: 5px 12px;
    font-size: 14px;
    i {
      margin-right: 5px;
    }
  }
}
</style>
